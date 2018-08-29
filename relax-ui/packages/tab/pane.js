export default {
	name: "RxTabPane",
	props: {
		index: Number,
		label: String
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
