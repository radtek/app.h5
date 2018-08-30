<!-- 老干局创建 -->
<style lang="scss">
	[rs-view="lgbj-create"] {
		background: #f9f9f9;
		.wrap-step {
			padding-top: 40px;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background: #f9f9f9;
			z-index: 100;
			padding-bottom: 70px;
		}

		.wrap-form {
			background-color: #fff;
			margin-top: 186px;
			padding: 30px;
			margin-bottom: 60px;
		}

		.fixed-btns {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 96px;
			line-height: 96px;
			font-size: 32px;
			display: flex;
			z-index: 100;
			.rx-btn {
				height: 96px;
				line-height: 48px;
				vertical-align: middle;
				border: none;
				text-align: center;
				flex: 1;
				border-radius: 0;

				&.disabled {
					background-color: #ccc;
					border-color: #ccc;
				}
			}
		}
		.picker-toolbar {
			height: 80px;
			text-align: center;
		}
		.mint-datetime-action {
			line-height: 80px !important;
			font-size: 35px !important;
		}

		.address-picker {
			position: fixed;
			z-index: 100;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
			z-index: 200;
		}

		.picker-item {
			font-size: 28px;
		}

		.mint-actionsheet-listitem,
		.mint-actionsheet-button {
			height: 80px;
			line-height: 80px;
			color: #666;
			font-size: 28px;
		}
		.rx-btn.plain.primary {
			color: #1f9cfc;
		}
		.mint-popup-bottom {
			width: 100%;
		}

		.rx-card {
			&_header {
				border-bottom: none;
				p.title {
					color: #999;
					font-size: 24px;
					vertical-align: middle;
					.main {
						font-size: 32px;
					}
				}
			}
			&_body {
				padding: 0;
			}
		}

		.popup-limit-content {
			max-height: 800px;
			overflow-x: hidden;
			padding-left: 4px;
			padding-right: 20px;

			h1 {
				color: #333;
				font-size: 28px;
				margin-left: 16px;
			}

			ul > li {
				display: inline-block;
				border-radius: 20px;
				border: 2px solid #ccc;
				line-height: 96px;
				color: #666;
				text-align: center;
				width: 176px;
				margin-left: 16px;
				margin-right: 16px;
				margin-bottom: 20px;
				transition: color 0.2s ease-in-out, border-color 0.2s ease-in-out;

				&.medium {
					width: 250px;
				}

				&.long {
					width: 300px;
				}

				&.active {
					border-color: #1f9cfc;
					color: #1f9cfc;
				}
			}
		}
	}
</style>


<template>
	<section rs-view="lgbj-create">
		<div class="wrap-step">
			<rx-step v-model="currentStep">
				<rx-step-item :step="1"
				              :prev="false"
				              :active="currentStep === 1"
				              :finished="currentStep>1">基本信息</rx-step-item>
				<rx-step-item :step="2"
				              :active="currentStep === 2"
				              :finished="currentStep>2">职务信息</rx-step-item>
				<rx-step-item :step="3"
				              :next="false"
				              :active="currentStep === 3"
				              :finished="currentStep>3">其他信息</rx-step-item>
			</rx-step>
		</div>
		<div class="wrap-form">
			<basic-form :info="formData"
			            :err="err"
			            v-show="currentStep === 1"></basic-form>
			<post-form :info="formData"
			           :err="err"
			           v-show="currentStep === 2"></post-form>
			<other-form :info="formData"
			            :err="err"
			            v-show="currentStep === 3"></other-form>
		</div>
		<div class="fixed-btns">
			<rx-btn v-if="currentStep>1"
			        type="primary"
			        plain
			        @on-click="handlePrevStepClick">上一步</rx-btn>
			<rx-btn :disabled="btnIsDisabled"
			        :type="currentStep === 3 ? 'success':'primary'"
			        @on-click="handleClick">{{buttonText}}</rx-btn>
		</div>
	</section>
</template>

