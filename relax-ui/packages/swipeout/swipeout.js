export default {
	name: "RxSwipeout",
	provide() {
		return {
			swipeout: this
		};
	},
	render(h) {
		return h("div", { class: "rx-swipeout" }, this.$slots.default);
	}
};
