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
		outKey: "getUnitsByStreet",
		action: "/weixinGZH/shanghai/getTrUnitByStreet.uu",
		reqParams: ["street"]
	},
	{
		outKey: "searchUsers",
		action: "/weixinGZH/shanghai/getUserListByUnitId.uu",
		reqParams: [
			{ name: "unitId", default: "" },
			{ name: "userName", default: null },
			{ name: "education", default: null },
			{ name: "health", default: null },
			{ name: "retire", default: null },
			{ name: "ageType", default: null }
		]
	},
	{
		outKey: "getUserInfo",
		action: "/weixinGZH/shanghai/getUserDetailsByUserIdGZH.uu",
		reqParams: ["userId"]
	},
	{
		outKey: "validUserIdCard",
		action: "/weixinGZH/shanghai/checkUserIdCard.uu",
		reqParams: ["userIdCard"]
	},
	{
		desp: "注册",
		verb: "post",
		outKey: "register",
		action: "/weixinGZH/shanghai/insertSHWeiXinUser.uu",
		contentType: "json",
		reqParams: [
			{ name: "oldUserId", default: "" },
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
			{ name: "joinTime", default: "" },
			"unitNameReal",
			"unitNameAddress",
			"street",
			"community",
			{ name: "honor", default: "" },
			{ name: "activityIntention", default: "" },
			{ name: "service", default: "" },
			"hobbyAndSpeciality"
		]
	}
];
