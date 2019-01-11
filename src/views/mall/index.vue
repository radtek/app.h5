<style lang="scss">
  @import "../../assets/modules/mall/view-index.scss";
</style>
<style>
@import "//at.alicdn.com/t/font_995983_ivv5k0pc2sq.css";
</style>
<template>
  <section rs-view="index">
    <rx-pull ref="pull"
             :list="listPart2"
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
                    <rx-btn class="iconfont icon-wodedingdan1"
                            type="text"
                            @on-click="goto()"><p>我的订单</p></rx-btn>
                </rx-col>
                <rx-col>
                    <rx-btn class="iconfont icon-gouwuche"
                            type="text"
                            @on-click="goto()"><p>购物车</p></rx-btn>
                </rx-col>
                <rx-col>
                    <rx-btn class="iconfont icon-wodejifen"
                            type="text"
                            @on-click="goto()"><p>我的积分</p></rx-btn>
                </rx-col>
            </rx-row>
        </rx-card>
        <rx-card padding="h">
            <template slot="header">
                <span class="title"><i class="rx-icon icon-qa-heart"></i>热卖商品</span>
            </template>
            <mall-list :data="listPart2">
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
				import(/* webpackChunkName:"mall-list" */ "~v/mall/data/index-list.vue")
    },
  	data() {
  		return {
  			isPrerender: true,
            listPart1: [],
  			listPart2: [],
  			total: 1000,
  			pageIndex: 1,
            swipeTopics: [],
            index:6,
  		};
  	},
  	computed: {
  		list() {
  			return this.listPart2;
  		}
  	},
  	methods: {
  		onTopicGoto(topic, evt) {
  			// this.goto("话题详情", "/topic.detail", {
  			// 	qid: topic.id
              // });
              console.log("详情页面")
        },
  		async __append() {
  			// const [err, resp] = await this.$sync(
  			// 	this.$http.qa.getRecommendQ({ page: ++this.pageIndex })
              // );
              
              const err = false;
  			if (!err) {
                  // const list = resp.result;
                  let list = this.listPart1.slice(this.index,this.index+2);
                  this.index += 2;
  				if (list && list.length) {
                      this.listPart2 = this.listPart2.concat(list);
  				}
  			}
        },
  		__fetch() {
            this.__fetchMallInfo();
            this.isPrerender = false;
          },
        __fetchMallInfo(){
            this.swipeTopics = [{
                description: '<div><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></div><div class="editor-topic-block"><p>加班1<span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></p></div>',
                fileKey: ["FGfFQFacwJ@upload_8369b2936bc0cee8e30360edbca3a8e5.jpg"],
                id: "516684310121172992",
                imgPath: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546657924&di=d78403cf234fbca25cde7a02635cd751&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019def58ee313aa8012049ef69e432.jpg%401280w_1l_2o_100sh.jpg"],
          },{
                description: '<div><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></div><div class="editor-topic-block"><p>加班1<span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span><span style="font-size: 14px; color: rgb(48, 49, 51);">加班1</span></p></div>',
                fileKey: ["FGfFQFacwJ@upload_8369b2936bc0cee8e30360edbca3a8e5.jpg"],
                id: "516684310121172992",
                imgPath: ["https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062945526&di=05ce031f79c3d90c9c084b26ce7d0c3b&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c8415a77c3a4a80120a12372925c.jpg%402o.jpg"],
          }]
          this.listPart1 = [{
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
          this.listPart2 = this.listPart1.slice(0,6)
        }  
  	},
      mounted() {
          this.__fetch();
      }
  };
</script>

