const path = require("path");
const fs = require("fs");
const through = require("through2");
const gulp = require("gulp");
const gFtp = require("../gulp-sftp-up4.jxrs");
const gUtil = require("gulp-util");

const env = process.env.NODE_ENV || "aliyun";
const mduName = process.env.JXRS_APP_MODULE;

const APPJS_REGEX = /static\/js\/app.(\w)*.js/g;
const APPCSS_REGEX = /static\/css\/app.(\w)*.css/g;
// const STYLESCSS_REGEX = /static\/css\/styles.(\w)*.css/g;
// const STYLESJS_REGEX = /static\/js\/styles.(\w)*.js/g;

function getLatestAppHash() {
	const htmlContent = fs.readFileSync(getTargetDir("index.html")).toString();

	const matches = htmlContent.match(APPJS_REGEX);
	const matches2 = htmlContent.match(APPCSS_REGEX);
	// const matches3 = htmlContent.match(STYLESCSS_REGEX);
	// const matches4 = htmlContent.match(STYLESJS_REGEX);

	return {
		"app.js": matches[0].split(".")[1],
		"app.css": matches2[0].split(".")[1]
		// "styles.css": matches3[0].split(".")[1],
		// "styles.js": matches4[0].split(".")[1]
	};
}

const gulpPlugins = {
	updateChangeLogContent(paths) {
		return through.obj((file, enc, cb) => {
			file.contents = Buffer.from(paths.join("\n"));
			cb(null, file);
		});
	},
	updateHash(mduHashMap) {
		return through.obj((file, enc, cb) => {
			const source = file.contents.toString();

			const matches = new Set(
				source.match(/(app|styles).(\w*).(js|css)/g)
			);
			let newContent = source;
			Array.from(matches).forEach(it => {
				const arr = it.split(".");
				newContent = newContent.replace(
					new RegExp(it, "g"),
					`${arr[0]}.${mduHashMap[`${arr[0]}.${arr[2]}`]}.${arr[2]}`
				);
			});

			file.contents = Buffer.from(newContent);
			cb(null, file);
		});
	}
};

function getFtpOptions() {
	const options = {
		fileRelativeMap(localFile) {
			const kw = `${path.sep}${mduName}${path.sep}`;
			if (~localFile.indexOf(mduName)) {
				return localFile.substring(localFile.indexOf(kw) + kw.length);
			}
		},
		authFile: path.resolve(__dirname, "../../.ftppass")
	};

	if (env === "aliyun") {
		options.host = "121.43.177.173";
		options.port = 22;
		options.auth = "aliyun";
		options.remotePath = `/ssd0/webapps/0.h5/${mduName}/`;
	} else if (env === "test") {
		options.host = "whrdd.f3322.net";
		options.port = 21022;
		options.auth = "test";
		options.remotePath = `/ssd0/webapps/0.h5/${mduName}/`;
	}

	return options;
}

/**
 * 获取目标比对目录
 */
function getTargetDir(fileName) {
	return path.resolve(
		__dirname,
		`../../jxrs-h5-depoly/${env}/${mduName}`,
		fileName || ""
	);
}

function VmFileObj(filePath) {
	this.stat = fs.statSync((this._path = filePath));
}

function VmFs(dir) {
	this.dir = dir;
	this.dirs = fs.readdirSync(dir);
	this.allPaths = [];
}

