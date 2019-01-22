<template>
    <div>
	   <Header :title="mainTitle" ></Header>
		<div class="activity-contain">
			<div class="title">活动主题:</div>
			<input placeholder="请输入活动主题">
		</div>
		<div class="activity-contain">
			<div class="title">活动地点:</div>
			<input class="address-input" placeholder="请输入活动地点">
		</div>
		<div class="activity-contain" @click="changeTime">
			<div class="title">活动时间:</div>
			<div class="activity-font">请选择活动时间</div>
			<img src="@/assets/imgs/police/right.png">
		</div>
		<div class="change">
			<div class="change-contain">
				<div class="change-font">避开假日</div>
				<SwitchBut></SwitchBut>
			</div>
			<div class="change-contain">
				<div class="change-font">是否重复</div>
				<SwitchBut></SwitchBut>
			</div>
		</div>
		<div class="footer-button">
			<img src="@/assets/imgs/police/but.png">
			<div class="but-font">创建活动</div>
		</div>
	</div>
</template>

<script>
	import { utils } from "~rx";
	import { Indicator } from 'mint-ui';
	export default {
		name: "index",
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
			}
		},
		methods:{
			changeTime(){
				Indicator.open('登录中...');
				this.$router.push('/activity-time')
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
</style>