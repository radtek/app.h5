import "../../src/styles/element/icon.scss";
export default {
	name: "RxIcon",
	props: {
		prefix: { type: String, default: "rx" },
		name: String,
		loading: Boolean,
		stopClick: Boolean
	},
	computed: {
		classes() {
			return [
				`${this.prefix}-icon`,
				{
					[`icon-${this.name}`]: !this.loading && !!this.name,
					[`icon-loading`]: this.loading,
					[`rx-looping`]: this.loading
				}
			];
		}
	},
	render(h) {
		return h("i", {
			class: this.classes,
			on: {
				click: event => {
					if (this.stopClick) {
						event.stopPropagation();
					}
					this.$emit("on-click");
				}
			}
		});
	}
};
