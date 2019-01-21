<style lang="scss">
  @import "../../assets/modules/mall/view-index.scss";
</style>
<style>
@import "//at.alicdn.com/t/font_995983_ivv5k0pc2sq.css";
</style>
<template>
  <section rs-view="index">
    <rx-pull ref="pull"
             :list="listPart"
             :total="total"
             :down="down"
             :up="up"
             @downing="handleDown"
             @uping="handleUp"
             @scroll-end="handleScrollEnd">
      <rx-pull-down slot="down"></rx-pull-down>
      <rx-pull-up slot="up"></rx-pull-up>
      <rx-skeleton-cell v-if="isPrerender"></rx-skeleton-cell>
      <div class="ui-list" v-else>
        <rx-card  class="card-mall"
                  padding="h">
            <rx-swiper :pagination="false"
                       :autoplay-time="4000"
                       :speed="720"
                       @click="onTopicGoto()">
            <rx-swiper-item v-for="(topic,index) in swipeTopics"
                            :key="index">
                    <img :src="topic.imgPath[0]"
                         @error="onImgErr">
            </rx-swiper-item>
            </rx-swiper>
            <rx-row justify="center"
                    align="center"
                    class="nav">
                <rx-col>
                    <router-link :to="{path:'/detail'}">
                        <rx-btn class="iconfont icon-wodedingdan1"
                                type="text"
                                @on-click="goto()">
                                <p>我的订单</p>
                                <span class="dot" v-if="dotdd">{{dotdd}}</span>
                                </rx-btn>
                    </router-link>
                </rx-col>
                <rx-col>
					<router-link :to="{path:'/shop-car'}">
                    <rx-btn class="iconfont icon-gouwuche"
                            type="text"
                            @on-click="goto()">
                            <p>购物车</p>
                            <span class="dot" v-if="dotgw">{{dotgw}}</span>
					</rx-btn>
					</router-link>
                </rx-col>
                <rx-col>
                    <rx-btn class="iconfont icon-wodejifen"
                            type="text"
                            @on-click="goto()">
                            <p>我的积分</p>
                            <span class="dot" v-if="dotjf">{{dotjf}}</span>
                            </rx-btn>
                </rx-col>
            </rx-row>
        </rx-card>
        <rx-card padding="h">
            <template slot="header">
                <span class="title"><i class="rx-icon icon-qa-heart"></i>热卖商品</span>
            </template>
            <mall-list :data="listPart">
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
  	name: "MallOfIndex",
  	mixins: [Pull],
    components: {
        mallList: () =>
				import(/* webpackChunkName:"mall-list" */ "~c/mall/index-list.vue")
    },
  	data() {
  		return {
  			isPrerender: true,
  			listPart: [],
  			total: 1000,
  			pageIndex: 1,
            swipeTopics: [],
            index:6,
            dotdd:0,
            dotgw:8,
            dotjf:12
  		};
  	},
  	computed: {
  		list() {
  			return this.listPart;
  		}
  	},
  	methods: {
  		onTopicGoto(topic, evt) {
  			// this.goto("话题详情", "/topic.detail", {
  			// 	qid: topic.id
              // });
              console.log("详情页面")
        },
        async __fetchMallInfo(){
            const [err,resp] = await this.$sync(this.$http.mall.getMallSwipe())
            if(!err) {
                this.swipeTopics = resp.result;
            }
        },
        async __fetchSwipeTopics(){
            const [err,resp] = await this.$sync(this.$http.mall.getMallList())
            if(!err) {
                const list = resp.result
                this.listPart = list.slice(0,6)
            }
        },
  		async __append() {
  			const [err, resp] = await this.$sync(
  				this.$http.mall.getMallList({ page: ++this.pageIndex })
              );
  			if (!err) {
                const list = resp.result;
  				if (list && list.length) {
                      this.listPart = this.listPart.concat(list);
  				}
  			}
        },
  		async __fetch() {
            await  this.__fetchMallInfo();
            await  this.__fetchSwipeTopics();
            this.isPrerender = false;
          },  
  	},
      mounted() {
          this.__fetch();
      }
  };
</script>

