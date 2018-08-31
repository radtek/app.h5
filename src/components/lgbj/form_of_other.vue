<template>
	<rx-form :label-width="140"
	         label-suffix="">
		<rx-form-item label="专业特长"
		              block
		              :errmsg="err.special"
		              :err-show-in-placeholder="err.special==='ERR_REQUIRED'">
			<div class="rs-select"
			     @click="specialityPopupVisible=true">
				<input type="text"
				       readonly
				       placeholder="请输入专业特长"
				       :value="__removeComma(info.specialStr)" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-popup v-model="specialityPopupVisible"
			          position="bottom"
			          :close-on-click-modal="false"
			          popup-transition="popup-fade">
				<rx-card>
					<template slot="header">
						<rx-row>
							<rx-col :span="16">
								<p class="title">
									<span class="main">专业特长</span>
									<span>（可多选）</span>
								</p>
							</rx-col>
							<rx-col :span="8"
							        align="right">
								<rx-btn type="primary"
								        @on-click="handlePopupSure">确定</rx-btn>
							</rx-col>
						</rx-row>
					</template>
					<div class="popup-limit-content">
						<div v-for="(item,index) in specials"
						     :key="index">
							<h1>{{item.name}}</h1>
							<ul>
								<li v-for="(it,idx) in item.childs"
								    :key="idx"
								    :class="[{'medium':it.name.length >=6,'long':it.name.length >8,'active':it.active}]"
								    @click="handlePopupItemClick('specials',it)">
									{{it.name}}
								</li>
							</ul>
						</div>
					</div>
				</rx-card>
			</mt-popup>
		</rx-form-item>
		<rx-form-item label="兴趣爱好"
		              block
		              :errmsg="err.hobby"
		              :err-show-in-placeholder="err.hobby==='ERR_REQUIRED'">
			<div class="rs-select"
			     @click="hobbyPopupVisible=true">
				<input type="text"
				       readonly
				       placeholder="请输入兴趣爱好"
				       :value="__removeComma(info.hobbyStr)" />
				<i class="rs-select-icon"></i>
			</div>
			<mt-popup v-model="hobbyPopupVisible"
			          position="bottom"
			          :close-on-click-modal="false"
			          popup-transition="popup-fade">
				<rx-card>
					<template slot="header">
						<rx-row>
							<rx-col :span="16">
								<p class="title">
									<span class="main">兴趣爱好</span>
									<span>（可多选）</span>
								</p>
							</rx-col>
							<rx-col :span="8"
							        align="right">
								<rx-btn type="primary"
								        @on-click="handlePopupSure('hobbies')">确定</rx-btn>
							</rx-col>
						</rx-row>
					</template>
					<div class="popup-limit-content">
						<div v-for="(item,index) in hobbies"
						     :key="index">
							<h1>{{item.name}}</h1>
							<ul>
								<li v-for="(it,idx) in item.childs"
								    :key="idx"
								    :class="[{'medium':it.name.length >=6,'long':it.name.length >8,'active':it.active}]"
								    @click="handlePopupItemClick('hobbies',it)">
									{{it.name}}
								</li>
							</ul>
						</div>
					</div>
				</rx-card>
			</mt-popup>
		</rx-form-item>
		<rx-form-item label="您的荣誉称号"
		              block
		              :required="false">
			<div class="rs-textarea">
				<textarea placeholder="请输入您的荣誉称号"
				          v-model="info.honor"
				          :rows="4" />
			</div>
		</rx-form-item>
		<rx-form-item label="愿意参加何种志愿活动"
		              block
		              :required="false">
			<div class="rs-textarea">
				<textarea placeholder="请输入愿意参加何种志愿活动"
				          v-model="info.activityIntention"
				          :rows="4" />
			</div>
		</rx-form-item>
		<rx-form-item label="您想要获得哪方面的关心服务"
		              block
		              :required="false">
			<div class="rs-textarea">
				<textarea placeholder="请输入您想要获得哪方面的关心服务"
				          v-model="info.service"
				          :rows="4" />
			</div>
		</rx-form-item>
	</rx-form>
</template>

<script>
	import lgbjMixin from "~m/__lgbj";
	export default {
		name: "FormOfOther",
		components: {
			RsTabRadio: () =>
				import(/* webpackChunkName:"wc-lgbj-tab-radio" */ "~c/lgbj/tab-radio.vue")
		},
		mixins: [lgbjMixin],
		data() {
			return {
				specialityPopupVisible: false,
				hobbyPopupVisible: false,
				hobbies: [],
				specials: []
			};
		},
		methods: {
			__removeComma(str) {
				return str ? str.replace(/(^,)|(,$)/, "") : "";
			},
			handlePopupItemClick(moduleName, item) {
				item.active = !item.active;

				const propName =
					moduleName === "hobbies" ? "hobbyStr" : "specialStr";

				const str = this.info[propName] || (this.info[propName] = "");

				if (item.active) {
					this.info[propName] += item.name + ",";
				} else {
					this.info[propName] = str.replace(item.name + ",", "");
				}
			},
			handlePopupSure(moduleName) {
				if (moduleName === "hobbies") {
					this.hobbyPopupVisible = false;
					this.err.hobby = this.info.hobbyStr ? "" : "ERR_REQUIRED";
				} else {
					this.specialityPopupVisible = false;
					this.err.special = this.info.specialStr ? "" : "ERR_REQUIRED";
				}

				if (this.info.specialStr && this.info.hobbyStr) {
					this.info.hobbyAndSpeciality = (
						this.info.specialStr.substring(
							0,
							this.info.specialStr.length - 1
						) +
						"," +
						this.info.hobbyStr.substring(
							0,
							this.info.hobbyStr.length - 1
						)
					).split(",");
				}
			}
		},
		created() {
			this.$on("fn.updateHobbyAndSpecial", (specialStr, hobbyStr) => {
				const arrs = specialStr.split(",");
				this.specials.forEach(it => {
					it.childs.forEach(item => {
						if (arrs.includes(item.name)) {
							item.active = true;
						}
					});
				});

				const arrs2 = hobbyStr.split(",");
				this.hobbies.forEach(it => {
					it.childs.forEach(item => {
						if (arrs2.includes(item.name)) {
							item.active = true;
						}
					});
				});
			});

			this.$http.lgbj.getSpecialList().then(data => {
				const kv = {};
				if (data && data.result) {
					data.result.forEach(it => {
						it.active = false;
						if (kv[it.type]) {
							kv[it.type].childs.push(it);
						} else {
							kv[it.type] = {
								type: it.type,
								name: it.type === 1 ? "文化知识" : "专业技术",
								childs: [it]
							};
						}
					});
				}

				for (const key in kv) {
					kv[key].childs.sort((a, b) => {
						return a.name.length < b.name.length ? -1 : 1;
					});

					this.specials.push(kv[key]);
				}
			});

			this.$http.lgbj.getHobbyList().then(data => {
				const kv = {};
				if (data && data.result) {
					data.result.forEach(it => {
						it.active = false;
						if (kv[it.type]) {
							kv[it.type].childs.push(it);
						} else {
							kv[it.type] = {
								type: it.type,
								name:
									it.type === 1
										? "技能知识"
										: it.type === 2
											? "娱乐休闲"
											: "活动教育",
								childs: [it]
							};
						}
					});
				}

				for (const key in kv) {
					kv[key].childs.sort((a, b) => {
						return a.name.length < b.name.length ? -1 : 1;
					});

					this.hobbies.push(kv[key]);
				}
			});
		}
	};
</script>

