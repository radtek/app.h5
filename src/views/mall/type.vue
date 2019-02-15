<template>
	<div>
		<rx-cell :title="item.title"
				 v-for="(item,index) in rows"
				 :key="index">
			<div v-for="(list1,index2) in item.list1"
				 :key="index2"
				 class=type-div>
				<input type="radio"
					   ref="radio"
					   :id="list1"
					   @click="getValue1(list1)"
					   class="type-radio"
					   :name="item.title"
					   :value="list1">
				<label :for="list1"
					   class="type-label"
				>{{list1}}
				</label>
			</div>
			<div v-for="(list2,index2) in item.list2"
				 :key="index2"
				 class=type-div>
				<input type="radio"
					   ref="radio"
					   :id="list2"
					   @click="getValue2(list2)"
					   class="type-radio"
					   :name="item.title"
					   :value="list2">
				<label :for="list2"
					   class="type-label"
				>{{list2}}
				</label>
			</div>
			<div v-for="(list3,index2) in item.list3"
				 :key="index2"
				 class=type-div>
				<input type="radio"
					   ref="radio"
					   :id="list3"
					   @click="getValue3(list3)"
					   class="type-radio"
					   :name="item.title"
					   :value="list3">
				<label :for="list3"
					   class="type-label"
				>{{list3}}
				</label>
			</div>
		</rx-cell>
		<div class="type-button"
			 @click="goBack"><span>确定</span>
		</div>
		<toast :text="toast_text" :showToast="showToast"></toast>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isActive: [],
				toast_text: "",
				showToast: false,
				rows: [
					{
						title: "尺码",
						list1: ["S", "M", "L", "XL", "XXL"]
					},
					{
						title: "颜色",
						list2: ["红色", "黄色", "蓝白色", "卡其色", "驼粉色", "橙黄色", "精灵白"]
					},
					{
						title: "套餐类型",
						list3: ["官方默认套餐", "自选套餐二", "豪华精选套餐"]
					}
				],
				item: [],
				newList:[],
				list1:'',
				list2:'',
				list3:''
			};
		},
		components: {
			toast: () =>
				import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
		},
		methods: {
			toast() {
				const self = this;
				this.showToast = true;
				setTimeout(function() {
					self.showToast = false;
				}, 2000);
			},
			getValue1(list1) {
				this.list1=list1
			},
			getValue2(list2) {
				this.list2=list2
			},
			getValue3(list3) {
				this.list3=list3
			},
			goBack() {
				this.newList=[]
				this.newList.push(this.list1,this.list2,this.list3)
				console.log(this.newList)
				if(this.list1===''){
					this.toast_text = "请选择尺码";
					this.toast();
				}else if(this.list2===''){
					this.toast_text = "请选择颜色";
					this.toast();
				}else if(this.list3===''){
					this.toast_text = "请选择套餐类型";
					this.toast();
				}else if(this.list1!==''&&this.list2!==''&&this.list3!==''){
					this.$router.push({
						path:'/details',
						query:{
							newList:this.newList
						}
					})
				}
				
			}
		},
		created() {
		}
	};
</script>

<style lang="scss">
	.rx-cell {
		padding-left: 30px;
		padding-top: 18px;
		.type-div {
			display: inline-block;
		}
		.type-radio {
			position: absolute;
			clip: rect(0px, 0px, 0px, 0px);
		}
		.type-label {
			text-align: center;
			display: inline-block;
			min-width: 100px;
			height: 50px;
			background: rgba(245, 245, 245, 1);
			border-radius: 8px;
			font-size: 24px;
			font-family: "PingFang-SC-Medium";
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 48px;
			margin: 10px 12px;
			padding: 0 28px;
			border: 1px solid white;
		}
		input[type=radio]:checked + label {
			background: rgba(237, 247, 253, 1);
			border: 1px solid rgba(0, 151, 238, 1);
		}
	}

	.type-button {
		width: 100%;
		height: 98px;
		text-align: center;
		line-height: 98px;
		background: rgba(0, 151, 238, 1);
		position: absolute;
		bottom: 0;
		span {
			font-size: 32px;
			font-family: "PingFang-SC-Bold";
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}
	}
</style>