VmFs.prototype = {
	constructor: VmFs,
	/**
	 * 获取上一次部署时包内所有的文件路径
	 */
	getPrevFiles() {
		const root = path.resolve(this.dir, "../__changed__");

		try {
			fs.accessSync(root, fs.constants.R_OK | fs.constants.W_OK);
			const files = fs.readdirSync(root);

			this.prevFiles =
				files && files.length
					? fs.readFileSync(path.resolve(root, files[0])).toString()
					: null;

			if (this.prevFiles) {
				this.prevFiles = this.prevFiles
					.split("\n")
					.map(it => it.toLowerCase());
			}
		} catch (err) {
			console.warn(`当前不存在此地址：${root}`);
		}

		return this;
	},
	/**
	 * 获取所有路由的html文件路径
	 */
	getRouteHtmls() {
		if (!this.htmls || !this.htmls.length) {
			this.htmls = this.dirs
				.filter(it => it !== "static")
				.map(it =>
					getTargetDir(it === "index.html" ? it : it + "/index.html"));
		}
		return this;
	},
	/**
	 * 获取所有发生改变（新增/修改）的文件以及无用的文件
	 */
	getChangedAndUnused() {
		const root = path.resolve(this.dir, "static");

		const staticDirs = fs.readdirSync(root);

		this.changed = [];

		if (!this.prevFiles) {
			staticDirs.forEach(it => {
				const _path = path.resolve(root, it).toLowerCase();
				const stat = fs.statSync(_path);
				if (!stat.isDirectory()) {
					this.allPaths.push(_path);
					this.changed.push(_path);
					return;
				}
				fs.readdirSync(_path).forEach(it => {
					const p = path.resolve(_path, it);
					this.allPaths.push(p);
					this.changed.push(p);
				});
			});

			this.changed = this.changed.concat(this.htmls);

			return this;
		}

		const caches = {};
		staticDirs.forEach(it => {
			const _path = path.resolve(root, it).toLowerCase();
			const stat = fs.statSync(_path);
			if (!stat.isDirectory()) {
				this.allPaths.push(_path);
				return;
			}
			fs.readdirSync(_path).forEach(it => {
				const arr = it.split(".");
				const hash =
					arr[arr.length - 1] === "map"
						? arr[arr.length - 3]
						: arr[arr.length - 2];

				const __path = path.resolve(_path, it);
				const cacheFlag = it.replace(hash + ".", "");
				if (caches[cacheFlag]) {
					caches[cacheFlag].push(new VmFileObj(__path));
				} else {
					caches[cacheFlag] = [new VmFileObj(__path)];
				}
			});
		});

		// 获取changed文件列表
		this.unused = [];
		Object.values(caches)
			.filter(it => it.length >= 2)
			.forEach(it => {
				it.sort((a, b) => (a.stat.ctime <= b.stat.ctime ? 1 : -1));
				this.changed.push(it[0]._path);
				this.allPaths.push(it[0]._path);
				it.shift();
				it.forEach(i => this.unused.push(i._path));
			});

		this.allPaths = this.allPaths.concat(
			Object.values(caches)
				.filter(it => it.length === 1)
				.map(it => it[0]._path)
		);

		// 获取不在上次发布文件路径中的文件：新文件
		this.changed = this.changed.concat(
			Object.values(caches)
				.filter(it => {
					return (
						it.length === 1 && !this.prevFiles.includes(it[0]._path)
					);
				})
				.map(it => it[0]._path)
		);

		const hasAppJsUpdated = this.changed.filter(
			p => ~p.indexOf(`app.${getLatestAppHash()}.js`)
		);

		if (hasAppJsUpdated && hasAppJsUpdated.length) {
			this.changed = this.changed.concat(this.htmls);
		}

		return this;
	},
	rmUnused() {
		if (!this.unused || !this.unused.length) return this;
		this.unused.forEach(it => {
			console.log(">>>>>>>>>>>>>>>>");
			fs.unlinkSync(it);
			console.log(`成功移除无用文件:${it}`);
			console.log(">>>>>>>>>>>>>>>>");
		});
	}
};

/**
 *
 * 构建步骤
 *
 * 1. 比对打包的文件夹(目前只针对static中的文件)
 *  1.1 找到重复文件
 *  	1.1.1 找到最新的文件
 * 		1.1.2 删除其余重复文件
 *  1.2 生成changed文件集
 *  1.3 部署更新changed文件集至服务器;
 *
 * 2. 每次都要更新路由文件夹中的html文件
 */
const vmFs = new VmFs(getTargetDir());

vmFs.getPrevFiles()
	.getRouteHtmls()
	.getChangedAndUnused()
	.rmUnused();

console.log("*********** changed ***********");
console.log(vmFs.changed);

gulp.task("html-hash-replace", () => {
	const dir = getTargetDir();
	return gulp
		.src(vmFs.htmls, { base: dir })
		.pipe(gulpPlugins.updateHash(getLatestAppHash()))
		.pipe(gulp.dest(dir));
});

gulp.task("ftp", () =>
	gulp
		.src(vmFs.changed)
		.pipe(gFtp(getFtpOptions()))
		.pipe(gUtil.noop()));

gulp.task("update-changed", () =>
	gulp
		.src(getTargetDir("../__changed__/path.txt"))
		.pipe(gulpPlugins.updateChangeLogContent(vmFs.allPaths))
		.pipe(gulp.dest(getTargetDir("../__changed__"))));

gulp.task("transfer", gulp.series("html-hash-replace", "ftp"));
