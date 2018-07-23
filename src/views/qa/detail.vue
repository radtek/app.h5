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
				<user :user-info="userInfo"></user>
				<q-detail :row="question"></q-detail>
			</div>
			<div class="separate"></div>
			<div class="pane-users">
				<rx-card header="邀请他人回答问题"
				         class="card-users"
				         v-show="isShowUsers && userInfo.anonymous!==1"
				         padding="h">
					<im-users :is-add="false"
					          :question-id="qid"
					          :unit-id="userInfo.unitId"
					          @on-empty="isShowUsers=false"
					          @on-show="isShowUsers=true"></im-users>
				</rx-card>
			</div>
			<div class="separate"></div>
			<rx-card v-if="total>0"
			         class="pane-answer"
			         padding="b">
				<a-detail v-for="(answer,index) in list"
				          :key="index"
				          :question="question"
				          :row="answer">
				</a-detail>
			</rx-card>
			<div v-else
			     class="empty"
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
		components: {
			User: () =>
				import(/* webpackChunkName:"wc-user" */ "~c/qa/user.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			QDetail: () =>
				import(/* webpackChunkName:"wc-detail_of_q" */ "~c/qa/detail_of_q.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			ADetail: () =>
				import(/* webpackChunkName:"wc-detail_of_a" */ "~c/qa/detail_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			ImUsers: () =>
				import(/* webpackChunkName:"wc-im_users" */ "~c/qa/im_users.vue").then(
					utils.fixAsyncCmpLifeCycle
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
				isShowUsers: true
			};
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
				// 获取问题详情
				// 获取回答列表
				this.__fetchQ().then(() => {
					setTimeout(() => {
						this.broadcast("ImUsers", "fn.fetch");
					}, 300);
				});
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

