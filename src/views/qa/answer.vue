<style lang="sass">
@import "../../assets/modules/qa/view-answer_detail.scss"
</style>

<template>
	<section rs-view="answer">
		<rx-pull ref="pull"
		         :down="down"
		         :up="up"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<div class="pane-ques">
				<rx-card padding>
					<rx-cell :border="false">
						<p slot="header">{{ques.question}}</p>
						<q-status :row="ques"></q-status>
					</rx-cell>
				</rx-card>
			</div>
			<div class="separate"></div>
			<rx-card class="pane-answer"
			         padding="b">
				<rx-cell :border="false">
					<template slot="header">
						<user :user-info="answerUser"
						      :padding="false"></user>
					</template>
					<div v-html="answer.answer"></div>
					<template slot="img">
						<rx-row :flex="false"
						        :gutter="8">
							<template v-if="answer.imgPath && answer.imgPath.length"
							          v-for="(img,index) in answer.imgPath">
								<rx-col :span="__getColSpan(answer.imgPath)"
								        :key="index">
									<rx-img :src="img"
									        @on-error="onImgErr"></rx-img>
								</rx-col>
							</template>
						</rx-row>
					</template>
				</rx-cell>
			</rx-card>
			<div class="separate"></div>
			<comment-pane :total="total"
			              :list="list"
			              @on-empty-click="handleCommentEmptyClick">
				<comment-item ref="items"
				              v-for="(comment,index) in list"
				              :key="index"
				              :item="comment"></comment-item>
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
		components: {
			QStatus: () =>
				import(/* webpackChunkName:"wc-status_of_q_v2" */ "~c/qa/status_of_q_v2.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			CommentPane: () =>
				import(/* webpackChunkName:"wc-pane_of_comment" */ "~c/__common/comment/pane.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			CommentItem: () =>
				import(/* webpackChunkName:"wc-item_of_comment" */ "~c/__common/comment/item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull, IM],
		data() {
			return {
				list: [],
				total: 0,
				page: 1,
				ques: {},
				answer: {},
				answerUser: {}
			};
		},
		methods: {
			__getColSpan(imgArr) {
				return imgArr && imgArr.length ? 24 / imgArr.length : 24;
			},
			__fetchQ() {
				return this.$http.qa
					.getQuesDetail({ questionId: this.qid })
					.then(resp => {
						this.ques = resp.result.question;
					});
			},
			__fetchA() {
				const params = {
					questionId: this.qid,
					answerId: this.aid,
					type: 2
				};

				return this.$http.qa.getAnswers(params).then(resp => {
					const answer = resp.result.list[0];
					if (answer) {
						this.commentCount = answer.commentCount;
						this.answerUser = answer.communityUser || {};
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
								this.answerUser.userId !== this.authInfo.userId
							) {
								// H5通知App主动去获取回答用户与当前登录用户的好友状态
								JXRSApi.app.qa.refreshH5IMInfo({
									userIds: [this.answerUser.userId]
								});
							}
						}
					}
				});
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
						const list = resp.result.infoComments;
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
						this.list = list2;
						this.isPrerender = false;
					});
			},
			__fetch() {
				return Promise.all([this.__fetchQ(), this.__fetchA()]).then(() =>
					this.__fetchComments());
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
							this.list = this.list.concat(resp.result.infoComments);
						}
					});
			},
			handleCommentEmptyClick() {
				// 通知App唤起评论
				if (!this.$isDev) {
				}
			}
		},
		created() {
			this.getQS("qid", "aid");

			// 注册交互事件
			if (!this.$isDev) {
				// APP与H5的交互: APP端点赞或取消点赞成功后通知H5刷新点赞状态栏
				JXRSApi.on("app.qa.updateZanStatusOfH5", ({ zan }) => {
					zan = parseInt(zan, 10);
					if (zan === 1) {
						this.answer.isSupported = true;
						this.answer.supportCount += 1;
					} else {
						this.answer.isSupported = false;
						this.answer.supportCount +=
							this.answer.supportCount > 0 ? -1 : 0;
					}
				})
					.on("app.qa.refreshComment", () => {
						this.__fetchComments().then(() => {
							this.commentAnchor = this.$refs.comment.$el.getBoundingClientRect().top;
						});
					})
					.on("app.qa.scrollToComment", () => {
						this.__scrollToComment();
					})
					.on("app.qa.refreshIMStatus", ({ userStatus }) => {
						if (userStatus || userStatus.length) {
							userStatus.forEach(info => {
								for (const key in info) {
									if (this.answerUser.userId === key) {
										this.addStatus =
											info[key] === 1 || info[key] === "1"
												? 2
												: 0;
										this.isAdding = false;
									}
								}
							});
						}
					});
			}

			this.__fetch();
		}
	};
</script>



