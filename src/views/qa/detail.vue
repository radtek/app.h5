<style lang="scss">
	@import "../../assets/modules/qa/view-question_detail.scss";
	[rs-view="detail"] {
		.rx-cell-avatar.p {
			padding: 15px 30px 0 30px;
		}
		.rx-cell-header {
			padding-bottom: 0;
			padding-top: 5px;
		}
		.rx-cell-imgs {
			margin-top: 10px;
		}

		.empty-wrap {
			padding: 61px 0 81px 0;
			color: #666;
			font-size: 30px;
			text-align: center;

			.rx-icon {
				color: #0091f5;
				font-size: 46px;
			}

			p {
				padding-top: 27px;
			}
		}
	}
</style>

<template>
	<section rs-view="detail">
		<rx-pull ref="pull"
		         :list="list"
		         :total="total"
		         :down="down"
		         :up="up"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<div class="pane-ques">
				<user :user-info="userInfo"
				      ref="user"></user>
				<q-detail :row="question"></q-detail>
			</div>
			<div class="separate"></div>
			<rx-card v-if="total>0"
			         class="pane-answer"
			         padding="b">
				<a-detail v-for="(answer,index) in list"
				          :key="index"
				          :question="question"
				          :row="answer"
				          ref="asw">
				</a-detail>
			</rx-card>
			<div v-else
			     class="empty-wrap"
			     @click.stop="gotoNative('撰写回答','createAnswer',{questionId:qid,title:question.question})">
				暂无回答，点击添加靠谱回答
			</div>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "PageOfDetail",
		asyncListenCmps: "DetailOfQ,DetailOfA",
		components: {
			User: () =>
				import(/* webpackChunkName:"wc-user" */ "~c/qa/user.vue").then(
					utils.asyncCmp.solution
				),
			QDetail: () =>
				import(/* webpackChunkName:"wc-detail_of_q" */ "~c/qa/detail_of_q.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "PageOfDetail")
				),
			ADetail: () =>
				import(/* webpackChunkName:"wc-detail_of_a" */ "~c/qa/detail_of_a.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "PageOfDetail")
				)
		},
		mixins: [Pull],
		data() {
			return {
				list: [],
				total: 0,
				page: 1,
				question: {},
				userInfo: {},
				isShowUsers: true,
				userIds: [],
				readyACount: 0,
				userStatus: []
			};
		},
		watch: {
			readyACount(val) {
				if (val === this.list.length && this.userStatus.length) {
					this.__refreshIMStatus();
				}
			}
		},
		methods: {
			__fetchQ() {
				return this.$http.qa
					.getQuesDetail({ questionId: this.qid })
					.then(resp => {
						const question = resp.result.question;
						if (question) {
							let userInfo;
							if (question.isAnonymous === 1) {
								userInfo = {
									userName: "匿名",
									imgPath: this.$DEFAULT_AVATAR,
									isAnonymous: 1
								};
							} else {
								userInfo = question.communityUser;
							}
							this.userInfo = userInfo;
							if (!this.$isDev) {
								JXRSApi.app.qa.refreshAppStatusOfQuesCollect({
									isCollect: resp.result.isCollected,
									questionId: this.qid,
									questionTitle: question.question
								});
							}
						}
						this.question = question;
						this.isPrerenderQues = false;
					});
			},
			__fetchAnswers() {
				this.page = 1;
				return this.$http.qa
					.getAnswers({ questionId: this.qid })
					.then(resp => {
						const answers = resp.result.list;
						if (answers) {
							this.total = resp.result.count;
							this.list = answers;
						} else {
							this.total = 0;
							this.list = [];
						}
					});
			},
			__fetch() {
				const userIds = [];
				this.__fetchQ().then(() => {
					this.$rxUtils.asyncCmp.dataReady.call(this, "DetailOfQ");

					if (
						this.userInfo.anonymous !== 1 &&
						this.userInfo.userId !== this.authInfo.userId
					) {
						userIds.push(this.userInfo.userId);
					}

					return this.__fetchAnswers().then(() => {
						this.list &&
							this.list.length &&
							this.list.forEach(item => {
								if (
									item.isAnonymous === 0 &&
									item.communityUser &&
									item.communityUser.userId !==
										this.authInfo.userId
								) {
									userIds.push(item.communityUser.userId);
								}
							});
						this.userIds = userIds;
						if (!this.$isDev) {
							JXRSApi.app.qa.refreshH5IMInfo({ userIds });
						}
						this.$rxUtils.asyncCmp.dataReady.call(this, "DetailOfA");
					});
				});
			},
			__append() {
				return this.$http.qa
					.getAnswers({
						questionId: this.qid,
						page: ++this.page
					})
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							this.list = this.list.concat(list);

							const userIds = [];
							this.list.forEach(item => {
								if (
									item.isAnonymous === 0 &&
									item.communityUser &&
									item.communityUser.userId !==
										this.authInfo.userId
								) {
									userIds.push(item.communityUser.userId);
								}
							});
							this.userIds = userIds;
							if (!this.$isDev) {
								JXRSApi.app.qa.refreshH5IMInfo({ userIds });
							}

							this.$rxUtils.asyncCmp.dataReady.call(
								this,
								"DetailOfA"
							);
						}
					});
			},
			__asyncReadyCallback(cmp) {
				this.$nextTick(() => {
					cmp.broadcast("RxImg", "fn.load");
					cmp.broadcast("RxReadMore", "fn.showOrHide");
				});
			},
			__refreshIMStatus() {
				// 先移除问题详情用户的干扰

				let realLen = 0;

				this.userStatus.forEach((item, index) => {
					for (const userId in item) {
						if (index === 0) {
							this.$refs.user.$emit(
								"fn.refresh",
								userId,
								item[userId]
							);
							this.userIds.shift();
							realLen = this.list.length - this.userIds.length;
							continue;
						}
						this.$refs.asw[realLen + index - 1].$emit(
							"fn.refreshUserIMStatus",
							item[userId]
						);
					}
				});
			}
		},
		created() {
			this.getQS("qid");

			if (!this.$isDev) {
				// App原生通知H5更新回答的相关状态的数目
				JXRSApi.on(
					"app.qa.refreshAnswerStatusCount",
					({ id, status, count }) => {
						if (this.list && this.list.length) {
							const list = this.list;

							let prop = "";

							switch (status) {
								case "click":
									prop = "clickCount";
									break;
								case "comment":
									prop = "commentCount";
									break;
								case "support":
									prop = "supportCount";
									break;
								default:
									break;
							}
							for (let l = list.length; l--; ) {
								if (list[l].id === id) {
									list[l][prop] =
										(list[l][prop] || 0) + (count || 1);
									if (prop === "supportCount") {
										list[l].isSupported = count > 0;
									}
								}
							}
						}
					}
				)
					.on("app.qa.refreshH5QStatusOfCollect", ({ isOK }) => {
						this.question.collectionCount += isOK ? 1 : -1;
					})
					.on("app.qa.refreshIMStatus", ({ userStatus }) => {
						if (userStatus && userStatus.length) {
							this.userStatus = userStatus;
							if (this.readyACount === this.list.length) {
								this.__refreshIMStatus();
							}
						}
					});
			}

			this.$rxUtils.asyncCmp
				.ready(this, "DetailOfQ", this.__asyncReadyCallback)
				.ready(this, "DetailOfA", cmp => {
					this.__asyncReadyCallback(cmp);
					this.readyACount += 1;
				});

			return this.__fetch();
		}
	};
</script>

