export default function isSupportWebp() {
	return (
		!![].map &&
		document
			.createElement("canvas")
			.toDataURL("image/webp")
			.indexOf("data:image/webp") === 0
	);
}
