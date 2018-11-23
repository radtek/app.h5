<style lang="scss">
	@import "../../assets/modules/qa/view-answer_detail.scss";
	[rs-view="answer"] {
		.rx-cell-avatar.p {
			padding: 15px 30px 0 30px;
		}
		.pane-answer {
			.rx-cell-header {
				padding-bottom: 0;
				padding-top: 5px;
			}
			.rx-cell-imgs {
				margin-top: 10px;
			}
		}

		.topic-tag {
			color: #0097ee;
			float: left;
			display: block;
			line-height: 40px;
			margin-top: 2px;
		}
	}
</style>

<template>
	<section rs-view="answer">
		<rx-pull ref="pull"
		         :list="list"
		         :total="total"
		         :down="down"
		         :up="up"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="__handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<div class="pane-ques">
				<rx-card padding>
					<rx-cell :border="false">
						<p slot="header">{{ques.question}}</p>
						<q-status :row="ques"
						          :is-topic="topic==='1'"></q-status>
					</rx-cell>
				</rx-card>
			</div>
			<div class="separate"></div>
			<rx-card class="pane-answer"
			         padding="b">
				<a-detail-v2 :row="answer"
				             :is-topic="topic === '1'"
				             ref="readyCmp"></a-detail-v2>
			</rx-card>
			<div class="separate"></div>
			<comment-pane :total="total"
			              :list="list"
			              :zan="answer.supportCount"
			              :is-show-zan="topic!=='1'"
			              @on-empty-click="handleCommentEmptyClick">
				<comment-item ref="items"
				              v-for="(comment,index) in list"
				              :key="index"
				              :item="comment"
				              @on-zan="handleZan"></comment-item>
			</comment-pane>
		</rx-pull>
	</section>
