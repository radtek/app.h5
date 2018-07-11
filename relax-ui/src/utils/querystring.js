function parse(searchStr) {
	if (!searchStr) {
		searchStr =
			location.search ||
			location.hash.substring(location.hash.indexOf("?"));
	}

	if (searchStr[0] === "?") {
		searchStr = searchStr.substring(1);
	}
	const qs = {};
	const searchArr = searchStr.split("&");
	for (let i = 0, l = searchArr.length; i < l; i++) {
		const arr = searchArr[i].split("=");
		qs[arr[0]] = arr[1];
	}
	return qs;
}

function stringify(...kvs) {
	let str = "";
	kvs.forEach(kv => {
		for (const k in kv) {
			str += `&${k}=` + encodeURIComponent(kv[k]);
		}
	});
	return "?" + str.substring(1);
}

export default { parse, stringify };
