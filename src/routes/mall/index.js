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
					import( /* webpackChunkName: "view-details" */ `~v/${MODULENAME}/product-details.vue`)
			},
			//待发货
			{
				path: "/wait_cargo",
				component: () =>
					import( /* webpackChunkName: "wait_cargo" */ `~v/${MODULENAME}/wait_cargo.vue`)
			},
			{
				path: "/index",
				component: () =>
					import( /* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`)
			}, {
				//商品详情
				path: "/details",
				component: () =>
					import( /* webpackChunkName: "view-details" */ `~v/${MODULENAME}/product-details.vue`)
			},
			{
				//支付完成
				path: "/paymentEnd",
				component: () =>
					import( /* webpackChunkName: "view-paymentEnd" */ `~v/${MODULENAME}/payment-end.vue`)
			},
			{
				//选择类型
				path: "/type",
				component: () =>
					import( /* webpackChunkName: "view-type" */ `~v/${MODULENAME}/type.vue`)
			},
			{
				//物流详情
				path: "/logistics-details",
				component: () =>
					import( /* webpackChunkName: "logistics-details" */ `~v/${MODULENAME}/logistics-details.vue`)
			},
			{
				//订单详情--四种状态
				path: "/order-details",
				component: () =>
					import( /* webpackChunkName: "order-details" */ `~v/${MODULENAME}/order-details.vue`)
			}

		]
	});
}