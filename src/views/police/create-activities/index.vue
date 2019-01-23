<template>
    <div>
	   <Header :title="mainTitle" ></Header>
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
					<div class="time" v-for="(item,index) in date" :key="index">{{item.week}}{{item.time}}</div>
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
		<div class="footer-button" @click="create">
			<img src="@/assets/imgs/police/but.png">
			<div class="but-font" >创建活动</div>
		</div>
	</div>
</template>

<script>
	import { utils } from "~rx";
	import { Indicator } from 'mint-ui';
	export default {
		name: "index",
		created(){
			
		},
		activated(){
			//是否避开假日和是否重复默认为是
			document.getElementById('switch').checked=true
			document.getElementById('switch1').checked=true
			console.log(this.$route.query.temp)
			this.temp=this.$route.query.temp
			//筛选isSelect为true的对象返回新数组
			if(this.$route.query.temp){
				// this.temp=this.$route.query.temp
				this.date=this.$route.query.temp.filter(item=>item.isSelect)
			}
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
		},
		data(){
			return{
				mainTitle:'创建活动',
				date:[],
				temp:[],
				title:'',
				address:'',
				changeNum:1,
				changeNum1:1
			}
		},
		methods:{
			//节假日
			test(){
				let change=!document.getElementById('switch').checked ? "未选中" : "选中"
				if(change==='选中'){
					this.changeNum=1
				}else{
					this.changeNum=0
				}
				console.log(!document.getElementById('switch').checked ? "未选中" : "选中");
			},
			//是否重复
			test1(){
				let change=!document.getElementById('switch1').checked ? "未选中" : "选中"
				if(change==='选中'){
					this.changeNum1=1
				}else{
					this.changeNum1=0
				}
				console.log(!document.getElementById('switch1').checked ? "未选中" : "选中");
			},
			changeTime(){
				this.$router.push('/activity-time')
			},
			create(){
				let data=[
					{
						id:'',
						relationId:1,
						week:'周二',
						startTime:'09:00',
						isEnabled:1
					}
				]
				this.$http.police
					.editActivity({
						subject:this.title,
						address:this.address,
						isNotHoliday:this.changeNum,
						isRepeat:this.changeNum1,
						infoActivityPlanList:data
					})
					.then(data => {
						console.log(data)
					})
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