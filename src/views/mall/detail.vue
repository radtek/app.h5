<style lang="scss">
  @import "../../assets/modules/mall/view-detail.scss";
</style>
<style>
  @import "//at.alicdn.com/t/font_995983_in1makh95s.css";
</style>
<template>
  <rx-pull
    :down="down"
    :list="listPart"
    :total="total"
    :up="up"
    @downing="handleDown"
    @scroll-end="handleScrollEnd"
    @uping="handleUp"
    ref="pull"
  >
    <rx-pull-down slot="down"></rx-pull-down>
    <rx-pull-up slot="up"></rx-pull-up>
    <rx-skeleton-cell v-if="isPrerender"></rx-skeleton-cell>
    <div class="detail" v-else>
      <div class="nav">
        <div class="col">
          <router-link :to="{path:'/wait_cargo'}">
            <div class="dj">
              <rx-btn class="iconfont icon-dingdan" type="text">
                <p>待接订单</p>
                <span class="dot">9</span>
              </rx-btn>
            </div>
          </router-link>
        </div>
        <div class="col">
          <router-link :to="{path:'/wait_cargo'}">
            <div class="df">
              <rx-btn class="iconfont icon-daifahuo" type="text">
                <p>待发货</p>
                <span class="dot">9</span>
              </rx-btn>
            </div>
          </router-link>
        </div>
        <div class="col">
          <router-link :to="{path:'/wait_cargo'}">
            <div class="ds">
              <rx-btn class="iconfont icon-daishouhuo" type="text">
                <p>待收货</p>
                <span class="dot">9</span>
              </rx-btn>
            </div>
          </router-link>
        </div>
      </div>
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
      <div :key="index" class="item" v-else v-for="(item,index) in listPart">
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
  			listPart: [],
  			isPrerender: true,
  			total: 100,
  			empty: false,
  			pageIndex: 1
  		};
  	},
  	computed: {
  		list() {
  			return this.listPart;
  		}
  	},
  	methods: {
  		goto() {
  			console.log("a");
  		},
  		async __append() {
  			const [err, resp] = await this.$sync(
  				this.$http.mall.getDetailList({ page: ++this.pageIndex })
  			);

  			if (!err) {
  				const list = resp.result;
  				if (list && list.length) {
  					this.listPart = this.listPart.concat(list);
  				}
  			}
  		},
  		async __fetchDetailList() {
  			// const [err,resp] = await this.$sync(this.$http.mall.getDetailList())
  			// if(!err) {
  			//     const list = resp.result
  			//     this.listPart = list.slice(0,6)

  			// }
  			this.listPart = [
  				{
  					img:
  						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
  					title:
  						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
  					score: "3000",
  					price: "128",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
  					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
  					score: "40000",
  					price: "2000",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
  					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
  					score: "5000",
  					price: "1997",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
  					title:
  						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
  					score: "3000",
  					price: "128",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
  					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
  					score: "40000",
  					price: "2000",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
  					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
  					score: "5000",
  					price: "1997",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
  					title:
  						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
  					score: "3000",
  					price: "128",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
  					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
  					score: "40000",
  					price: "2000",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
  					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
  					score: "5000",
  					price: "1997",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3417061725,3241456897&fm=58&bpow=500&bpoh=380",
  					title:
  						"商品详细描述2018冬季新款男士羽绒服白鹅绒加厚大码中长款式不好看吗,不好看",
  					score: "3000",
  					price: "128",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2101320337,3872255227&fm=85&app=52&f=JPEG?w=121&h=75&s=E1F233C046F3B3DE18E004BE0300C0C2",
  					title: "超级无敌变性金刚，钢铁侠特制版,不好看",
  					score: "40000",
  					price: "2000",
  					num: "1"
  				},
  				{
  					img:
  						"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4118190083,57261496&fm=27&gp=0.jpg",
  					title: "咸蛋超人，无敌破坏王cosplay宇智波斑,不好看",
  					score: "5000",
  					price: "1997",
  					num: "1"
  				}
  			];
  		},
  		async __fetch() {
  			await this.__fetchDetailList();
  			this.isPrerender = false;
  		}
  	},
  	mounted() {
  		this.__fetch();
  	}
  };
</script>
