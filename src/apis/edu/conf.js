export default [
	{
		// 获取学习教育详情
		outKey: "getDetail",
		needPassport: true,
		action:
			"/mobile/v1/studyCustomController/getCustomContentByContentId.lm",
		reqParams: ["contentId"]
	},
	{
		// 获取学习教育详情的相关评论列表
		outKey: "getComments",
		needPassport: true,
		action: "mobile/v1/studyCustomController/getContentCommentList.lm",
		reqParams: [
			"contentId",
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 学习教育: 点赞用户评论
		outKey: "addZanToComment",
		action:
			"mobile/v1/studyCustomController/insertContentCommentSupporter.lm",
		reqParams: ["commentId"]
	},
	{
		// 学习教育: 取消点赞用户评论
		outKey: "cancelZanToComment",
		action:
			"mobile/v1/studyCustomController/delContentCommentSupportern.lm",
		reqParams: ["commentId"]
	}
];
