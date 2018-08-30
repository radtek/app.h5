// const path = require("path");
const px2rem = require("postcss-plugin-px2rem");

const pluginPX2REM = px2rem({
	rootValue: 75,
	unitPrecision: 5,
	minPixelValue: 5
});

const isProd = process.env.NODE_ENV === "production";

function getPort() {
	const mdu = process.env.JXRS_APP_MODULE;

	switch (mdu) {
		case "qa":
			return 8081;
		case "doc":
			return 8082;
		case "score":
			return 8083;
		case "h5":
			return 8084;
		case "lgbj":
			return 8085;
		case "news":
		default:
			return 8080;
	}
}

module.exports = {
	// 是否开启gzip压缩
	gzip: true,
	analyse: process.env.JXRS_APP_ANALYSE === "1",
	// vue框架是否需要模板编译器
	runtimeCompiler: false,
	assets: {
		subDirectory: "static",
		// 编译后的资源文件hash值的长度
		hashLen: 8,
		// 资源文件采用内联方式加载的临界文件大小值
		inlineLimit: 5000
	},
	vueLoader() {
		return {
			postcss() {
				return [pluginPX2REM];
			}
		};
	},
	css: {
		sourceMap: !isProd,
		extract: true,
		modules: false,
		loaderOptions: {
			sass: {
				indentedSyntax: true,
				sourceComments: true
			}
		}
	},
	devServer: {
		host: "localhost",
		port: getPort()
	},
	dll: [
		"vue/dist/vue.esm.js",
		"vue-router/dist/vue-router.esm.js",
		"axios",
		"fastclick",
		"better-scroll/dist/bscroll.esm.js"
		// ,path.join(__dirname, "../relax-ui/index.js")
	],
	copyIgnore() {
		// 获取当前需要模块拷贝需要忽略的文件
	},
	prerenderRoutes() {
		// 获取当前需要实现预呈现的路由

		const mduName = process.env.JXRS_APP_MODULE;

		switch (mduName) {
			case "news":
				return ["/info", "/comments", "/rdsc"];
			case "score":
				return ["/lottery", "/mall", "/heart-help", "/heart-map"];
			case "qa":
				return [
					"/index",
					"/questions",
					"/detail",
					"/audit-detail",
					"/answer",
					"/profile",
					"/msg_list",
					"/msg_center"
				];
			case "doc":
				return [
					"/index",
					"/docs_of_tag",
					"/my_collected",
					"/my_downloaded",
					"/my_uploaded",
					"/my_readed",
					"/share",
					"/import_of_pc",
					"/import_of_mobile"
				];
			case "h5":
				return ["/vote", "/notice-info"];
			case "lgbj":
				return [
					"/create",
					"/statistics",
					"/detail_of_statistics",
					"/user-info",
					"/search",
					"/search_of_units",
					"/search_of_users",
					"/search-result",
					"/list_of_hobby",
					"/list_of_special"
				];
			default:
				break;
		}
	}
};
