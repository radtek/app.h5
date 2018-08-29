<style lang="sass">
@import "../../../src/assets/modules/lgbj/form-item.scss"
</style>

<template>
	<rx-form :label-width="123"
	         label-suffix="">
		<rx-form-item label="姓名">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入姓名"
				       v-model="info.userName" />
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
		<rx-form-item label="手机号">
			<div class="rs-input">
				<input type="tel"
				       placeholder="请输入手机号"
				       v-model="info.mobileNumber" />
			</div>
		</rx-form-item>
		<rx-form-item label="家庭联系人电话">
			<div class="rs-input">
				<input type="tel"
				       placeholder="请输入家庭联系人电话"
				       v-model="info.familyPhone" />
			</div>
		</rx-form-item>
		<rx-form-item label="身份证号">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入身份证号"
				       v-model="info.userIdCard" />
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

