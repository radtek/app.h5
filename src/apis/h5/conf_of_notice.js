export default [
	{
		// desp: "获取通知公告详情",
		verb: "post",
		outKey: "getInfo",
		action: "/task/moble/notice/selectByPrimaryKey.wt",
		needPassport: true,
		reqParams: ["noticeId"]
	}
];
