export function createJSApi(...actions) {
	actions.forEach(action => {
		const fullAction = `app.${process.env.JXRS_APP_MODULE}.` + action;
		JXRSApi.wrap(fullAction, (kv, callback) => {
			JXRSBridge.call(fullAction, kv, callback);
		});
	});
}
