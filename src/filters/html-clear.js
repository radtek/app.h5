const REG_HTML_SCRIPT = /<script[^>]*?>[\s\S]*?<\/script>/g;
const REG_HTML_STYLE = /<style[^>]*?>[\s\S]*?<\/style>/g;
export default function removeHtmlTag(str) {
	return str
		? str
			.replace(REG_HTML_SCRIPT, "")
			.replace(REG_HTML_STYLE, "")
			.replace(/<[^<>]+>/g, "")
			.replace(/(^\s*)|(\s*&)/g, "")
			.replace(/[\r\n]/g, "")
		: "";
}
