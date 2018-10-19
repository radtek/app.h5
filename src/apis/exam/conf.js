export default [
	{
		outKey: "login",
		action: "/infoTitle/examLogin",
		reqParams: []
	},
	{
		verb: "get",
		outKey: "getListOfUser",
		action: "/infoTitle/listUserTitleList.lm",
		reqParams: [
			"userId",
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 100 }
		]
	}
];
