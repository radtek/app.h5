export default [
	{
		desp: "获取新闻详情",
		verb: "get",
		outKey: "getDetail",
		action: "/mobile/v1/getContentDetail.lm",
		reqParams: ["contentId"]
	},

	{
		desp: "获取新闻对应评论列表",
		verb: "get",
		outKey: "getComments",
		action: "/mobile/v1/getContentCommentById.lm",
		reqParams: [
			"contentId",
			{ name: "type", default: 1 },
			{ name: "startIndex", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},

	{
		desp: "获取推荐新闻列表",
		verb: "get",
		outKey: "getRecommends",
		action: "/mobile/v1/getRecommendContent.lm",
		reqParams: ["contentId", "channelId"]
	},

	{
		desp: "收藏新闻",
		verb: "post",
		outKey: "onlikeNew",
		action: "/mobile/v1/addUserContentCollection.lm",
		reqParams: ["contentId"]
	},

	{
		desp: "取消收藏新闻",
		outKey: "offlikeNew",
		action: "/mobile/v1/deleteUserContentCollection.lm",
		reqParams: ["contentIds"]
	},

	{
		desp: "记录新闻点击",
		outKey: "recordClick",
		action: "/mobile/v1/recordUserActions.lm",
		reqParams: [
			"contentId",
			"channelId",
			{ name: "action", default: 1 },
			{ name: "type", default: 1 }
		]
	},

	{
		desp: "新增新闻的评论点赞",
		outKey: "addZanToComment",
		action: "/mobile/v1/recordUserActions.lm",
		reqParams: [
			"contentId",
			"commentId",
			{ name: "action", default: 1 },
			{ name: "type", default: 3 }
		]
	},

	{
		desp: "取消新闻的评论点赞",
		outKey: "cancelZanToComment",
		action: "/mobile/v1/recordUserActions.lm",
		reqParams: [
			"contentId",
			"commentId",
			{ name: "action", default: 2 },
			{ name: "type", default: 3 }
		]
	}
];
