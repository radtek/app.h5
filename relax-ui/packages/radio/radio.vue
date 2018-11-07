<style lang="sass">
@import "../../src/styles/form-ele/radio.scss"
</style>

<template>
	<label :class="wrapClasses">
		<span :class="radioClasses">
			<span :class="innerClasses"></span>
			<input type="radio"
			       :class="inputClasses"
			       :disabled="disabled"
			       :checked="currentValue"
			       :name="groupName"
			       @change="change"
			       @focus="onFocus"
			       @blur="onBlur">
		</span>
		<slot><span class="rx-radio-text">{{ label }}</span></slot>
	</label>
</template>

<script>
	import Emitter from "../../src/mixins/emitter";
	const prefixCls = "rx-radio";
	export default {
		name: "RxRadio",
		mixins: [Emitter],
		props: {
			value: {
				type: [String, Number, Boolean],
				default: false
			},
			trueValue: {
				type: [String, Number, Boolean],
				default: true
			},
			falseValue: {
				type: [String, Number, Boolean],
				default: false
			},
			label: {
				type: [String, Number]
			},
			disabled: {
				type: Boolean,
				default: false
			},
			name: {
				type: String
			}
		},
		inject: {
			parentGroup: { default: {} }
		},
		data() {
			return {
				currentValue: this.value,
				group: false,
				groupName: this.name,
				focusWrapper: false,
				focusInner: false
			};
		},
		computed: {
			wrapClasses() {
				return [
					`${prefixCls}-wrapper`,
					{
						[`${prefixCls}-group-item`]: this.group,
						[`${prefixCls}-wrapper-checked`]: this.currentValue,
						[`${prefixCls}-wrapper-disabled`]: this.disabled,
						[`${prefixCls}-focus`]: this.focusWrapper
					}
				];
			},
			radioClasses() {
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-checked`]: this.currentValue,
						[`${prefixCls}-disabled`]: this.disabled
					}
				];
			},
			innerClasses() {
				return [
					`${prefixCls}-inner`,
					{
						[`${prefixCls}-focus`]: this.focusInner
					}
				];
			},
			inputClasses() {
				return `${prefixCls}-input`;
			}
		},
		mounted() {
			if (this.parentGroup) {
				this.group = true;
				if (this.name && this.name !== this.parentGroup.name) {
					/* eslint-disable no-console */
					if (console.warn) {
						console.warn(
							"[iview] Name does not match Radio Group name."
						);
					}
					/* eslint-enable no-console */
				} else {
					this.groupName = this.parentGroup.name;
				}
			}
			if (this.group) {
				this.parentGroup.updateValue();
			} else {
				this.updateValue();
			}
		},
		methods: {
			change(event) {
				if (this.disabled) {
					return false;
				}
				const checked = event.target.checked;
				this.currentValue = checked;
				const value = checked ? this.trueValue : this.falseValue;
				this.$emit("input", value);
				if (this.group) {
					if (this.label !== undefined) {
						this.parentGroup.change({
							value: this.label,
							checked,
							curValue: value
						});
					}
				} else {
					this.$emit("on-change", value);
					this.dispatch("RxFormItem", "on-form-change", value);
				}
			},
			updateValue() {
				this.currentValue = this.value === this.trueValue;
			},
			onBlur() {
				this.focusWrapper = false;
				this.focusInner = false;
			},
			onFocus() {
				if (this.group && this.parentGroup.type === "button") {
					this.focusWrapper = true;
				} else {
					this.focusInner = true;
				}
			}
		},
		watch: {
			value(val) {
				if (val === this.trueValue || val === this.falseValue) {
					this.updateValue();
				} else {
					console.warn("Value should be trueValue or falseValue.");
				}
			}
		}
	};
</script>
