export default [
	{
		// desp: "获取首页推荐问题",
		verb: "get",
		outKey: "getRecommendQ",
		action: "/community/getRecommendQuestion.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 获取最新问题列表
		verb: "get",
		outKey: "getLatestQuestions",
		action: "/community/getLatestQuestion.qa",
		reqParams: [
			{ name: "id", default: 0 },
			{ name: "freshType", default: 2 },
			{ name: "pageSize", default: 50 }
		]
	},
	{
		// 获取最新问题列表
		verb: "get",
		outKey: "getHottestQuestions",
		action: "/community/getHottestQuestion.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 50 }
		]
	},
	{
		// desp: "搜索问题列表"
		verb: "post",
		outKey: "searchQuestion",
		action: "/qaSearch/getQASearchList.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 },
			{ name: "preTags", default: "<strong class='hl'>" },
			{ name: "postTags", default: "</strong>" },
			{ name: "searchKey", default: "" }
		]
	},
	{
		// desp: "获取问题详情"
		verb: "get",
		outKey: "getQuesDetail",
		action: "/question/getQuestionDetail.qa",
		reqParams: ["questionId"]
	},
	{
		// 获取回答列表
		verb: "get",
		outKey: "getAnswers",
		action: "/answerList/getAnswerList.qa",
		reqParams: [
			"questionId",
			{ name: "type", default: 1 },
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 记录回答阅读数
		outKey: "recordAnswerScanCount",
		action: "/qauser/insertAnswerClick.qa",
		reqParams: ["answerId"]
	},
	{
		// 获取回答详情
		verb: "get",
		outKey: "getAnswerDetail",
		action: "/answerList/getAnswerList.qa",
		reqParams: ["questionId", "answerId", { name: "type", default: 2 }]
	},
	{
		// 点赞回答
		outKey: "zanAnswer",
		action: "/answer/supportAnswer.qa",
		reqParams: ["answerId", { name: "support", default: true }]
	},
	{
		// 取消点赞回答
		outKey: "cancelZanAnswer",
		action: "/answer/supportAnswer.qa",
		reqParams: ["answerId", { name: "support", default: false }]
	},
	{
		// 获取回答的评论列表
		outKey: "getAnswerComments",
		action: "/qacomment/getQACommentList.qa",
		reqParams: [
			"answerId",
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 点赞评论
		outKey: "zanAnswerComment",
		action: "/qacomment/updateCommentSupport.qa",
		reqParams: ["commentId", { name: "support", default: true }]
	},
	{
		// 取消点赞评论
		outKey: "cancelZanAnswerComment",
		action: "/qacomment/updateCommentSupport.qa",
		reqParams: ["commentId", { name: "support", default: false }]
	},
	{
		// 获取用户收藏的问题列表
		outKey: "getUserCollection",
		action: "/qauser/getUserCollectList.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 获取用户的提问列表
		outKey: "getUserCreatedQ",
		action: "/qauser/getUserAskList.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 获取用户的回答列表
		outKey: "getUserCreatedA",
		action: "/qauser/getUserAnswerList.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// 获取问答的消息中心
		outKey: "getMessages",
		action: "/qauser/getUserPushHistory.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	}
];
