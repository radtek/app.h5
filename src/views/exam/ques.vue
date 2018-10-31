<style lang="scss">
	@import "../../assets/modules/exam/exam.scss";
	[rs-view="exam.ques"] {
		.container {
			position: relative;
			width: 100%;
			height: 100%;
			padding: 220px 71px 0 71px;
		}
	}
</style>

<template>
	<section rs-view="exam.ques"
	         class="bg">
		<rx-header @back="handleBack">
			{{name}}
		</rx-header>
		<ques-banner :current="current"
		             :total="titles.length"
		             :test-time="restTime"
		             @time-end="handleTimeEnd"
		             @to-card="handleToCard"></ques-banner>
		<div class="container">
			<ques-item :item="currentInfo"
			           :index="current"></ques-item>
		</div>
		<div class="btns fixed">
			<rx-btn type="primary"
			        @on-click="handleGotoPrev"
			        v-if="current>1">上一题</rx-btn>
			<rx-btn type="primary"
			        @on-click="handleGotoNext"
			        v-if="current<titles.length"
			        :loading="loading">{{loading?"提交中...":"下一题"}}</rx-btn>
			<rx-btn type="primary"
			        @on-click="handleSubmit"
			        v-if="current === titles.length"
			        :loading="loading">{{loading?"答卷提交中...":"提交答卷"}}</rx-btn>
		</div>
	</section>
</template>

<script>
	import mixin from "~m/__exam";
	export default {
		name: "ExamQues",
		components: {
			QuesBanner: () =>
				import(/* webpackChunkName:"wc.exam.ques.banner" */ "~c/exam/ques-banner.vue"),
			QuesItem: () =>
				import(/* webpackChunkName:"wc.exam.ques.item" */ "~c/exam/ques-item.vue")
		},
		mixins: [mixin],
		data() {
			return {
				current: 1,
				currentInfo: { selected: [] },
				restTime: "",
				titles: [],
				loading: false
			};
		},
		methods: {
			__fetchAllQues() {
				return this.$http.exam
					.getAllQues({
						userId: this.userId,
						id: this.testId
					})
					.then(data => {
						this.restTime = data.restTime;
						this.titles = data.titleList || [];
						this.titles = this.titles.map(it => ({
							id: it,
							submited: false
						}));
						return this.__fetchQues(
							this.titles[this.current - 1].id,
							this.current - 1
						);
					})
					.catch(err => {
						// TODO: err
					});
			},
			__fetchAllSubmitedQues() {
				return this.$http.exam
					.getAllSubmitQues({
						userId: this.userId,
						taskId: this.taskId,
						testId: this.testId
					})
					.then(data => {
						if (!data.data || !data.data.length) {
							// 清空上次的答案内容
							this.titles.forEach(it => {
								it.selected = [];
							});

							return;
						}
						this.titles.forEach(it => {
							data.data.forEach(item => {
								it.submited = item === it.id;
							});
						});
					});
			},
			__fetchQues(titleId, titleIndex) {
				return this.$http.exam
					.getQuesDetail({
						userId: this.userId,
						taskId: this.taskId,
						titleId,
						testId: this.testId
					})
					.then(data => {
						this.titles[titleIndex] = this.currentInfo = {
							id: titleId,
							title: data.infoTitle.titleContent,
							type: data.infoTitle.titleType,
							score: data.infoTitle.titleScore,
							state: 0,
							selected: data.selectList
								? data.selectList.map(it => it.answerId)
								: [],
							ans: data.anList
						};
					});
			},
			__doSubmit() {
				const index = this.current - 1;
				return this.$http.exam.submit({
					userId: this.userId,
					taskId: this.taskId,
					testId: this.testId,
					titleId: this.titles[index].id,
					answerIds: this.titles[index].selected.join("#")
				});
			},
			handleBack() {
				const noneArrs = this.titles.filter(
					it => !it.selected || !it.selected.length
				);
				if (noneArrs && noneArrs.length) {
					this.$confirm(
						"考试未完成提醒",
						"您的答题还未全部填写完, 会自动认为您提交答卷, 是否确认离开?"
					)
						.then(done => {
							// 提交问卷
							return this.__doSubmit()
								.then(() => {
									done();
									this.$confirm.close();
									this.__gotoResult();
								})
								.catch(() => {
									done();
									this.$confirm.close();
									this.$toast.text("提交失败", "bottom");
								});
						})
						.catch(err => {
							if (err !== false) {
								return false;
							}
						});
				}
			},
			handleGotoPrev() {
				this.current -= 1;
				const quesInfo = this.titles[this.current - 1];
				if (quesInfo.title) {
					this.currentInfo = quesInfo;
				} else {
					return this.__fetchQues(quesInfo.id, this.current - 1);
				}
			},
			__toNext() {
				this.current += 1;
				const quesInfo = this.titles[this.current - 1];
				if (quesInfo.title) {
					// 代表是已经获取过详情的
					this.currentInfo = quesInfo;
				} else {
					return this.__fetchQues(quesInfo.id, this.current - 1);
				}
			},
			handleGotoNext() {
				// 先更新当前题目的答案
				const selected = this.titles[this.current - 1].selected;
				if (!selected || !selected.length) {
					return this.__toNext().catch(err => {
						if (!this.__errHnd(err)) {
							this.$alert("获取下一题内容失败");
						}
					});
				}

				if (this.loading) return;
				this.loading = true;

				this.__doSubmit()
					.then(() => {
						this.loading = false;
						return this.__toNext();
					})
					.catch(err => {
						this.loading = false;
						if (!this.__errHnd(err)) {
							this.$alert("提交当前问题答案失败");
						}
					});
			},
			handleSubmit() {
				this.$confirm({
					title: "提交确认",
					content: "是否确认提交此答卷?",
					yesText: "提交",
					loadingText: "提交中..."
				}).then(done => {
					return this.__doSubmit()
						.then(() => {
							done();
							this.$confirm.close();
							this.__gotoResult();
						})
						.catch(() => {
							done();
							this.$confirm.close();
							this.$toast.text("提交失败", "bottom");
						});
				});
			},
			handleTimeEnd() {
				if (this.$route.path !== "/ques") return;
				this.$alert("考试截止时间已到，稍后系统会自动计算分数。").then(
					() => {
						// // 提交当前题目的答案
						return this.__doSubmit()
							.then(() => {
								this.__gotoResult();
							})
							.catch(err => {
								if (err.code === "70") {
									this.__gotoResult();
								}
							});
					}
				);
			},
			handleToCard() {
				if (this.loading) return;
				this.loading = true;
				this.__doSubmit()
					.then(() => {
						this.loading = false;
						this.$router.push({
							path: "/card",
							query: {
								pwd: this.pwd,
								act: this.act,
								ltype: this.ltype,
								atype: this.atype,
								type: this.type,
								name: this.name,
								userId: this.userId,
								taskId: this.taskId,
								testId: this.testId,
								index: this.current
							}
						});
					})
					.catch(err => {
						this.loading = false;
						if (!this.__errHnd(err)) {
							this.$alert("提交当前问题答案失败");
						}
					});
			},
			__fetch() {
				this.__fetchAllQues().then(this.__fetchAllSubmitedQues);
			}
		},
		activated() {
			this.current = this.index ? parseInt(this.index, 10) : 1;
		}
	};
</script>

