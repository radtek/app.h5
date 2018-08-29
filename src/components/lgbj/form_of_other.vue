<template>
	<rx-form :label-width="140"
	         label-suffix="">
		<rx-form-item label="专业特长"
		              block>
			<div class="rs-select"
			     @click="specialityPopupVisible=true">
				<input type="text"
				       readonly
				       placeholder="请输入专业特长"
				       :value="specialStr" />
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
		              block>
			<div class="rs-select"
			     @click="hobbyPopupVisible=true">
				<input type="text"
				       readonly
				       placeholder="请输入兴趣爱好"
				       :value="hobbyStr" />
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
				hobbyStr: "",
				specialStr: "",
				specialityPopupVisible: false,
				hobbyPopupVisible: false,
				hobbies: [],
				specials: []
			};
		},
		methods: {
			handlePopupItemClick(moduleName, item) {
				item.active = !item.active;

				const propName =
					moduleName === "hobbies" ? "hobbyStr" : "specialStr";

				if (item.active) {
					this[propName] += item.name + ",";
				} else {
					this[propName] = this[propName].replace(item.name + ",", "");
				}
			},
			handlePopupSure(moduleName) {
				console.log(moduleName);
				if (moduleName === "hobbies") {
					this.hobbyPopupVisible = false;
				} else {
					this.specialityPopupVisible = false;
				}

				if (this.specialStr && this.hobbyStr) {
					this.info.hobbyAndSpeciality = (
						this.specialStr.substring(0, this.specialStr.length - 1) +
						"," +
						this.hobbyStr.substring(0, this.hobbyStr.length - 1)
					).split(",");
				}
			}
		},
		created() {
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

