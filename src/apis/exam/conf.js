export default [
	{
		// 登录考试系统
		outKey: "login",
		action: "/infoTitle/examLogin.lm",
		reqParams: [
			"titleTaskId",
			"loginType",
			"type",
			{ name: "userPhonenumber", default: "" },
			{ name: "passwd", default: "" },
			{ name: "userName", default: "" },
			{ name: "identityId", default: "" },
			{ name: "userId", default: "" },
			{ name: "answerType", default: 1 },
			{ name: "answerAgain", default: 0 }
		]
	},
	{
		// 获取用户的个人考试列表
		verb: "get",
		outKey: "getListOfUser",
		action: "/infoTitle/listUserTitleList.lm",
		reqParams: [
			"userId",
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 100 }
		]
	},
	{
		// 更新考试是否最新的状态
		outKey: "updateAnswerState",
		action: "infoTitle/checkNewTitle.lm",
		reqParams: ["taskId", "userId"]
	},
	{
		// 获取考试介绍
		verb: "get",
		outKey: "getDetail",
		action: "/infoTitle/getTestIntroduction.lm",
		reqParams: ["taskId"]
	},
	{
		// 获取用户当前考试的所有题目
		verb: "get",
		outKey: "getAllQues",
		action: "infoTitle/getTitleList.lm",
		reqParams: ["userId", "id"]
	},
	{
		// 获取用户考试题目的详情
		verb: "get",
		outKey: "getQuesDetail",
		action: "infoTitle/getTitleContent.lm",
		reqParams: ["userId", "taskId", "titleId", "testId"]
	},
	{
		verb: "get",
		outKey: "getAllSubmitQues",
		action: "infoTitle/getAnswerSheet.lm",
		reqParams: ["userId", "taskId", "testId"]
	},
	{
		// 提交回答
		verb: "post",
		outKey: "submit",
		action: "infoTitle/insertOrUpdateTestAnswerRecord.lm",
		reqParams: ["userId", "answerIds", "titleId", "taskId", "testId"]
	},
	{
		// 考试结束
		verb: "post",
		outKey: "finish",
		action: "infoTitle/postOverTest.lm",
		reqParams: ["userId", "taskId", "testId"]
	}
];
