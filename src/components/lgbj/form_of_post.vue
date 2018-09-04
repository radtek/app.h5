<template>
	<rx-form :label-width="140"
	         label-suffix="">
		<rx-form-item label="原工作单位"
		              :errmsg="err.workunit"
		              :err-show-in-placeholder="err.workunit==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入原工作单位"
				       v-model="info.workUnit"
				       @change="handleWorkUnitChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="原职务"
		              :errmsg="err.position"
		              :err-show-in-placeholder="err.position==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入原职务"
				       v-model="info.position"
				       @change="handlePostChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="职称">
			<div class="rs-select"
			     @click="titleActionIsVisible=true">
				<input type="text"
				       placeholder="请输入职称"
				       readonly
				       :value="info.title" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-actionsheet :actions="titleActions"
			                :close-on-click-modal="false"
			                v-model="titleActionIsVisible">
			</mt-actionsheet>
		</rx-form-item>
		<rx-form-item label="政治面貌">
			<div class="rs-select"
			     @click="politicalActionIsVisible=true">
				<input type="text"
				       placeholder="请输入政治面貌"
				       readonly
				       :value="info.political" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-actionsheet :actions="politicalActions"
			                :close-on-click-modal="false"
			                v-model="politicalActionIsVisible">
			</mt-actionsheet>
		</rx-form-item>
		<rx-form-item label="入党时间"
		              :required="false">
			<div class="rs-select"
			     @click="handleTimeClick('joinTime')">
				<input type="text"
				       placeholder="未入党可不填"
				       readonly
				       :value="__convertDate('joinTimeVal','joinTime')" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-datetime-picker ref="joinTimePicker"
			                    type="date"
			                    :start-date="new Date('1921-01-01')"
			                    year-format="{value} 年"
			                    month-format="{value} 月"
			                    date-format="{value} 日"
			                    v-model="info.joinTimeVal">
			</mt-datetime-picker>
		</rx-form-item>
		<rx-form-item label="党组织关系所在支部"
		              block
		              :required="info.political === '中共党员'"
		              :errmsg="err.unitName"
		              :err-show-in-placeholder="err.unitName==='ERR_REQUIRED'">
			<div class="rs-input">
				<input type="text"
				       placeholder="请输入党组织关系所在支部"
				       v-model="info.unitNameReal"
				       @change="handleUnitNameChange" />
			</div>
		</rx-form-item>
		<rx-form-item label="党组织关系所在地"
		              block
		              :required="info.political === '中共党员'">
			<div class="rs-select"
			     @click="unitNameAddressActionIsVisible=true">
				<input type="text"
				       placeholder="请选择党组织关系所在地"
				       readonly
				       v-model="info.unitNameAddress" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-actionsheet :actions="unitNameAddressActions"
			                :close-on-click-modal="false"
			                v-model="unitNameAddressActionIsVisible">
			</mt-actionsheet>
		</rx-form-item>
		<rx-form-item label="家庭地址"
		              block>
			<div class="rs-select"
			     @click="addressPickerIsVisible=true">
				<input type="text"
				       readonly
				       placeholder="请选择家庭地址"
				       :value="(info.street||'') + (info.community||'')" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-picker class="address-picker"
			           :slots="addressSlots"
			           @change="onAddressChange"
			           show-toolbar
			           v-show="addressPickerIsVisible">
				<rx-row>
					<rx-col>
						<rx-btn type="info"
						        @on-click="addressPickerIsVisible=false">取消</rx-btn>
					</rx-col>
					<rx-col>
						<span>家庭住址</span>
					</rx-col>
					<rx-col>
						<rx-btn type="primary"
						        @on-click="handleAddressSure">确认</rx-btn>
					</rx-col>
				</rx-row>
			</mt-picker>
		</rx-form-item>
		<rx-form-item label="参加常规型党支部名称"
		              block>
			<div class="rs-select"
			     @click="handleUnitShow">
				<input type="text"
				       readonly
				       :placeholder="unitPlaceholder"
				       :value="info.unitName" />
				<i class="rx-icon icon-loading rx-looping"
				   v-if="unitLoading"></i>
				<i class="rs-select-icon"
				   v-else></i>
			</div>
			<mt-picker class="address-picker"
			           :slots="unitSlots"
			           show-toolbar
			           @change="onUnitChange"
			           v-show="unitPickerIsVisible">
				<rx-row>
					<rx-col>
						<rx-btn type="info"
						        @on-click="unitPickerIsVisible=false">取消</rx-btn>
					</rx-col>
					<rx-col>
						<span>社区党组织部</span>
					</rx-col>
					<rx-col>
						<rx-btn type="primary"
						        @on-click="handleUnitSure">确认</rx-btn>
					</rx-col>
				</rx-row>
			</mt-picker>
		</rx-form-item>
	</rx-form>
</template>

