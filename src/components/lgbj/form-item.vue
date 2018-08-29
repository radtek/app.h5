<style lang="sass">
@import "../../assets/modules/lgbj/form-item.scss"
</style>

<template>
	<div class="rs-form-item"
	     :class="classes">
		<label class="rs-form-item__label">{{label}}</label>
		<div class="rs-form-item__content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RsFormItem",
		props: {
			required: { type: Boolean, default: true },
			status: Number,
			errmsg: String,
			label: String,
			labelWidth: Number,
			labelPosition: { type: String, default: "left" }
		},
		computed: {
			classes() {
				return [];
			}
		}
	};
</script>
