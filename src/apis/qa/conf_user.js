export default [
	{
		// 添加好友
		outKey: "addFriend",
		action: "/friend/addFriend.lm",
		reqParams: ["friendId"]
	},
	{
		// 获取用户信息
		outKey: "getUserInfo",
		action: "/qauser/getUserInfoByUserId.qa"
	},
	{
		// 获取问答社区推荐好友
		verb: "get",
		outKey: "getRecommendUsers",
		action: "/recommend/recommendFriend.qa",
		reqParams: ["unitId"]
	},
	{
		// 获取问答社区推荐回答者
		verb: "get",
		outKey: "getRecommentInvitingUsers",
		action: "/recommend/recommendAnswer.qa",
		reqParams: ["unitId"]
	},
	{
		// 邀请好友回答问题
		outKey: "inviteAnswer",
		action: "/recommend/inviteAnswer.qa",
		reqParams: ["friendId", "questionId"]
	}
];
