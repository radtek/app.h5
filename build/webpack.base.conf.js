const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const api = require("./build-api");
const outputDir = api.resolve(`${api.getDistDirName()}/${api.getAppModule()}`);

module.exports = {
	entry: {
		app: api.resolve(`src/entries/${api.getAppModule()}/app.js`)
	},
	output: {
		path: api.resolve(`${api.getDistDirName()}/${api.getAppModule()}`)
	},
	resolve: {
		extensions: [".js", ".jsx", ".vue", ".json"],
		alias: {
			"@": api.resolve("src"),
			vue$: api.options.runtimeCompiler
				? "vue/dist/vue.runtime.esm.js"
				: "vue/dist/vue.esm.js",
			"vue-router": "vue-router/dist/vue-router.esm.js",
			"better-scroll": "better-scroll/dist/bscroll.esm.js",
			"es6-promise": "es6-promise/dist/es6-promise.min.js",
			"~a": api.resolve("src/apis"),
			"~c": api.resolve("src/components"),
			"~d": api.resolve("src/directives"),
			"~e": api.resolve("src/entries"),
			"~f": api.resolve("src/filters"),
			"~j": api.resolve("src/jsapi"),
			"~m": api.resolve("src/mixins"),
			"~r": api.resolve("src/routes"),
			"~v": api.resolve("src/views"),
			"~u": api.resolve("src/utils"),
			"~css": api.resolve("src/assets"),
			"~imgs": api.resolve("src/assets/imgs"),
			"~rx": api.resolve("relax-ui")
		}
	},
	module: {
		noParse(content) {
			return /^(vue|vue-router|vuex|es6-promise|better-scroll|hammer|fast-click)$/.test(
				content
			);
		},
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: api.resolveVueLoaderConfig()
			},
			{
				test: /\.jsx?$/,
				loader: "babel-loader",
				include: [
					api.resolve("src"),
					api.resolve("relax-ui"),
					api.resolve("test"),
					api.resolve("node_modules/webpack-dev-server/client")
				]
			},
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: api.getAssetsLimit(),
					name: api.resolveAssetsPath("imgs")
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|qlv)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: api.getAssetsLimit(),
					name: api.resolveAssetsPath("media")
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: api.getAssetsLimit(),
					name: api.resolveAssetsPath("fonts")
				}
			},
			{
				test: /\.(svg)(\?.*)?$/,
				loader: "file-loader",
				options: {
					name: api.resolveAssetsPath("fonts")
				}
			},
			...api.resolveCSSLoader()
		]
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty"
	},
	plugins: [
		new webpack.DefinePlugin(api.resolveClientEnv()),
		new VueLoaderPlugin(),
		new CopyWebpackPlugin([
			{
				from: api.resolve("public"),
				to: path.resolve(outputDir, "static"),
				ignore: api.getCopyIgnore() || []
			}
		])
	]
};
