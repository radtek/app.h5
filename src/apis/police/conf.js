export default [
	{
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
			"icon"
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
		verb: "post",
		outKey: "editActivity",
		action: "/mobile/v1/infoActivity/update",
		reqParams: [
			"subject","address","isNotHoliday","isRepeat"," id"," relationId","week","startTime"," isEnabled"
		]
	},
    {
		// 查询活动设置
		verb: "post",
		outKey: "getInfoActivity",
		action: "/mobile/v1/user/getAllUser",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
    },
    {
		// 获得所有参与人员
		verb: "post",
		outKey: "getAllUser",
		action: "/mobile/v1/user/getAllUser",
    },
    
];
