export default [
	{
		outKey: "getEducationList",
		action: "/weixinGZH/shanghai/getEducationSH.lm"
	},
	{
		outKey: "getStreetList",
		action: "/weixinGZH/shanghai/getShangHaiStreet.lm"
	},
	{
		outKey: "getCommunityByStreet",
		action: "/weixinGZH/shanghai/getCommunityByStreet.lm",
		reqParams: ["street"]
	},
	{
		outKey: "getPoliticalList",
		action: "/weixinGZH/shanghai/getZZMM.lm"
	},
	{
		outKey: "getUnitsByCommunity",
		action: "/weixinGZH/shanghai/getTrUnitByCommunity.uu",
		reqParams: ["community"]
	},
	{
		outKey: "getSpecialList",
		action: "/weixinGZH/shanghai/getSpeciality.lm"
	},
	{
		outKey: "getHobbyList",
		action: "/weixinGZH/shanghai/getHobby.lm"
	},
	{
		outKey: "getStatisticsOfSex",
		action: "/weixinGZH/shanghai/getSexPieChart.lm"
	},
	{
		outKey: "getStatisticsOfAge",
		action: "/weixinGZH/shanghai/getAgeBarChart.lm"
	},
	{
		outKey: "getStatisticsOfEducation",
		action: "/weixinGZH/shanghai/getEducationBarChart.lm"
	},
	{
		outKey: "getStatisticsOfHealth",
		action: "/weixinGZH/shanghai/getHealthPieChart.lm"
	},
	{
		outKey: "getStatisticsOfRetire",
		action: "/weixinGZH/shanghai/getRetireBarChart.lm"
	},
	{
		outKey: "getStatisticsOfHobby",
		action: "/weixinGZH/shanghai/getHobbyList.lm"
	},
	{
		outKey: "getStatisticsOfSpecial",
		action: "/weixinGZH/shanghai/getSpecilityList.lm"
	},
	{
		outKey: "getUserInfo",
		action: "/weixinGZH/shanghai/getUserDetailsByUserIdGZH.uu",
		reqParams: ["userId"]
	},
	{
		desp: "注册",
		verb: "post",
		outKey: "register",
		action: "/weixinGZH/shanghai/insertSHWeiXinUser.uu",
		contentType: "json",
		reqParams: [
			"userIdCard",
			"userName",
			"sex",
			"birthday",
			"mobileNumber",
			"familyPhone",
			"education",
			"health",
			"retire",
			"retireTime",
			"workUnit",
			"position",
			"title",
			"political",
			"unitId",
			"joinTime",
			"unitNameReal",
			"unitNameAddress",
			"street",
			"community",
			"honor",
			"activityIntention",
			"service",
			"hobbyAndSpeciality"
		]
	}
];
