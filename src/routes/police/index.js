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
					import( /* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`),
				beforeEnter: (to, from, next) => { //导航守卫
					console.log(to)
					console.log(from)
					if (localStorage.getItem('username') != null) {
						console.log(localStorage.getItem('username'))
						console.log('用户已经登录');
						next();
					} else {
						console.log('用户未登录');
						next({
							path: '/login',
							query: {
								Rurl: to.fullPath
							}
						});
					}
				}

			},
			{ //登录页面
				path: "/login",
				component: () =>
					import( /* webpackChunkName: "view-login" */ `~v/${MODULENAME}/login.vue`)
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
					import( /* webpackChunkName: "view-date" */ `~v/${MODULENAME}/date/date.vue`)
			},
			{
				path: "/add-person",
				component: () =>
					import( /* webpackChunkName: "view-add-person" */ `~v/${MODULENAME}/add-person.vue`)
			},
			{
				path: "/personnel",
				component: () =>
					import( /* webpackChunkName: "view-personnel" */ `~v/${MODULENAME}/personnel.vue`)
			},
			{
				path: "/view-person",
				component: () =>
					import( /* webpackChunkName: "view-view-person" */ `~v/${MODULENAME}/view-person.vue`)
			},
			//创建活动
			{
				path: "/create-activities",
				name:'create-activities',
				component: () =>
					import( /* webpackChunkName: "view-activities" */ `~v/${MODULENAME}/create-activities/index.vue`)
			},
			{
				path: "/edit-person",
				component: () =>
					import( /* webpackChunkName: "view-edit-person" */ `~v/${MODULENAME}/edit-person.vue`)
			},
			//活动时间
			{
				path: "/activity-time",
				component: () =>
					import(/* webpackChunkName: "view-time" */ `~v/${MODULENAME}/create-activities/activity-time/activity-time.vue`)
			},
			{
				path: "/default-icon",
				component: () =>
					import(/* webpackChunkName: "view-default-icon" */ `~v/${MODULENAME}/default-icon.vue`)
			},
		]
	});


}