</template>
<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	import IM from "~m/__qa-im";
	export default {
		name: "PageOfAnswer",
		asyncListenCmps: "DetailOfAV2,ItemOfComment",
		components: {
			ADetailV2: () =>
				import(/* webpackChunkName:"wc-detail_of_a_v2" */ "~c/qa/detail_of_a_v2.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "PageOfAnswer")
				),
			QStatus: () =>
				import(/* webpackChunkName:"wc-status_of_q_v2" */ "~c/qa/status_of_q_v2.vue").then(
					utils.asyncCmp.solution
				),
			CommentPane: () =>
				import(/* webpackChunkName:"wc-pane_of_comment" */ "~c/__common/comment/pane.vue").then(
					utils.asyncCmp.solution
				),
			CommentItem: () =>
				import(/* webpackChunkName:"wc-item_of_comment" */ "~c/__common/comment/item.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "PageOfAnswer")
				)
		},
		mixins: [Pull, IM],
		data() {
			return {
				list: [],
				total: 0,
				page: 1,
				ques: {},
				answer: {}
			};
		},
		methods: {
			async __fetchQ() {
				const [err, resp] = await this.$sync(
					this.$http.qa.getQuesDetail({ questionId: this.qid })
				);

				if (!err) {
					this.ques = resp.result.question;
				}
			},
			async __fetchA() {
				const params = {
					questionId: this.qid,
					answerId: this.aid
				};
				const [err, resp] = await this.$sync(
					this.$http.qa.getAnswerDetail(params)
				);

				if (
					err ||
					!resp.result ||
					!resp.result.list ||
					!resp.result.list.length
				) {
					return;
				}

				const answer = resp.result.list[0];
				if (!answer) return;
				this.commentCount = answer.commentCount;
				const answerUser = answer.communityUser || {};
				answer.infoQuestion = this.ques;
				this.answer = answer;
				if (!this.$isDev) {
					JXRSApi.app.qa.refreshAppStatusOfAnswer({
						questionId: this.qid,
						answerId: answer.id,
						commentCount: answer.commentCount,
						supportCount: answer.supportCount,
						isSupported: answer.isSupported ? 1 : 0
					});
					if (
						answer.isAnonymous !== 1 &&
						answerUser.userId !== this.authInfo.userId
					) {
						// H5通知App主动去获取回答用户与当前登录用户的好友状态
						JXRSApi.app.qa.refreshH5IMInfo({
							userIds: [answerUser.userId]
						});
					}
				}
			},
			__fetchComments() {
				this.page = 1;
				this.pageSize = 10;
				return this.$http.qa
					.getAnswerComments({
						answerId: this.aid,
						page: this.page,
						pageSize: this.pageSize
					})
					.then(resp => {
						this.total = resp.result.sumCount;
						this.list = this.__convertComments(
							resp.result.infoComments
						);
						this.isPrerender = false;
					});
			},
			__fetch() {
				return Promise.all([this.__fetchQ(), this.__fetchA()])
					.then(() => {
						this.$rxUtils.asyncCmp.dataReady.call(this, "DetailOfAV2");
					})
					.then(this.__fetchComments)
					.then(() => {
						this.$rxUtils.asyncCmp.dataReady.call(
							this,
							"ItemOfComment"
						);
					});
			},
			__convertComments(list) {
				const list2 = [];
				list.forEach(item => {
					const user = item.ownUser || {};
					list2.push({
						id: item.id,
						imgPath: user.imgPath,
						sex: user.sex,
						userId: user.userId,
						name: user.userName,
						isSupported: item.supportCount > 0,
						supportNum: item.supportCount,
						text: item.comment,
						time: item.createTime
					});
				});
				return list2;
			},
			__append() {
				this.$http.qa
					.getAnswerComments({
						answerId: this.aid,
						page: ++this.page,
						pageSize: this.pageSize
					})
					.then(resp => {
						if (
							resp.result.infoComments &&
							resp.result.infoComments.length
						) {
							this.list = this.list.concat(
								this.__convertComments(resp.result.infoComments)
							);
						}
					});
			},
			handleCommentEmptyClick() {
				const params = {
					qid: this.qid,
					aid: this.aid
				};
				if (this.$isDev) {
					alert("通知App唤起评论原生面板");
				} else {
					JXRSApi.app.qa.doComment(params);
				}
			},
			__getRealUrlOfImg(img) {
				if (
					img.hasAttribute("data-src") &&
					this.$rxUtils.isInClientView(img)
				) {
					img.setAttribute("src", img.getAttribute("data-src"));
					img.removeAttribute("data-src");
				}
			},
			__loadLazyImgs() {
				let imgs = document.querySelectorAll("img[data-src]");
				if (imgs && imgs.length) {
					imgs = Array.prototype.slice.call(imgs);
					imgs.forEach((img, index) => {
						this.__getRealUrlOfImg(img);
					});
				}
			},
			__handleScrollEnd(pos) {
				this.handleScrollEnd(pos);
				this.__loadLazyImgs();
			},
			__bindInteractionOfApp() {
				// 注册交互事件
				if (!this.$isDev) {
					// APP与H5的交互: APP端点赞或取消点赞成功后通知H5刷新点赞状态栏
					JXRSApi.on("app.qa.updateZanStatusOfH5", ({ zan }) => {
						zan = parseInt(zan, 10);
						if (zan === 1) {
							this.answer.isSupported = true;
							this.answer.supportCount =
								(this.answer.supportCount || 0) + 1;
						} else {
							this.answer.isSupported = false;
							this.answer.supportCount +=
								this.answer.supportCount > 0 ? -1 : 0;
						}
					})
						.on("app.qa.refreshComment", () => {
							setTimeout(() => {
								this.__fetchComments().then(() => {
									this.commentAnchor = this.$refs.comment.$el.getBoundingClientRect().top;
								});
							}, 450);
						})
						.on("app.qa.scrollToComment", () => {
							this.__scrollToComment();
						})
						.on("app.qa.refreshIMStatus", ({ userStatus }) => {
							if (userStatus && userStatus.length) {
								const kv = userStatus[0];
								for (const userId in kv) {
									this.$refs.readyCmp.$emit(
										"fn.refreshUserIMStatus",
										kv[userId]
									);
								}
							}
						});
				}
			},
			handleZan(comment) {
				const params = { commentId: comment.id };
				if (comment.isSupported) {
					// 取消点赞
					this.$http.qa.cancelZanAnswerComment(params).then(() => {
						comment.isSupported = false;
						comment.supportNum += comment.supportNum > 0 ? -1 : 0;
					});
				} else {
					// 点赞评论
					this.$http.qa.zanAnswerComment(params).then(() => {
						comment.isSupported = true;
						comment.supportNum += 1;
					});
				}
			}
		},
		created() {
			this.getQS("qid", "aid", "topic");
			this.__bindInteractionOfApp();
			this.$rxUtils.asyncCmp
				.ready(this, "DetailOfAV2", cmp => {
					this.$nextTick(() => {
						cmp.broadcast("RxImg", "fn.load");
						cmp.broadcast("RxReadMore", "fn.showOrHide");
					});
				})
				.ready(this, "ItemOfComment", cmp => {
					this.__getRealUrlOfImg(cmp.$refs.img);
				});
			return this.__fetch();
		}
	};
</script>



