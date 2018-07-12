<style lang="sass">
@import "../../src/styles/transition/transition.scss"
@import "../../src/styles/widget/toast.scss"
</style>

<template>
	<div class="rx-toast">
		<div class="rx-toast_mask"
		     v-show="mask && show"></div>
		<transition :name="currentTransition">
			<div class="rx-toast_content"
			     :class="toastClass"
			     v-show="show">
				<p class="rx-toast_txt"
				   v-if="text"
				   v-html="text"></p>
				<p class="rx-toast_txt"
				   v-else>
					<slot></slot>
				</p>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "RxToast",
		props: {
			position: { type: String, default: "top" },
			time: { type: Number, default: 2000 },
			width: { type: [String, Number], default: "auto" },
			value: Boolean,
			mask: Boolean,
			text: String,
			transition: String
		},
		data() {
			return {
				show: this.value
			};
		},
		computed: {
			currentTransition() {
				if (this.transition) return this.transition;

				if (this.position === "top") {
					return "rx-slide-from-top";
				}
				if (this.position === "bottom") {
					return "rx-slide-from-bottom";
				}

				return "rx-fade";
			},
			toastClass() {
				return [
					{
						[`top`]: this.position === "top",
						[`middle`]: this.position === "middle",
						[`bottom`]: this.position === "bottom"
					}
				];
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				if (val) {
					this.$emit("input", true);
					this.$emit("on-show");
					clearTimeout(this.timeout);
					this.timeout = setTimeout(() => {
						this.show = false;
						this.$emit("input", false);
						this.$emit("on-hide");
					}, this.time);
				}
			}
		},
		created() {
			if (this.value) {
				this.show = true;
			}
		}
	};
</script>



