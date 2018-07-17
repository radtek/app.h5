export function createJSApi(...actions) {
	actions.forEach(action => {
		JXRSApi.wrap(`app.${process.env.JXRS_APP_MODULE}.${action}`);
	});
}
