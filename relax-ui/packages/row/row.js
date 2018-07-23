import "../../src/styles/layout/row.scss";
import Flexible from "../../src/mixins/flexible.js";
export default {
	name: "RxRow",
	mixins: [Flexible],
	provide() {
		return {
			rxRow: this
		};
	},
	props: {
		tag: { type: String, default: "div" },
		// 是否是垂直方向的布局
		vertical: Boolean,
		// 每个布局块之间的间隔
		gutter: Number,
		flex: { type: Boolean, default: true },
		// 水平方向的排版
		justify: { type: String, default: "start" },
		// 基于交叉线的排版
		align: { type: String, default: "start" }
	},
	data() {
		return {
			colCount: 0,
			colSpans: []
		};
	},
	computed: {
		isAverage() {
			if (this.colCount === 0) return true;

			if (!this.flex) return false;

			const remainNum = 24 % this.colCount;

			if (!remainNum) {
				if (this.colSpans.length === 0) {
					return true;
				}
				const averageNum = 24 / this.colCount;
				if (this.colSpans.length === this.colCount) {
					for (let i = 0, l = this.colSpans.length; i < l; i++) {
						if (this.colSpans[i] !== averageNum) return false;
					}
					return true;
				}
			}
			return false;
		},
		styles() {
			const styles = {};

			if (
				this.flex &&
				this.justify === "center" &&
				this.align === "center"
			) {
				styles.textAlign = "center";
				styles.verticalAlign = "middle";
			}

			if (this.gutter) {
				styles.paddingLeft = styles.paddingRight = this.getRealSize(
					this.gutter / 2
				);
			}

			return styles;
		}
	},
	created() {
		this.$on("fn.col.ready", span => {
			this.colCount += 1;
			span && this.colSpans.push(span);
		});
	},
	render(h) {
		return h(
			this.tag,
			{
				class: [
					"rx-row",
					{
						[`grid`]: !this.flex,
						[`flex`]: !!this.flex,
						[`column`]: this.flex && this.vertical,
						[`row`]: this.flex && !this.vertical,
						[`${this.justify}`]: this.flex && this.justify,
						[`${this.align}`]: this.flex && this.align
					}
				],
				style: this.styles
			},
			this.$slots.default
		);
	}
};
