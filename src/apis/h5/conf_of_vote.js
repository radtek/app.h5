export default [
	{
		// desp: "查询投票信息",
		outKey: "getVoteItems",
		action: "/mobile/v1/getVoteListByActiveId.life",
		needPassport: true,
		reqParams: ["activityId", { name: "isMZPY", default: "" }]
	},
	{
		// desp: "查询投票统计信息",
		outKey: "getVoteStatistics",
		action: "/mobile/v1/getVoteResultListByActiveId.life",
		needPassport: true,
		reqParams: ["activityId", { name: "isMZPY", default: "" }]
	},
	{
		// "查询开发型投票的列表信息",
		outKey: "getKFXVotes",
		action: "mobile/v1/getActiveVoteQuestion.life",
		needPassport: true,
		reqParams: ["activityId"]
	},
	{
		// "查询开发型投票的回答统计信息",
		outKey: "getKFXStatistics",
		action: "mobile/v1/getActiveVoteAnswer.life",
		needPassport: true,
		reqParams: ["activityId", "voteThemeId"]
	},
	{
		// desp: "提交问卷"
		outKey: "submit",
		action: "/mobile/v1/doVoteTheme.life",
		needPassport: true,
		contentType: "json",
		reqParams: [
			"activityId",
			"voteIds",
			"voteResultList",
			{ name: "isMZPY", default: "" },
			{ name: "unitId", default: "" }
		]
	},
	{
		// desp:"判断是否可以投票",
		outKey: "validVoteAccess",
		action: "/mobile/v1/checkCanVote.life",
		needPassport: true,
		reqParams: ["activityId", { name: "isMZPY", default: "" }]
	}
];
