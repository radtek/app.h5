import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			//商品详情
			{
				path: "/details",
				component: () =>
					import(/* webpackChunkName: "view-details" */ `~v/${MODULENAME}/product-details.vue`)
			},
			{
				path: "/index",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`)
			},
		]
	});
}
