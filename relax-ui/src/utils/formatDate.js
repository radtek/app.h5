// 一、二、三、四、五、六、七
const week = [
	"/u65e5",
	"/u4e00",
	"/u4e8c",
	"/u4e09",
	"/u56db",
	"/u4e94",
	"/u516d"
];

const weekPrefix = {
	"1": "/u5468", // 周
	"2": "/u661f/u671f" // 星期
};
/**
 * 进行日期格式的转换
 * @param date
 * @param format
 * @returns {void|string|XML|*}
 */
export default function formatDate(date, formatStr) {
	if (!date) return "";

	if (typeof date === "number") {
		date = new Date(date);
	} else if (typeof date === "string") {
		const arr = date.split(/[: / -]/);

		if (arr.length === 3) {
			arr[3] = arr[4] = arr[5] = 0;
		} else if (arr.length === 4) {
			arr[4] = arr[5] = 0;
		} else if (arr.length === 5) {
			arr[5] = 0;
		}

		date = new Date(
			parseInt(arr[0], 10),
			parseInt(arr[1], 10) - 1,
			parseInt(arr[2], 10),
			parseInt(arr[3], 10),
			parseInt(arr[4], 10),
			parseInt(arr[5], 10)
		);
	}

	const map = {
		M: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		m: date.getMinutes(),
		s: date.getSeconds(),
		q: Math.floor((date.getMonth() + 3) / 3),
		S: date.getMilliseconds()
	};

	formatStr = formatStr.replace(/([yMdhmsqSW])+/g, (all, t) => {
		let v = map[t];
		if (v !== undefined) {
			if (all.length > 1) {
				v = "0" + v;
				v = v.substr(v.length - 2);
			}
			return v;
		} else if (t === "y") {
			const i = 4 - all.length;
			return i <= 0
				? date.getFullYear() + ""
				: (date.getFullYear() + "").substr(i);
		} else if (t === "W") {
			return (weekPrefix[all.length + ""] || "") + week[date.getDay()];
		}
		return all;
	});

	return formatStr;
}
