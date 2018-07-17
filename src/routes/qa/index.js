import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: process.env.NODE_ENV === "development" ? "hash" : "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/index",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`)
			},
			{
				path: "/questions",
				component: () =>
					import(/* webpackChunkName: "view-questions" */ `~v/${MODULENAME}/questions.vue`)
			},
			{
				path: "/detail",
				component: () =>
					import(/* webpackChunkName: "view-detail" */ `~v/${MODULENAME}/detail.vue`)
			},
			{
				path: "/audit-detail",
				component: () =>
					import(/* webpackChunkName: "view-detail_of_audit" */ `~v/${MODULENAME}/detail_of_audit.vue`)
			},
			{
				path: "/answer",
				component: () =>
					import(/* webpackChunkName: "view-answer" */ `~v/${MODULENAME}/answer.vue`)
			},
			{
				path: "/profile",
				component: () =>
					import(/* webpackChunkName: "view-profile" */ `~v/${MODULENAME}/profile.vue`)
			},
			{
				path: "/msg_list",
				component: () =>
					import(/* webpackChunkName: "view-msg_list" */ `~v/${MODULENAME}/msg_list.vue`)
			},
			{
				path: "/msg_center",
				component: () =>
					import(/* webpackChunkName: "view-msg_center" */ `~v/${MODULENAME}/msg_center.vue`)
			}
		]
	});
}
