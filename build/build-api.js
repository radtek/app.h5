const path = require("path");
// const CSSLoaderResolver = require("./rules/cssLoader");
const CSSLoader = require("./rules/css-loaders");

const prefixRE = /^JXRS_/;

// const defaultCSSOptions = {
// 	extract: true,
// 	modules: false,
// 	sourceMap: false,
// 	loaderOptions: {},
// 	localIdentName: "[name]_[local]__[hash:base64:5]"
// };

const defaultVueLoaderOptions = {
	cssSourceMap: true,
	cacheBusting: true,
	transformToRequire: {
		video: ["src", "poster"],
		source: "src",
		img: "src",
		image: "xlink:href"
	}
};

const defaultDevServerOptions = {
	historyApiFallback: {
		disableDotRule: true,
		rewrites: [
			{
				from: /.*/,
				to: path.posix.join("/", "index.html")
			}
		]
	},
	clientLogLevel: "none",
	contentBase: false,
	compress: false,
	watchContentBase: false,
	hot: true,
	quiet: true,
	open: true,
	publicPath: "/",
	overlay: { warnings: false, errors: true }
};

const moduleTitleMap = {
	news: "新闻资讯",
	doc: "资料库",
	qa: "问答",
	score: "积分"
};

class Api {
	constructor(options) {
		this.context = path.resolve(__dirname, "../");
		this.options = options;

		// this.cssResolver = new CSSLoaderResolver(
		// 	Object.assign({}, defaultCSSOptions, options.css, {
		// 		extract: !this.isDev(),
		// 		minimize: this.isProd(),
		// 		postcss: true
		// 	})
		// );
	}

	/**
	 * 判断对象是否是测试方法
	 *
	 * @param {Any} obj 待检测的对象
	 */
	isFunction(obj) {
		return Object.prototype.toString.call(obj) === "[object Function]";
	}

	/**
	 * 判断是否是生产环境
	 *
	 * @returns {Boolean} 是否是生产环境
	 */
	isProd() {
		return process.env.NODE_ENV === "production";
	}

	/**
	 * 判断是否是测试环境
	 *
	 * @returns {Boolean} 是否是测试环境
	 */
	isTest() {
		return process.env.NODE_ENV === "test";
	}

	/**
	 * 判断是否是开发环境
	 *
	 * @returns {Boolean} 是否是开发环境
	 */
	isDev() {
		return process.env.NODE_ENV === "development";
	}

	/**
	 * 获取当前应用的模块名称
	 */
	getAppModule() {
		return process.env.JXRS_APP_MODULE;
	}

	/**
	 * 获取打包的输出文件夹名称
	 */
	getDistDirName() {
		return "jxrs-h5-depoly";
	}

	/**
	 * 解析当前路径(基于当前项目的根目录文件夹)
	 *
	 * @param {String} _path 路径
	 */
	resolve(_path) {
		return path.resolve(this.context, _path);
	}

	/**
	 * 获取当前资源可以允许内联的临界值
	 *
	 * @param {Number} defaultValue 默认10000
	 */
	getAssetsLimit(defaultValue = 10000) {
		return this.options.assets.inlineLimit || defaultValue;
	}

	/**
	 * 获取当前资源的构建后的地址
	 *
	 * @param {String} _path 资源文件的路径
	 * @returns {String} 生产环境的资源文件地址
	 */
	resolveAssetsPath(
		dir,
		fileName = `[name].[hash:${this.options.assets.hasLen || 8}].[ext]`
	) {
		return path.posix.join(
			this.options.assets.subDirectory || "static",
			dir,
			fileName === false ? "" : fileName
		);
	}

	/**
	 *
	 * 解析客户端环境变量
	 *
	 * @param {Object} options 配置项
	 * @param {Boolean} raw 是否原样输出
	 */
	resolveClientEnv(options, raw) {
		const env = {};
		Object.keys(process.env).forEach(key => {
			if (prefixRE.test(key) || key === "NODE_ENV") {
				env[key] = process.env[key];
			}
		});

		// env.BASE_URL = options.baseUrl;

		if (raw) return env;

		for (const key in env) {
			env[key] = JSON.stringify(env[key]);
		}
		return {
			"process.env": env
		};
	}
	/**
	 * 解析css的loader
	 *
	 * @param {String} lang css语言
	 */
	resolveCSSLoader(lang) {
		if (!lang) {
			return CSSLoader.styleLoaders({
				extract: process.env.NODE_ENV !== "development",
				sourceMap: true,
				usePostCSS: true
			});
		}

		// const rule = this.cssResolver[lang]();
		// return rule;
	}

