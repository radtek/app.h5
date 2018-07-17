export default function trim(val) {
	return val ? val.replace(/(^\s*)|(\s*$)/g, "") : "";
}
