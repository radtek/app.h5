function broadcast(componentName, eventName, params) {
	this.$children.forEach(children => {
		const name = children.$options.name;
		if (name === componentName) {
			children.$emit(...[eventName].concat(params));
		} else {
			broadcast.apply(children, [componentName, eventName, params]);
		}
	});
}

export default {
	methods: {
		/**
		 * 向下纷发
		 * @param {String} componentName 子级组件名称
		 * @param {String} eventName 事件名称
		 * @param {Array} params 参数
		 */
		broadcast(componentName, eventName, params) {
			broadcast.call(this, componentName, eventName, params);
		},
		/**
		 * 向上派发
		 * @param {String} componentName 父级组件名称
		 * @param {String} eventName 事件名称
		 * @param {Array} params 参数
		 */
		dispatch(componentName, eventName, params) {
			let parent = this.$parent || this.$root;
			let name = parent.$options.name;
			while (parent && (!name || name !== componentName)) {
				parent = parent.$parent;
				if (parent) {
					name = parent.$options.name;
				}
			}
			if (parent) {
				parent.$emit(...[eventName].concat(params));
			}
		}
	}
};
