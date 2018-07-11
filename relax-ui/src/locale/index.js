import CNLang from "./lang/zh-CN";

let defaultLang = CNLang;

function use(l) {
	defaultLang = l || defaultLang;
}

function t(path, option) {
	let current = defaultLang;
	let value;

	if (!current) return "";

	const arr = path.split(".");

	for (let i = 0, l = arr.length; i < l; i++) {
		value = current[arr[i]];
		if (i === l - 1) return value;
		if (!value) return "";
		current = value;
	}
}

export default { use, t };
