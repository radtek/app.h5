// https://github.com/michael-ciniawsky/postcss-load-config

const plugins = {
	"postcss-import": {},
	"postcss-url": {},
	// to edit target browsers: use "browserslist" field in package.json
	autoprefixer: {
		browsers: ["iOS >= 7", "Android >= 4.1"]
	}
};

plugins["postcss-plugin-px2rem"] = {
	rootValue: 75,
	unitPrecision: 5,
	minPixelValue: 5
};

module.exports = {
	plugins: plugins
};
