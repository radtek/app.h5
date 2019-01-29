<template>
    <div>
	   <Header :title="mainTitle" :router="router"></Header>
		<div class="activity-contain">
			<div class="title">活动主题:</div>
			<input placeholder="请输入活动主题" v-model="title">
		</div>
		<div class="activity-contain">
			<div class="title">活动地点:</div>
			<input class="address-input" placeholder="请输入活动地点" v-model="address">
		</div>
		<div class="activity-contain" @click="changeTime">
			<div class="title">活动时间:</div>
			<div class="activity-font" v-if="temp===undefined">请选择活动时间</div>
			<div class="time-contain" v-else>
				<div class="contain">
					<div class="time" v-for="(item,index) in dateTr" :key="index">{{item.week}}{{item.startTime}}</div>
				</div>
					
			</div>
			<img src="@/assets/imgs/police/right.png">
		</div>
		<div class="change">
			<div class="change-contain">
				<div class="change-font">避开假日</div>
				<div class="contain">
					<input id="switch" class="mui-switch mui-switch-animbg" type="checkbox" @click="test">
				</div>
			</div>
			<div class="change-contain">
				<div class="change-font">是否重复</div>
				<div class="contain">
					<input id="switch1" class="mui-switch mui-switch-animbg" type="checkbox" @click="test1">
				</div>
			</div>
		</div>
		<div class="footer-button" >
			<img src="@/assets/imgs/police/but.png" @click="createActivity">
			<div class="but-font" @click="createActivity">创建活动</div>
		</div>
		<toast :text="toast_text" :showToast="showToast"></toast>
	</div>
</template>

