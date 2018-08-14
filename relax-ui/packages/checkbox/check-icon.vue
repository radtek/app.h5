<style lang="sass">
@import "../../src/styles/form-ele/check-icon.scss"
</style>

<template>
	<div class="rx-chk-icon"
	     :class="[{[`vertical`]:vertical}]"
	     @click="onClick">
		<icon :name="checkedIcon"
		      v-show="isCheck"></icon>
		<icon :name="uncheckIcon"
		      v-show="!isCheck"></icon>
		<span>
			<slot></slot>
		</span>
	</div>
</template>

<script>
	import Icon from "../icon/icon";

	export default {
		name: "RxChkIcon",
		components: { Icon },
		props: {
			vertical: Boolean,
			value: Boolean,
			checkedIcon: { type: String, default: "success_circle" },
			uncheckIcon: { type: String, default: "circle" }
		},
		data() {
			return {
				isCheck: this.value
			};
		},
		watch: {
			isCheck(val) {
				this.$emit("input", val);
			},
			value(val) {
				this.isCheck = val;
			}
		},
		methods: {
			onClick() {
				this.isCheck = !this.isCheck;
				this.$emit("on-click", this.isCheck);
			}
		}
	};
</script>

