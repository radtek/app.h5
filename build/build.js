const ora = require("ora");
const chalk = require("chalk");
const webpack = require("webpack");
const webpackConfig = require("./webpack.prod.conf");
const rm = require("rimraf");
const path = require("path");
const api = require("./build-api");

const spinner = ora(`building for ${process.env.NODE_ENV}...`);
spinner.start();

function reallyBuild() {
	webpack(webpackConfig, (err, stats) => {
		spinner.stop();
		if (err) throw err;

		const webpackStatus = stats.toString({
			colors: true,
			modules: false,
			children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
			chunks: true,
			chunkModules: true
		});

		process.stdout.write(webpackStatus + "\n\n");

		if (stats.hasErrors()) {
			console.log(chalk.red("  Build failed with errors.\n"));
			process.exit(1);
		}

		console.log(chalk.cyan("  Build complete.\n"));
		console.log(
			chalk.yellow(
				"  Tip: built files are meant to be served over an HTTP server.\n" +
					"  Opening index.html over file:// won't work.\n"
			)
		);
	});
}

if (process.env.NODE_ENV !== "development") {
	rm(
		path.join(
			__dirname,
			`../${api.getDistDirName()}/${process.env.JXRS_APP_MODULE}`
		),
		err => {
			if (err) throw err;
			reallyBuild();
		}
	);
} else {
	reallyBuild();
}
