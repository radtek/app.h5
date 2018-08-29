<style lang="sass">
@import "../../src/styles/widget/step.scss"
</style>

<template>
	<div class="rx-step">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "RxStep",
		provide() {
			return {
				rxStep: this
			};
		},
		props: {
			value: Number
		},
		methods: {
			handleItemClick(step) {
				this.$emit("input", step);
			}
		}
	};
</script>

