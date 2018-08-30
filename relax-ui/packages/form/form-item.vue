<style lang="sass">
@import "../../src/styles/form-ele/form.scss"
</style>

<template>
	<div class="rx-form-item"
	     :class="classes">
		<label class="rx-form-item__label"
		       :style="labelStyles">
			<span class="__flag"
			      v-if="required">*</span>
			<slot name="label">{{label+ rxForm.labelSuffix}}</slot>
		</label>
		<div class="rx-form-item__content"
		     :style="contentStyles">
			<slot></slot>
			<div class="rx-form-item__err"
			     v-show="!!errmsg && !errShowInPlaceholder">
				{{isWarn ? errmsg.replace("WARN__",""):errmsg}}
			</div>
		</div>
	</div>
</template>

<script>
	import Flexible from "../../src/mixins/flexible.js";
	export default {
		name: "RxFormItem",
		mixins: [Flexible],
		provide() {
			return {
				rxFormItem: this
			};
		},
		inject: ["rxForm"],
		props: {
			labelWidth: Number,
			errShowInPlaceholder: Boolean,
			errmsg: String,
			label: String,
			required: { type: Boolean, default: true },
			block: Boolean
		},
		computed: {
			isWarn() {
				return this.errmsg ? !!~this.errmsg.indexOf("WARN__") : false;
			},
			classes() {
				return [
					{
						[`is-err`]: !!this.errmsg && !this.isWarn,
						[`is-warn`]: this.isWarn,
						[`err-in-plh`]: this.errShowInPlaceholder
					}
				];
			},
			labelStyles() {
				const styles = {};

				if (!this.block && (this.labelWidth || this.rxForm.labelWidth)) {
					styles.width = `${this.getRealSize(
						this.labelWidth || this.rxForm.labelWidth
					)}`;
				}

				return styles;
			},
			contentStyles() {
				const styles = {};

				if (!this.block && (this.labelWidth || this.rxForm.labelWidth)) {
					styles.marginLeft = `${this.getRealSize(
						this.labelWidth || this.rxForm.labelWidth
					)}`;
				}

				return styles;
			}
		}
	};
</script>

