<style lang="sass">
@import "../../src/styles/form-ele/radio-group.scss"
</style>

<template>
	<div :class="classes"
	     :name="name">
		<slot></slot>
	</div>
</template>
<script>
	import { eachChilds } from "../../src/utils/vdom/find";
	import Emitter from "../../src/mixins/emitter";
	const prefixCls = "rx-radio-group";
	let seed = 0;
	const now = Date.now();
	const getUuid = () => `rxRadioGroup_${now}_${seed++}`;
	export default {
		name: "RxRadioGroup",
		mixins: [Emitter],
		provide() {
			return {
				parentGroup: this
			};
		},
		props: {
			value: {
				type: [String, Number],
				default: ""
			},
			vertical: {
				type: Boolean,
				default: false
			},
			name: {
				type: String,
				default: getUuid
			}
		},
		data() {
			return {
				currentValue: this.value,
				childrens: []
			};
		},
		computed: {
			classes() {
				return [
					`${prefixCls}`,
					{
						[`${prefixCls}-vertical`]: this.vertical
					}
				];
			}
		},
		mounted() {
			this.updateValue();
		},
		methods: {
			updateValue() {
				eachChilds(this, "RxRadio", child => {
					child.currentValue = this.currentValue === child.label;
					child.group = true;
				});
				// this.childrens = findChildrenComponent(this, "RxRadio");

				// if (this.childrens && Array.isArray(this.childrens)) {
				// 	this.childrens.forEach(child => {
				// 		child.currentValue = this.currentValue === child.label;
				// 		child.group = true;
				// 	});
				// } else {
				// 	this.childrens.currentValue =
				// 		this.currentValue === this.childrens.label;
				// 	this.childrens.group = true;
				// }
			},
			change(data) {
				this.currentValue = data.value;
				this.updateValue();
				this.$emit("input", data.value);
				this.$emit("on-change", data.value);
				this.dispatch("RxFormItem", "on-form-change", data.value);
			}
		},
		watch: {
			value() {
				if (this.currentValue !== this.value) {
					this.currentValue = this.value;
					this.$nextTick(() => {
						this.updateValue();
					});
				}
			}
		}
	};
</script>