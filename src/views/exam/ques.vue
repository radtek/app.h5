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
		<rx-header @back="handleBack">{{name}}</rx-header>
		<ques-banner :current="current"
		             :total="titles.length"
		             :test-time="restTime"
		             @time-end="handleTimeEnd"></ques-banner>
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
	export default {
		name: "ExamQues",
		components: {
			QuesBanner: () =>
				import(/* webpackChunkName:"wc.exam.ques.banner" */ "~c/exam/ques-banner.vue"),
			QuesItem: () =>
				import(/* webpackChunkName:"wc.exam.ques.item" */ "~c/exam/ques-item.vue")
		},
		data() {
			return {
				current: 1,
				currentInfo: { selected: [] },
				restTime: "",
				titles: [],
				taskId: "",
				testId: "",
				name: "",
				ltype: "",
				atype: "",
				type: "",
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
						this.titles = data.titleList
							? data.titleList.map(it => ({
									id: it,
									submited: false
							  }))
							: [];
						return this.__fetchQues(
							this.titles[0].id,
							(this.current = 1) - 1
						);
					})
					.catch(() => {
						this.restTime = 60;
						return this.__fetchQues(
							this.titles[0],
							(this.current = 1) - 1
						);
					});
			},
			__fetchAllSubmitedQues() {
				return this.$http.exam
					.getAllSubmitQues({
						userId: this.userId,
						taskId: this.taskId
					})
					.then(data => {
						if (!data.data || !data.data.length) return;
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
						titleId
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
					})
					.catch(() => {
						this.$toast.text("问题详情获取失败", "top");
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
						"您的答题还未全部填写完, 是否确认离开?"
					).then(done => {
						// 更新当前答题
						done();
						this.$confirm.close();
						this.$router.back();
					});
				}
			},
			handleGotoPrev() {
				this.current -= 1;
				this.currentInfo = this.titles[this.current - 1];
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
					return this.__toNext();
				}

				if (this.loading) return;
				this.loading = true;

				this.__doSubmit()
					.then(() => {
						this.loading = false;
						this.__toNext();
					})
					.catch(() => {
						this.loading = false;
						this.$alert("提交当前问题答案失败");
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
							this.$router.push({
								path: "/result",
								query: {
									ltype: this.ltype,
									atype: this.atype,
									type: this.type,
									name: this.name,
									userId: this.userId,
									taskId: this.taskId,
									testId: this.testId
								}
							});
						})
						.catch(() => {
							done();
							this.$confirm.close();
							this.$toast.text("提交失败", "bottom");
						});
				});
			},
			handleTimeEnd() {
				// 提交当前题目的答案
				return this.__doSubmit()
					.then(() => {
						return this.$router.push({
							path: "/result",
							query: {
								ltype: this.ltype,
								atype: this.atype,
								type: this.type,
								name: this.name,
								userId: this.userId,
								taskId: this.taskId,
								testId: this.testId
							}
						});
					})
					.catch(() => {
						this.$alert("提交答卷失败");
					});
			}
		},
		created() {
			if (!this.$isDev) {
				JXRSApi.on("app.exam.back", () => {
					this.handleBack();
				});
			}
		},
		activated() {
			if (!this.$isDev) {
				try {
					JXRSApi.app.exam.hideHeader();
				} catch (e) {}
			}

			this.getQS(
				"taskId",
				"testId",
				"userId",
				"name",
				"ltype",
				"atype",
				"type"
			);
			this.name = this.name ? decodeURIComponent(this.name) : "";
			this.__fetchAllQues().then(this.__fetchAllSubmitedQues);
		}
	};
</script>

