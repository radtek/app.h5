export default function isSupportWebp() {
	return (
		!![].map &&
		document
			.createElement("canvas")
			.toDataURL("image/webp")
			.indexOf("date:image/webp") === 0
	);
}
