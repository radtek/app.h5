<template>
    <div class="main">
		<div  class="main-contain" >
			<div class="contain">
				<div class="goods">
					<img class="img"  src="@/assets/imgs/mall/weizhong.png">
					<img class="goodImg"  src="@/assets/imgs/mall/good.png">
					<div class="good-font">
						<div class="good-title">商品详细描述2018冬季新款男士羽绒
							服白鹅绒加厚大码中长款式不好看吗</div>
						<div class="good-size">XL, 蓝色，64G，套餐一</div>
						<div  class="good-price">
							<div class="integral">
								<span class="integral-num">3000</span>积分+￥128
							</div>
							<div class="price">原价 ￥212</div>
						</div>
					</div>
				</div>
				<div class="good-operating">
					<img  class="img"  src="@/assets/imgs/mall/reduce.png">
					<span class="num">1</span>
					<img  class="img" src="@/assets/imgs/mall/add.png">
					<span class="font">该商品限购1件</span>
					<img  class="delImg" src="@/assets/imgs/mall/shanchu.png">
				</div>
			</div>
		</div>
		<div class="obtained-contain">
			<div class="title">
				<div class="obtained-img"></div>
				<div class="title-font">以下商品已下架</div>
			</div>
			<div class="wire"></div>
			<div class="contain">
				<div class="goods">
					<img class="goodImg"  src="@/assets/imgs/mall/good.png">
					<div class="good-font">
						<div class="good-title">商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗</div>
						<div class="good-size">XL, 蓝色，64G，套餐一</div>
					</div>
				</div>
				<div class="obtained-detail">
					<div class="obtained-button">商品已下架</div>
					<img  class="img" src="@/assets/imgs/mall/shanchu.png">
				</div>
			</div>
		</div>	
		<div class="footer">
			<img class="img"  src="@/assets/imgs/mall/weizhong.png">
			<span class="footer-font">全选</span>
			<div class="footer-contain" >
				<div>
					<span class="sum">合计:</span>
					<span class="footer-num">3000</span>
					<span class="integral">积分+￥128</span>
				</div>
				<div class="sale">（已优惠￥34）</div>
			</div>
			<button class="button"
					@click="goto">结算</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "shop-car",
		methods: {
			goto(){
				this.$router.push({path:'/payment'})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.main{
		background:rgba(245,245,245,1);
		width: 100%;
		height: 100%;
		.main-contain{
			padding-top: 20px;
			.contain{
				background: white;
				width: 100%;
				height: 328px;
				.goods{
					display: flex;
					align-items: center;
					padding-top: 30px;
					.img{
						margin: 0 20px;
						width: 40px;
						height: 40px;
					}
					.goodImg{
						width: 150px;
						height: 150px;
					}
					.good-font{
						padding-left: 20px;
					}
					.good-title{
						line-height:38px;
						height: 69px;
						width:466px;
						font-size:28px;
						font-family:PingFang-SC-Medium;
						color:rgba(51,51,51,1);
					}
					.good-size{
						margin-top: 20px;
						width:301px;
						font-size:28px;
						font-family:PingFang-SC-Medium;
						color:rgba(153,153,153,1);
					}
					.good-price{
						display: flex;
						.integral{
							font-size:28px;
							font-family:PingFang-SC-Medium;
							color:rgba(153,153,153,1);
							line-height:48px;
							.integral-num{
								font-size:32px;
								font-weight: 500;
								font-family:PingFang-SC-Bold;
								color:#FFA132;
							}
						}
						.price{
							margin-left: 110px;
							height: 23px;
							font-size:24px;
							line-height:48px;
							font-family:PingFang-SC-Medium;
							text-decoration:line-through;
							color:rgba(153,153,153,1);
						}
					}
				}
				.good-operating{
					display: flex;
					align-items: center;
					margin-bottom: 30px;
					margin-top: 44px;
					margin-left: 250px;
					.img{
						width: 52px;
						height: 52px
					}
					.delImg{
						width: 50px;
						height: 50px
					}
					.num{
						font-size:32px;
						font-family:PingFang-SC-Medium;
						color:rgba(51,51,51,1);
						padding-left: 39px;
						padding-right: 39px;
					}
					.font{
						padding-right: 21px;
						padding-left: 21px;
						font-size:24px;
						font-family:PingFang-SC-Medium;
						color:rgba(153,153,153,1);
					}
				}
			}
		}
		.obtained-contain{
			padding-top: 20px;
			.title{
				background: white;
				height: 100px;
				width: 100%;
				display: flex;
				align-items: center;
				.obtained-img{
					margin-left: 29px;
					margin-right: 11px;
					width:6px;
					height:30px;
					background:rgba(0,151,238,1);
				}
				.title-font{
					font-size:32px;
					font-family:PingFang-SC-Medium;
					color:rgba(51,51,51,1);
					line-height:48px;	
				}
			}
			.wire{
				padding-right: 29px;
				padding-left: 29px;
				border-bottom: 1px solid rgba(230,230,230,1);
			}
			.contain{
				background: white;
				width: 100%;
				height: 245px;
				.goods{
					display: flex;
					padding-top: 30px;
					.goodImg{
						margin-left: 29px;
						width: 150px;
						height: 150px;
					}
					.good-font{
						margin-left: 19px;
					}
					.good-title{
						line-height:38px;
						height: 69px;
						width:512px;
						font-size:28px;
						font-family:PingFang-SC-Medium;
						color:rgba(51,51,51,1);
					}
					.good-size{
						margin-top: 20px;
						width:301px;
						font-size:28px;
						font-family:PingFang-SC-Medium;
						color:rgba(153,153,153,1);
					}
					.good-price{
						display: flex;
						.integral{
							font-size:28px;
							font-family:PingFang-SC-Medium;
							color:rgba(153,153,153,1);
							line-height:48px;
							.integral-num{
								font-size:32px;
								font-weight: 500;
								font-family:PingFang-SC-Bold;
								color:#FFA132;
							}
						}
						.price{
							margin-left: 110px;
							height: 23px;
							font-size:24px;
							line-height:48px;
							font-family:PingFang-SC-Medium;
							text-decoration:line-through;
							color:rgba(153,153,153,1);
						}
					}
				}
				.obtained-detail{
					display: flex;
					.obtained-button{
						margin-left: 191px;
						line-height: 40px;
						text-align: center;
						width:160px;
						height:40px;
						background:rgba(204,204,204,1);
						border-radius:20px;
						font-size:24px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:rgba(255,255,255,1);
					}
					.img{
						margin-left: 300px;
						width: 50px;
						height: 50px;
					}
				}
			}
		}
		.footer{
			position: fixed;
			bottom: 0;
			background: white;
			width: 100%;
			height: 98px;
			display: flex;
			align-items: center;
			.img{
			    margin: 0 20px;
				width: 40px;
				height: 40px;
			}
			.footer-font{
				font-size:28px;
				font-family:PingFang-SC-Medium;
				color:rgba(153,153,153,1);
			}
			.footer-contain{
				margin-left: 110px;
			}
			.sum{
				font-size:28px;
				font-family:PingFang-SC-Medium;
				color:rgba(51,51,51,1);
			}
			.footer-num{
				font-size:32px;
				color: #FFA132;
			}
			.integral{
				font-size:24px;
				font-family:PingFang-SC-Bold;
				color:#333333;
			}
			.sale{
				font-size:24px;
				font-family:PingFang-SC-Medium;
				color:rgba(153,153,153,1);
			}
			.button{
				margin-left: 20px;
			   width: 200px;
				height: 100%;
				border:none;
				background:#0097EE;
				box-shadow:0px -1px 0px 0px rgba(230,230,230,1);
				font-size:32px;
				font-family:PingFang-SC-Bold;
				font-weight:bold;
				color:rgba(255,255,255,1);
				line-height:48px;
			}
		}
		
	}

</style>