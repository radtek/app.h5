import getScroll from "./getScroll";
/**
 * 计算当前Y轴滚动条距离底部的位置
 *
 * @export getScrollBottom
 * @returns [Number] 距离底部的位置
 */
export default function getScrollBottom() {
	const node = document.documentElement || document.body;
	const scrollHeight = getScroll(node, "height");
	const scrollTop = getScroll(node, "top");
	const clientHeight = node.clientHeight;
	return scrollHeight - scrollTop - clientHeight;
}
