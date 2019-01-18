<template>
    <div>
		<Header :title="mainTitle" :right="rightTitle" @change="change"></Header>
		<div class="time-contain">
			<img class="delImg" v-if="rightTitle==='完成'" src="@/assets/imgs/police/866.png">
			<div class="time-font" :class="{'active':rightTitle==='完成'}">周一20：00</div>
			<img class="butImg" src="@/assets/imgs/police/change.png"></img>
		</div>
		<img class="addImg" v-if="rightTitle==='编辑'" src="@/assets/imgs/police/add.png"></img>
	</div>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "activity-time",
		components: {
			Header: () =>
				import(/* webpackChunkName:"wc-calendar" */ "@/views/police/components/header/header.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
		},
		data(){
			return{
				mainTitle:'活动时间',
				rightTitle:'编辑'
			}
		},
		methods:{
			change(e){
				this.rightTitle=e
			}
		}
	};
</script>

<style lang="scss" scoped>
  		.time-contain{
			height: 130px;
			margin: 0 29px;
			border-bottom: 1px solid rgba(230,230,230,1);
			display: flex;
			align-items: center;
			justify-content: space-between;
			.time-font{
				font-size:32px;
				font-family:PingFang-SC-Bold;
				font-weight:bold;
				color:rgba(153,153,153,1);
			}
			.delImg{
				width: 58px;
				height: 58px;
			}
			.active{
				margin-right: 200px;
			}
			.butImg{
				width: 102px;
				height: 62px;
			}
		}
	.addImg{
		margin-top: 350px;
		margin-left: 569px;
		width: 179px;
		height: 179px;
	}
</style>