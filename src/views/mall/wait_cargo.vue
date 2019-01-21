<style lang="scss">
[rs-view="wait_cargo"] {
	.rx-card_header {
		font-size: 24px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		margin: 0 30px;
		padding: 0 !important;
		height: 80px;
		line-height: 80px;
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
			display: flex;
			justify-content: space-between;
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
		.right_bottom {
			margin-left: -20px;
			margin-top: 40px;
			.btn {
				width: 260px;
				height: 60px;
				background-color: #fff;
				border: 1px solid rgba(102, 102, 102, 1);
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				border-radius: 30px;
				outline: none;
			}
			.btn1 {
				border: 1px solid rgba(255, 161, 50, 1);
				color: rgba(255, 161, 50, 1);
			}
		}
	}
}
</style>

<template>
  <section rs-view="wait_cargo">
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
      <div class="separate" v-show="isShowUsers"></div>
      <template>
        <div v-for="(q,index) in listPart2" :key="index">
          <rx-card :header="q.text" class="card-users" v-show="isShowUsers" padding>
            <div class="content">
              <div class="left_logo">
                <img :src="q.imgpath" class="logo">
              </div>
              <div class="right_text">
                <p>{{q.title}}</p>
                <div class="info">
                  <span class="price">
                    <span class="money">{{q.score}}</span>
                    <span class="score">积分</span>
                    <span class="score" v-if="q.price">+￥{{q.price}}</span>
                  </span>
                  <span class="score">x{{q.number}}</span>
                </div>
                <div class="right_bottom" v-if="q.text=='卖家已接单'">
                          <router-link :to="{path:'/logistics-details'}">

									<button class="btn">查看物流</button>
                          </router-link>
                  <button class="btn btn1">确认收货</button>
                </div>
              </div>
            </div>
          </rx-card>
          <div class="separate" v-show="isShowUsers"></div>
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
	name: "wait_cargo",
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
		goto(){
			this.$router.push({path:'/logistics-details'})
		},
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
		this.listPart2 = [
			{
				imgpath:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546078815287&di=707f181d50d9c307becf48cfbce90968&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F04%2F2410313313401.jpg",
				title:
					"商品详细描述2018冬季新款男士羽绒服白 鹅绒加厚大码中长款式不好看吗,不好看 拷贝啊爱上的爱上sad",
				score: "1000",
				price: "123",
				number: 1,
				text: "卖家已接单",
				code:3
			},
			{
				imgpath:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546997048&di=c8601a948fde2c7f3a72bce28d28bbc5&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201409%2F18%2F20140918211118_tQTia.jpeg",
				title:
					"中新网1月2日电 综合报道，俄罗斯马格尼托尔斯克市发生一栋居民楼发生爆炸事故，导致多人死伤。事故发生超过35小时后，救援人员在废墟中救出了一名11个月大的男婴。",
				score: "1244",
				price: "111",
				number: 1,
				text: "卖家未接单"
			},
			{
				imgpath:
					"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1546402714138&di=042ec2743bdecb3820e9b31aa63c6a22&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201205%2F23%2F20120523224959_PGURF.jpeg",
				title:
					"中新网1月2日电 综合报道，俄罗斯马格尼托尔斯克市发生一栋居民楼发生爆炸事故，导致多人死伤。事故发生超过35小时后，救援人员在废墟中救出了一名11个月大的男婴。",
				score: "1514",
				price: "311",
				number: 1,
				text: "卖家已接单"
			}
		];
	},
	mounted() {}
};
</script>

