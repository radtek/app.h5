export default function timeDiff(time) {
	let diffTime = new Date().getTime() - time;
	diffTime = Math.ceil(diffTime / 1000 / 60);

	let result = "";

	if (diffTime <= 5) {
		result = "刚刚";
	} else if (diffTime <= 15) {
		result = "15分钟前";
	} else if (diffTime <= 45) {
		result = "45分钟前";
	} else if (diffTime <= 60) {
		result = "1小时前";
	} else if (diffTime > 60) {
		const hour = Math.floor(diffTime / 60);
		if (hour > 24) {
			result = `${Math.floor(hour / 24)}天前`;
		} else {
			result = `${hour}小时前`;
		}
	}

	return result;
}
