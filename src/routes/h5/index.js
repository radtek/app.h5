import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/notice-info",
				component: () =>
					import(/* webpackChunkName: "view-notice_info" */ `~v/${MODULENAME}/notice-info.vue`)
			},
			{
				path: "/vote",
				component: () =>
					import(/* webpackChunkName: "view-vote" */ `~v/${MODULENAME}/vote.vue`)
			},
			{
				path: "/education-detail",
				component: () =>
					import(/* webpackChunkName: "view-education-detail" */ `~v/${MODULENAME}/education-detail.vue`)
			}
		]
	});
}