	/**
	 * 解析vue-loader的相关配置
	 */
	resolveVueLoaderConfig() {
		const userVueLoaderOptions = Object.assign(
			{},
			defaultVueLoaderOptions,
			this.isFunction(this.options.vueLoader)
				? this.options.vueLoader()
				: this.options.vueLoader || {}
		);

		return Object.assign(userVueLoaderOptions, {
			loaders: CSSLoader.cssLoaders({
				sourceMap: true,
				extract: this.isProd() || this.isTest(),
				usePostCSS: true
			})
		});
	}

	/**
	 * 解析网页title
	 */
	resolveHtmlTitle() {
		const mduName = this.getAppModule();
		return `江西融思---${moduleTitleMap[mduName]}`;
	}
	/**
	 * 解析devServer配置
	 */
	resolveDevServer() {
		return Object.assign(
			defaultDevServerOptions,
			this.options.devServer || {}
		);
	}

	/**
	 *解析预呈现的路由
	 *
	 * @memberof Api
	 */
	resolvePrerenderSPARoutes() {
		const routes = this.options.prerenderRoutes;
		return this.isFunction(routes) ? routes() : routes;
	}

	/**
	 * 解析获取DLL导入的包数组
	 *
	 * @memberof Api
	 */
	resolveDllEntries() {
		return Array.isArray(this.options.dll)
			? this.options.dll
			: Object.keys(this.getPkgDependencies());
	}

	/**
	 * 获取package.json的dependencies的配置
	 *
	 * @memberof Api
	 */
	getPkgDependencies() {
		const pkg = require(this.resolve("package.json"));
		return pkg.dependencies;
	}

	/**
	 * 解析Html-webpack-plugin的参数配置
	 */
	resolveHtmlTemplate(isProd) {
		const option = {
			template:
				this.getAppModule() === "lgbj"
					? this.resolve(`src/template/index_with_pinyin.html`)
					: this.resolve(`src/template/index.html`),
			filename: this.resolve(
				`${this.getDistDirName()}/${this.getAppModule()}/index.html`
			),
			title: this.resolveHtmlTitle(),
			meta: {
				author: "jxrs",
				keywords: `jxrs ${this.getAppModule()}`,
				description: `${this.resolveHtmlTitle()}`,
				viewport:
					"initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no",
				"apple-mobile-web-app-capable": "yes",
				"apple-mobile-web-app-status-bar-style": "black",
				"apple-mobile-web-app-title": `${this.resolveHtmlTitle()}`,
				"x5-orientation": "portrait",
				"x5-fullscreen": true,
				"x5-page-mode": "default",
				"screen-orientation": "portrait",
				"full-screen": "yes",
				"format-detection": "telephone=no",
				browsermode: "application",
				layoutmode: "fitscreen",
				nightmode: "disable",
				imagemode: "force"
			}
		};

		if (isProd) {
			Object.assign(option, {
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true
					// more options:
					// https://github.com/kangax/html-minifier#options-quick-reference
				},
				// necessary to consistently work with multiple chunks via CommonsChunkPlugin
				chunksSortMode: "dependency"
			});
		}

		return option;
	}

	createNotifierCallback() {
		const notifier = require("node-notifier");
		return (severity, errors) => {
			if (severity !== "error") return;
			const error = errors[0];
			const filename = error.file && error.file.split("!").pop();

			console.log("********** error starting status: **********");

			console.log(error);

			console.log("********** error end status: **********");

			notifier.notify({
				title: "jxrs.h5",
				message: severity + ": " + error.name,
				subtitle: filename || "",
				icon: path.join(__dirname, "logo.png")
			});
		};
	}

	getCopyIgnore() {
		return [];
	}
}

module.exports = new Api(require("./jxrs.h5.conf"));
