export default [
    {
        //首页商品列表
        verb: "get",
        outKey: "getMallList",
        action: "/mall/getHomeList.mall",
        reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
    },
    {
        //首页swipe列表
        verb: "get",
        outKey: "getMallSwipe",
        action: "/mall/getHomeSwipe.mall"
    },
        //detail页面列表
    {
        verb: "get",
        outKey: "getDetailList",
        action: "/mall/getDetailList.mall",
        reqParams: [
			{ name: "page", default: 1 },
			{ name: "pageSize", default: 10 }
		]
    }

];
