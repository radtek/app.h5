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
			<div>
				<slot name="leftMenu"></slot>
			</div>
		</div>
		<div class="rx-swipeout_right rx-swipeout_btn_box"
		     :style="rightMenuStyles">
			<div>
				<slot name="rightMenu"></slot>
			</div>
		</div>
		<div class="rx-swipeout_content"
		     :style="contentStyles">
			<slot name="content"></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxSwipeoutItem",
		props: {
			// 是否禁用
			disabled: Boolean,
			threshold: { type: Number, default: 40 }
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
				return this.contentSwipeX > this.threshold;
			},
			contentStyles() {
				const styles = {};
				styles.transform = `translate3d(${this.contentSwipeX}px,0,0)`;
				styles.webkitTransform = styles.transform;
				return styles;
			},
			rightMenuStyles() {
				const styles = {};
				if (this.direction === "left") {
					styles.transform = `translate3d(${this.rightMenuWidth +
						this.contentSwipeX}px,0,0)`;
					styles.webkitTransform = styles.transform;
				}
				return styles;
			},
			leftMenuStyles() {
				const styles = {};
				if (this.direction === "right") {
					styles.transform = `translate3d(-${this.leftMenuWidth -
						this.contentSwipeX}px,0,0)`;
					styles.webkitTransform = styles.transform;
				}
				return styles;
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
			handleMenuClick(action, actionParams) {},
			start(evt) {
				if (
					this.disabled ||
					this.isOpen ||
					evt.target.tagName === "BUTTON"
				) {
					return;
				}

				// 通知当前父容器中的其他swipeoutitem去关闭

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

				if (Math.abs(diffX) >= this.threshold) {
					this.contentSwipeX = diffX;
				}

				this.direction = this.contentSwipeX > 0 ? "right" : "left";
			},
			end(evt) {
				if (this.disabled || evt.target.tagName === "BUTTON") return;
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

