<style lang="scss">
[rs-view="order-details"] {
	.header {
		height: 230px;
		background: linear-gradient(
			-30deg,
			rgba(0, 148, 237, 1),
			rgba(104, 194, 250, 0.71),
			rgba(0, 148, 237, 1)
		);
		color: #fff;
		.order_info {
			.text {
				margin-top: 50px;
				margin-left: 30px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				line-height: 48px;
				.text1 {
					font-size: 32px;
				}
				.text2 {
					font-size: 28px;
				}
				.text3 {
					font-size: 32px;
					margin-top: 100px;
					margin-left: 108px;
				}
			}
		}
		.logo {
			height: auto;
			width: auto;
			.paid {
				width: 188px;
				height: 180px;
				margin-right: 53px;
				margin-top: 28px;
			}
			.wait {
				width: 238px;
				height: 195px;
				margin-top: 30px;
				margin-right: 5px;
			}
			.finish {
				width: 193px;
				height: 198px;
				margin-top: 20px;
				margin-right: 47px;
			}
		}
	}
	.address {
		display: flex;
		align-items: center;
		.address_logo {
			width: 60px;
			height: 60px;
			margin-left: 29px;
		}
		.address_info {
			margin-top: 29px;
			.name {
				font-size: 32px;
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				margin-left: 32px;
				.phone {
					font-size: 28px;
				}
			}
			.home {
				line-height: 40px;
				margin: 19px 29px 30px 32px;
			}
		}
	}
	.black {
		font-size: 32px;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 48px;
	}
	.commodity {
		margin-left: 29px;
		margin-right: 31px;
		.commodity_info {
			zoom: 1;
			.commodity_money {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
			}
			.bt {
				padding-bottom: 20px;
				border-bottom: 1px solid rgba(230, 230, 230, 1);
			}
			.total {
				float: right;
				padding: 20px 0;
			}
		}
		.commodity_info::after {
			display: block;
			clear: both;
			content: "";
			visibility: hidden;
			height: 0;
		}
	}

	.gray {
		font-size: 28px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		line-height: 48px;
	}

	.df {
		display: flex;
		justify-content: space-between;
	}
	.pl {
		padding: 30px 0;
		padding-left: 28px;
	}
	.pr {
		padding: 30px 0;
		padding-right: 30px;
	}
	.content {
		display: flex;
		margin-top: 20px;
		margin-bottom: 44px;
	}

	.left_logo {
		width: 150px;
		margin-right: 20px;
	}

	.logo {
		width: 150px;
		height: 150px;
	}

	.right_text {
		font-size: 28px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);

		& > p {
			height: 80px;
			line-height: 40px;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		& > .info {
			margin-top: 40px;
			& > .price {
				& > .money {
					font-size: 32px;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(255, 161, 50, 1);
				}
				& > .score {
					font-size: 24px;
					font-family: PingFang-SC-Bold;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}
	.order_details {
		margin-top: 70px;
		.gf {
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(102, 102, 102, 1);
			margin-left: 29px;
			margin-bottom: 29px;
		}
	}
	.service {
		margin-top: 50px;
		margin-bottom: 60px;
		text-align: center;
	}
	.btn_service {
		font-size: 28px;
		width: 348px;
		height: 72px;
		color: rgba(0, 151, 238, 1);
		border: 1px solid rgba(0, 151, 238, 1);
		border-radius: 36px;
		background-color: #fff;
	}
	.logistics {
        margin: 0 29px ;
		border-bottom: 1px solid rgba(230, 230, 230, 1);
		.logistics_info {
			display: flex;
			align-items: center;
			.car {
				width: 60px;
				height: 60px;
				margin-right: 21px;
				margin-top: 40px;
			}
		}
		.info_text {
			font-size: 24px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(153, 153, 153, 1);
			.mt36 {
				margin-top: 36px;
			}
			.mt20 {
				margin-top: 20px;
			}
		}
		.blue {
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(0, 151, 238, 1);
			line-height: 48px;
			margin: 35px 0px 34px 82px;
		}
	}
}
</style>

<template>
  <section rs-view="order-details">
    <rx-pull
      ref="pull"
      :list="listPart2"
      :total="total"
      :down="down"
      :up="up"
      @downing="handleDown"
      @uping="handleUp"
      @scroll-end="handleScrollEnd"
    >
      <rx-pull-down slot="down"></rx-pull-down>
      <rx-pull-up slot="up"></rx-pull-up>
      <template>
        <div class="header df">
          <div class="order_info">
            <div v-if="listPart2.state == 1" class="text">
              <div class="text1">已付款</div>
              <div class="text2">等待卖家接单</div>
            </div>
            <div v-if="listPart2.state == 2" class="text">
              <div class="text1">待发货</div>
              <div class="text2">等待卖家发货</div>
            </div>
            <div v-if="listPart2.state == 3" class="text">
              <div class="text1">待收货</div>
              <div class="text2">7天后系统会自动默认收货</div>
            </div>
            <div v-if="listPart2.state == 4" class="text">
              <div class="text3">交易完成</div>
            </div>
          </div>
          <div class="logo">
            <img src="../../assets/imgs/mall/paid.png" alt class="paid" v-if="listPart2.state == 1">
            <img src="../../assets/imgs/mall/wait.png" alt class="wait" v-if="listPart2.state == 2">
            <img src="../../assets/imgs/mall/take.png" alt class="wait" v-if="listPart2.state == 3">
            <img
              src="../../assets/imgs/mall/finish.png"
              alt
              class="finish"
              v-if="listPart2.state == 4"
            >
          </div>
        </div>
      </template>
      <template v-if="listPart2.state == 3">
        <div class="logistics">
          <div class="logistics_info">
            <img src="../../assets/imgs/mall/car.png" alt class="car">
            <div class="info_text">
              <div class="mt36">物流公司：{{ listPart2.company}}</div>
              <div class="mt20">物流单号：{{ listPart2.logisticsNum }}</div>
            </div>
          </div>
          <div class="blue">{{ listPart2.logisticsInfo}}</div>
        </div>
      </template>
      <template>
        <div class="address">
          <img src="../../assets/imgs/mall/address.png" alt class="address_logo">
          <div class="address_info">
            <div class="name">
              <span>{{ listPart2.name }} &ensp;</span>
              <span class="phone">{{ listPart2.phoneNum }}</span>
            </div>
            <div class="home gray">{{ listPart2.address }}</div>
          </div>
        </div>
      </template>
      <div class="separate" v-show="isShowUsers"></div>
      <template>
        <div class="commodity">
          <div class="content">
            <div class="left_logo">
              <img :src="listPart2.imgpath" class="logo">
            </div>
            <div class="right_text">
              <p>{{listPart2.title}}</p>
              <div class="info df">
                <span class="price">
                  <span class="money">{{listPart2.score}}</span>
                  <span class="score">积分</span>
                  <span class="score" v-if="listPart2.price">+￥{{listPart2.price}}</span>
                </span>
                <span class="score">x{{listPart2.number}}</span>
              </div>
            </div>
          </div>
          <div class="commodity_info">
            <ul>
              <li v-for="(q,index) in list1" :key="index" class="commodity_money gray">
                <span>{{ q.info }} &ensp; x{{ q.number }}</span>
                <span>￥{{ q.money }}.00</span>
              </li>
              <li class="gray bt df">
                <span>邮费</span>
                <span>￥{{ listPart2.postage }}.00</span>
              </li>
            </ul>
            <div class="total black" >总计：￥{{ listPart2.paymoney }}.00</div>
          </div>
        </div>
        <div class="separate" v-show="isShowUsers"></div>
        <div class="payscore df">
          <span class="gray pl">消耗积分</span>
          <span class="black pr">{{ listPart2.payscore }}分</span>
        </div>
        <div class="separate" v-show="isShowUsers"></div>
      </template>
      <template>
        <div class="order_details">
          <div class="gf">订单编号：{{ listPart2.orderNum }}</div>
          <div class="gf">支付方式：{{ listPart2.payWay}}</div>
          <div class="gf">付款时间：{{ listPart2.payTime }}</div>
        </div>
        <div class="service">
          <button class="btn_service">联系客服</button>
        </div>
      </template>
      <div class="separate" v-show="isShowUsers"></div>

      <mall-list :data="listPart1"></mall-list>
    </rx-pull>
  </section>
</template>

<script>
import { utils } from "~rx";
import Pull from "~m/pull";
import Msgbox from "~m/__msgbox";
import UserNameMixin from "~m/__username";
export default {
	name: "logistics-details",
	components: {
		mallList: () =>
			import(/* webpackChunkName:"mall-list" */ "~c/mall/index-list.vue")
	},
	mixins: [Pull, Msgbox],
	provide() {
		return {
			qaList: this
		};
	},
	data() {
		return {
			listPart1: [],
			listPart2: [],
			isShowUsers: true,
			total: 1000,
			pageIndex: 1,
			swipeTopics: []
		};
	},
	computed: {
		list() {
			return this.listPart2;
		}
	},
	methods: {
		async __fetchUserInfo() {
			const [err, resp] = await this.$sync(this.$http.user.getUserInfo());

			if (!err) {
				this.userInfo = resp.result;
				this.isPrerender = false;
				this.$rxUtils.asyncCmp.dataReady.call(this, "ImUsers");
			}
		},
		async __fetchSwipeTopics() {
			const [err, resp] = await this.$sync(
				this.$http.qa.getSwipeTopics()
			);

			if (!err) {
				this.swipeTopics = resp.result;
			}
		},
		async __fetchRecommendQ() {
			const [err, resp] = await this.$sync(this.$http.qa.getRecommendQ());

			if (!err) {
				const list = resp.result;
				if (list && list.length > 2) {
					this.listPart1 = list.slice(0, 2);
					this.listPart2 = list.slice(2);
				}
				this.isPrerender2 = false;
				this.$rxUtils.asyncCmp.dataReady.call(this, "ItemOfQA");
			}
		},
		__fetch() {
			return Promise.all([
				this.__fetchUserInfo(),
				this.__fetchSwipeTopics(),
				this.__fetchRecommendQ()
			]);
		},
		async __append() {}
	},
	created() {
		(this.listPart2 = {
			imgpath:
				"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546078815287&di=707f181d50d9c307becf48cfbce90968&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F04%2F2410313313401.jpg",
			title:
				"商品详细描述2018冬季新款男士羽绒服白 鹅绒加厚大码中长款式不好看吗,不好看 拷贝啊爱上的爱上sad",
			score: "1000",
			price: "123",
			number: 1,
			name: "宋海兵",
			phoneNum: 12356056116,
			address: "江西省南昌市宋海兵县宋海兵村宋海兵家宋海兵责任有限公司",
			postage: 15,
			paymoney: 222,
			payscore: 4000,
			orderNum: 98487458212135123,
			company: "顺丰速递",
			logisticsNum: 553463412352352,
			logisticsInfo:
				"2018.10.10 12:00 【南昌市】 快件离开 【南昌中转部】 发往 【南昌宋海兵家】",
			payWay: "银行卡支付",
			payTime: "2018-10-12 12:30",
			text: "卖家已接单",
			code: 3,
			state: 1,
			expressNum: "1015615610251521012201"
		}),
			(this.list1 = [
				{
					info: "女士羽绒服",
					number: 2,
					money: 100
				},
				{
					info: "女士内衣",
					number: 1,
					money: 200
				},
				{
					info: "男士内裤",
					number: 3,
					money: 100
				},
				{
					info: "男士羽绒服",
					number: 1,
					money: 200
				}
			]),
			(this.listPart1 = [
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "一小米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "二大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "三大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "四大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "五大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "六大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "七大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "八大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "九大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "十大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "十一大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				},
				{
					imgPath:
						"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546062882373&di=095c3725756ffb2c052a62d87428a4e9&imgtype=0&src=http%3A%2F%2Fpimages3.tianjimedia.com%2Fresources%2Fproduct%2F20170726%2F8076HJWF0941O8W7KZ6542417ODVFJB7.jpg",
					title: "十二大米小钢炮蓝牙音箱",
					score: "1000",
					price: "48",
					oldPrice: "88"
				}
			]);
	},
	mounted() {}
};
</script>

