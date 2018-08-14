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
					h("div", { class: "rx-cell-content rx-row grid" }, [
						h("p", { class: "rx-col rx-col-16" }, [h("p", { class: "block" })]),
						h("p", { class: "rx-col rx-col-8" }, [h("p", { class: "block" })])
					])
				]),
				h("div", { class: "rx-cell-footer" }, [h("p", { class: "block" })])
			]
		);
	}
};
