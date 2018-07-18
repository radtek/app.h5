<style lang="sass">
@import "../../src/styles/widget/dialog.scss"
</style>

<template>
	<div class="rx-dialog-pane"
	     v-show="show">
		<transition :name="maskTransition">
			<div class="rx-mask"
			     v-if="mask"
			     :style="maskStyles"
			     @click="onMaskClick"></div>
		</transition>
		<transition :name="transitionName">
			<div class="rx-dialog">
				<slot></slot>
			</div>
		</transition>
	</div>
</template>

<script>
	export default {
		name: "RxDialog",
		props: {
			value: Boolean,
			mask: { type: Boolean, default: true },
			closeOnMask: { type: Boolean, default: true },
			maskZIndex: { type: Number, default: 1001 },
			maskTransition: { type: String, default: "rx-fade" },
			transitionName: { type: String, default: "rx-fade" }
		},
		data() {
			return {
				show: this.value
			};
		},
		computed: {
			maskStyles() {
				if (this.maskZIndex !== undefined) {
					return {
						zIndex: this.maskZIndex
					};
				}
			}
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.$emit("input", val);
				this.$emit(val ? "on-show" : "on-hide");
			}
		},
		methods: {
			onMaskClick() {
				if (!this.closeOnMask) return;
				this.show = false;
				this.$emit("on-mask-click");
			}
		}
	};
</script>
