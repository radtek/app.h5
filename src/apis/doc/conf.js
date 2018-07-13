export default [
	{
		// desp: "获取用户收藏的文档列表",
		verb: "get",
		outKey: "getUserCollectedDocs",
		action: "/library/getUserCollection.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// desp: "获取用户下载的文档列表",
		verb: "get",
		outKey: "getUserDownloadedDocs",
		action: "/library/getDownLoadList.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// desp: "获取用户导入的文档列表",
		outKey: "getUserUploadedDocs",
		action: "/importdocument/getOwnImportDocument.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// desp: "获取用户最近阅读的文档列表",
		outKey: "getUserReadedDocs",
		action: "/dcmuser/getRecentReadDocument.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// desp: "获取用户好友分享的文档列表",
		outKey: "getFriendSharedDocs",
		action: "/importdocument/getFriendShareDocument.qa",
		reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
	},
	{
		// desp: "用户收藏文档",
		outKey: "collectDoc",
		action: "/library/recordCollection.qa",
		reqParams: ["documentId"]
	},
	{
		// desp: "用户删除文档记录",
		outKey: "removeDoc",
		action: "library/bathDeleteDocument.qa",
		reqParams: ["ids", "type"]
	},
	{
		// desp: "用户下载文档",
		outKey: "downloadDoc",
		action: "/library/downloadDocument.qa",
		reqParams: ["documentIds", "type"]
	},
	{
		// desp: "获取资料库的功能标签列表",
		verb: "get",
		outKey: "getTags",
		action: "/library/getLibraryCategory.qa"
	},
	{
		// desp: "获取推荐的文档列表",
		verb: "get",
		outKey: "getRecommendDocs",
		action: "/library/getRecommendDocument.qa",
		reqParams: [
			{ name: "id", default: "" },
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 20 }
		]
	},
	{
		// desp:"获取链接码"
		verb: "post",
		outKey: "getLinkCode",
		action: "/importdocument/getLinkCode.qa"
	}
];
