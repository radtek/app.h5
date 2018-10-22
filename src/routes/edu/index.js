import VueRouter from "vue-router";

import { utils } from "~rx";
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
					import(/* webpackChunkName: "view-education-detail" */ `~v/${MODULENAME}/detail.vue`).then(
						utils.asyncCmp.solution
					)
			},
			{
				path: "/comments",
				component: () =>
					import(/* webpackChunkName: "view-education-comments" */ `~v/${MODULENAME}/comment.vue`)
			}
		]
	});
}
