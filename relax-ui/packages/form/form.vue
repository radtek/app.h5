<template>
	<div class="rx-form"
	     :class="[
			labelPosition ? 'rx-form--label-' + labelPosition : '',
			{ 'rx-form--inline': inline }
		 ]">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		name: "RxForm",
		componentName: "RxForm",
		provide() {
			return {
				rxForm: this
			};
		},
		props: {
			labelPosition: String,
			labelWidth: Number,
			labelSuffix: { type: String, default: "：" },
			inline: Boolean
		}
	};
</script>

