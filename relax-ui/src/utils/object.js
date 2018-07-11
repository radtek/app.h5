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
