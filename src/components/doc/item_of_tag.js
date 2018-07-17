import "../../assets/modules/doc/wc-item_of_tag.scss";

export default {
	name: "ItemOfTag",
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		},
		active: Boolean,
		tag: { type: String, default: "div" }
	},
	methods: {
		onClick() {
			if (this.active) return;
			this.$emit("item-click", this.item);
		}
	},
	render(h) {
		const childrens = [];

		if (this.item.icon) {
			childrens.push(
				h("rx-icon", {
					props: {
						name:
							this.item.icon === "down"
								? "arrow-down"
								: "arrow-up"
					}
				})
			);
		} else {
			childrens.push(h("span", null, this.item.category));
		}

		return h(
			this.tag,
			{
				class: [
					"tag-item",
					{
						[`icon`]: !!this.item.icon
					}
				],
				on: {
					click: () => {
						this.onClick();
					}
				}
			},
			childrens
		);
	}
};
