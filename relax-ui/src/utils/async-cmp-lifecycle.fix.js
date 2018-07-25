const api = {};

api.on = function(topic, handler) {
	const names = topic.split(".");

	let name = names.shift();
	let kv;

	if (!kv) {
		kv = api[name] || (api[name] = {});
		name = names.shift();
	}

	while (name) {
		if (!kv[name]) {
			kv[name] = names.length === 0 ? handler : (kv = {});
		} else {
			kv = kv[name];
		}
		name = names.shift();
	}
	return api;
};

export const asyncCmpListenApi = api;

export function fixAsyncCmpLifeCycle(component) {
	// 清理已缓存的组件定义
	component.default._Ctor = {};

	if (!component.default.attached) {
		// 保存原组件中的 created 生命周期函数
		component.default._created = component.default.created;
		component.default._mounted = component.default.mounted;
	}

	const cmpName = component.default.name;

	const lifeCycleFn = api[cmpName];

	// 注入一个特殊的 created 生命周期函数
	component.default.created = function() {
		// 子组件已经实例化完毕
		if (component.default._created) {
			// 执行原组件中的 created 生命周期函数
			component.default._created.call(this);
		}
		lifeCycleFn && lifeCycleFn.created && lifeCycleFn.created(this);
	};

	// 注入一个特殊的 mounted 生命周期函数
	component.default.mounted = function() {
		// 子组件已经实例化完毕

		lifeCycleFn &&
			lifeCycleFn.beforeMounted &&
			lifeCycleFn.beforeMounted(this);

		if (component.default._mounted) {
			// 执行原组件中的 mounted 生命周期函数
			component.default._mounted.call(this);
		}

		lifeCycleFn &&
			lifeCycleFn.afterMounted &&
			lifeCycleFn.afterMounted(this);
	};

	// 表示已经注入过了
	component.default.attached = true;

	return component;
}
