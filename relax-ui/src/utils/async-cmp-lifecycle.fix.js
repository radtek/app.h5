export default function fixAsyncCmpLifeCycle(component) {
	// 清理已缓存的组件定义
	component.default._Ctor = {};

	if (!component.default.attached) {
		// 保存原组件中的 created 生命周期函数
		component.default._created = component.default.created;
		component.default._mounted = component.default.mounted;
	}

	// 注入一个特殊的 created 生命周期函数
	component.default.created = function() {
		// 子组件已经实例化完毕
		if (component.default._created) {
			// 执行原组件中的 created 生命周期函数
			component.default._created.call(this);
		}
	};

	// 注入一个特殊的 mounted 生命周期函数
	component.default.mounted = function() {
		// 子组件已经实例化完毕
		if (component.default._mounted) {
			// 执行原组件中的 mounted 生命周期函数
			component.default._mounted.call(this);
		}
	};

	// 表示已经注入过了
	component.default.attached = true;

	return component;
}