<script>
	import { utils } from "~rx";
	import { Indicator } from 'mint-ui';
	export default {
		name: "index",
		created(){},
		//路由进入之前情况输入框
		beforeRouteEnter (to, from, next) {
			if(from.name==='index'){
				next(vm => {
					vm.title=''
					vm.address=''
				})
			}
			if(from.name==='activity-time'){
				next(vm => {
					if(JSON.parse(localStorage.getItem('date'))===[]){
						vm.temp=1
					}
				})
			}
			next()
		},
		beforeRouteLeave(to, from, next) {
			if (to.name === 'index') {
				localStorage.removeItem('date')
			}
			next();
		},
		async	activated(){
			//是否避开假日和是否重复默认为是
			document.getElementById('switch').checked=true
			document.getElementById('switch1').checked=true
			this.temp=this.$route.query.temp
			const [err, res] = await this.$sync(
						this.$http.police.getInfoActivity({})
					);
					if (!err) {
						const infoActivity = res.result.infoActivity
						this.title = infoActivity.subject
						this.address = infoActivity.address
						this.temp = 1;
						this.array = res.result.infoActivityPlanList
						this.dateArr = res.result.infoActivityPlanList.filter(item => item.isEnabled === 1)
						if(JSON.parse(localStorage.getItem('date'))){
							this.dateArr=JSON.parse(localStorage.getItem('date'))
							this.dateTr=this.dateArr.filter(item=>item.isSelect)
							this.dateTr.forEach(item=>item.isEnabled = 1)
							let dateFs=this.dateArr.filter(item=>!item.isSelect)
							dateFs.forEach(item=>item.isEnabled = 0)
							this.dateArr=this.dateTr.concat(dateFs)
							this.dateArr.forEach(item=>item.id='')
							this.dateArr.forEach(item=>item.relationId=1)
							
						}else{
							this.dateTr= res.result.infoActivityPlanList.filter(item => item.isEnabled === 1)
						}
						if(JSON.parse(localStorage.getItem('date'))==''||this.selectAll()===false){
							this.temp = undefined
						}
						if (infoActivity.isNotHoliday === 1) {
							document.getElementById('switch').checked = true
						} else {
							document.getElementById('switch').checked = false
						}
						if (infoActivity.isRepeat === 1) {
							document.getElementById('switch1').checked = true
						} else {
							document.getElementById('switch1').checked = false
						}
					}
			//筛选isSelect为true的对象返回新数组
			// if(this.$route.query.type==='edit'){
			// 	if(this.$route.query.temp!==undefined){
			// 		// this.temp=this.$route.query.temp
			// 		this.date=this.$route.query.temp.filter(item=>item.isSelect)
			// 		this.date.forEach(item=>item.isEnabled = 1)
			// 		const dateArr=[];
			// 		for(let i=0;i<this.date.length;i++){
			// 			var flag = true;
			// 			for(let j=0;j<dateArr.length;j++){
			// 				if(this.date[i].startTime == dateArr[j].startTime){
			// 					flag = false;
			// 				};
			// 			};
			// 			if(flag){
			// 				dateArr.push(this.date[i]);
			// 			};
			// 			this.dateArr=dateArr
			// 		};
			// 		this.dateFs=this.$route.query.temp.filter(item=>!item.isSelect)
			// 		this.dateFs.forEach(item=>item.isEnabled = 0)
			// 		this.sumDate=this.date.concat(this.dateFs)
			// 		this.sumDate.forEach(item=>item.id='')
			// 		this.sumDate.forEach(item=>item.relationId=1)
			// 		//对数组进行去重
			// 		const allArr = [];//新数组
			// 		for(let i=0;i<this.sumDate.length;i++){
			// 			var flag = true;
			// 			for(let j=0;j<allArr.length;j++){
			// 				if(this.sumDate[i].startTime == allArr[j].startTime){
			// 					flag = false;
			// 				};
			// 			};
			// 			if(flag){
			// 				allArr.push(this.sumDate[i]);
			// 			};
			// 		};
			// 		this.allArr=allArr
			// 	}else {
			// 		const [err, res] = await this.$sync(
			// 			this.$http.police.getInfoActivity({})
			// 		);
			// 		if (!err) {
			// 			const	infoActivity=res.result.infoActivity
			// 			this.title=infoActivity.subject
			// 			this.address=infoActivity.address
			// 			this.temp=1;
			// 			this.array=res.result.infoActivityPlanList
			// 			this.dateArr=res.result.infoActivityPlanList.filter(item=>item.isEnabled===1)
			// 			if(infoActivity.isNotHoliday===1){
			// 				document.getElementById('switch').checked=true
			// 			}else {
			// 				document.getElementById('switch').checked=false
			// 			}
			// 			if(infoActivity.isRepeat===1){
			// 				document.getElementById('switch1').checked=true
			// 			}else {
			// 				document.getElementById('switch1').checked=false
			// 			}
			// 		}else {
			// 		}
			// 	}
			// }else{
			// 	if(this.$route.query.temp!==undefined) {
			// 		let newDate=this.$route.query.temp.filter(item => !item.isSelect);
			// 		let date = this.$route.query.temp.filter(item => item.isSelect);
			// 		date.forEach(item => item.isEnabled = 1)
			// 		newDate.forEach(item => item.isEnabled = 0)
			// 		this.allArr=date.concat(newDate)
			// 		this.allArr.forEach(item=>item.id='');	
			// 		this.allArr.forEach(item=>item.relationId=1);
			//		
			// 		const dateArr = [];
			// 		for (let i = 0; i < date.length; i++) {
			// 			var flag = true;
			// 			for (let j = 0; j < dateArr.length; j++) {
			// 				if (date[i].startTime == dateArr[j].startTime) {
			// 					flag = false;
			// 				};
			// 			};
			// 			if (flag) {
			// 				dateArr.push(date[i]);
			// 			};
			// 			this.dateArr = dateArr;
			// 		}
			// 	}
			// }
			//
		},
		components: {
			Header: () =>
				import(/* webpackChunkName:"wc-header" */ "~v/police/__wc__/header/header.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			SwitchBut: () =>
				import(/* webpackChunkName:"wc-switch" */ "~v/police/__wc__/switch/switch.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			toast: () =>
				import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue").then(
					utils.fixAsyncCmpLifeCycle)
		},
		data(){
			return{
				array:[],
				mainTitle:'编辑活动',
				date:[],
				sumDate:[],
				dateFs:[],
				temp:[],
				title:'',
				allArr:[],
				address:'',
				changeNum:1,
				changeNum1:1,
				toast_text: "",
				showToast: false,
				dateArr:[],
				dateTr:[],
				router:'index'
			}
		},
		methods:{
			toast() {
				const self = this;
				this.showToast = true;
				setTimeout(function() {
					self.showToast = false;
				}, 2000);
			},
			selectAll(){
				if(JSON.parse(localStorage.getItem('date'))){
					return JSON.parse(localStorage.getItem('date')).some(item => item.isSelect);
				}
			},
			//节假日
			test(){
				let change=!document.getElementById('switch').checked ? "未选中" : "选中"
				if(change==='选中'){
					this.changeNum=1
				}else{
					this.changeNum=0
				}
			},
			//是否重复
			test1(){
				let change=!document.getElementById('switch1').checked ? "未选中" : "选中"
				if(change==='选中'){
					this.changeNum1=1
				}else{
					this.changeNum1=0
				}
			},
			changeTime(){
				if(this.$route.query.type==='edit'){
					this.$router.push({
						path:'/activity-time',
						query:{
							arr:this.array
						}
					})
				}else {
					this.$router.push({
						path:'/activity-time',
						query:{
							arr:[]
						}
					})
				}
			},
			async  __fetchCreate(){
				Indicator.open({
					text: "创建中..",
					spinnerType: "snake"
				});
				const [err, res] = await this.$sync(
					this.$http.police.editActivity({
						subject:this.title,
						address:this.address,
						isNotHoliday:this.changeNum,
						isRepeat:this.changeNum1,
						infoActivityPlanList:this.dateArr
					})
				);
				if (!err) {
					Indicator.close();
					this.$router.push('/index')
				}else {
					Indicator.close();
					this.toast_text = "创建失败";
					this.toast();
				}
			},
			createActivity(){
				if(this.title===''){
					this.toast_text = "请输入活动主题";
					this.toast();
					return;
				}
				if(this.address===''){
					this.toast_text = "请输入活动地址";
					this.toast();
					return;
				}
				if(this.temp===undefined){
					this.toast_text = "请选择活动时间";
					this.toast();
					return;
				}
				this.__fetchCreate()
			}
		}
	};
</script>

<style lang="scss" scoped>
	.activity-contain{
		display: flex;
		align-items: center;
		height: 131px;
		margin: 0 29px;
		border-bottom: 1px solid rgba(230,230,230,1);
		.address-input{
			display: inline-block;
		}
		.time-contain{
			margin-left: 20px;
			width: 423px;
			.contain{
				.time{
					width: 320px;
					font-size:32px;
					font-family:PingFang-SC-Medium;
					font-weight:500;
					color:rgba(51,51,51,1);
					/*.time:nth-child(even) {*/
						/*padding-left: 61px;*/
					/*}*/
					/*.time:nth-child(3) {*/
						/*margin-top: 10px;*/
					/*}*/
					/*.time:nth-child(4) {*/
						/*margin-top: 10px;*/
					/*}*/
				}
			}
				
			
		}
		
		.title{
			font-size:32px;
			width:190px;
			font-weight:bold;
			font-family:PingFang-SC-Bold;
			color:rgba(102,102,102,1);
		}
		.activity-font{
			width: 450px;
			margin-left: 20px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
		img{
			width: 44px;
			height: 44px;
		}
		input{
			width: 500px;
			margin-left: 20px;
			border: none;
			line-height: 49px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		input::placeholder{
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(153,153,153,1);
		}
	}
	.change{
		height: 131px;
		margin: 0 29px;
		border-bottom: 1px solid rgba(230,230,230,1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		.change-contain{
			display: flex;
			align-items: center;
			.change-font{
				font-size:32px;
				width:160px;
				font-weight:bold;
				font-family:PingFang-SC-Bold;
				color:rgba(102,102,102,1);
			}
			img{
				width: 112px;
				height: 75px;
			}
		}
		
	}
	.footer-button{
		position: relative;
		img{
			width: 100%;
			height: 177px;
			margin-top: 236px;
		}
		.but-font{
			position: absolute;
			top:280px;
			left: 320px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(255,255,255,1);
			line-height:48px;
		}
	}
	.contain{
		width: 124px;
		.mui-switch {
			width: 104px;
			height: 62px;
			position: relative;
			border: 1px solid #dfdfdf;
			background-color: #fdfdfd;
			box-shadow: #dfdfdf 0 0 0 0 inset;
			border-radius: 40px;
			border-top-left-radius: 40px;
			border-top-right-radius: 40px;
			border-bottom-left-radius: 40px;
			border-bottom-right-radius: 40px;
			background-clip: content-box;
			display: inline-block;
			-webkit-appearance: none;
			user-select: none;
			outline: none; }
		.mui-switch:before {
			content: '';
			width: 58px;
			height: 58px;
			position: absolute;
			top: 0px;
			left: 0;
			border-radius: 40px;
			border-top-left-radius: 40px;
			border-top-right-radius: 40px;
			border-bottom-left-radius: 40px;
			border-bottom-right-radius: 40px;
			background-color: #fff;
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); }
		.mui-switch:checked {
			border-color:#FF6936;
			box-shadow: #FF6936 0 0 0 16px inset;
			background-color: #FF6936; }
		.mui-switch:checked:before {
			left: 42px; }
		.mui-switch.mui-switch-animbg {
			transition: background-color ease 0.4s; }
		.mui-switch.mui-switch-animbg:before {
			transition: left 0.3s; }
		.mui-switch.mui-switch-animbg:checked {
			box-shadow: #dfdfdf 0 0 0 0 inset;
			background-color:#FF6936;
			transition: border-color 0.4s, background-color ease 0.4s; }
		.mui-switch.mui-switch-animbg:checked:before {
			transition: left 0.3s; }
		.mui-switch.mui-switch-anim {
			transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s; }
		.mui-switch.mui-switch-anim:before {
			transition: left 0.3s; }
		.mui-switch.mui-switch-anim:checked {
			box-shadow:#FF6936 0 0 0 16px inset;
			background-color: #FF6936;
			transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s; }
		.mui-switch.mui-switch-anim:checked:before {
			transition: left 0.3s;
		}
	}
</style>