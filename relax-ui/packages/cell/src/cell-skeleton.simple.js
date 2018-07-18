export default {
	name: "RxSkeletonSimpleCell",
	functional: true,
	render(h) {
		return h(
			"div",
			{
				class: "rx-skeleton rx-cell"
			},
			[
				h("div", { class: "rx-cell-header" }, [h("p", { class: "block" })]),
				h("div", { class: "rx-cell-body" }, [
					h("div", { class: "rx-cell-content" }, [h("p", { class: "block" })])
				]),
				h("div", { class: "rx-cell-footer" }, [h("p", { class: "block" })])
			]
		);
	}
};