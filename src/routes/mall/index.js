import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [{
			path: "/wait_cargo",
			component: () =>
				import( /* webpackChunkName: "wait_cargo" */ `~v/${MODULENAME}/wait_cargo.vue`)
		}]
	});
}