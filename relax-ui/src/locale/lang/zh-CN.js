export default {
	rx: {
		pull: {
			down: {
				prepare: {
					release: "释放即可刷新",
					normal: "下拉刷新"
				},
				ing: "正在刷新中",
				complete: "刷新成功",
				empty: "为获取任何新数据",
				error: "网络异常,点击刷新"
			},
			up: {
				ing: "数据加载中",
				complete: "加载成功",
				empty: "暂无更多",
				error: "网络异常,点击加载"
			}
		},
		alert: {
			ok: "确定"
		},
		confirm: {
			yes: "确定",
			no: "取消"
		}
	}
};
