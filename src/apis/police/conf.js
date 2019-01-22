export default [
    {
		// 查询活动设置
		verb: "get",
		outKey: "getInfoActivity",
		action: "/mobile/v1/user/getAllUser",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
    },
    {
		// 获得所有参与人员
		verb: "get",
		outKey: "getAllUser",
		action: "/mobile/v1/user/getAllUser",
    },
    
];
