export default function overflowContent(str, maxLength = 40) {
	return str && str.length > maxLength
		? str.substring(0, maxLength) + "..."
		: str;
}
