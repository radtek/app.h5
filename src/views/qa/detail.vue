<template>
	<section rs-view="detail">
		<rx-pull ref="pull"
		         :down="down"
		         :up="up"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<div class="pane-ques">

			</div>
			<div class="pane-answer">
				<template v-if="total>0">
					<item v-for="(answer,index) in list"
					      :key="index"
					      :row="answer">
					</item>
				</template>
			</div>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	import IM from "~m/__qa-im";
	export default {
		name: "PageOfDetail",
		components: {
			QStatus: () =>
				import(/* webpackChunkName:"wc-status_of_q" */ "~c/qa/status_of_q.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_a" */ "~c/qa/item_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			AStatus: () =>
				import(/* webpackChunkName:"wc-status_of_a" */ "~c/qa/status_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			AStatusV2: () =>
				import(/* webpackChunkName:"wc-status_of_a_v2" */ "~c/qa/status_of_a_v2.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			ImUsers: () =>
				import(/* webpackChunkName:"wc-im_users" */ "~c/qa/im_users.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull, IM],
		data() {
			return {
				list: [],
				total: 0,
				page: 1
			};
		},
		methods: {
			__fetchQ() {
				return this.$http.qa
					.getQuesDetail({ questionId: this.qid })
					.then(resp => {
						const question = resp.result.question;
						if (question) {
							question.overStatus = -1;
							if (
								question.description &&
								question.description.length > 50
							) {
								question.overStatus = 1;
								question.simpleContent =
									question.description.substring(0, 50) + "...";
							}
							let userInfo;
							if (question.isAnonymous === 1) {
								userInfo = {
									userName: "匿名",
									imgPath: this.$DEFAULT_AVATAR,
									anonymous: 1
								};
							} else {
								userInfo = question.communityUser;
							}
							this.isPrerenderUser = false;
							this.userInfo.user = userInfo;
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
				return this.$http.qa
					.getAnswers({ questionId: this.qid })
					.then(resp => {
						this.isPrerenderAnswer = false;
						const answers = resp.result.list;
						if (answers) {
							this.total = resp.result.count;
							answers.forEach(answer => {
								answer.isAdding = false;
								answer.addStatus = 0;
								answer.overStatus = -1;
								if (answer.answer && answer.answer.length > 100) {
									answer.overStatus = 1;
									answer.simpleContent =
										answer.answer.substring(0, 100) + "...";
								}
							});
						}
						this.list = answers;
					});
			},
			__fetch() {
				// 获取问题详情
				// 获取回答列表
				this.__fetchQ();
				this.__fetchAnswers();
			},
			__append() {
				return this.$http.qa
					.getAnswers({
						questionId: this.qid,
						page: this.page + 1
					})
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							this.list = this.answers.concat(list);
						}
					});
			}
		},
		created() {
			this.getQS("qid");
			this.__fetch();
		}
	};
</script>

