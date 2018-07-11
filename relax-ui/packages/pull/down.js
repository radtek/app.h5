import Icon from "../icon/index";

export default {
	name: "RxPullDown",
	components: { Icon },
	inject: {
		pull: { default: {} },
		pullDownConf: { default: {} }
	},
	props: {
		tag: { type: String, default: "div" },
		releaseY: { type: Number, default: 150 }
	},
	render(h) {
		const childrens = [];

		switch (this.pullDownConf.status) {
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
						this.pullDownConf.info || this.$t("rx.pull.down.ing")
					)
				);
				break;
			case "complete":
				childrens.push(
					h("icon", {
						props: {
							name: "circle-success"
						}
					}),
					h(
						"span",
						null,
						this.pullDownConf.info ||
							this.$t("rx.pull.down.complete")
					)
				);
				break;
			case "prepare":
				if (this.pullDownConf.pos.y >= this.releaseY) {
					childrens.push(
						h("icon", {
							props: {
								name: "arrow-up"
							}
						}),
						h(
							"span",
							null,
							this.pullDownConf.info ||
								this.$t("rx.pull.down.prepare.release")
						)
					);
				} else {
					childrens.push(
						h("icon", {
							props: {
								name: "arrow-down"
							}
						}),
						h(
							"span",
							null,
							this.pullDownConf.info ||
								this.$t("rx.pull.down.prepare.normal")
						)
					);
				}
				break;
			case "error":
				childrens.push(
					h(
						"span",
						{
							on: {
								click() {
									this.pull.refreshDowning();
								}
							}
						},
						this.pullDownConf.info || this.$t("rx.pull.down.error")
					)
				);
				break;
			default:
				break;
		}

		return h(this.tag, { class: "rx-pull-down-inner" }, childrens);
	}
};
