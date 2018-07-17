<style lang="sass">
@import "../../assets/modules/score/wc-lottery_rolling.scss"
</style>

<template>
	<div class="ctn-rolling"
	     ref="container">
		<div class="pane-rolling">
			<div class="pane-rolling-inner"
			     ref="list">
				<ul :style="styles">
					<li v-for="(user,index) in users"
					    :key="index">
						{{user.userName}}获得了{{user.goodsTitle}}
					</li>
				</ul>
			</div>
			<div class="pane-rolling-inner"
			     ref="listCopy">
				<ul :style="styles">
					<li v-for="(user,index) in users"
					    :key="index">
						{{user.userName}}获得了{{user.goodsTitle}}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LotteryRolling",
		props: {
			unitId: String
		},
		data() {
			return {
				totalWidth: 0,
				users: [],
				curIndex: 0,
				interval: null
			};
		},
		computed: {
			styles() {
				return {
					[`width`]: this.totalWidth > 0 ? `${this.totalWidth}px` : "100%"
				};
			},
			parent() {
				return this.$parent.$el;
			}
		},
		watch: {
			users(val) {
				if (val && val.length) {
					this.__calcTotalWidth();
				}
			}
		},
		methods: {
			__marquee() {
				const scrollLeft = this.$refs.container.scrollLeft;
				const offsetWidth = this.$refs.listCopy.offsetWidth;
				if (scrollLeft - offsetWidth >= 0) {
					this.$refs.container.scrollLeft -= this.$refs.list.offsetWidth;
				} else {
					this.$refs.container.scrollLeft++;
				}
			},
			__calcTotalWidth() {
				this.totalWidth = Math.ceil(this.fixWidth / 2) * this.users.length;
			},
			fetchData() {
				return this.$http.lottery
					.getLatestLotteriedUsers({ unitId: this.unitId })
					.then(res => {
						this.users = res.record;
						this.__calcTotalWidth();
						this.interval = setInterval(() => {
							this.__marquee();
						}, 20);
					});
			}
		},
		created() {
			this.$on("fn.update", () => {
				this.fetchData();
			});
		},
		mounted() {
			this.fixWidth = this.$refs.container.getBoundingClientRect().width;
			this.fetchData();
			setInterval(() => {
				clearInterval(this.interval);
				this.fetchData();
			}, 60 * 1000);
		}
	};
</script>

