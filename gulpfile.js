const path = require("path");
const fs = require("fs");
const gulp = require("gulp");
const gZip = require("gulp-zip");
const gClean = require("gulp-clean");
const gFtp = require("./build/gulp-sftp-up4.jxrs");
const gUtil = require("gulp-util");

const env = process.env.NODE_ENV;
const appName = process.env.JXRS_APP_MODULE;
const zipDestDir = path.join(__dirname, `./depoly/`);
const targetDir = path.join(__dirname, `./jxrs-h5-depoly/${env}/${appName}`);
const prevDepolyDir = path.join(__dirname, `./depoly/${env}/${appName}`);

function getFileRealName(rootDir, file) {
	const obj = path.parse(file);
	if (~file.indexOf(`${path.sep}static${path.sep}`)) {
		const arr = obj.base.split(".");
		let realExt = "";
		let hash = "";
		if (obj.ext === ".map") {
			realExt = arr[arr.length - 2] + "." + arr[arr.length - 1];
			hash = arr[arr.length - 3];
			arr.splice(arr.length - 3, 3);
		} else {
			realExt = arr[arr.length - 1];
			hash = arr[arr.length - 2];
			arr.splice(arr.length - 2, 2);
		}
		return [arr.join(".") + "." + realExt, hash];
	}
	return [file.replace(rootDir + path.sep, ""), ""];
}

function getAllFilesInRoot(root, filePaths, isArrType, baseRoot) {
	const dirs = fs.readdirSync(root);
	dirs.forEach(dir => {
		const newRoot = path.join(root, dir);
		const [key, hash] = getFileRealName(baseRoot || root, newRoot);
		const stat = fs.statSync(newRoot);
		if (stat.isDirectory()) {
			getAllFilesInRoot(newRoot, filePaths, isArrType, baseRoot || root);
		} else {
			if (isArrType) {
				if (!filePaths[key]) {
					filePaths[key] = [];
				}
				filePaths[key].push({ p: newRoot, hash, stat });
			} else {
				filePaths[key] = { p: newRoot, hash, stat };
			}
		}
	});
}

function dirDiff(sourceDir, targetDir) {
	const sourceFiles = {};
	getAllFilesInRoot(sourceDir, sourceFiles, false);

	if (!targetFileKV) {
		getAllFilesInRoot(targetDir, targetFileKV, true);
	}

	const diffFilePaths = [];

	// 比对时间即可,最新时间的保留
	Object.keys(targetFileKV).forEach(key => {
		const target = targetFileKV[key];
		if (
			!sourceFiles[key] ||
			(target.hash && target.hash !== sourceFiles[key].hash) ||
			(!target.hash &&
				target.stat.atimeMs > sourceFiles[key].stat.atimeMs)
		) {
			diffFilePaths.push(target.p);
		}
	});

	return diffFilePaths;
}

let targetFileKV;

/**
 * 生产环境
 *
 * 1. 备份现有生产环境代码至backup/*.zip
 *
 * 2. 删除现工程打包文件夹中的重复文件
 *
 * 3. 比对现工程打包后的文件，得到增量文件列表,并打包成zip文件
 *
 * 4. 删除原生产环境代码
 *
 * 5. 将现工程打包代码全覆盖式的替换原生产环境代码
 */

gulp.task("backup", () => {
	const date = new Date();

	// TODO: 改善能够支持一天多次打包的情况
	return gulp
		.src(path.join(prevDepolyDir, "*"))
		.pipe(
			gZip(
				`${date.getFullYear()}.${date.getMonth() +
					1}.${date.getDate()} 0.h5 ${appName}.zip`
			)
		)
		.pipe(gulp.dest(path.join(__dirname, "backup")));
});

gulp.task("rm-repeat-files", () => {
	let repeatFiles = [];
	if (!targetFileKV) {
		getAllFilesInRoot(targetDir, (targetFileKV = {}), true);

		// 刪除target中的重复文件
		Object.entries(targetFileKV).forEach(([k, v]) => {
			if (v.length > 1) {
				v.sort((a, b) => (a.stat.atimeMs > b.stat.atimeMs ? -1 : 1));
			}
			targetFileKV[k] = v.shift();

			if (v.length > 0) {
				repeatFiles = repeatFiles.concat(v);
			}
		});
	}

	if (!repeatFiles || !repeatFiles.length) {
		return gulp.src(targetDir).pipe(gUtil.noop());
	}

	return gulp.src(repeatFiles.map(it => it.p)).pipe(gClean({ force: true }));
});

gulp.task("diff-build", () => {
	const hasDeoply = fs.existsSync(prevDepolyDir);
	let gSrc = path.join(targetDir, "**", "*");
	if (hasDeoply) {
		// 打增量包: 比对 prod目录和depoly目录的文件
		gSrc = dirDiff(prevDepolyDir, targetDir);
	}

	const date = new Date();

	return gulp
		.src(gSrc)
		.pipe(
			gZip(
				`${date.getFullYear()}.${date.getMonth() +
					1}.${date.getDate()} 0.h5 ${appName}.zip`
			)
		)
		.pipe(gulp.dest(zipDestDir));
});

gulp.task("clean-old", () => {
	return gulp
		.src(path.join(prevDepolyDir, "*"))
		.pipe(gClean({ force: true }));
});

gulp.task("replace", () => {
	return gulp
		.src(path.join(targetDir, "**", "*"))
		.pipe(gulp.dest(prevDepolyDir));
});

gulp.task(
	"prod",
	gulp.series(
		gulp.parallel("backup", "rm-repeat-files"),
		"diff-build",
		"clean-old",
		"replace"
	)
);

/**
 * 测试环境
 *
 * 1. 比对原始测试环境和现测试环境打包的代码文件,得到最新的文件, 将其ftp推送至测试服务器实现文件覆盖
 *
 * 2. 删除原测试环境代码
 *
 * 3. 将现工程打包代码全覆盖式的替换原测试环境代码
 */
gulp.task("diff-ftp", () => {
	const hasDeoply = fs.existsSync(prevDepolyDir);
	let gSrc = path.join(targetDir, "**", "*");
	if (hasDeoply) {
		// 打增量包: 比对 prod目录和depoly目录的文件
		gSrc = dirDiff(prevDepolyDir, targetDir);
	}

	console.log(gSrc);

	if (gSrc && gSrc.length) {
		const options = {
			fileRelativeMap(localFile) {
				const kw = `${path.sep}${appName}${path.sep}`;
				if (~localFile.indexOf(appName)) {
					return localFile.substring(
						localFile.indexOf(kw) + kw.length
					);
				}
			}
		};

		if (env === "aliyun") {
			options.host = "121.43.177.173";
			options.port = 22;
			options.auth = "aliyun";
			options.remotePath = `/ssd0/webapps/0.h5/${appName}/`;
		} else if (env === "test") {
			options.host = "whrdd.f3322.net";
			options.port = 21022;
			options.auth = "test";
			options.remotePath = `/ssd0/webapps/0.h5/${appName}/`;
		}

		return gulp
			.src(gSrc)
			.pipe(gFtp(options))
			.pipe(gUtil.noop());
	}
	return gulp.src(targetDir).pipe(gUtil.noop());
});

gulp.task(
	"test",
	gulp.series("rm-repeat-files", "diff-ftp", "clean-old", "replace")
);