<script>
	export default {
		name: "PageOfCreate",
		components: {
			BasicForm: () =>
				import(/* webpackChunkName:"wc-lgbj-form_of_basic" */ "~c/lgbj/form_of_basic.vue"),
			PostForm: () =>
				import(/* webpackChunkName:"wc-lgbj-form_of_post" */ "~c/lgbj/form_of_post.vue"),
			OtherForm: () =>
				import(/* webpackChunkName:"wc-lgbj-form_of_other" */ "~c/lgbj/form_of_other.vue")
		},
		data() {
			return {
				currentStep: 1,
				formData: {
					userName: "",
					sex: 0,
					birthday: "",
					mobileNumber: "",
					familyPhone: "",
					userIdCard: "",
					educationName: "",
					health: "",
					retire: 1,
					retireTime: "",
					workUnit: "",
					position: "",
					title: "",
					political: "",
					street: "",
					community: "",
					unitId: "",
					hobbyAndSpeciality: null
				},
				err: {
					username: "",
					mobile: "",
					phone: "",
					idcard: ""
				},
				keys: [
					[
						"userName",
						"sex",
						"birthday",
						"mobileNumber",
						"familyPhone",
						"userIdCard",
						"educationName",
						"health",
						"retire",
						"retireTime"
					],
					[
						"workUnit",
						"position",
						"title",
						"political",
						"street",
						"community",
						"unitId"
					],
					["hobbyAndSpeciality"]
				]
			};
		},
		computed: {
			buttonText() {
				if (!this.__validIsFinished()) {
					return "部分信息未填写";
				}
				return this.currentStep === 3 ? "填写完成并提交" : "下一步";
			},
			btnIsDisabled() {
				return !this.__validIsFinished();
			}
		},
		watch: {
			currentStep(val) {
				if (val === 3) {
					this.$nextTick(() => {
						this.broadcast("FormOfOther", "fn.updateHobbyAndSpecial", [
							this.formData.specialStr,
							this.formData.hobbyStr
						]);
					});
				}
			}
		},
		methods: {
			__validIsFinished() {
				const data = this.formData;
				let isFinished = true;
				let hasErr = false;
				for (const prop in this.err) {
					if (this.err[prop]) {
						hasErr = true;
						break;
					}
				}

				if (!hasErr) {
					for (const key in data) {
						if (
							this.keys[this.currentStep - 1].includes(key) &&
							(data[key] === "" ||
								data[key] === null ||
								data[key] === undefined)
						) {
							isFinished = false;
							break;
						}
					}
				}
				return hasErr ? false : isFinished;
			},
			handlePrevStepClick() {
				this.currentStep -= 1;
				window.scrollTo(0, 0);
			},
			handleClick() {
				if (this.currentStep < 3) {
					this.currentStep += 1;
					window.scrollTo(0, 0);
				} else {
					if (this.userId) {
						this.formData.oldUserId = this.userId;
					}
					this.$http.lgbj
						.register(this.formData)
						.then(data => {
							this.$router.push({
								path: "/user-info",
								query: {
									userId: data.result.userId,
									success: 1,
									edit: 1
								}
							});
						})
						.catch(err => {
							this.$toast.text(this.$isProd ? "注册失败" : err.msg);
						});
				}
			}
		},
		activated() {
			this.getQS("userId");
			if (this.userId) {
				this.$http.lgbj
					.getUserInfo({
						userId: this.userId
					})
					.then(data => {
						this.formData = data.result.userDetails;

						if (
							this.formData.retire === "1" ||
							this.formData.retire === "离休"
						) {
							this.formData.retire = 1;
						} else if (
							this.formData.retire === "2" ||
							this.formData.retire === "退休"
						) {
							this.formData.retire = 2;
						}

						this.formData.birth = this.formData.birthday;
						this.formData.retireTimeVal = this.formData.retireTime;
						this.formData.educationName = this.formData.education;

						this.formData.joinTimeVal = this.formData.joinTime;

						this.formData.hobbyStr = this.formData.hobby;
						this.formData.specialStr = this.formData.speciality;
					});
			}
		}
	};
</script>

