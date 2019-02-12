<template>
  <rx-form :label-width="140" label-suffix>
    <rx-form-item :err-show-in-placeholder="err.workunit==='ERR_REQUIRED'" :errmsg="err.workunit" label="原工作单位">
      <div class="rs-input">
        <input @change="handleWorkUnitChange" placeholder="请输入原工作单位" type="text" v-model="info.workUnit">
      </div>
    </rx-form-item>
    <rx-form-item :err-show-in-placeholder="err.position==='ERR_REQUIRED'" :errmsg="err.position" label="原职务">
      <div class="rs-input">
        <input @change="handlePostChange" placeholder="请输入原职务" type="text" v-model="info.position">
      </div>
    </rx-form-item>
    <rx-form-item :required="false" label="职称">
      <div @click="titleActionIsVisible=true" class="rs-select">
        <input :value="info.title" placeholder="请输入职称" readonly type="text">
        <i class="rs-select-icon"></i>
      </div>
      <mt-actionsheet :actions="titleActions" :close-on-click-modal="false" v-model="titleActionIsVisible"></mt-actionsheet>
    </rx-form-item>
    <rx-form-item label="政治面貌">
      <div @click="politicalActionIsVisible=true" class="rs-select">
        <input :value="info.political" placeholder="请输入政治面貌" readonly type="text">
        <i class="rs-select-icon"></i>
      </div>
      <mt-actionsheet :actions="politicalActions" :close-on-click-modal="false" v-model="politicalActionIsVisible"></mt-actionsheet>
    </rx-form-item>
    <rx-form-item :required="false" label="入党时间">
      <div @click="handleTimeClick('joinTime')" class="rs-select">
        <input :value="__convertDate('joinTimeVal','joinTime')" placeholder="未入党可不填" readonly type="text">
        <i class="rs-select-icon"></i>
      </div>
      <mt-datetime-picker
        :start-date="new Date('1921-01-01')"
        date-format="{value} 日"
        month-format="{value} 月"
        ref="joinTimePicker"
        type="date"
        v-model="info.joinTimeVal"
        year-format="{value} 年"
      ></mt-datetime-picker>
    </rx-form-item>
    <rx-form-item
      :err-show-in-placeholder="err.unitName==='ERR_REQUIRED'"
      :errmsg="err.unitName"
      :required="info.political === '中共党员'"
      block
      label="党组织关系所在支部"
    >
      <div class="rs-input">
        <input @change="handleUnitNameChange" placeholder="请输入党组织关系所在支部" type="text" v-model="info.unitNameReal">
      </div>
    </rx-form-item>
    <rx-form-item :required="info.political === '中共党员'" block label="党组织关系所在地">
      <div @click="unitNameAddressActionIsVisible=true" class="rs-select">
        <input placeholder="请选择党组织关系所在地" readonly type="text" v-model="info.unitNameAddress">
        <i class="rs-select-icon"></i>
      </div>
      <mt-actionsheet
        :actions="unitNameAddressActions"
        :close-on-click-modal="false"
        v-model="unitNameAddressActionIsVisible"
      ></mt-actionsheet>
    </rx-form-item>
    <rx-form-item block label="家庭地址">
      <div @click="addressPickerIsVisible=true" class="rs-select">
        <input :value="(info.street||'') + (info.community||'')" placeholder="请选择家庭地址" readonly type="text">
        <i class="rs-select-icon"></i>
      </div>
      <mt-picker
        :slots="addressSlots"
        @change="onAddressChange"
        class="address-picker"
        show-toolbar
        v-show="addressPickerIsVisible"
      >
        <rx-row>
          <rx-col>
            <rx-btn @on-click="addressPickerIsVisible=false" type="info">取消</rx-btn>
          </rx-col>
          <rx-col>
            <span>家庭住址</span>
          </rx-col>
          <rx-col>
            <rx-btn @on-click="handleAddressSure" type="primary">确认</rx-btn>
          </rx-col>
        </rx-row>
      </mt-picker>
    </rx-form-item>
    <rx-form-item block label="参加常规型党支部名称">
      <div @click="handleUnitShow" class="rs-select">
        <input :placeholder="unitPlaceholder" :value="info.unitName" readonly type="text">
        <i class="rx-icon icon-loading rx-looping" v-if="unitLoading"></i>
        <i class="rs-select-icon" v-else></i>
      </div>
      <mt-picker
        :slots="unitSlots"
        @change="onUnitChange"
        class="address-picker"
        show-toolbar
        v-show="unitPickerIsVisible"
      >
        <rx-row>
          <rx-col>
            <rx-btn @on-click="unitPickerIsVisible=false" type="info">取消</rx-btn>
          </rx-col>
          <rx-col>
            <span>社区党组织部</span>
          </rx-col>
          <rx-col>
            <rx-btn @on-click="handleUnitSure" type="primary">确认</rx-btn>
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

  		const streets = [
  			"定海路街道",
  			"大桥街道",
  			"平凉路街道",
  			"江浦路街道",
  			"控江路街道",
  			"延吉新村街道",
  			"长白新村街道",
  			"四平路街道",
  			"殷行街道",
  			"五角场街道",
  			"五角场镇",
  			"新江湾城街道"
  		];

  		this.$http.lgbj
  			.getCommunityByStreet({
  				street: streets[0]
  			})
  			.then(data2 => {
  				this.addressSlots = [
  					{
  						className: "slot1",
  						flex: 1,
  						textAlign: "center",
  						valueIndex: 0,
  						values: streets
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

  		// this.$http.lgbj.getStreetList().then(data => {
  		// 	if (data.result && data.result.length) {
  		// 		const values = data.result;

  		// 		this.$http.lgbj
  		// 			.getCommunityByStreet({
  		// 				street: values[0]
  		// 			})
  		// 			.then(data2 => {
  		// 				this.addressSlots = [
  		// 					{
  		// 						className: "slot1",
  		// 						flex: 1,
  		// 						textAlign: "center",
  		// 						valueIndex: 0,
  		// 						values
  		// 					},
  		// 					{
  		// 						className: "slot2",
  		// 						content: "-",
  		// 						divider: true
  		// 					},
  		// 					{
  		// 						className: "slot3",
  		// 						flex: 1,
  		// 						textAlign: "center",
  		// 						valueIndex: 1,
  		// 						values: data2.result
  		// 					}
  		// 				];
  		// 			});
  		// 	}
  		// });
  	}
  };
</script>

