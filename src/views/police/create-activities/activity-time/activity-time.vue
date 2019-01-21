<template>
    <div>
		<Header :title="mainTitle" :right="rightTitle"  @change="change"></Header>
		<div class="time-contain"  v-for="(item,index) in date" :key="index">
			<img class="delImg" v-if="rightTitle==='完成'" src="@/assets/imgs/police/866.png">
				<div class="time-font" :class="{'active':rightTitle==='完成'}">
					{{item.week}}{{item.time}}
				</div>
				<SwitchBut></SwitchBut>
		</div>
		<img class="addImg" v-if="rightTitle==='编辑'" src="@/assets/imgs/police/add.png" @click="showDateTimePicker2"></img>
		<div id="app">
			<DateTimePicker
				v-model="dateTimePickerIsShow2"
				title="选择日期"
				confirm="确定"
				cancel="取消"
				:transToNow="true"
				:selectedText="{
        year: '年',
        month: '月',
        day: '日',
        hour: '',
        minute: ''
      }"
				:startYear="startTime.year"
				:startMonth="startTime.month"
				:startDay="startTime.day"
				:endYear="endTime.year"
				:endMonth="endTime.month"
				:endDay="endTime.day"
				@syncResult="syncDateTimePicker2"/>
		</div>	
	</div>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "activity-time",
		components: {
			Header: () =>
				import(/* webpackChunkName:"wc-header" */ "@/views/police/__wc__/header/header.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			SwitchBut: () =>
				import(/* webpackChunkName:"wc-switch" */ "@/views/police/__wc__/switch/switch.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			DateTimePicker: () =>
				import(/* webpackChunkName:"wc-picker" */ "@/views/police/__wc__/dateTimePicker/DateTimePicker.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
		},
		data(){
			return{
				mainTitle:'活动时间',
				rightTitle:'编辑',
				on:false,
				dateTimePickerIsShow2: false,
				startTime: {},
				endTime: {},
				dateTimePickerResult2: '',
				nowWeek:'',
				nowTime:'',
				date:[
					{
						week:'周一',
						time:'20:00'
					}
				]
			}
		},
		created(){
			this.calRootFontSize()

			this.timeControl()

			window.onresize = () => {
				window.location.reload()
			}
		},
		methods:{
			change(e){
				this.rightTitle=e
			},
			calRootFontSize () {
				const html = document.getElementsByTagName('html')[0]
				// caculate rootFontSzie
				const pageWidth = html.clientWidth
				const pageHeight = html.clientHeight
				if (pageWidth < pageHeight) {
					html.style.fontSize = pageWidth / 10 + 'px'
				} else {
					html.style.fontSize = pageHeight / 10 + 'px'
				}
			},
			getWeek(date){
				let week;
				if(date.getDay()==0) week="周日"
				if(date.getDay()==1) week="周一"
				if(date.getDay()==2) week="周二"
				if(date.getDay()==3) week="周三"
				if(date.getDay()==4) week="周四"
				if(date.getDay()==5) week="周五"
				if(date.getDay()==6) week="周六"
				return week;
			},
			showDateTimePicker2 () {
				this.dateTimePickerIsShow2 = true
			},
			syncDateTimePicker2 (result) {
				this.dateTimePickerResult2 = result.year + '-' + result.month + '-' + result.day + ' ' + result.hour + ':' + result.minute
				let nowDate=	this.dateTimePickerResult2.toString().slice(0,9);
				this.nowTime=	this.dateTimePickerResult2.toString().slice(10,16);
				this.nowWeek= this.getWeek(new Date(nowDate));
				this.date.push({week:this.nowWeek,time:this.nowTime})
				console.log(this.dateTimePickerResult2)
			},
			timeControl () {
				const today = new Date()
				const diff = 90 * 24 * 60 * 60 * 1000
				const endDay = new Date(Number(+today) + diff)

				this.startTime.year = today.getFullYear()
				this.startTime.month = today.getMonth() + 1
				this.startTime.day = today.getDate()

				this.endTime.year = endDay.getFullYear()
				this.endTime.month = endDay.getMonth() + 1
				this.endTime.day = endDay.getDate()
			}
			
		}
	};
</script>

<style lang="scss" scoped>
  		.time-contain {
			height: 130px;
			margin: 0 29px;
			border-bottom: 1px solid rgba(230, 230, 230, 1);
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time-font {
				font-size: 32px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(153, 153, 153, 1);
			}
			.delImg {
				width: 58px;
				height: 58px;
			}
			.active {
				margin-right: 200px;
			}
		}
	.addImg{
		margin-top: 350px;
		margin-left: 569px;
		width: 179px;
		height: 179px;
	}

		
</style>