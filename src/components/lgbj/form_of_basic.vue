<style lang="sass">
@import "../../../src/assets/modules/lgbj/form-item.scss"
</style>

<template>
	<rx-form :label-width="140"
	         label-suffix="">
		<rx-form-item label="姓名"
		              :errmsg="err.username"
		              :err-show-in-placeholder="err.username==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入姓名"
				       v-model="info.userName"
				       @change="handleUserNameChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="性别">
			<rs-tab-radio :options="[{label:'男',val:0},{label:'女',val:1}]"
			              v-model="info.sex"></rs-tab-radio>
		</rx-form-item>
		<rx-form-item label="出生年月">
			<div class="rs-select"
			     @click="handleTimeClick('birth')">
				<input type="text"
				       placeholder="请输入出生年月"
				       readonly
				       :value="__convertDate('birth','birthday')" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-datetime-picker ref="birthPicker"
			                    type="date"
			                    :start-date="new Date('1940-01-01')"
			                    year-format="{value} 年"
			                    month-format="{value} 月"
			                    date-format="{value} 日"
			                    v-model="info.birth">
			</mt-datetime-picker>
		</rx-form-item>
		<rx-form-item label="手机号"
		              :errmsg="err.mobile"
		              :err-show-in-placeholder="err.mobile==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="tel"
				       placeholder="请输入手机号"
				       v-model="info.mobileNumber"
				       @change="handleMobileChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="家庭联系人电话"
		              :errmsg="err.phone"
		              :err-show-in-placeholder="err.phone==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="tel"
				       placeholder="请输入家庭联系人电话"
				       v-model="info.familyPhone"
				       @change="handlePhoneChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="身份证号"
		              :errmsg="err.idcard"
		              :err-show-in-placeholder="err.idcard==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入身份证号"
				       v-model="info.userIdCard"
				       @change="handleIdCardChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="学历">
			<div class="rs-select"
			     @click="educationActionIsVisible=true">
				<input type="text"
				       placeholder="请选择学历"
				       readonly
				       :value="info.educationName" />
				<i class="rs-select-icon"></i>
				<mt-actionsheet :actions="educationActions"
				                :close-on-click-modal="false"
				                v-model="educationActionIsVisible">
				</mt-actionsheet>
			</div>
		</rx-form-item>
		<rx-form-item label="身体状况">
			<div class="rs-select"
			     @click="healthActionIsVisible=true">
				<input type="text"
				       placeholder="请选择身体状况"
				       readonly
				       :value="info.health" />
				<i class="rs-select-icon"></i>
				<mt-actionsheet :actions="healthActions"
				                :close-on-click-modal="false"
				                v-model="healthActionIsVisible">
				</mt-actionsheet>
			</div>
		</rx-form-item>
		<rx-form-item label="离(退)休">
			<rs-tab-radio :options="[{label:'离休',val:1},{label:'退休',val:2}]"
			              v-model="info.retire"></rs-tab-radio>
		</rx-form-item>
		<rx-form-item label="离(退)休时间">
			<div class="rs-select"
			     @click="handleTimeClick('retireTime')">
				<input type="text"
				       placeholder="请选择离(退)休时间"
				       :value="__convertDate('retireTimeVal','retireTime')" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-datetime-picker ref="retireTimePicker"
			                    type="date"
			                    year-format="{value} 年"
			                    month-format="{value} 月"
			                    date-format="{value} 日"
			                    v-model="info.retireTimeVal">
			</mt-datetime-picker>
		</rx-form-item>
	</rx-form>
</template>

<script>
	import lgbjMixin from "~m/__lgbj";
	export default {
		name: "FormOfBasic",
		components: {
			RsTabRadio: () =>
				import(/* webpackChunkName:"wc-lgbj-tab-radio" */ "~c/lgbj/tab-radio.vue")
		},
		mixins: [lgbjMixin],
		data() {
			return {
				educationActions: [],
				educationActionIsVisible: false,
				healthActions: [
					{
						name: "良好",
						method: () => {
							this.info.health = "良好";
						}
					},
					{
						name: "一般",
						method: () => {
							this.info.health = "一般";
						}
					},
					{
						name: "较差",
						method: () => {
							this.info.health = "较差";
						}
					}
				],
				healthActionIsVisible: false
			};
		},
		methods: {
			handleUserNameChange() {
				if (!this.info.userName) {
					this.err.username = "ERR_REQUIRED";
				}
			},
			handleMobileChange() {
				if (this.info.mobileNumber) {
					if (!/^[1][0-9]{10}$/.test(this.info.mobileNumber)) {
						this.err.mobile = "手机号格式不正确";
					} else {
						this.err.mobile = "";
					}
				} else {
					this.err.mobile = "ERR_REQUIRED";
				}
			},
			handlePhoneChange() {
				if (this.info.familyPhone) {
					if (!/^[1][0-9]{10}$/.test(this.info.familyPhone)) {
						this.err.phone = "联系人电话格式不正确";
					} else {
						this.err.phone = "";
					}
				} else {
					this.err.phone = "ERR_REQUIRED";
				}
			},
			handleIdCardChange() {
				if (this.info.userIdCard) {
					if (
						!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(
							this.info.userIdCard
						)
					) {
						this.err.idcard = "身份证格式不正确";
					} else {
						this.$http.lgbj
							.validUserIdCard({
								userIdCard: this.info.userIdCard
							})
							.then(data => {
								if (data.result.exist) {
									this.err.idcard =
										"WARN__您已录入此份问卷，后续信息可不用在填写";
								} else {
									this.err.idcard = "";
								}
							});
					}
				} else {
					this.err.idcard = "ERR_REQUIRED";
				}
			}
		},
		created() {
			this.$http.lgbj.getEducationList().then(data => {
				if (data.result && data.result.length) {
					this.educationActions = data.result.map(it => {
						return {
							name: it.name,
							method: () => {
								this.info.educationName = it.name;
								this.info.education = it.id;
							}
						};
					});
				}
			});
		}
	};
</script>

