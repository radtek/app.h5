export function includes(arr, val) {
	if (Array.prototype.includes) {
		return arr.includes(val);
	}

	for (let i = 0, l = arr.length; i < l; i++) {
		if (arr[i] === val) return true;
	}
	return false;
}
