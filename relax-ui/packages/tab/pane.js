export default {
	name: "RxTabPane",
	inject: {
		tabs: {
			default: []
		}
	},
	props: {
		index: Number,
		label: String
	},
	mounted() {
		this.$set(this.tabs, this.index, {
			label: this.label,
			index: this.index,
			_vm: this
		});
	},
	render(h) {
		return h(
			"div",
			{
				class: "rx-tab-pane"
			},
			this.$slots.default
		);
	}
};
