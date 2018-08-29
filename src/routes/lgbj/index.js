import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/create",
				component: () =>
					import(/* webpackChunkName: "view-create" */ `~v/${MODULENAME}/create.vue`)
			},
			{
				path: "/statistics",
				component: () =>
					import(/* webpackChunkName: "view-statistics" */ `~v/${MODULENAME}/statistics.vue`)
			},
			{
				path: "/detail",
				component: () =>
					import(/* webpackChunkName: "view-detail" */ `~v/${MODULENAME}/detail.vue`)
			}
		]
	});
}
