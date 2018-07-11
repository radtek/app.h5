export default [
	{
		desp: "获取组织的兑换商城列表",
		verb: "get",
		outKey: "getProductList",
		action: "/exchange/getGoodsDetailsList.score",
		reqParams: [
			"unitId",
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 6 }
		]
	},
	{
		desp: "获取个人历史兑换列表",
		verb: "get",
		outKey: "getUserProductList",
		action: "/exchange/getExchangeHistory.score",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 6 },
			{ name: "type", default: 1 }
		]
	}
];
