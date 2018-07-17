const webpack = require("webpack");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlTemplateReplacePlugin = require("./plugins/HtmlTemplateReplacePlugin");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");
const api = require("./build-api");

const config = webpackMerge(baseConfig, {
	mode: "development",
	output: {
		filename: "[name].js",
		publicPath: "/"
	},
	devtool: "cheap-module-eval-source-map",
	devServer: api.resolveDevServer(),
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	]
});

config.plugins.push(
	new HtmlWebpackPlugin(api.resolveHtmlTemplate()),
	new HtmlTemplateReplacePlugin(api.resolveClientEnv({}, true)),
	new FriendlyErrorsPlugin({
		compilationSuccessInfo: {
			messages: [
				`Your application is running here: http://${
					config.devServer.host
				}:${config.devServer.port}`
			]
		},
		onErrors: api.createNotifierCallback()
	})
);

module.exports = config;
