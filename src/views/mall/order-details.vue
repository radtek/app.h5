<style lang="scss">
[rs-view="order-details"] {
	.header {
		display: flex;
		justify-content: space-between;
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
			.paid {
				width: 188px;
				height: 180px;
				margin-top: 30px;
				margin-right: 53px;
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
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
				line-height: 48px;
				margin: 19px 29px 30px 32px;
			}
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
        <div class="header">
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
      <template>
        <div class="address">
          <img src="../../assets/imgs/mall/address.png" alt class="address_logo">
          <div class="address_info">
            <div class="name">
              <span>{{ listPart2.name }} &ensp;</span>
              <span class="phone">{{ listPart2.phoneNum }}</span>
            </div>
            <div class="home">{{ listPart2.address }}</div>
          </div>
        </div>
      </template>
      <div class="separate" v-show="isShowUsers"></div>
      <template></template>
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
	components: {},
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
			text: "卖家已接单",
			code: 3,
			state: 1,
			expressNum: "1015615610251521012201"
		}),
			(this.list1 = [
				{
					info:
						"【台州市】 【临海市】 (0514-44156112) 的宋海兵 (13105602056) 已揽收",
					day: "2018.10.09"
				},
				{
					info:
						"【台州市】 【临海市】 (0514-44156112) 的宋海兵 (13105602056) 已取货",
					day: "2018.10.09"
				},
				{
					info:
						"【台州市】 【临海市】 (0514-44156112) 的宋海兵 (13105602056) 已投递",
					day: "2018.10.09"
				},
				{
					info:
						"【台州市】 【临海市】 (0514-44156112) 的宋海兵 (13105602056) 已签收",
					day: "2018.10.09"
				}
			]);
	},
	mounted() {}
};
</script>

