import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			{
				path: "/list",
				component: () =>
					import(/* webpackChunkName: "p.exam.list" */ `~v/${MODULENAME}/list.vue`)
			}
		]
	});
}
