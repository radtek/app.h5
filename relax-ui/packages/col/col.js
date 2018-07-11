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
		span: { type: Number, default: 12 },
		flexBasis: Number
	},
	computed: {
		styles() {
			const styles = {};

			let width;

			if (this.rxRow.gutter) {
				const paddingValue = this.rxRow.gutter / 2;

				styles.paddingRight = styles.paddingLeft = this.getRealSize(
					paddingValue
				);

				if (this.span && this.rxRow.flex && !this.rxRow.isAverage) {
					const perWidth =
						(window.innerWidth - this.rxRow.gutter) *
						this.span /
						12;

					width = this.getRealSize(perWidth - this.rxRow.gutter);

					styles.flex = `0 0 ${width}`;
					styles.webkitFlex = `0 0 ${width}`;
					styles.webkitBoxFlex = 0;
				}
			}

			if (this.rxRow.flex && this.flexBasis > 0) {
				styles.flex = `0 0 ${this.getRealSize(this.flexBasis)}`;
				styles.webkitFlex = styles.flex;
				styles.webkitBoxFlex = 0;
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
						[`rx-col-${this.span}`]: this.span && !this.rxRow.flex
					}
				],
				style: this.styles
			},
			this.$slots.default
		);
	}
};
