<style lang="scss">
  @import "../../assets/modules/mall/view-payment-end.scss";
</style>
<template>
  <section rs-view="payment-end">
    <rx-pull ref="pull"
             :list="likeList"
             :total="total"
             :down="down"
             :up="up"
             @downing="handleDown"
             @uping="handleUp"
             @scroll-end="handleScrollEnd">
        <rx-pull-down slot="down"></rx-pull-down>
        <rx-pull-up slot="up"></rx-pull-up>
        <rx-skeleton-cell v-if="isPrerender"></rx-skeleton-cell>
        <div class="main" v-else>
            <rx-card class="card-payment"
                     padding="h">
                <rx-row justify="center"
                    align="center">
                <rx-btn icon="success_circle"
                        type="text">
                    <div class="success">支付成功!</div>
                </rx-btn>
                </rx-row>
                <rx-row justify="center"
                        align="center"
                        class="nav">
                    <div class="detail">
                        <p>查看订单详情</p>
                    </div>
                </rx-row>
            </rx-card>
            <rx-card padding="h">
                <rx-row justify="center"
                        align="center"
                        class="better">
                    推荐商品
                </rx-row>
                <mall-list :data="likeList">
                </mall-list>
            </rx-card>
        </div>
    </rx-pull>
  </section>
</template>
<script>
import { utils } from "~rx";
import Pull from "~m/pull";
export default {
    name: "MallOfpayEnd",
    mixins: [Pull],
    components: {
        mallList: () =>
                import(/* webpackChunkName:"mall-list" */ "~v/mall/data/index-list.vue")
    },
    data(){
        return {
            likeList:[],
            listPart:[],
            total:100,
            isPrerender:false,
            index:4,
            }
    },
  	computed: {
  		list() {
  			return this.likeList;
  		}
  	},
    methods: {
        __fetch() {
            this.__fetchMallInfo();
            this.isPrerender = false;
          },
        async __append() {
  			// const [err, resp] = await this.$sync(
  			// 	this.$http.qa.getRecommendQ({ page: ++this.pageIndex })
              // );
              
              const err = false;
  			if (!err) {
                  // const list = resp.result;
                  let list = this.listPart.slice(this.index,this.index+2);
                  this.index += 2;
  				if (list && list.length) {
                      this.likeList = this.listPart.concat(list);
  				}
  			}
        },
        __fetchMallInfo(){
          this.listPart = [{
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"一小米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },{
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"二大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"三大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"四大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"五大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"六大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"七大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"八大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"九大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"十大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"十一大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },
          {
              imgPath:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
              title:"十二大米小钢炮蓝牙音箱",
              score:"1000",
              price:"48",
              oldPrice:"88"
          },]
          this.likeList = this.listPart.slice(0,4)
        }  

    },
    mounted() {
        this.__fetch();
    }
}
</script>