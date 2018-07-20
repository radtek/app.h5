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
			<div class="pane-answer">
				<rx-cell :border="false">
					<template slot="header">
						<rx-cell-avatar action-position="top"
						                :avatar="answer.isAnonymous === 1 ? $DEFAULT_AVATAR : answerUser.imgPath"
						                @on-avatar-err="onImgErr($event,true)">
							<h2 slot="header">{{answer.isAnonymous === 1 ? '匿名' : answerUser.userName}}</h2>
							<span v-if="answer.isAnonymous !== 1 && answerUser.unitName">{{answerUser.unitName}}</span>
							<rx-btn slot="rightAction"
							        v-if="answer.isAnonymous!==1 && answerUser.userId !== this.authInfo.userId"
							        :loading="isAdding"
							        :type="addStatus === 2 ? 'info': 'primary'"
							        :plain="addStatus === 1 || addStatus === 2"
							        :icon="addStatus === 0 ? 'plus' : ''">{{friendText}}</rx-btn>
						</rx-cell-avatar>
					</template>
					<div v-html="answer.answer"></div>
					<template slot="footer">
					</template>
				</rx-cell>
			</div>
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
						answer.overStatus = -1;
						if (answer.answer && answer.answer.length > 100) {
							answer.overStatus = 1;
							answer.simpleContent =
								answer.answer.substring(0, 100) + "...";
						}
						this.commentCount = answer.commentCount;
						this.isPrerenderAnswer = false;
						this.answerUser = answer.communityUser || {};
						this.answer = answer;
						if (this.$isProd || this.$isTest) {
							JXRSApi.app.qa.refreshAppStatusOfAnswer({
								questionId: this.qid,
								answerId: answer.id,
								commentCount: answer.commentCount,
								supportCount: answer.supportCount,
								isSupported: answer.isSupported ? 1 : 0
							});

							if (
								answer.isAnonymous !== 1 &&
								answer.communityUser &&
								answer.communityUser.userId !== this.AuthInfo.userId
							) {
								// H5通知App主动去获取回答用户与当前登录用户的好友状态
								JXRSApi.app.qa.refreshH5IMInfo({
									userIds: [answer.communityUser.userId]
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
			__append() {},
			handleCommentEmptyClick() {}
		},
		created() {
			this.getQS("qid", "aid");
			this.__fetch();
		}
	};
</script>



