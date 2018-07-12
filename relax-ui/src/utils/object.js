export function assign(...objs) {
	if (Object.assign) {
		return Object.assign({}, ...objs);
	}
	const target = {};

	for (let i = 0, l = objs.length; i < l; i++) {
		for (const key in objs[i]) {
			target[key] = objs[i][key];
		}
	}

	return target;
}

export function mergeVmOptions($vm, options) {
	const defaults = {};
	for (const i in $vm.$options.props) {
		if (i !== "value") {
			defaults[i] = $vm.$options.props[i].default;
		}
	}
	const _options = Object.assign({}, defaults, options);

	for (const i in _options) {
		$vm[i] = _options[i];
	}
}
