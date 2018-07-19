import isInClientView from "../../../src/utils/dom/isInClientView";
import { imgPlaceholder } from "../../../src/utils/const";

const lazyImgDirective = {};

const propKey = "data-src";

lazyImgDirective.install = Vue => {
	Vue.directive("lazyimg", {
		bind(el, binding) {
			// 初始化默认图
			if (el.hasAttribute(propKey) && !el.hasAttribute("src")) {
				el.setAttribute("src", imgPlaceholder);
			}
		},
		inserted(el) {
			if (!el.hasAttribute(propKey)) return false;
			setTimeout(() => {
				if (isInClientView(el)) {
					const dataSrc = el.getAttribute(propKey);
					el.setAttribute("src", dataSrc);
					el.removeAttribute(propKey);
					el.__lazy = true;
				}
			}, 300);
		}
	});
};

export default lazyImgDirective;
