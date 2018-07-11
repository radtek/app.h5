export default [
	{
		desp: "获取抽奖商品列表",
		action: "/prize/listPrizeGoods.score",
		outKey: "getLotteryProducts",
		verb: "get"
	},

	{
		desp: "获取抽奖规则",
		action: "/prize/listPrizeRulerInfoByUnitId.score",
		outKey: "getLotteryRules",
		verb: "get"
	},

	{
		desp: "个人用户中奖纪录",
		action: "/prize/listUserWonPrizeRecord.score",
		outKey: "getMyLotteriedRecords",
		reqParams: [
			"unitId",
			{ name: "pageNo", default: 1 },
			{ name: "pageSize", default: 10 }
		],
		verb: "get"
	},

	{
		desp: "获取最新抽到奖的中奖名称信息",
		action: "/prize/listNewWonPrizeRecordMessage.score",
		outKey: "getLatestLotteriedUsers",
		reqParams: [
			"unitId",
			{ name: "beginTime", required: false },
			{ name: "size", default: 10 }
		],
		verb: "get"
	},
	{
		desp: "点击抽奖,进行抽奖返回抽奖结果",
		action: "/prize/driveLottery.score",
		outKey: "runLottery",
		verb: "post"
	}
];
