import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	return new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			//主页
			{
				path: "/index",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`)
			},
			//人员
			{
				path: "/personnel",
				component: () =>
					import(/* webpackChunkName: "view-personnel" */ `~v/${MODULENAME}/personnel.vue`)
			},
			//日历
			{
				path: "/date",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/date/date.vue`)
			},
			//创建活动
			{
				path: "/create-activities",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/create-activities/index.vue`)
			},
			//活动时间
			{
				path: "/activity-time",
				component: () =>
					import(/* webpackChunkName: "view-index" */ `~v/${MODULENAME}/create-activities/activity-time/activity-time.vue`)
			},
		]
	});
}
