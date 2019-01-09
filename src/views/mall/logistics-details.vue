<style lang="scss">
[rs-view="logistics-details"] {
	.goods {
		border-top: 1px solid #ccc;
		display: flex;
		padding-top: 30px;
		.left_logo {
			margin: 0 20px 40px 30px;
			.logo {
				width: 150px;
				height: 150px;
			}
		}
		.right_text {
			display: flex;
			flex-direction: column;
			.state_text {
				font-size: 32px;
				color: #333;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				.state {
					color: #0097ee;
				}
			}
			.express_text {
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-top: 30px;
			}
			.official_text {
				font-size: 24px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(153, 153, 153, 1);
				margin-top: 20px;
			}
		}
	}
	.main {
		padding-top: 40px;
		.title {
			font-size: 32px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			padding-left: 10px;
			border-left: 5px solid #0097ee;
			margin-left: 30px;
			margin-bottom: 38px;
		}
		.list {
			font-size: 28px;
			font-family: PingFang-SC-Regular;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
			line-height: 48px;
			position: relative;
			margin-left: 40px;
			padding-left: 48px;
			padding-bottom: 58px;
			border-left: 1px solid #999;

			.list_border {
        
				.circle {
					position: absolute;
					left: -10px;
					width: 20px;
					height: 20px;
					border-radius: 50%;
					background-color: #999;
				}
			
			}
		}
		.list:last-child {
			border-left: 0;
		}
	}
}
</style>

<template>
  <section rs-view="logistics-details">
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
        <div class="goods">
          <div class="left_logo">
            <img :src="listPart2.imgpath" class="logo">
          </div>
          <div class="right_text">
            <span class="state_text">
              物流状态：
              <span class="state">{{ listPart2.state }}</span>
            </span>
            <span class="express_text">中通快速: {{ listPart2.expressNum }}</span>
            <span class="official_text">官方电话 95554></span>
          </div>
        </div>
      </template>
      <div class="separate" v-show="isShowUsers"></div>
      <template>
        <div class="main">
          <div class="title">物流跟踪信息</div>
          <ul>
            <li v-for="(q,index) in list1" :key="index" class="list">
              <div class="list_border">
                <span class="circle"></span>
                <p class="list_text">{{ q.info }}</p>
                <span class="time">{{ q.day }}</span>
              </div>
            </li>
          </ul>
        </div>
      </template>
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
			text: "卖家已接单",
			code: 3,
			state: "运输中",
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

