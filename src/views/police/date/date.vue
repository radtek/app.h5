<template>
	<div id="app">
		<div class="header">
			<div class="header-contain">
					<img src="@/assets/imgs/police/left.png">
					<span class="header-font">活动时间</span>
			</div>
			<div class="time-contain">
				<div class="date" @click="clickDate">
					<span class="date-font">请选择日期</span>
				</div>
				<img src="@/assets/imgs/police/xie.png"></img>
				<div class="date">
					<span class="date-font">请选择时间</span>
				</div>
			</div>
			<transition name="fade">
				<div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
					<calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
				</div>
			</transition>
		</div>
		<div class="footer" v-if="calendar3.show" @click="sureDate">
			<img src="@/assets/imgs/police/button.png">
			<span class="button-font">确定日期</span>
		</div>
		
	</div>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: 'app',
		components: {
			calendar: () =>
				import(/* webpackChunkName:"wc-calendar" */ "../components/calendar/calendar.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
		},
		data(){
			return {
				calendar3:{
					display:"2019/01/16",
					show:false,
					zero:true,
					value:[2019,1,16], //默认日期
					lunar:true, //显示农历
					select:(value)=>{
						console.log(value)
						this.calendar3.value=value;
						this.calendar3.display=value.join("/");
					}
				},
			}
		},
		methods:{
			clickDate(){
				this.calendar3.show=true
			},
			sureDate(){
				console.log(this.calendar3.value)
			}
		}

	}
</script>

<style lang="scss" scoped>
	#app{
		.header{
			width:100%;
			height:390px;
			background:linear-gradient(0deg,rgba(0,151,238,1),rgba(147,93,246,1));
			box-shadow:0px 4px 20px 0px rgba(0,151,238,0.5);
			position: relative;
			.header-contain{
				display: flex;
				align-items: center;
				img{
					margin-left: 18px;
					width: 44px;
					height: 44px;
				}
				.header-font{
					margin-left: 251px;
					font-size:32px;
					font-family:PingFang-SC-Medium;
					color:rgba(255,255,255,1);
					line-height:48px;
				}
			}
			.time-contain{
				width: 100%;
				margin-top: 37px;
				display: flex;
				align-items: center;
				justify-content: center;
				.date{
					width:250px;
					height:80px;
					display: flex;
					justify-content: center;
					align-items: center;
					background:rgba(57,46,144,0.3);
					border-radius:8px;
					.date-font{
						font-size:40px;
						font-family:PingFang-SC-Medium;
						color:rgba(255,255,255,1);
						line-height:48px;
					}
				}
				img{
					margin-right: 18px;
					margin-left: 18px;
					width: 70px;
					height: 70px;
				}
			}
			.calendar-dropdown{
				position: absolute;
				left:20px;
				top:200px;
				padding:20px;
				border-radius: 2px;
			}
		}
		.footer{
			margin-left: 391px;
			margin-top: 600px;
			position: relative;
			img{
				width: 347px;
				height: 177px;
			}
			.button-font{
				position: absolute;
				right: 120px;
				top:42px;
				font-size:32px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:48px;
			}
		}
	}
</style>
