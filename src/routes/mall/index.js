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
		},
		{
			//商品详情
			path: "/details",
			component: () =>
				import(/* webpackChunkName: "view-details" */ `~v/${MODULENAME}/product-details.vue`)
		},
		{
			//支付完成
			path: "/paymentEnd",
			component: () =>
				import(/* webpackChunkName: "view-paymentEnd" */ `~v/${MODULENAME}/payment-end.vue`)
		},
		{
			//选择类型
			path: "/type",
			component: () =>
				import(/* webpackChunkName: "view-type" */ `~v/${MODULENAME}/type.vue`)
		},
		{
			//支付页面
			path: "/payment",
			component: () =>
				import(/* webpackChunkName: "view-type" */ `~v/${MODULENAME}/payment.vue`)
		},
		{
			//订单详情
			path: "/detail",
			component: () =>
				import(/* webpackChunkName: "view-detail" */ `~v/${MODULENAME}/detail.vue`)
		},
		{
			//添加地址
			path: "/add-address",
			component: () =>
				import(/* webpackChunkName: "view-add" */ `~v/${MODULENAME}/add-address.vue`)
		},
		]
	});
}
