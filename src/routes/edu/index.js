import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/detail",
				component: () =>
					import(/* webpackChunkName: "view-education-detail" */ `~v/${MODULENAME}/detail.vue`)
			},
			{
				path: "/comments",
				component: () =>
					import(/* webpackChunkName: "view-education-comments" */ `~v/${MODULENAME}/comment.vue`)
			}
		]
	});
}
