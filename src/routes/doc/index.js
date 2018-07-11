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
				path: "/docs_of_tag",
				component: () =>
					import(/* webpackChunkName: "view-docs_of_tag" */ `~v/${MODULENAME}/docs_of_tag.vue`)
			},
			{
				path: "/my_collected",
				component: () =>
					import(/* webpackChunkName: "view-my_collected" */ `~v/${MODULENAME}/my_collected.vue`)
			},
			{
				path: "/my_downloaded",
				component: () =>
					import(/* webpackChunkName: "view-my_downloaded" */ `~v/${MODULENAME}/my_downloaded.vue`)
			},
			{
				path: "/my_uploaded",
				component: () =>
					import(/* webpackChunkName: "view-my_uploaded" */ `~v/${MODULENAME}/my_uploaded.vue`)
			},
			{
				path: "/my_readed",
				component: () =>
					import(/* webpackChunkName: "view-my_readed" */ `~v/${MODULENAME}/my_readed.vue`)
			},
			{
				path: "/share",
				component: () =>
					import(/* webpackChunkName: "view-share" */ `~v/${MODULENAME}/share.vue`)
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
			},
			{
				path: "/import_of_pc",
				component: () =>
					import(/* webpackChunkName: "view-import_of_pc" */ `~v/${MODULENAME}/import_of_pc.vue`)
			},
			{
				path: "/import_of_mobile",
				component: () =>
					import(/* webpackChunkName: "view-import_of_mobile" */ `~v/${MODULENAME}/import_of_mobile.vue`)
			}
		]
	});
}
