export function formatThousandth(num) {
	if (!num) return num === 0 ? 0 : "";

	num = num + "";

	return num.replace(/\d{1,3}(?=(\d{3})+$)/g, s => s + ",");
}
