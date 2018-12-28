import Icon from "../icon/index";
import "../../src/styles/element/button.scss";
export default {
	name: "RxBtn",
	components: { Icon },
	inject: {
		rxForm: { default: {} },
		rxFormItem: { default: {} }
	},
	props: {
		type: { type: String, default: "default" },
		nativeType: { type: String, default: "button" },
		size: String,
		icon: String,
		iconPosition: { type: String, default: "left" },
		loading: Boolean,
		disabled: Boolean,
		plain: Boolean,
		autofocus: Boolean,
		round: Boolean,
		circle: Boolean
	},
	computed: {
		btnSize() {
			return this.size || this.rxForm.itemSize || this.rxFormItem.size;
		},
		btnDisabled() {
			return (
				this.disabled ||
				this.rxForm.disabled ||
				this.rxFormItem.disabled
			);
		},
		classes() {
			return [
				"rx-btn",
				this.type ? this.type : "",
				this.btnSize ? this.btnSize : "",
				{
					disabled: this.btnDisabled,
					loading: this.loading,
					plain: this.plain,
					round: this.round,
					circle: this.circle
				}
			];
		}
	},
	methods: {
		onClick(event) {
			event.stopPropagation();
			this.$emit("on-click", event);
		}
	},
	render(h) {
		const childrens = [];

		if (this.iconPosition === "left") {
			if (this.loading) {
				childrens.push(
					h("icon", {
						props: {
							loading: this.loading
						}
					})
				);
			} else if (this.icon) {
				childrens.push(
					h("icon", {
						props: {
							name: this.icon
						}
					})
				);
			}
		}

		if (this.$slots.default) {
			childrens.push(h("span", {}, this.$slots.default));
		}

		if (this.iconPosition === "right") {
			if (this.loading) {
				childrens.push(
					h("icon", {
						props: {
							loading: this.loading
						}
					})
				);
			} else if (this.icon) {
				childrens.push(
					h("icon", {
						props: {
							name: this.icon
						}
					})
				);
			}
		}

		return h(
			"button",
			{
				class: this.classes,
				attrs: {
					autofocus: this.autofocus,
					disabled: this.btnDisabled || this.loading,
					type: this.nativeType
				},
				on: {
					click: this.onClick
				}
			},
			childrens
		);
	}
};
