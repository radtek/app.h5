/**
 * 获取元素的对应“side”的滚动距离
 * refer to: https://github.com/FezVrasta/popper.js/blob/master/packages/popper/src/utils/getScroll.js
 * @export
 * @param {Element} element 代计算的元素
 * @param {string} [side="top"] 方向
 * @returns 滚动距离
 */
export default function getScroll(element, side = "top") {
	const upperSide =
		"scroll" +
		(side ? side.substring(0, 1).toUpperCase() + side.substring(1) : "");
	const nodeName = element.nodeName;
	if (nodeName === "BODY" || nodeName === "HTML") {
		const scrollingElement =
			element.ownerDocument.scrollingElement ||
			element.ownerDocument.documentElement;
		return scrollingElement[upperSide];
	}
	return element[upperSide];
}
