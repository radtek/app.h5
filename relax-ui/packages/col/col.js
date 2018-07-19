import "../../src/styles/layout/col.scss";
import Flexible from "../../src/mixins/flexible.js";
import Emitter from "../../src/mixins/emitter";
export default {
	name: "RxCol",
	mixins: [Flexible, Emitter],
	inject: {
		rxRow: { default: {} }
	},
	props: {
		tag: { type: String, default: "div" },
		span: Number,
		align: String,
		flexBasis: Number
	},
	computed: {
		styles() {
			const styles = {};

			if (this.rxRow.gutter) {
				const paddingValue = this.rxRow.gutter / 2;

				styles.paddingRight = styles.paddingLeft = this.getRealSize(
					paddingValue
				);
			}

			if (this.rxRow.flex && this.flexBasis > 0) {
				styles.flex = `0 0 ${this.getRealSize(this.flexBasis)}`;
				styles.webkitFlex = styles.flex;
				styles.webkitBoxFlex = 0;
			}

			if (this.align) {
				styles.textAlign = this.align;
			}

			return styles;
		}
	},
	mounted() {
		this.dispatch("RxRow", "fn.col.ready", this.span);
	},
	render(h) {
		return h(
			this.tag,
			{
				class: [
					"rx-col",
					{
						[`rx-col-${this.span}`]:
							this.span && !this.rxRow.isAverage
					}
				],
				style: this.styles
			},
			this.$slots.default
		);
	}
};
