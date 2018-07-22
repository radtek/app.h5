import "../../src/styles/widget/clamp-box.scss";
export default {
	name: "RxClampBox",
	props: {
		// 原始文本串
		text: String,
		// 最多显示多少字符
		maxWords: { type: Number, default: 100 },
		// 隐藏之后显示的提示符
		hideTip: { type: String, default: "...展开" },
		// 显示之后显示的提示符
		showTip: { type: String, default: "收起" },
		// 是否允许展开
		canExpand: Boolean
	},
	data() {
		return {
			current: "",
			isHide: false
		};
	},
	computed: {
		contentClasses() {
			return [
				`text`,
				{
					[`hide`]: this.isHide
				}
			];
		}
	},
	watch: {
		text(val) {
			this.__convertText();
		}
	},
	methods: {
		__convertText() {
			const str = this.text;
			if (str && str.length >= this.maxWords) {
				this.isHide = true;
				this.current = str.substring(0, this.maxWords) + "...";
			} else {
				this.isHide = false;
				this.current = str;
			}
		}
	},
	render(h) {
		const childrens = [
			h(
				"div",
				{
					class: this.contentClasses,
					on: {
						click: event => {
							this.$emit("on-content-click", event);
						}
					}
				},
				this.current
			)
		];

		if (this.text !== this.content) {
			childrens.push(
				h(
					"span",
					{
						class: "rx-clamp-box_tip",
						on: {
							click: event => {
								if (this.canExpand) {
									this.isHide = !this.isHide;
									this.$emit(
										`on-${this.isHide ? "hide" : "show"}`,
										event
									);
									return;
								}
								this.$emit("on-tip-click", event);
							}
						}
					},
					this.isHide ? this.hideTip : this.showTip
				)
			);
		}

		return h(
			"div",
			{
				class: "rx-clamp-box"
			},
			childrens
		);
	},
	created() {
		this.__convertText();
	}
};
