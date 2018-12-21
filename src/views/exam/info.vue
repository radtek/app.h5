<style lang="scss">
  @import "../../assets/modules/exam/exam.scss";
  [rs-view="exam.info"] {
  	.container {
  		position: relative;
  		width: 100%;
  		height: 100%;

  		.title {
  			color: #fff;
  			font-size: 48px;
  			padding-top: 139px;
  			line-height: 1;
  			text-align: center;
  		}

  		.exam-rule {
  			margin: 156px 72px 44px 72px;
  		}
  	}

  	.btns {
  		position: relative;
  		width: 100%;
  		text-align: center;
  		margin-top: 157px;
  	}

  	.inputs {
  		padding: 0 70px 40px 70px;
  	}
  }
</style>

<template>
  <section rs-view="exam.info"
           class="bg">
    <rx-header @back="handleBack"
               show-right>
      <i class="rx-icon icon-share"
         slot="right"
         @click.stop="handleShare"></i>
    </rx-header>
    <div class="container">
      <div class="title">
        {{info.name}}
      </div>
      <exam-rule :item="info"></exam-rule>
      <div class="btns">
        <template v-if="state === 1">
          <rx-btn type="primary"
                  class="finished">考试结束</rx-btn>
        </template>
        <rx-btn v-else-if="state === 2"
                type="primary">等待开始</rx-btn>
        <template v-else>
          <rx-btn v-if="isin === '1'"
                  type="primary"
                  class="finished"
                  :loading="loading"
                  @on-click="handleInFinshedTask">{{loading?"获取结果中...":"点击查看结果"}}</rx-btn>
          <rx-btn v-else
                  type="primary"
                  :loading="loading"
                  @on-click="handleClick">{{loading?"获取答卷中...":"开始答题"}}</rx-btn>
        </template>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
  	name: "ExamInfo",
  	components: {
  		examRule: () =>
  			import(/* webpackChunkName:"wc.exam.rule" */ "~c/exam/rule.vue")
  	},
  	data() {
  		return {
  			taskId: "",
  			isin: "",
  			info: {},
  			loading: false
  		};
  	},
  	computed: {
  		state() {
  			const now = new Date().getTime();
  			if (parseInt(this.info.startTime, 10) > now) {
  				return 2;
  			}
  			if (parseInt(this.info.endTime, 10) <= now) {
  				return 1;
  			}
  			return 3;
  		}
  	},
  	methods: {
  		__doLogin() {
  			const option = {
  				titleTaskId: this.taskId,
  				type: 1,
  				loginType: 1,
  				answerType: this.info.answerType,
  				userId: this.authInfo.userId
  			};
  			return this.$http.exam.login(option);
  		},
  		__fetch() {
  			return this.$http.exam
  				.getDetail({
  					taskId: this.taskId,
  					userId: this.authInfo.userId
  				})
  				.then(data => {
  					this.info = data.introduction;
  				});
  		},
  		handleBack() {
  			this.$router.back();

  			setTimeout(() => {
  				if (!this.$isDev) {
  					JXRSApi.view.close();
  				}
  			}, 50);
  		},
  		handleClick() {
  			if (this.loading) return;
  			this.loading = true;
  			this.__doLogin()
  				.then(data => {
  					this.loading = false;
  					this.$router.push({
  						path: "/ques",
  						query: {
  							ltype: 1,
  							atype: this.info.answerType,
  							name: this.info.name,
  							testId: data.result.testId,
  							taskId: this.taskId,
  							userId: this.authInfo.userId
  						}
  					});
  				})
  				.catch(() => {
  					this.$toast.text("获取答卷失败", "bottom");
  					this.loading = false;
  				});
  		},
  		handleInFinshedTask() {
  			if (this.loading) return;
  			this.loading = true;
  			this.__doLogin()
  				.then(data => {
  					this.loading = false;

  					const query = {
  						ltype: 1,
  						atype: this.info.answerType,
  						name: this.info.name,
  						testId: data.result.testId,
  						taskId: this.taskId,
  						userId: this.userId
  					};

  					this.$router.push({
  						path: data.result.hasAnswer ? "/result" : "/ques",
  						query
  					});
  				})
  				.catch(err => {
  					this.loading = false;
  					if (err.code === "64" || err.msg === "已完成答题") {
  						this.$router.push({
  							path: "/result",
  							query: {
  								ltype: 1,
  								atype: this.info.answerType,
  								name: this.info.name,
  								testId: err.result.testId,
  								taskId: this.taskId,
  								userId: this.userId
  							}
  						});
  					} else {
  						this.$toast.text("获取结果失败", "bottom");
  					}
  				});
  		},
  		handleShare() {
  			const url = `${window.location.origin}/exam/login?taskId=${
  				this.taskId
  			}`;
  			if (!this.$isDev) {
  				JXRSApi.app.exam.share({ url });
  			} else {
  				alert(url);
  			}
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

  		this.getQS("taskId", "userId", "isin");
  		this.__fetch();
  	}
  };
</script>

