import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [{
			path: "/index",
			component: () =>
				import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`)
		},]
	});
}
