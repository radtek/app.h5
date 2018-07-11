import Icon from "../icon/index";

export default {
	name: "RxPullUp",
	components: { Icon },
	inject: {
		pull: { default: {} },
		pullUpConf: { default: {} }
	},
	props: {
		tag: { type: String, default: "div" }
	},
	render(h) {
		const childrens = [];

		switch (this.pullUpConf.status) {
			case "ing":
				childrens.push(
					h("icon", {
						props: {
							loading: true
						}
					}),
					h(
						"span",
						null,
						this.pullUpConf.info || this.$t("rx.pull.up.ing")
					)
				);
				break;
			case "empty":
				childrens.push(
					h(
						"span",
						null,
						this.pullUpConf.info || this.$t("rx.pull.up.empty")
					)
				);
				break;
			case "error":
				childrens.push(
					h(
						"span",
						{
							on: {
								click() {
									this.pull.refreshUping();
								}
							}
						},
						this.pullUpConf.info || this.$t("rx.pull.up.error")
					)
				);
				break;
			default:
				break;
		}

		return h(this.tag, { class: "rx-pull-up-inner" }, childrens);
	}
};
