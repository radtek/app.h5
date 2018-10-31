import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				// 提供给外部所有人的公开链接
				path: "/login",
				component: () =>
					import(/* webpackChunkName: "p.exam.login" */ `~v/${MODULENAME}/index.vue`)
			},
			{
				path: "/list",
				component: () =>
					import(/* webpackChunkName: "p.exam.list" */ `~v/${MODULENAME}/list.vue`)
			},
			{
				path: "/info",
				component: () =>
					import(/* webpackChunkName: "p.exam.info" */ `~v/${MODULENAME}/info.vue`)
			},
			{
				path: "/ques",
				component: () =>
					import(/* webpackChunkName: "p.exam.ques" */ `~v/${MODULENAME}/ques.vue`)
			},
			{
				path: "/card",
				component: () =>
					import(/* webpackChunkName: "p.exam.card" */ `~v/${MODULENAME}/card.vue`)
			},
			{
				path: "/result",
				component: () =>
					import(/* webpackChunkName: "p.exam.result" */ `~v/${MODULENAME}/result.vue`)
			}
		]
	});
}
