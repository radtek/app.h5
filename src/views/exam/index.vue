<style lang="scss">
  @import "../../assets/modules/exam/exam.scss";
  [rs-view="exam.index"] {
  	.container {
  		position: relative;
  		width: 100%;
  		height: 100%;

  		.title {
  			color: #fff;
  			font-size: 48px;
  			padding-top: 74px;
  			line-height: 1.5;
  			text-align: center;
  			text-overflow: ellipsis;
  			overflow-y: hidden;
  			white-space: nowrap;
  		}

  		.exam-rule {
  			margin: 80px 72px 44px 72px;
  		}
  	}

  	.btns {
  		position: relative;
  		width: 100%;
  		text-align: center;
  		margin-top: 100px;
  	}

  	.inputs {
  		padding: 0 70px 40px 70px;

  		~ .btns {
  			margin-top: 0;
  		}
  	}

  	.rx-btn {
  		&.dj {
  			padding: 0 40px;
  		}
  		&.other {
  			padding: 0 180px;
  		}
  	}
  }
  @import "../../assets/modules/exam/exam.rslt.media.scss";
</style>

<template>
  <section rs-view="exam.index"
           class="bg"
           ref="main">
    <rx-header v-show="needBack && loginMode"
               @back="handleBack">
    </rx-header>
    <div class="container">
      <div class="title">
        {{info.name}}
      </div>
      <exam-rule :item="info"></exam-rule>
      <div class="inputs"
           v-if="state === 3 && loginMode">
        <template v-if="loginMode==='dj'">
          <input type="tel"
                 placeholder="请输入手机号"
                 maxlength="11"
                 v-model="formData.mobile" />
          <input type="password"
                 placeholder="请输入密码"
                 v-model="formData.psw" />
        </template>
        <template v-else>
          <input type="text"
                 placeholder="请输入姓名"
                 v-model="formData.userName" />
          <input type="tel"
                 placeholder="请输入手机号/学号/工号"
                 v-model="formData.identityId" />
        </template>
      </div>
      <div class="btns">
        <rx-btn v-if="state === 2"
                type="primary">等待开始</rx-btn>
        <rx-btn v-else-if="state === 1"
                type="primary"
                class="finished">考试结束</rx-btn>
        <template v-else>
          <template v-if="!loginMode">
            <rx-btn type="primary"
                    class="dj"
                    @on-click="loginMode='dj'">登录智慧党建账号以党员身份答题</rx-btn>
            <rx-btn type="primary"
                    class="other"
                    @on-click="loginMode='other'">非党员身份答题</rx-btn>
          </template>
          <template v-else>
            <rx-btn type="primary"
                    :loading="loading"
                    @on-click="handleClick">开始答题</rx-btn>
          </template>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  	name: "ExamIndex",
  	components: {
  		examRule: () =>
  			import(/* webpackChunkName:"wc.exam.rule" */ "~c/exam/rule.vue")
  	},
  	data() {
  		return {
  			taskId: "",
  			loginMode: "",
  			needBack: true,
  			info: {},
  			loading: false,
  			formData: {
  				mobile: "",
  				psw: "",
  				userName: "",
  				identityId: ""
  			},
  			originHeight: "",
  			testHeight: ""
  		};
  	},
  	computed: {
  		state() {
  			const now = new Date().getTime();
  			if (parseInt(this.info.startTime, 10) > now) {
  				// 未开始
  				return 2;
  			}
  			if (parseInt(this.info.endTime, 10) <= now) {
  				// 已结束
  				return 1;
  			}
  			return 3;
  		}
  	},
  	methods: {
  		__fetch() {
  			return this.$http.exam
  				.getDetail({
  					taskId: this.taskId,
  					userId: this.authInfo.userId
  				})
  				.then(data => {
  					this.info = data.introduction;
  					if (this.info.titleRange === 1) {
  						this.needBack = false;
  						this.loginMode = "dj";
  					}
  				});
  		},
  		handleClick() {
  			if (this.loading) return;

  			this.loading = true;

  			// 先执行登录请求
  			let isValid = true;
  			if (this.loginMode === "dj") {
  				if (!this.formData.mobile) {
  					isValid = false;
  					this.$alert("请输入手机号");
  				}
  				if (!this.formData.psw) {
  					isValid = false;
  					this.$alert("请输入密码");
  				}
  			} else {
  				if (!this.formData.userName) {
  					isValid = false;
  					this.$alert("请输入姓名");
  				}
  				if (!this.formData.identityId) {
  					isValid = false;
  					this.$alert("请输入手机号/学号/工号");
  				}
  			}

  			if (!isValid) return (this.loading = false);

  			const option = {
  				titleTaskId: this.taskId,
  				loginType: 2,
  				answerType: this.info.answerType || 1
  			};

  			if (this.loginMode === "dj") {
  				option.type = 1;
  				option.userPhonenumber = this.formData.mobile;
  				option.passwd = this.formData.psw;
  			} else {
  				option.type = 2;
  				option.userName = this.formData.userName;
  				option.identityId = this.formData.identityId;
  			}

  			return this.$http.exam
  				.login(option)
  				.then(data => {
  					this.loading = false;
  					const query = {
  						type: this.loginMode === "dj" ? 1 : 2, // 登录用户的身份类型
  						atype: this.info.answerType, // 考试次数
  						ltype: 2, // 考试登录类型 1.手机免登录 2.链接
  						name: this.info.name,
  						taskId: this.taskId,
  						userId: data.result.userId,
  						testId: data.result.testId
  					};

  					if (this.loginMode === "dj") {
  						query.act = option.userPhonenumber;
  						query.pwd = option.passwd;
  					} else {
  						query.act = option.userName;
  						query.pwd = option.identityId;
  					}

  					if (data.result.hasAnswer) {
  						this.$router.replace({ path: "/result", query });
  					} else {
  						this.$router.replace({ path: "/ques", query });
  					}
  				})
  				.catch(err => {
  					this.loading = false;
  					this.$alert(err.msg || err.message).then(() => {
  						if (err.code === "63") {
  							this.formData.mobile = this.formData.psw = "";
  							this.loginMode = "other";
  						}
  					});
  				});
  		},
  		handleBack() {
  			if (this.loading) return;
  			this.formData.mobile = this.formData.psw = "";
  			this.formData.userName = this.formData.identityId = "";
  			this.loginMode = "";
  		},
  		resizeHnd() {
  			this.testHeight = document.body.scrollHeight;
  			if (document.body.scrollHeight !== this.originHeight) {
  				document.body.style.height = this.originHeight + "px";
  			} else {
  				document.body.style.height = "100%";
  			}
  		}
  	},
  	created() {
  		this.getQS("taskId");
  		this.__fetch();
  	},
  	mounted() {
  		this.originHeight = document.body.scrollHeight;
  		window.addEventListener("resize", this.resizeHnd);
  	},
  	beforeDestroy() {
  		window.removeEventListener("resize", this.resizeHnd);
  	}
  };
</script>
