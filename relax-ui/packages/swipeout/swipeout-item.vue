<style lang="sass">
@import "../../src/styles/widget/swipeout.scss"
</style>

<template>
	<div class="rx-swipeout-item"
	     @touchstart="start"
	     @touchmove="move"
	     @touchend="end"
	     @touchcancel="end">
		<div class="rx-swipeout_left rx-swipeout_btn_box"
		     :style="leftMenuStyles">
			<slot name="leftMenu"></slot>
		</div>
		<div class="rx-swipeout_right rx-swipeout_btn_box"
		     :style="rightMenuStyles">
			<slot name="rightMenu"></slot>
		</div>
		<div class="rx-swipeout_content"
		     :style="contentStyles"
		     @touchstart="onContentClick">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
	import { eachChilds } from "../../src/utils/vdom/find";

	export default {
		name: "RxSwipeoutItem",
		props: {
			// 是否禁用
			disabled: Boolean,
			// 菜单显示触发的最小距离
			showMenuX: { type: Number, default: 40 },
			// 多少距离之后自动打开菜单或关闭菜单
			threshold: { type: Number, default: 0.5 },
			// 菜单点击的时候是否默认关闭
			autoCloseOnMenuClick: Boolean
		},
		provide() {
			return {
				swipeoutItem: this
			};
		},
		inject: {
			swipeout: { default: {} }
		},
		data() {
			return {
				contentSwipeX: 0,
				contentSwipeY: 0,
				// 滑动方向
				direction: "",
				hasRight: false,
				rightMenuWidth: 0,
				hasLeft: false,
				leftMenuWidth: 0,
				pageX: undefined,
				pageY: undefined
			};
		},
		computed: {
			isOpen() {
				return this.contentSwipeX !== 0;
			},
			contentStyles() {
				const styles = {};
				styles.transform = `translate3d(${this.contentSwipeX}px,0,0)`;
				styles.webkitTransform = styles.transform;
				return styles;
			},
			rightMenuStyles() {
				const styles = {};
				if (this.position === "right") {
					styles.transform = `translate3d(${this.rightMenuWidth +
						this.contentSwipeX}px,0,0)`;
					styles.webkitTransform = styles.transform;
				}
				return styles;
			},
			leftMenuStyles() {
				const styles = {};
				if (this.position === "left") {
					styles.transform = `translate3d(-${this.leftMenuWidth -
						this.contentSwipeX}px,0,0)`;
					styles.webkitTransform = styles.transform;
				}
				return styles;
			},
			menuWidth() {
				if (!this.hasLeft && this.hasRight) {
					return this.rightMenuWidth;
				}
				if (this.hasLeft && !this.hasRight) {
					return this.leftMenuWidth;
				}
				if (this.hasLeft && this.hasRight) {
					return this.contentSwipeX < 0
						? this.rightMenuWidth
						: this.leftMenuWidth;
				}
			}
		},
		methods: {
			__calcMenuWidth(position) {
				let width = 0;
				this.$slots[`${position}Menu`].forEach(child => {
					if (child && child.tag) {
						const propsData = child.componentOptions.propsData;
						width += propsData.width || 80;
					}
				});
				this[`${position}MenuWidth`] = width;
			},
			__initMenu() {
				if (this.$slots.leftMenu) {
					this.hasLeft = true;
					this.__calcMenuWidth("left");
				}
				if (this.$slots.rightMenu) {
					this.hasRight = true;
					this.__calcMenuWidth("right");
				}
			},
			handleMenuClick(action, evt) {
				this.$emit(`on-${action}`);
				if (this.autoCloseOnMenuClick) {
					this.close();
				}
			},
			onContentClick() {
				this.close();
			},
			start(evt) {
				if (
					this.disabled ||
					this.isOpen ||
					evt.target.tagName === "BUTTON"
				) {
					return;
				}

				// 通知当前父容器中的其他swipeoutitem去关闭
				if (this.swipeout) {
					const openItems = [];
					eachChilds(this.swipeout, "RxSwipeoutItem", child => {
						if (child.$data.contentSwipeX !== 0) {
							openItems.push(child);
						}
					});
					if (openItems.length) {
						openItems.forEach(item => item.close());
						evt.preventDefault();
						return;
					}
				}

				const touch = evt.touches ? evt.touches[0] : evt;

				this.pageX = touch.pageX;
				this.pageY = touch.pageY;
			},
			move(evt) {
				if (this.disabled) return;

				if (evt.target.tagName === "BUTTON" || this.pageX === undefined) {
					evt.preventDefault();
					return;
				}

				const touch = evt.touches ? evt.touches[0] : evt;

				const diffX = touch.pageX - this.pageX;
				this.contentSwipeY = touch.pageY - this.pageY;

				this.position = diffX > 0 ? "left" : diffX < 0 ? "right" : "";

				if ((diffX > 0 && !this.hasLeft) || (diffX < 0 && !this.hasRight)) {
					evt.preventDefault();
					return;
				}

				if (Math.abs(diffX) >= this.showMenuX) {
					// 超出规定的滑动小距离
					this.contentSwipeX = diffX;
				} else {
					this.position = "";
				}

				if (
					this.contentSwipeX !== 0 &&
					Math.abs(this.contentSwipeX) > this.menuWidth
				) {
					this.contentSwipeX =
						this.position === "right"
							? -this.menuWidth
							: this.menuWidth;
				}

				if (
					(this.position === "right" &&
						this.contentSwipeX < 0 &&
						this.hasRight) ||
					(this.position === "left" &&
						this.contentSwipeX > 0 &&
						this.hasLeft)
				) {
					this.valid = true;
					evt.preventDefault();
				}
			},
			end(evt) {
				if (
					this.disabled ||
					evt.target.tagName === "BUTTON" ||
					this.valid !== true
				)
					return;

				// 判断滑动的距离是否在thresold和menuWidth之间一半的距离,如果存在则直接设置成menuWidth
				const absX = Math.abs(this.contentSwipeX);
				if (absX > this.showMenuX && absX <= this.menuWidth) {
					// 判断是否关闭还是显示
					let validX = this.threshold;
					if (this.threshold < 1 && this.threshold > 0) {
						validX = this.threshold * this.menuWidth;
					}
					if (absX >= validX) {
						this.contentSwipeX =
							this.position === "right"
								? -this.menuWidth
								: this.menuWidth;
					} else {
						this.close();
					}
				}

				this.pageX = this.pageY = this.valid = undefined;
				this.position = "";
			},
			close() {
				this.$emit("on-close");
				this.contentSwipeX = 0;
			}
		},
		mounted() {
			this.$nextTick(() => {
				// 计算leftMenu和rightMenu的大小
				this.__initMenu();
			});
		}
	};
</script>

