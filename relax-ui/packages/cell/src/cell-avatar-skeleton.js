export default {
	name: "RxSkeletonCellAvatar",
	functional: true,
	render(h) {
		return h(
			"div",
			{
				class: "rx-skeleton rx-cell-avatar"
			},
			[
				h("div", { class: "rx-cell-img" }, [h("p", { class: "block" })]),
				h("div", { class: "rx-cell-content" }, [
					h("div", { class: "content" }, [
						h("div", { class: "header" }, [h("p", { class: "block" })]),
						h("div", { class: "body" }, [h("p", { class: "block" })])
					]),
					h("div", { class: "action center" }, [h("p", { class: "block" })])
				])
			]
		);
	}
};
