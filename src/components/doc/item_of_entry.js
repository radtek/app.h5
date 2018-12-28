import "../../assets/modules/doc/wc-item_of_entry.scss";

export default {
	name: "ItemOfEntry",
	props: {
		item: {
			type: Object,
			default() {
				return {};
			}
		},
		tag: { type: String, default: "div" }
	},
	render(h) {
		return h(
			this.tag,
			{
				class: "entry-item",
				on: {
					click: () => {
						// 通知App跳转
						if (!this.$isDev) {
							JXRSApi.view.goto({
								title: this.item.title,
								url: `${location.origin}/doc${
									this.item.path
								}${this.$rxUtils.qs.stringify(this.authInfo)}`,
								query: {}
							});
						} else {
							this.$router.push({
								path: this.item.path,
								query: this.authInfo
							});
						}
					}
				}
			},
			[
				h("rx-icon", {
					props: {
						name: this.item.icon
					},
					style: {
						color: this.item.color
					}
				}),
				h("p", { class: "text" }, this.item.title)
			]
		);
	}
};
