<!-- 抽奖转盘 -->

<style lang="sass">
@import "../../assets/modules/score/wc-lottery_turntable.scss";
</style>

<template>
	<div class="pane-turntable">
		<!-- <rx-toast></rx-toast> -->
		<div class="lottery-time">今日还剩
			<span class="strong">{{remainTime}}次</span> 抽奖机会哦</div>
		<img :src="getLocalMduImg('score','bg-panel')" />
		<img :src="getLocalMduImg('score','bg-lottery')"
		     class="z2" />
		<ul class="pane-lottery_items">
			<li v-for="(good,index) in goods"
			    :key="index"
			    :class="[{active:__isRight(activeIndex,index)}]">
				<template v-if="good.id>0">
					<template v-if="__isRight(activeIndex,index)">
						<img :src="getLocalMduImg('score','lottery-item-active')"
						     :alt="good.goodsTitle" />
					</template>
					<template v-else>
						<img :src="getLocalMduImg('score','lottery-item')"
						     :alt="good.goodsTitle" />
					</template>
					<img :src="good.goodsPic"
					     :alt="good.goodsTitle"
					     class="good-img" />
					<!-- <p class="good-title" v-html="__convertGoodsTitle(good)"></p> -->
					<p class="good-title">{{good.goodsTitle}}</p>
				</template>
				<template v-else>
					<img :src="getLocalMduImg('score','click')"
					     :alt="good.goodsTitle"
					     @click.stop="onClick(good)" />
				</template>
			</li>
		</ul>
	</div>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "LotteryTurntable",
		components: {
			Rolling: () =>
				import(/* webpackChunkName:"wc-lottery_rolling" */ "~c/score/lottery_rolling.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		props: {
			preRuntimes: {
				type: Number,
				default: 50
			}
		},
		data() {
			return {
				goods: [],
				remainTime: 0,
				cost: 0,
				activeIndex: -1,
				targetIndex: -1,
				speed: 190,
				postRunTimes: 20,
				timer: null,
				times: 0,
				isRunning: false,
				showToast: false,
				toastContent: ""
			};
		},
		methods: {
			__convertGoodsTitle(goodInfo) {
				if (goodInfo.goodsTitle.length > 2) {
					const preTwo = goodInfo.goodsTitle.substring(0, 2);
					const num = parseInt(preTwo, 10);
					if (
						!isNaN(num) &&
						(goodInfo.type === 1 || goodInfo.type === 2)
					) {
						return (
							goodInfo.goodsTitle.substring(0, 3) +
							"</br>" +
							goodInfo.goodsTitle.substring(3)
						);
					}
					return preTwo + "</br>" + goodInfo.goodsTitle.substring(2);
				}
				return goodInfo.goodsTitle;
			},
			__isRight(current, target) {
				return (
					(current === 0 && target === 0) ||
					(current === 1 && target === 1) ||
					(current === 2 && target === 2) ||
					(current === 3 && target === 5) ||
					(current === 4 && target === 8) ||
					(current === 5 && target === 7) ||
					(current === 6 && target === 6) ||
					(current === 7 && target === 3)
				);
			},
			__isNearStart() {
				return (
					(this.activeIndex === 0 && this.targetIndex === 0) ||
					(this.activeIndex === 7 && this.targetIndex === 3)
				);
			},
			__roll() {
				if (this.activeIndex === 7) {
					this.activeIndex = 0;
				} else {
					this.activeIndex += 1;
				}

				this.times += 1;

				if (this.times > this.preRuntimes + 8) {
					// 如果转盘此次的中奖位置是第一个的话,让转盘在减速转一圈,来达到缓冲效果;
					if (this.times - this.preRuntimes < this.postRunTimes) {
						// 最后面的几圈开始降速转动
						this.speed += 15;
					} else if (this.__isRight(this.activeIndex, this.targetIndex)) {
						// 确认到中奖

						clearTimeout(this.timer);

						setTimeout(() => {
							const good = this.goods[this.targetIndex];

							if (good.type === 0) {
								this.toastContent = "谢谢参与";
								this.showToast = true;
							} else {
								this.toastContent = `恭喜您获得了${
									good.goodsTitle
								}`;
								this.showToast = true;
								this.$emit("on-lotteried", good);
							}
						}, 200);

						return;
					}
				} else {
					this.speed -= 10;
				}

				if (this.speed < 50) {
					this.speed = 50;
				}

				this.timer = setTimeout(() => {
					this.__roll();
				}, this.speed);
			},
			__find(item) {
				for (let i = 0, l = this.goods.length; i < l; i++) {
					if (this.goods[i].id === item.goodsId) {
						return i;
					}
				}
				return -1;
			},
			onClick(good) {
				if (this.isRunning) return false;

				// 判断当前的剩余次数
				if (this.remainTime === 0) {
					// 弹出toast提示
					this.toastContent = "您的抽奖次数已用完";
					this.showToast = true;
					return false;
				}

				this.isRunning = true;

				this.$http.lottery
					.runLottery(this.AuthInfo)
					.then(res => {
						this.targetIndex = this.__find(res.result);
						this.__roll();
					})
					.catch(err => {
						// toast提示
						this.toastContent = err.msg;
						this.showToast = true;
						this.isRunning = false;
					});
			}
		},
		created() {
			this.getQS("unitid");

			this.$http.lottery.getLotteryProducts().then(res => {
				this.remainTime = res.lotteryCount;
				this.cost = res.spendScore;
				res.goods.splice(4, 0, {
					id: -1
				});
				this.goods = res.goods;
			});
		}
	};
</script>

