import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: process.env.NODE_ENV === "development" ? "hash" : "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/lottery",
				component: () =>
					import(/* webpackChunkName: "view-lottery" */ `~v/${MODULENAME}/lottery.vue`)
			},
			{
				path: "/mall",
				component: () =>
					import(/* webpackChunkName: "view-mall" */ `~v/${MODULENAME}/mall.vue`)
			},
			{
				path: "/heart-help",
				component: () =>
					import(/* webpackChunkName: "view-heart_help" */ `~v/${MODULENAME}/heart_help.vue`)
			},
			{
				path: "/heart-map",
				component: () =>
					import(/* webpackChunkName: "view-heart_map" */ `~v/${MODULENAME}/heart_map.vue`)
			}
		]
	});
}
