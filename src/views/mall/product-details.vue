<template>
	<section rs-view="details">
		<rx-pull ref="pull"
				 :list="swipeTopics"
				 :total="total"
				 :down="down"
				 @downing="handleDown"
				 @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
		<!--骨架屏-->
		<template v-if="isPrerender">
			<div class="prerender-pane-banner"></div>
			<div class="rx-skeleton rx-cell">
				<div class="rx-cell-header">
					<p class="block"></p>
					<p class="block"></p>
				</div>
				<div class="rx-cell-footer">
					<p class="rx-col-6 block2"></p>
					<p class="rx-col-6 block2"></p>
				</div>
			</div>
			<div class="rx-skeleton rx-cell">
				<div class="rx-cell-header">
					<p class="block"></p>
					<p class="block"></p>
				</div>
				<div class="rx-cell-footer">
					<p class="rx-col-6 block2"></p>
					<p class="rx-col-6 block2"></p>
				</div>
			</div>
			<div class="rx-skeleton rx-cell">
				<div class="rx-cell-header">
					<p class="block"></p>
					<p class="block"></p>
				</div>
				<div class="rx-cell-footer">
					<p class="rx-col-6 block2"></p>
					<p class="rx-col-6 block2"></p>
				</div>
			</div>
		</template>
		<template v-else>
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
						<router-link :to="{path:'/type'}">
							<div class="single-contain">
								<span class="single-font">{{size}}</span>
								<img  class="single-img"  src="@/assets/imgs/mall/right.png"></img>
							</div>
						</router-link>
					</div>
					<div class="size-contain2">
						<div class="single-contain">
							<div class="single-font">购买数量</div>
							<div style="display: flex;align-items: center;padding-right: 10px">
								<span class="shop">该商品限购1件</span>
								<img  class="reduce-img"  src="@/assets/imgs/mall/reduce.png" @click="reduce"></img>
								<span class="num">{{shopNum}}</span>
								<img  class="add-img"  src="@/assets/imgs/mall/add.png" @click="add"></img>
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
						<div class="shop-box"></div>
						<div class="font">商品详情</div>
					</div>
					<div>weyryewrgtffffffffretyrfvtrevfgrvegfgvregyfvgegfgvcergfgerfvreftyertgfgghrvertyfgrefvgyregfvyyvervetrtgfv</div>
					<div>weyryewrgtffffffffretyrfvtrevfgrvegfgvregyfvgegfgvcergfgerfvreftyertgfgghrvertyfgrefvgyregfvyyvervetrtgfv</div>
					<div>weyryewrgtffffffffretyrfvtrevfgrvegfgvregyfvgegfgvcergfgerfvreftyertgfgghrvertyfgrefvgyregfvyyvervetrtgfv</div>
					<div>weyryewrgtffffffffretyrfvtrevfgrvegfgvregyfvgegfgvcergfgerfvreftyertgfgghrvertyfgrefvgyregfvyyvervetrtgfv</div>
					<div>weyryewrgtffffffffretyrfvtrevfgrvegfgvregyfvgegfgvcergfgerfvreftyertgfgghrvertyfgrefvgyregfvyyvervetrtgfv</div>
				</div>
			</div>
		
		</template>
		<toast :text="toast_text" :showToast="showToast"></toast>
		</rx-pull>
		<div class="footer-detail">
			<div style="width: 190px;display: flex;align-items: center;justify-content: center" @click="goCar">
				<img class="img" src="@/assets/imgs/mall/shop.png"></img>
			</div>
			<button class="add-shop" @click="addShopCar">加入购物车</button>
			<button class="pay-over">已售罄</button>
		</div>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "product-details",
		mixins: [Pull],
		components: {
			toast: () =>
				import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
		},
		data(){
			return{
				total:1000,
				isPrerender:true,
				listPart2: [],
				toast_text: "",
				showToast: false,
				title:'商品详情描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款羽绒服外套连帽羽绒衣',
				swipeTopics:[],
				shopNum:1,
				size:'选择尺码规格类型'
			}
		},
		methods:{
			async __fetch() {
				this. __fetchMallInfo()
			},
			toast() {
				const self = this;
				this.showToast = true;
				setTimeout(function() {
					self.showToast = false;
				}, 2000);
			},
			reduce(){
				if(this.shopNum>1){
					this.shopNum--
				}
			},
			add(){
				this.shopNum++
			},
			addShopCar(){
				if(this.$route.query.newList){
					this.toast_text = "添加成功,在购物车等亲";
					this.toast();
				}else{
					this.toast_text = "请选择尺码规格类型";
					this.toast();
				}
			},
			goCar(){
				this.$router.push({path:'/shop-car'})
			},
			async  __fetchMallInfo(){
					this.swipeTopics = 	[{
						imgPath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062945526&di=05ce031f79c3d90c9c084b26ce7d0c3b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c8415a77c3a4a80120a12372925c.jpg%402o.jpg'
					},
						{
							imgPath:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546657924&di=d78403cf234fbca25cde7a02635cd751&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019def58ee313aa8012049ef69e432.jpg%401280w_1l_2o_100sh.jpg'
						}];
					this.isPrerender=false
			}
		},
		mounted() {},
		activated(){
			this.__fetch();
			if(this.$route.query.newList){
				console.log('newList',this.$route.query.newList)
				this.newList=this.$route.query.newList
				this.size=`${this.newList[0]},${this.newList[1]},${this.newList[2]}`
			}
		},
	};
</script>

<style lang="scss">
	[rs-view="details"] {
		/*骨架屏*/
		.prerender-pane-banner {
			background: #e5e5e5;
			animation: fade 1s ease-in-out infinite;
			width: 100%;
			height: 400px;
		}
		.rx-skeleton {
			padding: 0 15px;
			.rx-cell-footer {
				display: flex;
			}

			.block2 {
				background: #e5e5e5;
				animation: fade 1s ease-in-out infinite;
				height: 30px;
				flex: 1;

				&:first-child {
					margin-right: 200px;
				}

				&:last-child {
					margin-left: 200px;
				}
			}
		}
		
		
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
					padding: 30px;
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
				.shop-box{
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
		position: -webkit-sticky;
		position: sticky;
		z-index:2000;
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