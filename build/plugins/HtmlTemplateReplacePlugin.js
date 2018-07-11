module.exports = class HtmlTemplateReplacePlugin {
	constructor(params) {
		this.params = params;
	}

	apply(compiler) {
		const isDev = process.env.NODE_ENV === "development";

		const params = this.params;

		const pluginName = "HtmlTemplateReplacePlugin";

		compiler.hooks.compilation.tap(pluginName, compilation => {
			compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
				pluginName,
				htmlPluginData => {
					htmlPluginData.html = htmlPluginData.html.replace(
						/{\s*JXRS_APP_MODULE\s*}/g,
						isDev ? "" : `/${params.JXRS_APP_MODULE}`
					);
					htmlPluginData.html = htmlPluginData.html.replace(
						/{\s*NODE_ENV\s*}/g,
						params.NODE_ENV
					);
					return htmlPluginData;
				}
			);
		});
	}
};
