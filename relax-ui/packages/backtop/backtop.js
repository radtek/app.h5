import "../../src/styles/widget/backtop.scss";

import throttle from "../../src/utils/throttle";
import { on, off } from "../../src/utils/dom/event";
import getScrollBottom from "../../src/utils/dom/getScrollBottom";

/**
 * 回到顶部组件
 *
 * TODO: 后续考虑滚动动画的事情
 *
 */
import Icon from "../icon/icon";

export default {
	name: "RxBacktop",
	components: { Icon },
	props: {
		threshold: { type: Number, default: 100 },
		backto: { type: Number, default: 0 },
		listenNativeScroll: { type: Boolean, default: true },
		text: { type: String, default: "返回顶部" },
		icon: String
	},
	data() {
		return {
			isShow: false,
			scrollHandler: null
		};
	},
	methods: {
		validScrollY(remainScrollY) {
			this.isShow = remainScrollY >= this.threshold;
		},
		handleScroll(evt) {
			// 判断滚动条距离底部的位置
			const scrollY = getScrollBottom();
			this.isShow = scrollY <= this.threshold;
		},
		onClick() {
			if (this.listenNativeScroll) {
				if (this.backto <= 0) window.scrollTo(0, 0);
				else window.scrollTo(0, this.backto);
			} else {
				this.$emit("on-click");
			}
		}
	},
	render(h) {
		if (!this.isShow) return null;

		const childrens = [];
		if (this.icon) {
			childrens.push(
				h("icon", { slot: "default", props: { name: this.icon } })
			);
		} else if (this.text) {
			childrens.push(h("span", { slot: "default" }, this.text));
		}

		return h(
			"div",
			{
				class: [
					"rx-backtop",
					{
						[`icon`]: this.icon
					}
				],
				on: {
					click: () => {
						this.onClick();
					}
				}
			},
			childrens && childrens.length ? childrens : this.$slots.default
		);
	},
	created() {
		if (this.listenNativeScroll) {
			on(
				window,
				"scroll",
				(this.scrollHandler = throttle(evt => {
					this.handleScroll(evt);
				}, 300))
			);
		} else {
			this.$on("fn.show", isShow => {
				this.isShow = isShow;
			});
		}
	},
	beforeDestroy() {
		if (this.listenNativeScroll && this.scrollHandler) {
			off(window, "scroll", this.scrollHandler);
		}
	}
};
