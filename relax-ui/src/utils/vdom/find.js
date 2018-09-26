/**
 *
 * 向下查找指定名称的组件
 *
 * @param {Vue VirtualDOM} context 当前的组件上下文
 * @param {String} componentName 待查找的组件名称
 */
function findChildrenComponent(context, componentName, key) {
	let child;
	const $children = context.$children;
	let name;
	for (let l = $children.length; l--;) {
		name = $children[l].$options.name;

		if (
			name === componentName &&
			(!key || key === $children[l].$vnode.key)
		) {
			child = $children[l];
			break;
		}

		child = findChildrenComponent($children[l], componentName);
		if (child) break;
	}
	return child;
}

export { findChildrenComponent };

/**
 *
 * 遍历指定名称的子组件
 *
 * @param {VDOM} context virtual dom context
 * @param {String} componentName child component name
 * @param {Function} cb callback
 */
function eachChilds(context, componentName, cb) {
	const find = function(ctx) {
		const $children = ctx.$children;
		const l = $children.length;
		if (!l) return;
		for (let i = 0; i < l; i++) {
			if ($children[i].$options.name === componentName) {
				cb && cb($children[i], i);
				continue;
			}
			find($children[i]);
		}
	};

	find(context);
}

export { eachChilds };
