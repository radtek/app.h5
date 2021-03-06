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
				path: "/index",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`).then(
						utils.asyncCmp.solution
					)
			},
			{
				path: "/questions",
				component: () =>
					import(/* webpackChunkName: "view-questions" */ `~v/${MODULENAME}/questions.vue`)
			},
			{
				path: "/detail",
				component: () =>
					import(/* webpackChunkName: "view-detail" */ `~v/${MODULENAME}/detail.vue`).then(
						utils.asyncCmp.solution
					)
			},
			{
				path: "/audit-detail",
				component: () =>
					import(/* webpackChunkName: "view-detail_of_audit" */ `~v/${MODULENAME}/detail_of_audit.vue`).then(
						utils.asyncCmp.solution
					)
			},
			{
				path: "/answer",
				component: () =>
					import(/* webpackChunkName: "view-answer" */ `~v/${MODULENAME}/answer.vue`).then(
						utils.asyncCmp.solution
					)
			},
			{
				path: "/profile",
				component: () =>
					import(/* webpackChunkName: "view-profile" */ `~v/${MODULENAME}/profile.vue`)
			},
			{
				path: "/topic.list",
				component: () =>
					import(/* webpackChunkName: "p.topic.list" */ `~v/${MODULENAME}/topic.list.vue`)
			},
			{
				path: "/topic.detail",
				component: () =>
					import(/* webpackChunkName: "p.topic.detail" */ `~v/${MODULENAME}/topic.detail.vue`).then(
						utils.asyncCmp.solution
					)
			}
		]
	});
}
