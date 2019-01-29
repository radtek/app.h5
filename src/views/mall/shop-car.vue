<template>
    <div class="main">
		<div  class="main-contain" v-for="(item,index) in cartData" :key="index" >
			<div class="contain" >
				<div class="goods" @click="changeImg(index)">
					<div class="img" :class="{on:item.isSelect}"></div>
					<img class="goodImg"  :src="item.goodImg">
					<div class="good-font">
						<div class="good-title">{{item.detail}}</div>
						<div class="good-size">{{item.size}}</div>
						<div  class="good-price">
							<div class="integral">
								<span class="integral-num">{{item.integral}}</span>{{item.price}}
							</div>
							<div class="price">{{item.sale}}</div>
						</div>
					</div>
				</div>
				<div class="good-operating">
					<img  class="img"  :src="item.reduceImg" @click="reduce(index)">
					<span class="num">{{item.num}}</span>
					<img  class="img" :src="item.addImg" @click="add(index)">
					<span class="font">该商品限购{{item.limtNum}}件</span>
					<img  class="delImg" :src="item.delImg">
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
			<div class="img"  :class="[isSelectAll?'on':'']" @click="allCheck"></div>
			<span class="footer-font" >全选</span>
			<div class="footer-contain" >
				<div>
					<span class="sum">合计:</span>
					<span class="footer-num">3000</span>
					<span class="integral">积分+￥128</span>
				</div>
				<div class="sale">（已优惠￥34）</div>
			</div>
			<button class="button">结算</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "shop-car",
		created(){
			let nowList=this.goods
			nowList.forEach(item=>item.isSelect = false)
			this.cartData= nowList
		},
		methods:{
			reduce(index){
				if(this.cartData[index].num===1){
					return
				}
				this.cartData[index].num--
			},
			add(index){
				if(this.cartData[index].num>=this.cartData[index].limtNum){
					return
				}
				this.cartData[index].num++
			},
			//复选
			changeImg(index){
				this.cartData[index].isSelect= !this.cartData[index].isSelect;
				this.$set(this.cartData,index,this.cartData[index])
				this.isSelectAll=this.selectAll()
			},
			selectAll(){
				return this.cartData.every(item => item.isSelect);
			}, 
			//全选
			allCheck(){
				this.cartData.forEach(item => {
					item.isSelect = !this.isSelectAll;
				});
				this.isSelectAll = !this.isSelectAll;
			}
		},
		data(){
			return{
				isSelectAll:false,
				cartData:[],
				num:1,
				goods:[
					{
					img:require('@/assets/imgs/mall/weizhong.png'),
					goodImg:require('@/assets/imgs/mall/good.png'),
					detail:'商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗',
					size:'XL, 蓝色，64G，套餐一',
					integral:'3000',
					price:'积分+￥128',
					sale:'原价 ￥212',
					reduceImg:require('@/assets/imgs/mall/reduce.png'),
					addImg:require('@/assets/imgs/mall/add.png'),
						num:1,
					limtNum:6,
					delImg:require('@/assets/imgs/mall/shanchu.png')
				},
					{
						img:require('@/assets/imgs/mall/weizhong.png'),
						goodImg:require('@/assets/imgs/mall/good.png'),
						detail:'商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗',
						size:'XL, 蓝色，64G，套餐一',
						integral:'3000',
						price:'积分+￥128',
						sale:'原价 ￥212',
						reduceImg:require('@/assets/imgs/mall/reduce.png'),
						addImg:require('@/assets/imgs/mall/add.png'),
						num:1,
						limtNum:3,
						delImg:require('@/assets/imgs/mall/shanchu.png')
					},
					{
						img:require('@/assets/imgs/mall/weizhong.png'),
						goodImg:require('@/assets/imgs/mall/good.png'),
						detail:'商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗',
						size:'XL, 蓝色，64G，套餐一',
						integral:'3000',
						price:'积分+￥128',
						sale:'原价 ￥212',
						reduceImg:require('@/assets/imgs/mall/reduce.png'),
						addImg:require('@/assets/imgs/mall/add.png'),
						num:1,
						limtNum:4,
						delImg:require('@/assets/imgs/mall/shanchu.png')
					}],
			}
		},
	};
</script>

<style lang="scss" scoped>
	@import "@/assets/modules/mall/view-shop-car.scss";
</style>