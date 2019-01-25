import VueRouter from "vue-router";

export function createRoutes(Vue) {
	Vue.use(VueRouter);

	const MODULENAME = process.env.JXRS_APP_MODULE;

	const router = new VueRouter({
		mode: "history",
		base: `/${MODULENAME}/`,
		routes: [
			//主页
			{
				path: "/index",
				name:'index',
				component: () =>
					import( /* webpackChunkName: "view-index" */ `~v/${MODULENAME}/index.vue`),
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
		],
	});
	router.beforeEach((to, from, next) => {
		if(to.path === '/login') return next();
		const exp = 60 *1000* 60 * 24; // 一天的秒数
		let dataObj=JSON.parse(localStorage.getItem('userName'))
		console.log(dataObj.time)
		if((new Date().getTime() - dataObj.time) > exp){
			localStorage.removeItem('userName')
		}
		if(localStorage.getItem('userName')){
			next()
		}else {
			next("/login")
		}
	})
	return router;

}