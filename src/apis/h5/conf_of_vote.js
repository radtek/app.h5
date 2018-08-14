export default [
	{
		// desp: "查询投票信息",
		outKey: "getVoteItems",
		action: "/mobile/v1/getVoteListByActiveId.life",
		needPassport: true,
		reqParams: ["activityId"]
	},
	{
		// desp: "查询投票统计信息",
		outKey: "getVoteStatistics",
		action: "/mobile/v1/getVoteResultListByActiveId.life",
		needPassport: true,
		reqParams: ["activityId"]
	},
	{
		// desp: "提交问卷"
		outKey: "submit",
		action: "/mobile/v1/doVoteTheme.life",
		needPassport: true,
		contentType: "json",
		reqParams: ["activityId", "voteIds", "voteResultList"]
	}
];
