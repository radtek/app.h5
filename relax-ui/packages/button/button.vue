<!-- 
	公共组件button的开发

	1. 支持大小变换

	2. 自定义填充 

	3. 图标式

	4. 防重复点击

 -->

<template>
	<button class="rx-btn"
	        :disabled="btnDisabled || loading"
	        :autofocus="autofocus"
	        :type="nativeType"
	        :class="classes"
	        @click="onClick">
		<i class="rx-icon rx-icon-loading rx-looping"
		   v-if="loading"></i>
		<i :class="icon"
		   v-if="icon && !loading"></i>
		<span v-if="$slots.default">
			<slot></slot>
		</span>
	</button>
</template>

<script>
export default {
	name: "rxBtn",
	inject: {
		rxForm: { default: {} },
		rxFormItem: { default: {} }
	},
	props: {
		type: { type: String, default: "default" },
		nativeType: { type: String, default: "button" },
		size: String,
		icon: String,
		loading: Boolean,
		disabled: Boolean,
		plain: Boolean,
		autofocus: Boolean,
		round: Boolean,
		circle: Boolean
	},
	computed: {
		btnSize() {
			return this.size || this.rxForm.itemSize || this.rxFormItem.size;
		},
		btnDisabled() {
			return (
				this.dissabled ||
				this.rxForm.disabled ||
				this.rxFormItem.disabled
			);
		},
		classes() {
			return [
				this.type ? this.type : "",
				this.btnSize ? this.btnSize : "",
				{
					disabled: this.btnDisabled,
					loading: this.loading,
					plain: this.plain,
					round: this.round,
					circle: this.circle
				}
			];
		}
	},
	methods: {
		onClick(evt) {
			this.$emit("on-click", evt);
		}
	}
};
</script>