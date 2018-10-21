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
			margin-top: 120px;
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
</style>

<template>
	<section rs-view="exam.index"
	         class="bg">
		<rx-header v-show="loginMode"
		           @back="handleBack"></rx-header>
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
				info: {},
				loading: false,
				formData: {
					mobile: "",
					psw: "",
					userName: "",
					identityId: ""
				}
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
						this.$router.replace({
							path: "/ques",
							query: {
								name: this.info.name,
								taskId: this.taskId,
								userId: data.result.userId,
								testId: data.result.testId
							}
						});
					})
					.catch(err => {
						this.loading = false;
						this.$alert(err.msg || err.message);
					});
			},
			handleBack() {
				if (this.loading) return;
				this.formData.mobile = this.formData.psw = "";
				this.formData.userName = this.formData.identityId = "";
				this.loginMode = "";
			}
		},
		created() {
			this.getQS("taskId");
			this.__fetch();
		}
	};
</script>
