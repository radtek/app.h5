<style lang="sass">
@import "../../src/styles/widget/swipe-cell.scss"
</style>

<template>
	<div class="rx-swipe-cell">
		<div class="rx-swipe-cell_item"
		     @touchstart="start"
		     @touchmove="move"
		     @touchend="end">
			<div class="rx-swipe-cell_content"
			     :style="contentStyles">
				<slot></slot>
			</div>
			<div class="rx-swipe-cell_left"
			     v-show="diffX>=0"
			     :style="leftButtonStyles">
				<slot name="left-btns"></slot>
			</div>
			<div class="rx-swipe-cell_right"
			     v-show="diffX<=0"
			     :style="rightButtonStyles">
				<slot name="right-btns"></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxSwipeCell",
		props: {
			disabled: Boolean,
			btnsWidth: { type: Number, default: 240 }
		},
		data() {
			return {
				direction: "",
				diffX: 0,
				pageX: undefined,
				btnX: this.btnsWidth
			};
		},
		watch: {
			btnsWidth(val) {
				this.btnX = val;
			}
		},
		computed: {
			contentStyles() {
				const styles = {};
				styles.transform = `translate3d(${this.diffX}px,0,0)`;
				return styles;
			},
			leftButtonStyles() {
				const styles = {};
				styles.transform = `translate3d(${-this.btnX}px,0,0)`;
				return styles;
			},
			rightButtonStyles() {
				const styles = {};
				styles.transform = `translate3d(${this.btnX}px,0,0)`;
				return styles;
			}
		},
		methods: {
			start(event) {
				if (
					this.disabled ||
					event.target.nodeName.toLowerCase() === "button"
				)
					return;
				const touch = event.touches ? event.touches[0] : event;

				this.pageX = touch.pageX;
			},
			move(event) {
				if (this.disabled) return;

				if (event.target.nodeName.toLowerCase() === "button") {
					event.preventDefault();
					return;
				}

				const touch = event.touches ? event.touches[0] : event;

				this.diffX = touch.pageX - this.pageX;

				if (!this.direction) {
					this.direction = this.diffX > 0 ? "left" : "right";
				}

				// if (this.direction === "right") {
				// }

				console.log("move:", event, this.diffX);
			},
			end(event) {
				if (this.disabled) return;
				console.log("end:", event);
			}
		}
	};
</script>

