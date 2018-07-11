/**
 * Get target DOM Node
 * @param {(Node|string|Boolean)} [node=document.body] DOM Node, CSS selector, or Boolean
 * @return {Node} The target that the el will be appended to
 */
function getTarget(node) {
	if (node === void 0 || node === true) return document.body;
	return node instanceof window.Node ? node : document.querySelector(node);
}

// 需要被转移元素的指令声明
export default {
	inserted(el, { value }) {
		if (value === false) return false;
		el.className = el.className
			? el.className + " v-transfer-dom"
			: "v-transfer-dom";
		const parentNode = el.parentNode;
		if (!parentNode || parentNode === document.body) return;
		// 构建一个临时的替代元素
		const comment = document.createComment("");
		// 如果声明了转移(true、undefined、元素selector字符串)
		// 获取转移后的目标容器
		const newParent = getTarget(value);
		if (newParent && parentNode !== newParent) {
			// 先将当前元素在其目前所在的父容器内替换掉(不使用append只能用replace替换)
			parentNode.replaceChild(comment, el);
			// 获取转移后的新容器元素,并将内容根据dataset-position来判断放置在哪个位置
			const position = el.dataset.transferPosition || "last";
			if (position === "last") {
				newParent.appendChild(el);
			} else {
				const childs = newParent.childNodes;
				if (childs && childs.length) {
					newParent.insertBefore(el, childs[0]);
				}
			}
			if (!el.__transferDomData) {
				el.__transferDomData = {
					parentNode,
					comment,
					target: newParent
				};
			}
		} else {
			// 转移失败:未查找到新容器后的操作
		}
	},
	unbind(el, { value }) {
		if (value === false) return false;
		el.className = el.className.replace("v-transfer-dom", "");
		const data = el.__transferDomData;
		if (!data) return false;
		data.parentNode && data.parentNode.appendChild(el);
		el.__transferDomData = null;
	}
};
