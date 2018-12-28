export default {
	methods: {
		/**
		 *
		 * 跳转至特定路由
		 *
		 * @param {String} title 目标页面的标题
		 * @param {String} url 目标页面的路径名称
		 * @param {Object} [params] 需要携带的参数
		 */
		goto(title, url, params) {
			const query = params
				? this.$rxUtils.assign({}, this.authInfo, params)
				: this.authInfo;

			const qsStr = this.$rxUtils.qs.stringify(query);

			if (!this.$isDev) {
				JXRSApi.view.goto({
					title,
					url: `${location.origin}/${
						process.env.JXRS_APP_MODULE
					}${url}${qsStr}`,
					query
				});
			} else {
				this.$router.push({ path: url, query });
			}
		},
		/**
		 *
		 * 跳转至App的原生界面
		 *
		 * @param {String} title 目标页面的标题
		 * @param {String} url 目标页面的路径名称
		 * @param {Object} [params] 需要携带的参数
		 */
		gotoNative(title, action, params) {
			const query = params || {};

			if (!this.$isDev) {
				JXRSApi.view.goto({
					url: `native://${action}`,
					title,
					query
				});
			} else {
				alert(
					`原生App端接受调用:native://${action},${
						params ? JSON.stringify(params) : ""
					}`
				);
			}
		}
	}
};
