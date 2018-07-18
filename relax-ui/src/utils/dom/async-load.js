export function loadJS(
	url,
	{ charset = "utf-8", crossorigin = true, needRemove = true },
	callback
) {
	const doc = document;
	const head =
		doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
	const baseElement = head.getElementsByTagName("base")[0];

	const node = doc.createElement("script");

	if (charset) {
		node.charset = charset;
	}

	if (crossorigin) {
		node.setAttribute("crossorigin", crossorigin);
	}

	addOnload(node, callback, url);

	node.async = true;
	node.src = url;

	baseElement ? head.insertBefore(node, baseElement) : head.appendChild(node);

	function addOnload(node, callback) {
		const supportOnload = "onload" in node;

		if (supportOnload) {
			node.onload = onload;
			node.onerror = function() {
				onload(true);
			};
		} else {
			node.onreadystatechange = function() {
				if (/loaded|complete/.test(node.readyState)) {
					onload();
				}
			};
		}

		function onload(error) {
			// Ensure only run once and handle memory leak in IE
			node.onload = node.onerror = node.onreadystatechange = null;

			// Remove the script to reduce memory leak
			if (needRemove) {
				head.removeChild(node);
			}

			// Dereference the node
			node = null;

			callback(error);
		}
	}
}
