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
                    <div class="detail" @click="goto">
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
                import(/* webpackChunkName:"mall-list" */ "~c/mall/index-list.vue")
    },
    data(){
        return {
            likeList:[],
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
        async __fetch() {
          await  this.__fetchMallInfo();
            this.isPrerender = false;
          },
        goto(){
            this.$router.push({path:'/order-details'})
        },
        async __append() {
  			const [err, resp] = await this.$sync(
  				this.$http.mall.getMallList({ page: ++this.pageIndex })
              );
  			if (!err) {
                const list = resp.result;
  				if (list && list.length) {
                      this.likeList = this.likeList.concat(list);
  				}
  			}
        },
        async __fetchMallInfo(){
            const [err,resp] = await this.$sync(this.$http.mall.getMallList())
            if(!err) {
                this.likeList = resp.result;
            }
        },
    },
    mounted() {
        this.__fetch();
    }
}
</script>