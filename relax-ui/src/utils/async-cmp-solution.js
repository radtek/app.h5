const events = {};

const status = {};

const asyncCmp = {
	uiReady(cmp, parentCmpName) {
		const name = parentCmpName || this.$options.name;
		const curCmpName = typeof cmp === "string" ? cmp : cmp.$options.name;
		const kv = status[name];
		if (kv[curCmpName].data) {
			asyncCmp.pub(`${curCmpName}.ready`);
		} else {
			kv[curCmpName].ui = true;
		}
	},
	dataReady(cmp, parentCmpName) {
		const name = parentCmpName || this.$options.name;
		const curCmpName = typeof cmp === "string" ? cmp : cmp.$options.name;
		const kv = status[name];
		if (kv[curCmpName].ui) {
			asyncCmp.pub(`${name}.${curCmpName}.ready`);
		} else {
			kv[curCmpName].data = true;
		}
	},
	ready(cmpName, fn) {
		const name = this.$options.name;
		const kv = events[name] || (events[name] = {});
		kv[cmpName + ".ready"] = fn;
	},
	pub(topic) {
		const arr = topic.split(".");
		const name = arr[0];
		events[name][arr.slice(1, arr.length - 1).join(".")]();
	},
	solution(component, parentCmpName) {
		const dft = component.default;

		// 清理已缓存的组件定义
		dft._Ctor = {};

		if (!dft.attached) {
			// 保存原组件中的 created 生命周期函数
			dft._created = dft.created;
			dft._mounted = dft.mounted;
		}

		const cmpName = dft.name;

		if (dft.asyncListenCmps) {
			// 被监听的异步组件名称字符集合(逗号分隔)
			const asyncListenCmps = dft.asyncListenCmps.split(",");
			status[cmpName] = status[cmpName] || {};
			asyncListenCmps.forEach(item => {
				status[cmpName][item] = { ui: false, data: false };
			});
		}

		// 注入一个特殊的 created 生命周期函数
		dft.created = function() {
			// 子组件已经实例化完毕
			if (dft._created) {
				// 执行原组件中的 created 生命周期函数
				dft._created.call(this);
			}
		};

		// 注入一个特殊的 mounted 生命周期函数
		dft.mounted = function() {
			// 子组件已经实例化完毕
			if (dft._mounted) {
				// 执行原组件中的 mounted 生命周期函数
				dft._mounted.call(this);
			}
			if (parentCmpName) {
				asyncCmp.uiReady(this, parentCmpName);
			}
		};

		// 表示已经注入过了
		dft.attached = true;

		return component;
	}
};

export default asyncCmp;
