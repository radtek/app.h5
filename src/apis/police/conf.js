export default [{
		//登录接口
		verb: "post",
		outKey: "login",
		action: "/mobile/v1/login",
		reqParams: [
			"phone"
		]
	},
	{
		//添加用户
		verb: "post",
		outKey: "addUser",
		action: "/mobile/v1/user/addUser",
		reqParams: [
			"phone",
			"name",
		]
	},
	{
		//删除用户
		verb: "post",
		outKey: "delUser",
		action: "/mobile/v1/user/deleteUserById",
		reqParams: [
			"id"
		]
	},
	{
		//编辑活动设置
		contentType:"json",
		verb: "post",
		outKey: "editActivity",
		action: "/mobile/v1/infoActivity/update",
		reqParams: [
			"subject","address","isNotHoliday","isRepeat","infoActivityPlanList"
		]
	},
	{
		// 查询活动设置
		verb: "post",
		outKey: "getInfoActivity",
		action: "mobile/v1/infoActivity/selectById",
		reqParams: [{
				name: "page",
				default: 1
			},
			{
				name: "pageSize",
				default: 10
			}
		]
	},
	{
		// 获得所有参与人员
		verb: "post",
		outKey: "getAllUser",
		action: "/mobile/v1/user/getAllUser",
	},
	{
		// 抢课
		verb: "post",
		outKey: "robbingClass",
		action: "/mobile/v1/couse/rob",
		reqParams: [
			"priorityNo","userId",
		]
	},
	{
		// 请假
		verb: "post",
		outKey: "leaveClass",
		action: "/mobile/v1/couse/leave",
		reqParams: [
			"priorityNo","userId",
		]
	},
	{
		// 活动详情
		verb: "post",
		outKey: "activityList",
		action: "/mobile/v1/couse/list",
		reqParams: [
			"userId",
		]
	},
	{
		// 抢课列表
		verb: "post",
		outKey: "listForRob",
		action: "/mobile/v1/couse/listForRob",
	},
	{
		// 请假列表
		verb: "post",
		outKey: "listForLeave",
		action: "/mobile/v1/couse/listForLeave",
		reqParams: [
			"userId",
		]
	},
	{
		// 获取课程参与人请假人列表
		verb: "post",
		outKey: "listForCouse",
		action: "/mobile/v1/couse/listForCouse",
		reqParams: [
			"priorityNo",
		]
	},
	{
		// 获取课程参与人或者请假人列表
		verb: "post",
		outKey: "listForJoinOrLeave",
		action: "/mobile/v1/couse/listForJoinOrLeave",
		reqParams: [
			"priorityNo",
			"IsLeave"
		]
	},
    
];
