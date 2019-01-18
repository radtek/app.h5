
<!--头部组件-->
<template>
	<div class="header">
		<div class="contain">
			<img src="@/assets/imgs/police/left.png"></img>
			<div class="title">{{title}}</div>
			<div class="right">{{right}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Header",
		props:{
			title:String,
			right:String
		}
	};
</script>


<style lang="scss" scoped>
	.header{
		width:100%;
		height:88px;
		background:linear-gradient(0deg,rgba(0,151,238,1),rgba(147,93,246,1));
		box-shadow:0px 4px 20px 0px rgba(0,151,238,0.5);
		.contain{
			display: flex;
			justify-content: space-between;
			padding-top: 24px;
			padding-left: 10px;
			padding-right: 30px;
			img{
				width: 44px;
				height: 44px;
			}
			.title{
				font-size:32px;
				font-family:PingFang-SC-Medium;
				color:rgba(255,255,255,1);
				line-height:48px;
			}
			.right{
				/*padding-top: 70px;*/
				/*padding-left: 209px;*/
				font-size:32px;
				opacity:0.8;
				font-family:PingFang-SC-Medium;
				color:rgba(255,255,255,1);
				line-height:48px;
				text-shadow:0px 2px 6px rgba(0,80,126,0.5);
			}
		}
		
	}
</style>