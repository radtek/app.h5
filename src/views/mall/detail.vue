<style lang="scss">
  @import "../../assets/modules/mall/view-detail.scss";
</style>
<style>
@import "//at.alicdn.com/t/font_995983_in1makh95s.css";
</style>
<template>
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
    <div class="detail" v-else>
        <div class="nav">
            <div class="col">
                <router-link :to="{path:'/wait_cargo'}">
                    <div class="dj">
                        <rx-btn class="iconfont icon-dingdan"
                                type="text">
                                <p>待接订单</p>
                                <span class="dot">9</span>
                                </rx-btn>
                    </div>
                </router-link>    
            </div>
            <div class="col">
                <router-link :to="{path:'/wait_cargo'}">
                    <div class="df">
                        <rx-btn class="iconfont icon-daifahuo"
                                type="text">
                                <p>待发货</p>
                                <span class="dot">9</span>
                                </rx-btn>
                    </div>
                </router-link>    
            </div>
            <div class="col">
                <router-link :to="{path:'/wait_cargo'}">
                    <div class="ds">
                        <rx-btn class="iconfont icon-daishouhuo"
                                type="text">
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
        <div class="empty"
             v-if="empty">
             <rx-btn class="iconfont icon-dingdan"
                     type="text"><p>你还没有相关订单</p></rx-btn>
             </div>
        <div class="item"
             v-for="(item,index) in listPart"
             :key="index"
             v-else>
            <div class="msg">
                <div class="data">2018.10.12</div>
                <div class="state">交易完成</div>
            </div>
            <div class="list">
                <div class="pic">
                    <img :src="item.img" alt="">
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
            listPart:[],
            isPrerender: true,
            total:100,
            empty:false,
            pageIndex: 1,
        }
    },
    computed: {
  		list() {
  			return this.listPart;
  		}
  	},
    methods: {
        goto(){
            console.log('a')
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
        async __fetchDetailList(){
            const [err,resp] = await this.$sync(this.$http.mall.getDetailList())
            if(!err) {
                const list = resp.result
                this.listPart = list.slice(0,6)

            }
        },
        async __fetch(){
            await this.__fetchDetailList()
            this.isPrerender = false;
        }
    },
    mounted(){
        this.__fetch();
    }
}
</script>
