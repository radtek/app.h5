const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = class CSSLoader {
	constructor({
		sourceMap,
		extract,
		minimize,
		modules,
		localIdentName,
		postcss,
		loaderOptions
	} = {}) {
		// css文件的loader
		this.cssLoader = "css-loader";
		// 应用于当 CSS 没有被提取的时候采用的Loader
		this.fallbackLoader = "vue-style-loader";
		// 是否开启sourceMap
		this.sourceMap = sourceMap;
		// 是否开启提取
		this.extract = extract;
		// 是否开启压缩
		this.minimize = minimize;
		// 是否开启CSS Modules
		this.modules = modules;
		// 开启CSS Modules后导出的样式名称命名规则
		this.localIdentName = localIdentName;
		// 是否启用postcss
		this.postcss = postcss;
		// 当前预处理器对应的加载器配置
		this.loaderOptions = loaderOptions || {};
	}

	generateLoader(test, loader, options = {}) {
		const cssLoaderOptions = {
			sourceMap: this.sourceMap,
			minimize: this.minimize
		};

		if (this.modules) {
			cssLoaderOptions.modules = true;
			cssLoaderOptions.importLoaders = 1;
			cssLoaderOptions.localIdentName = this.localIdentName;
		}

		Object.assign(cssLoaderOptions, options);

		const use = [
			{
				loader: this.cssLoader,
				options: cssLoaderOptions
			}
		];

		// 判断当前loader是否是postcss-loader,如果是则跳过,如果不是则需要在每种预处理器的loader之后使用postcss-loader
		if (loader !== "postcss" && this.postcss !== false) {
			use.push({
				loader: "postcss-loader",
				options: {
					sourceMap: this.sourceMap
				}
			});
		}

		if (loader && loader !== "css") {
			if (loader === "scss" || loader === "sass") {
				use.push({
					loader: "resolve-url-loader",
					options: {
						sourceMap: this.sourceMap
					}
				});
			}

			use.push({
				loader: `${loader}-loader`,
				options: Object.assign(
					{},
					this.loaderOptions[loader] || {},
					options,
					{
						sourceMap: this.sourceMap
					}
				)
			});
		}

		const fallback = this.fallbackLoader;

		const useLoaders = [
			{
				loader: fallback,
				options: {
					shadowMode: true,
					sourceMap: this.sourceMap
				}
			},
			...use
		];

		return {
			test,
			use: this.extract
				? [MiniCSSExtractPlugin.loader].concat(use)
				: useLoaders // ? ExtractTextPlugin.extract({ use, fallback })
		};
	}
	css(test = /\.css$/) {
		return this.generateLoader(test, "css");
	}

	sass(test = /\.sass$/) {
		return this.generateLoader(test, "sass", {
			indentedSyntax: true
		});
	}

	scss(test = /\.scss$/) {
		return this.generateLoader(test, "sass");
	}

	less(test = /\.less$/) {
		return this.generateLoader(test, "less");
	}

	styl(test = /\.styl$/) {
		return this.generateLoader(test, "stylus");
	}

	stylus(test = /\.stylus$/) {
		return this.generateLoader(test, "stylus");
	}

	vue() {
		const originalPostcss = this.postcss;
		const originalModules = this.modules;
		this.postcss = false;
		this.modules = false;
		const loaders = {};
		for (const lang of ["css", "sass", "scss", "less", "stylus", "styl"]) {
			loaders[lang] = this[lang]().use;
		}
		this.postcss = originalPostcss;
		this.modules = originalModules;
		return loaders;
	}
};
