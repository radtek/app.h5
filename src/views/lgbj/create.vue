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
			padding-bottom: 30px;
		}

		.wrap-form {
			background-color: #fff;
			margin-top: 146px;
			padding: 30px;
			margin-bottom: 60px;
			padding-bottom: 90px;
			padding-top: 15px;
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
				border: 1px solid #ccc;
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
			        :loading="loading"
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
				loading: false,
				currentStep: 1,
				formData: {
					userName: "",
					sex: 0,
					birth: new Date("1950-01-01"),
					birthday: "1950-01",
					mobileNumber: "",
					familyPhone: "",
					userIdCard: "",
					educationName: "",
					health: "",
					retire: 1,
					retireTime: "2000-01-01",
					retireTimeVal: new Date("2000-01-01"),
					workUnit: "",
					position: "",
					title: "",
					political: "",
					street: "",
					community: "",
					unitId: "",
					joinTime: "1970-01-01",
					joinTimeVal: new Date("1970-01-01"),
					hobbyAndSpeciality: null
				},
				err: {
					username: "",
					mobile: "",
					phone: "",
					idcard: "",
					workunit: "",
					position: "",
					title: "",
					unitName: "",
					hobby: "",
					special: ""
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
				return this.currentStep === 3
					? this.loading
						? "信息提交中..."
						: "填写完成并提交"
					: "下一步";
			},
			btnIsDisabled() {
				return !this.__validIsFinished();
			}
		},
		watch: {
			currentStep(val) {
				if (this.userId) {
					if (val === 3) {
						this.$nextTick(() => {
							this.broadcast(
								"FormOfOther",
								"fn.updateHobbyAndSpecial",
								[this.formData.specialStr, this.formData.hobbyStr]
							);
						});
					} else if (val === 2) {
						this.$nextTick(() => {
							this.broadcast("FormOfPost", "fn.updateUnitSlots");
						});
					}
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

				if (!hasErr && this.currentStep === 2) {
					if (this.formData.political === "中共党员") {
						hasErr =
							!this.formData.unitNameReal ||
							!this.formData.unitNameAddress;
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
					this.formData.birthday = this.formData.birth;
					if (this.userId) {
						this.formData.oldUserId = this.userId;
					}
					this.loading = true;
					this.$http.lgbj
						.register(this.formData)
						.then(data => {
							this.loading = false;
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
							console.log && console.log(err);
							this.loading = false;
							this.$toast.text(
								this.$isProd
									? "提交失败"
									: err.msg || err.message || "提交失败"
							);
						});
				}
			}
		},
		activated() {
			this.getQS("userId");
			this.currentStep = 1;
			window.scrollTo(0, 0);
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

						this.formData.joinTimeVal = this.formData.joinTime;

						this.formData.hobbyStr = this.formData.hobby + ",";
						this.formData.specialStr = this.formData.speciality + ",";

						this.formData.hobbyAndSpeciality = (
							this.formData.hobby +
							"," +
							this.formData.speciality
						).split(",");
					});
			}
		}
	};
</script>

