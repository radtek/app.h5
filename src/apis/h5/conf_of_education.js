export default [
	{
		// 获取学习教育详情
		outKey: "getDetail",
		needPassport: true,
		action: "/mobile/v1/studyCustomController/getCustomContentByContentId.lm",
		reqParams: ["contentId"]
	}
];
