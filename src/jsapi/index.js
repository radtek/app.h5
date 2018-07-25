export function createJSApi(...actions) {
	actions.forEach(action => {
		JXRSApi.wrap(`app.${process.env.JXRS_APP_MODULE}.${action}`);
	});
}

const actions = {};

export function listenJSApi(action, handler) {
	const list = actions[action];

	if (!list || !list.length) {
		actions[action] = [handler];
	} else {
		list.push(handler);
	}
}

export function callH5Action(action, data) {
	const list = actions[action];
	if (list && list.length) {
		list.forEach(fn => fn(data));
	}
}
