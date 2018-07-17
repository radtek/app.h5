import "../../src/styles/widget/card.scss";
export default {
	name: "RxCard",
	props: {
		tag: { type: String, default: "section" },
		header: String,
		border: Boolean,
		padding: { type: [Boolean, String], default: true }
	},
	computed: {
		classes() {
			const isStr = typeof this.padding === "string";

			return [
				"rx-card",
				{
					[`border`]: this.border,
					[`pd`]: this.padding === true,
					[`hpd`]: isStr && ~this.padding.indexOf("h"),
					[`bpd`]: isStr && ~this.padding.indexOf("b"),
					[`fpd`]: isStr && ~this.padding.indexOf("f")
				}
			];
		}
	},
	render(h) {
		const childrens = [];

		if (this.header || this.$slots.header) {
			childrens.push(
				h(
					"header",
					{
						class: "rx-card_header",
						on: {
							click: () => {
								this.$emit("on-click-header");
							}
						}
					},
					this.header || this.$slots.header
				)
			);
		}
		childrens.push(
			h("div", { class: "rx-card_body" }, this.$slots.default)
		);
		if (this.$slots.footer) {
			childrens.push(
				h(
					"footer",
					{
						class: "rx-card_footer",
						on: {
							click: () => {
								this.$emit("on-click-footer");
							}
						}
					},
					this.$slots.footer
				)
			);
		}

		return h(
			this.tag,
			{
				class: this.classes
			},
			childrens
		);
	}
};
