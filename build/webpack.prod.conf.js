const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlTemplateReplacePlugin = require("./plugins/HtmlTemplateReplacePlugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const AutoDllPlugin = require("autodll-webpack-plugin");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const PreloadPlugin = require("./plugins/PreloadPlugin");
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const uglifyOptions = require("./uglifyOptions");
const baseConfig = require("./webpack.base.conf");
const api = require("./build-api");

const outputFileName = api.resolveAssetsPath(
	"js",
	`[name].[chunkhash:${api.options.assets.hashLen}].js`
);

const prodConfig = webpackMerge(baseConfig, {
	mode: "production",
	devtool: "#source-map",
	output: {
		filename: outputFileName,
		chunkFilename: outputFileName,
		publicPath: `/${api.getAppModule()}/`
	},
	plugins: [
		new webpack.HashedModuleIdsPlugin(),

		new MiniCSSExtractPlugin({
			filename: api.resolveAssetsPath(
				"css",
				"[name].[contenthash:8].css"
			),
			allChunks: true
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorOptions: { safe: true, map: { inline: false } }
		}),
		new ParallelUglifyPlugin({
			cacheDir: api.resolve("node_modules/.cache/parallel-uglifyjs"),
			sourceMap: true,
			uglifyJS: {
				output: {
					comments: false
				},
				compress: {
					warnings: false
				}
			}
		}),
		new HtmlWebpackPlugin(api.resolveHtmlTemplate(true)),
		new PreloadPlugin({
			rel: "preload",
			include: "initial",
			fileBlacklist: [/\.map$/, /hot-update\.js$/]
		}),
		new AutoDllPlugin({
			inject: true,
			inherit: false,
			context: api.resolve("."),
			path: api.resolveAssetsPath("dll", false),
			filename: "[name].[hash:8].js",
			entry: {
				vendor: [
					...api.resolveDllEntries(),
					"vue-loader/lib/runtime/componentNormalizer"
				]
			},
			plugins: [
				new webpack.DefinePlugin(api.resolveClientEnv()),
				new UglifyPlugin(uglifyOptions())
			]
		}),
		new HtmlTemplateReplacePlugin(api.resolveClientEnv({}, true)),
		new PreloadPlugin({
			rel: "prefetch",
			include: "asyncChunks"
		}),
		new PrerenderSPAPlugin({
			staticDir: api.resolve(
				`${api.getDistDirName()}/${api.getAppModule()}`
			),
			routes: api.resolvePrerenderSPARoutes()
		})
	]
});

if (api.options.gzip) {
	const CompressionPlugin = require("compression-webpack-plugin");
	prodConfig.plugins.push(
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0
		})
	);
}

if (api.options.analyse) {
	prodConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = prodConfig;
