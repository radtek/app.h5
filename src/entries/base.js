import FastClick from "fastclick";
import mixins from "~m/index";
import filters from "~f/index";
import RelaxUI, { utils } from "~rx/index";
import { createJSApi, listenJSApi, callH5Action } from "~j/index";

import App from "~e/App.vue";

// 引入针对Promise的polyfill
// require("es6-promise").polyfill();
// require("hammerjs");
FastClick.attach(document.body);

const isDebugMode = process.env.NODE_ENV !== "production";

export function createVue(Vue, { router, http }, jsApiActions) {
	Vue.use(RelaxUI, {
		onImgErrSrcGetter(isAvatar) {
			if (utils.isSupportWebp()) {
				return require(`~imgs/webp/${
					isAvatar ? "avatar-error.webp" : "img-error.webp"
				}`);
			}
			return require(`~imgs/${
				isAvatar ? "avatar-error.png" : "img-error.png"
			}`);
		}
	});

	Vue.config.silent = !isDebugMode;
	Vue.config.debug = Vue.config.devtools = Vue.config.productionTip = isDebugMode;

	Vue.prototype.$isProd = !isDebugMode;
	Vue.prototype.$isTest = process.env.NODE_ENV === "test";
	Vue.prototype.$isDev = process.env.NODE_ENV === "development";

	Vue.prototype.$DEFAULT_AVATAR =
		"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/avatar_male.png?Expires=43020012813&OSSAccessKeyId=LTAIO6w6CI0rif2M&Signature=zVQ5Y7%2Bickigq1WqW8cYbZ4SsGc%3D";

	Vue.prototype.$DEFAULT_AVATAR_FEMALE =
		"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/avatar_female.png?Expires=43020012813&OSSAccessKeyId=LTAIO6w6CI0rif2M&Signature=z%2FDv17RopiH9FTawJ6HW9by6TZI%3D";

	const qs = utils.qs.parse();

	Vue.prototype.$http = http.auth(
		(Vue.prototype.authInfo = {
			userId: qs.userId || qs.userid,
			uuid: qs.uuid,
			userPhonenumber: qs.phone || qs.userPhonenumber
		})
	);

	mixins.forEach(item => Vue.mixin(item));
	Object.keys(filters).forEach(item => Vue.filter(item, filters[item]));

	// 关于Hybird App交互API的操作逻辑

	if (!Vue.prototype.$isDev) {
		jsApiActions && jsApiActions.length && createJSApi(...jsApiActions);

		JXRSApi.on(`app.${process.env.JXRS_APP_MODULE}`, ({ action, data }) => {
			callH5Action(action, data);
		});
	}
	Vue.prototype.$listenJSApi = listenJSApi;

	/* eslint-disable no-new */
	new Vue({
		el: "#app",
		router,
		template: "<App/>",
		render: h => h(App)
	});
}
