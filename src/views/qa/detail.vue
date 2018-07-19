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
			<div class="pane-question">

			</div>
			<div class="pane-answer">
				<template v-if="total>0">
					<answer-item v-for="(answer,index) in list"
					             :key="index"
					             :row="answer">
					</answer-item>
				</template>
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
			answerItem: () =>
				import(/* webpackChunkName:"wc-item_of_a" */ "~c/qa/item_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		data() {
			return {
				list: [],
				total: 0,
				page: 1
			};
		},
		methods: {
			__fetchQDetail() {
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

							if (this.$isProd || this.$isTest) {
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

			__fetch() {
				// 获取问题详情
				// 获取回答列表
			},
			__append() {}
		},
		created() {}
	};
</script>

