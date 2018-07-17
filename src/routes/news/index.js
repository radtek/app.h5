import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: process.env.NODE_ENV === "development" ? "hash" : "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/info",
				component: () =>
					import(/* webpackChunkName: "view-detail" */ `~v/${MODULENAME}/detail.vue`)
			},
			{
				path: "/comments",
				component: () =>
					import(/* webpackChunkName: "view-comments" */ `~v/${MODULENAME}/comments.vue`)
			},
			{
				path: "/rdsc",
				component: () =>
					import(/* webpackChunkName: "view-rdsc" */ `~v/${MODULENAME}/rdsc.vue`)
			}
		]
	});
}
