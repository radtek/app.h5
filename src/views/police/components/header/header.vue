
<!--头部组件-->
<template>
	<div class="header">
		<div class="contain">
			<div class="left" v-if="left">{{left}}</div>
			<div class="img-contain" v-else>
				<img src="@/assets/imgs/police/left.png"  @click="goBack"></img>
			</div>
			<div class="title">{{title}}</div>
			<div class="right" @click="clickRight">{{right}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Header",
		props:{
			left:String,
			title:String,
			right:String
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			//点击右侧的文字
			clickRight(){
				if(this.right==='编辑'){
					this.$emit('change','完成')
				}else{
					this.$emit('change','编辑')
				}
			}
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
			padding-left: 20px;
			padding-right: 30px;
			.img-contain{
				width: 80px;
				img{
					width: 44px;
					height: 44px;
				}
			}
			
			.left{
				width:80px; 
				font-size:32px;
				font-family:PingFang-SC-Medium;
				font-weight:500;
				color:rgba(255,255,255,1);
				line-height:48px;
				opacity:0.8;
				text-shadow:0px 2px 6px rgba(0,80,126,0.5);
			}
			.title{
				font-size:32px;
				font-family:PingFang-SC-Medium;
				color:rgba(255,255,255,1);
				line-height:48px;
			}
			.right{
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