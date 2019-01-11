<style lang="scss">
@import "../../assets/modules/mall/view-detail.scss";
</style>
<style>
@import "//at.alicdn.com/t/font_995983_in1makh95s.css";
</style>
<template>
  <rx-pull
    ref="pull"
    :list="row"
    :total="total"
    :down="down"
    :up="up"
    @downing="handleDown"
    @uping="handleUp"
    @scroll-end="handleScrollEnd"
  >
    <rx-pull-down slot="down"></rx-pull-down>
    <rx-pull-up slot="up"></rx-pull-up>
    <div class="detail">
      <rx-row justify="center" class="nav">
        <rx-col :flexBasis="120">
          <router-link :to="{}">
            <div class="dj">
              <rx-btn class="iconfont icon-dingdan" type="text">
                <p>待接订单</p>
              </rx-btn>
            </div>
          </router-link>
        </rx-col>
        <rx-col :flexBasis="120">
          <router-link :to="{}">
            <div class="df">
              <rx-btn class="iconfont icon-daifahuo" type="text">
                <p>待发货</p>
              </rx-btn>
            </div>
          </router-link>
        </rx-col>
        <rx-col :flexBasis="120">
          <router-link :to="{}">
            <div class="ds">
              <rx-btn class="iconfont icon-daishouhuo" type="text">
                <p>待收货</p>
              </rx-btn>
            </div>
          </router-link>
        </rx-col>
      </rx-row>
      <div class="bar">
        <div class="title">
          <div class="text">历史订单</div>
        </div>
      </div>
      <div class="empty" v-if="empty">
        <rx-btn class="iconfont icon-dingdan" type="text">
          <p>你还没有相关订单</p>
        </rx-btn>
      </div>
      <div class="item" v-for="(item,index) in row" :key="index" v-else>
        <div class="msg">
          <div class="data">2018.10.12</div>
          <div class="state">交易完成</div>
        </div>
        <div class="list">
          <div class="pic">
            <img :src="item.img" alt>
          </div>
          <div class="list-text">
            <p class="list-title">{{item.title}}</p>
            <div class="price">
              <p class="left">
                <span class="active">{{item.score}}</span>
                <span>积分+￥{{item.price}}</span>
              </p>
            </div>
            <div class="right">×{{item.num}}</div>
          </div>
        </div>
      </div>
    </div>
  </rx-pull>
</template>

<script>
import { utils } from "~rx";
import Pull from "~m/pull";
export default {
	name: "MallOfDetail",
	mixins: [Pull],
	data() {
		return {
			row: [],
			total: 100,
			empty: false
		};
	},
	methods: {
		goto() {
			console.log("a");
		},
		__fetch() {
			this.row = [
				{
					img:
						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
					title:
						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
					score: 3000,
					price: 128,
					num: 1
				},
				{
					img:
						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
					score: 40000,
					price: 2000,
					num: 1
				},
				{
					img:
						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
					score: 5000,
					price: 1997,
					num: 1
				},
				{
					img:
						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
					title:
						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
					score: 3000,
					price: 128,
					num: 1
				},
				{
					img:
						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
					score: 40000,
					price: 2000,
					num: 1
				},
				{
					img:
						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
					score: 5000,
					price: 1997,
					num: 1
				},
				{
					img:
						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
					title:
						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
					score: 3000,
					price: 128,
					num: 1
				},
				{
					img:
						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
					score: 40000,
					price: 2000,
					num: 1
				},
				{
					img:
						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
					score: 5000,
					price: 1997,
					num: 1
				}
			];
		}
	},
	created() {
		this.__fetch();
	}
};
</script>