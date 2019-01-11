<template>
	<div  rs-view="details">
		<rx-pull ref="pull"
				 :list="listPart2"
				 :total="total"
				 :down="down"
				 :up="up"
				 @downing="handleDown"
				
				 @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
		<div class="contain">
			<rx-swiper :pagination="false"
					   :autoplay-time="4000"
					   :speed="720"
					   @click="onTopicGoto()">
				<rx-swiper-item v-for="(topic,index) in swipeTopics"
								:key="index">
					<img :src="topic.imgPath"
						 @error="onImgErr" class="img">
				</rx-swiper-item>
			</rx-swiper>
			<div class="card-details" >
				<div class="product-describe">{{title}}</div>
				<div class="source-contain">
					<div class="integral-contain">
						<span class="num">3000</span>
						<span class="font">积分+￥128</span>
					</div>
					<div class="source">
						<span class="source-des">淘宝: Zara</span>
					</div>
				</div>
				<div class="info">
					<div class="price">原价 ￥212</div>
					<div class="sales">月销123笔</div>
					<div class="sales">剩余45件</div>
				</div>
			</div>
			<div class="card-select">
				<div class="size-contain">
					<div class="single-contain">
						<span class="single-font">选择尺码规格类型</span>
						<img  class="single-img"  src="@/assets/imgs/mall/right.png"></img>
					</div>
				</div>
				<div class="size-contain2">
					<div class="single-contain">
						<div class="single-font">购买数量</div>
						<div style="display: flex;align-items: center;padding-right: 10px">
							<span class="shop">该商品限购1件</span>
							<img  class="reduce-img"  src="@/assets/imgs/mall/reduce.png"></img>
							<span class="num">1</span>
							<img  class="add-img"  src="@/assets/imgs/mall/add.png"></img>
						</div>
					</div>
				</div>
				<div class="size-contain">
					<div class="single-contain">
						<div class="single-font">邮费</div>
						<div class="single-font" style="padding-right: 5px">包邮</div>
					</div>
				</div>
			</div>
			<div class="shop-details">
				<div class="details-contain">
					<div class="box"></div>
					<div class="font">商品详情</div>
				</div>
			</div>
		</div>
	<div class="footer-detail">
		<div style="width: 190px;display: flex;align-items: center;justify-content: center">
			<img class="img" src="@/assets/imgs/mall/shop.png"></img>
		</div>
		<button class="add-shop">加入购物车</button>
		<button class="pay-over">已售罄</button>
	</div>
		</rx-pull>
	</div>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	import Msgbox from "~m/__msgbox";
	import UserNameMixin from "~m/__username";
	import axios from 'axios'
	export default {
		name: "product-details",
		mixins: [Pull, Msgbox, UserNameMixin],
		data(){
			return{
				listPart2: [],
				total: 1000,
				title:'商品详情描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款羽绒服外套连帽羽绒衣',
				swipeTopics:[]
			}
		},
		methods:{
			__fetch() {
				this.__fetchMallInfo();
			},
			__fetchMallInfo(){
				let that=this
				axios.get('http://localhost:3000/home/banner')
					.then(res=>{
						console.log('res',res)
						that.swipeTopics=res.data.swipeTopics
					})
				axios.get('https://www.easy-mock.com/mock/5c2dad1732924755e4c0db3c/example/shb')
					.then(res=>{
						this.listPart2=res.data.data.data
					})
			}
		},
		created(){
			this.__fetch();
		}
	};
</script>

<style lang="scss">
	[rs-view="details"] {
		.contain{
			background:rgba(245,245,245,1);
			height: 100%;
			.img {
				width: 100%;
				height: 600px;
			}
			.card-details{
				width: 100%;
				height: 269px;
				background: white;
				.product-describe{
					padding: 29px;
					line-height: 42px;
					font-size:32px;
					font-family:PingFang-SC-Bold;
					color:rgba(51,51,51,1);
				}
				.source-contain{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0 32px 32px;
				    .integral-contain{
						.num{
							height:38px;
							font-size:48px;
							font-family:PingFang-SC-Bold;
							color:rgba(255,161,50,1);
						}
						.font{
							height:38px;
							font-size:28px;
							font-family:PingFang-SC-Bold;
							color:#333333;
						}
					}
					.source{
						margin-top: 10px;
						.source-des{
							font-size:28px;
							font-family:PingFang-SC-Medium;
							font-weight:500;
							color:rgba(51,51,51,1);
						}
					}
				}
				.info{
					display: flex;
					justify-content: space-between;
					padding: 0 32px 0 32px;
					.price{
						font-size:28px;
						font-family:PingFang-SC-Bold;
						text-decoration:line-through;
						color:rgba(153,153,153,1);
					}
					.sales{
						font-size:28px;
						font-family:PingFang-SC-Bold;
						color:rgba(153,153,153,1);
					}
				}
			}
		}
		.card-select{
			background: white;
			width: 100%;
			height: 320px;
			margin-top: 20px;
			.size-contain:last-child{
				border-bottom: none;
			}
			.size-contain2{
				height: 106px;
				width: 100%;
				border-bottom: 1px solid #E6E6E6;
				.single-contain{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20px;
					.single-font{
						height:26px;
						font-size:28px;
						font-family:PingFang-SC-Medium;
						color:rgba(51,51,51,1);
					}
					.shop{
						font-size:24px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						padding-right: 20px;
						color:rgba(153,153,153,1);
						line-height:48px;
					}
					.reduce-img {
						width: 42px;
						height: 42px;
					}
					.num{
						padding:0 15px;
						font-size:32px;
						font-family:PingFang-SC-Medium;
						font-weight:500;
						color:rgba(51,51,51,1);
						line-height:48px;
					}
					.add-img {
						width: 42px;
						height: 42px;
					}
					.single-img{
						width: 32px;
					}
				}
			}
			.size-contain{
				height: 106px;
				width: 100%;
				border-bottom: 1px solid #E6E6E6;
				.single-contain{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 30px;
					.single-font{
						height:26px;
						font-size:28px;
						font-family:PingFang-SC-Medium;
						color:rgba(51,51,51,1);
					}
					
					.single-img{
						width: 32px;
					}
				}
			}
		}
		.shop-details{
			background: white;
			height: 100%;
			margin-top: 20px;
			.details-contain{
				padding: 30px;
				display: flex;
				align-items: center;
				.box{
					width:6px;
					height:30px;
					background:rgba(0,151,238,1);
				}
				.font{
					margin-left: 10px;
					font-size:30px;
					font-family:PingFang-SC-Medium;
					color:rgba(51,51,51,1);
				}
			}
		}
	}
	.footer-detail{
		position: fixed;
		bottom: 0;
		height:98px;
		width: 100%;
		display: flex;
		align-items: center;
		background: white;
		.img{
			width: 44px;
			height: 44px;
		}
		.add-shop{
			height:98px;
			width:350px;
			background:rgba(255,161,50,1);
			border: none;
			font-size:28px;
			font-family:PingFang-SC-Bold;
			color:rgba(255,255,255,1);
		}
		.pay-over{
			width:350px;
			height:98px;
			background:rgba(204,204,204,1);
			border: none;
			font-size:28px;
			font-family:PingFang-SC-Bold;
			color:rgba(102,102,102,1);
		}
	}
</style>