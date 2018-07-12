import "../../assets/modules/doc/wc-skeleton_of_tags.scss";

export default {
	name: "SkeletonOfTags",
	functional: true,
	render(h) {
		return h("div", { class: "skeleton-tags" }, [
			h("div", { class: "wrap" }, [
				h("p", { class: "block" }),
				h("p", { class: "block" }),
				h("p", { class: "block" }),
				h("p", { class: "block" })
			]),
			h("div", { class: "wrap" }, [
				h("p", { class: "block" }),
				h("p", { class: "block" }),
				h("p", { class: "block" }),
				h("p", { class: "block" })
			])
		]);
	}
};
