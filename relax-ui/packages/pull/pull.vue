<style lang="sass">
@import "../../src/styles/widget/pull.scss"
</style>

<template>
	<div ref="wrapper"
	     class="rx-pull-wrap"
	     :class="[{'show-up':showUp}]"
	     :style="wrapStyles">
		<div ref="scrollContent"
		     class="rx-pull"
		     :class="[{[`scrollx`]:!vertical}]"
		     :style="contentStyles">
			<div ref="listWrapper">
				<slot></slot>
			</div>
			<div ref="up"
			     class="rx-pull-up"
			     :style="upStyles"
			     v-if="($scopedSlots.up || $slots.up) && canPull && showUp">
				<slot name="up"
				      :conf="upConf"></slot>
			</div>
		</div>
		<div ref="down"
		     class="rx-pull-down"
		     :style="downConf.style"
		     v-if="($scopedSlots.down || $slots.down)  && canPull">
			<slot name="down"
			      :conf="downConf"></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	import Flexible from "../../src/mixins/flexible.js";
	export default {
		name: "RxPull",
		mixins: [Flexible],
		provide() {
			return {
				pull: this,
				pullDownConf: this.downConf,
				pullUpConf: this.upConf
			};
		},
		props: {
			canPull: { type: Boolean, default: true },
			// 距离顶部的位移
			topOffset: { type: Number, default: 0 },
			// 距离底部的位移
			bottomOffset: { type: Number, default: 0 },
			// 上拉加载的提示栏的高度
			upTipHeight: { type: Number, default: 50 },
			// 当前组件是否是属于异步加载进入的
			async: Boolean,
			vertical: { type: Boolean, default: true },
			// 是否透传点击事件
			click: { type: Boolean, default: true },
			// 是否显示滚动条
			scrollbar: Boolean,
			// 是否开启自由滚动
			freeScroll: Boolean,
			// 下拉刷新的开启配置或者取消
			down: { type: [Object, Boolean], default: false },
			// 上拉加载的开启配置或者取消
			up: { type: [Object, Boolean], default: false },
			/**
			 * 1 滚动的时候会派发scroll事件，会截流。
			 * 2 滚动的时候实时派发scroll事件，不会截流。
			 * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
			 */
			probeType: { type: Number, default: 1 },
			/**
			 * 当数据更新后，刷新scroll的延时。
			 */
			refreshDelay: { type: Number, default: 20 },
			// 待监听的数据列表
			list: Array,
			// 数据的总数,主要用来控制上拉加载更多功能的开放与否
			total: { type: Number, default: 0 },
			// 是否提供滚动前的监听
			listenBeforeScroll: Boolean,
			// 是否监听scroll事件
			listenScroll: Boolean,
			// 是否监听touchend事件
			listenTouch: Boolean,
			// 是否监听滚动结束事件
			listenScrollend: { type: Boolean, default: true }
		},
		data() {
			return {
				innerClick: true,
				height: 0,
				isRebounding: false,
				downInitTop: -50,
				downConf: {
					status: "prepare",
					style: `top:${this.getRealSize(-50)}`,
					pos: {}
				},
				upConf: {
					status: "prepare"
				},
				pullUpDirty: false,
				wrapRect: {}
			};
		},
		computed: {
			showUp() {
				return this.list && this.list.length;
			},
			realUpTipHeight() {
				return this.getRealSize(this.upTipHeight);
			},
			wrapStyles() {
				const styles = {};

				if (this.vertical) {
					if (!this.height) {
						this.height =
							window.innerHeight -
							this.wrapRect.top -
							this.bottomOffset;
					}

					styles.height = `${this.getRealSize(this.height)}`;
				}

				return styles;
			},
			contentStyles() {
				const styles = {};

				if (this.canPull && this.showUp && this.upTipHeight) {
					styles.paddingBottom = `${this.realUpTipHeight}`;
				} else {
					styles.paddingBottom = 0;
				}

				return styles;
			},
			upStyles() {
				const styles = {};

				if (this.showUp && this.upTipHeight) {
					styles.height = `${this.realUpTipHeight}`;
					styles.bottom = 0;
				}

				return styles;
			}
		},
		watch: {
			innerClick(val) {
				this.$emit("update:click", val);
			},
			click(val) {
				this.innerClick = val;
			},
			list(val) {
				setTimeout(() => {
					this.__forceUpdate(true);

					this.$nextTick(() => {
						this.height = window.innerHeight - this.wrapRect.top;
					});
				}, this.refreshDelay);
			},
			canPull(val) {
				if (this.scroller) {
					if (val) {
						this.scroller.openPullDown(this.down);
						this.scroller.openPullUp(this.up);
					} else {
						this.scroller.closePullDown();
						this.scroller.closePullUp();
					}
				}
			},
			bottomOffset(val) {
				this.height = window.innerHeight - this.wrapRect.top - val;
			}
		},
		methods: {
			__initScoll() {
				if (!this.$refs.wrapper) return;

				this.wrapRect = this.$refs.wrapper.getBoundingClientRect();

				const options = {
					probeType: this.probeType,
					click: this.innerClick,
					scrollbar: this.scrollbar,
					freeScroll: this.freeScroll,
					scrollY: this.freeScroll || this.vertical,
					scrollX: this.freeScroll || !this.vertical,
					pullDownRefresh: this.down,
					pullUpLoad: this.up
				};

				this.scroller = new BScroll(
					this.$refs.wrapper,
					// options.scrollX ? this.$refs.listWrapper : this.$refs.wrapper,
					options
				);

				// 是否派发列表滚动开始的事件
				if (this.listenBeforeScroll) {
					this.scroller.on("beforeScrollStart", () => {
						this.$emit("before-scroll");
					});
				}

				// 是否派发滚动事件
				if (this.listenScroll) {
					this.scroller.on("scroll", pos => {
						this.$emit("scroll", pos);
					});
				}

				if (this.listenScrollend) {
					this.scroller.on("scrollEnd", pos => {
						if (this.$refs.scrollContent) {
							this.$refs.scrollContent.style.cssText += `;-webkit-transform:${
								this.$refs.scrollContent.style.transform
							};`;
						}
						this.$emit("scroll-end", pos, {
							maxX: this.scroller.maxScrollX,
							maxY: this.scroller.maxScrollY
						});
					});
				}

				if (this.down) {
					this.handleDown();
				}

				if (this.up) {
					this.handleUp();
				}
			},
			scrollTo(x, y, time) {
				return this.scroller && this.scroller.scrollTo(x, y, time);
			},
			scrollToTop(time) {
				this.scroller && this.scroller.scrollTo(0, 0, time || 300);
			},
			refresh() {
				if (this.scroller) {
					setTimeout(() => {
						this.scroller.refresh();
					}, this.refreshDelay);
				}
			},
			destroy() {
				return this.scroller && this.scroller.destroy();
			},
			// 一般用在处理获取数据异常和获取数据为空以及需要制定获取特定数据行数提示的下拉刷新状态
			finishPullDown(dataStatus, customInfo) {
				if (dataStatus === "error") {
					this.downConf.status = "error";
				} else {
					this.downConf.status =
						dataStatus === "empty" ? "empty" : "complete";
				}
				this.downConf.info = customInfo;
			},
			finishPullUp(dataStatus, customInfo) {
				this.upConf.info = customInfo;
				if (dataStatus === "error") {
					this.upConf.status = "error";
				} else {
					this.upConf.status =
						dataStatus === "empty" ? "empty" : "complete";
					return this.scroller && this.scroller.finishPullUp();
				}
			},
			refreshDowning() {
				this.downConf.status = "ing";
				this.$emit("downing");
			},
			refreshUping() {
				this.upConf.status = "ing";
				this.$emit("uping");
			},
			handleDown() {
				this.scroller.on("pullingDown", () => {
					this.downConf.status = "ing";
					this.$emit("downing");
				});
				this.scroller.on("scroll", pos => {
					if (!this.down || pos.y < 0) return;
					if (this.downConf.status === "prepare") {
						this.downConf.pos = pos;
						this.downConf.style = `top:${Math.min(
							pos.y + this.downInitTop,
							20
						)}px`;
					}
					if (this.isRebounding) {
						this.downConf.style = `top:${20 -
							(this.down.stop - pos.y)}px`;
					}
				});
			},
			handleUp() {
				this.scroller.on("pullingUp", () => {
					this.upConf.status = "ing";
					this.$emit("uping");
				});
			},
			__forceUpdate(dirty) {
				if (this.down && this.downConf.status === "ing") {
					this.downConf.status = "complete";
					this._reboundPullDown().then(() => {
						this._afterPullDown();
					});
				} else if (this.up && this.upConf.status === "ing") {
					this.upConf.status = "prepare";
					this.finishPullUp();
					this.pullUpDirty = dirty;
					this.refresh();
				} else {
					this.refresh();
				}
			},
			_reboundPullDown() {
				const { stopTime = 600 } = this.down;
				return new Promise(resolve => {
					setTimeout(() => {
						this.isRebounding = true;
						this.scroller.finishPullDown();
						resolve();
					}, stopTime);
				});
			},
			_afterPullDown() {
				setTimeout(() => {
					this.downConf.style = `top:${this.getRealSize(
						this.downInitTop
					)}`;
					this.downConf.status = "prepare";
					this.isRebounding = false;
					this.refresh();
				}, this.scroller.options.bounceTime);
			}
		},
		created() {
			// 判断是否是android还是IOS
			const ua = navigator.userAgent.toLowerCase();

			// 是否是iphone客户端
			// const isIPhone = ~ua.indexOf("iphone");

			this.innerClick = !!~ua.indexOf("android");

			this.$on("fn-init", () => {
				this.__initScoll();
			});
		},
		mounted() {
			if (!this.async) {
				setTimeout(() => {
					this.__initScoll();
				}, 30);
			}
		}
	};
</script>