<script>
	import lgbjMixin from "~m/__lgbj";
	export default {
		name: "FormOfPost",
		components: {
			RsTabRadio: () =>
				import(/* webpackChunkName:"wc-lgbj-tab-radio" */ "~c/lgbj/tab-radio.vue")
		},
		mixins: [lgbjMixin],
		data() {
			return {
				unitPlaceholder: "请先选择家庭住址",
				unitLoading: false,
				currentUnits: [],
				unitPickerIsVisible: false,
				unitSlots: [],
				addressPickerIsVisible: false,
				addressSlots: [],
				unitNameAddressActionIsVisible: false,
				unitNameAddressActions: [
					{
						name: "本区",
						method: () => {
							this.info.unitNameAddress = "本区";
						}
					},
					{
						name: "外区",
						method: () => {
							this.info.unitNameAddress = "外区";
						}
					},
					{
						name: "外省市",
						method: () => {
							this.info.unitNameAddress = "外省市";
						}
					}
				],
				titleActionIsVisible: false,
				titleActions: [
					{
						name: "初级",
						method: () => {
							this.info.title = "初级";
						}
					},
					{
						name: "中级",
						method: () => {
							this.info.title = "中级";
						}
					},
					{
						name: "副高级",
						method: () => {
							this.info.title = "副高级";
						}
					},
					{
						name: "高级",
						method: () => {
							this.info.title = "高级";
						}
					}
				],
				politicalActionIsVisible: false,
				politicalActions: []
			};
		},
		methods: {
			handleUnitShow() {
				if (this.unitSlots && this.unitSlots.length) {
					this.unitPickerIsVisible = true;
				}
			},
			handleWorkUnitChange() {
				this.err.workunit = this.info.workUnit ? "" : "ERR_REQUIRED";
			},
			handlePostChange() {
				this.err.position = this.info.position ? "" : "ERR_REQUIRED";
			},
			handleUnitNameChange() {
				if (this.info.political === "中共党员") {
					this.err.unitName = this.info.unitNameReal
						? ""
						: "ERR_REQUIRED";
				} else {
					this.err.unitName = "";
				}
			},
			onAddressChange(picker, values) {
				this.info.street = values[0];
				if (values[0]) {
					this.$http.lgbj
						.getCommunityByStreet({
							street: values[0]
						})
						.then(data => {
							picker.setSlotValues(1, data.result);
							this.info.community = data.result[1];
						});
					this.info.unitName = "";
				}
			},
			onUnitChange(picker, values) {
				if (values && values.length && values[0]) {
					this.info.unitName = values[0];
				}
			},
			handleUnitSure() {
				if (!this.info.unitName) {
					this.info.unitName = this.unitSlots[0].values[0];
				}

				const selectedUnit = this.currentUnits.filter(
					it => it.unitName === this.info.unitName
				);

				if (selectedUnit && selectedUnit.length) {
					this.info.unitId = selectedUnit[0].unitId;
				}

				this.unitPickerIsVisible = false;
			},
			handleAddressSure() {
				if (!this.info.street || !this.info.community) {
					this.info.street = this.addressSlots[0].values[0];
					this.info.community = this.addressSlots[2].values[0];
				}

				this.unitLoading = true;

				this.$http.lgbj
					.getUnitsByCommunity({
						community: this.info.community
					})
					.then(data => {
						this.currentUnits = data.result.units;
						this.unitLoading = false;
						this.unitSlots = [
							{
								className: "slot1",
								flex: 1,
								textAlign: "center",
								valueIndex: 0,
								values: data.result.units.map(it => it.unitName)
							}
						];
						this.addressPickerIsVisible = false;
					})
					.catch(err => {
						this.unitLoading = false;
						this.$toast(
							this.$isDev
								? err.msg || err.message
								: "获取该社区组织信息失败"
						);
					});
			}
		},
		created() {
			this.$on("fn.updateUnitSlots", () => {
				this.handleAddressSure();
			});

			this.$http.lgbj.getPoliticalList().then(data => {
				if (data.result && data.result.length) {
					this.politicalActions = data.result.map(it => {
						return {
							name: it.name,
							method: () => {
								this.info.political = it.name;
							}
						};
					});
				}
			});

			this.$http.lgbj.getStreetList().then(data => {
				if (data.result && data.result.length) {
					const values = data.result;

					this.$http.lgbj
						.getCommunityByStreet({
							street: values[0]
						})
						.then(data2 => {
							this.addressSlots = [
								{
									className: "slot1",
									flex: 1,
									textAlign: "center",
									valueIndex: 0,
									values
								},
								{
									className: "slot2",
									content: "-",
									divider: true
								},
								{
									className: "slot3",
									flex: 1,
									textAlign: "center",
									valueIndex: 1,
									values: data2.result
								}
							];
						});
				}
			});
		}
	};
</script>

