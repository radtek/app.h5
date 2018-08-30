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
				path: "/user-info",
				component: () =>
					import(/* webpackChunkName: "view-user-info" */ `~v/${MODULENAME}/user-info.vue`)
			},
			{
				path: "/search",
				component: () =>
					import(/* webpackChunkName: "view-search" */ `~v/${MODULENAME}/search.vue`)
			},
			{
				path: "/search_of_units",
				component: () =>
					import(/* webpackChunkName: "view-search_of_units" */ `~v/${MODULENAME}/search_of_units.vue`)
			},
			{
				path: "/search_of_users",
				component: () =>
					import(/* webpackChunkName: "view-search_of_users" */ `~v/${MODULENAME}/search_of_users.vue`)
			},
			{
				path: "/search-result",
				component: () =>
					import(/* webpackChunkName: "view-search-result" */ `~v/${MODULENAME}/search-result.vue`)
			},
			{
				path: "/detail_of_statistics",
				component: () =>
					import(/* webpackChunkName: "view-detail_of_statistics" */ `~v/${MODULENAME}/detail_of_statistics.vue`)
			},
			{
				path: "/list_of_hobby",
				component: () =>
					import(/* webpackChunkName: "view-list_of_hobby" */ `~v/${MODULENAME}/list_of_hobby.vue`)
			},
			{
				path: "/list_of_special",
				component: () =>
					import(/* webpackChunkName: "view-list_of_special" */ `~v/${MODULENAME}/list_of_special.vue`)
			}
		]
	});
}
