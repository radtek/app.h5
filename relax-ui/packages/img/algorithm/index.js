/**
 *
 * 实现类似Android中ImageView的图片显示算法
 *
 *  1. center
 *     (1)当图片大于ImageView的宽高：以图片的中心点和ImageView的中心点为基准，按照图片的原大小居中显示，不缩放，用ImageView的大小截取图片的居中部分。
 *     (2)当图片小于ImageView的宽高：直接居中显示该图片。
 *  2. centerCrop
 *		(1)当图片大于ImageView的宽高：以图片的中心点和ImageView的中心点为基准，按比例缩小图片，直到图片的宽高有一边等于ImageView的宽高，则对于另一边，图片的长度大于或等于ImageView的长度，最后用ImageView的大小居中截取该图片。
 *		(2)当图片小于ImageView的宽高：以图片的中心店和ImageView的中心点为基准，按比例扩大图片，直到图片的宽高大于或等于ImageView的宽高，并按ImageView的大小居中截取该图片。
 *  3. centerInside
 *		(1)当图片大于ImageView的宽高：以图片的中心和ImageView的中心点为基准，按比例缩小图片，使图片宽高等于或者小于ImagevView的宽高，直到将图片的内容完整居中显示
 * 		(2)当图片小于ImageView的宽高：直接居中显示该图片。
 *  4. fitCenter
 *		把图片按比例扩大（缩小）到ImageView的宽度，居中显示
 *  5. fitStart
 *		把图片按比例扩大（缩小）到ImageView的宽度，在ImageView的上/左方显示
 *  6. fitEnd
 *		把图片按比例扩大（缩小）到ImageView的宽度，在ImageView的下/右方显示
 *  7. fitXY
 *		把图片按指定的大小在ImageView中显示，拉伸或收缩图片，不保持原比例，填满ImageView
 */

const alg = {};

alg.center = function({ x, y }, { w, h }) {
	let kv;
	if (w >= x) {
		if (h >= y) {
			kv = { w: x, h: y };
			return [{ x: (w - x) / 2, y: (h - y) / 2 }, kv, { x: 0, y: 0 }, kv];
		}
		return [
			{ x: (w - x) / 2, y: 0 },
			{ w: x, h: y },
			{ x: 0, y: (y - h) / 2 },
			{ w: x, h }
		];
	}
	if (h >= y) {
		kv = { w, h: y };
		return [{ x: 0, y: (h - y) / 2 }, kv, { x: (x - w) / 2, y: 0 }, kv];
	}
	kv = { w, h };
	return [{ x: 0, y: 0 }, kv, { x: (x - w) / 2, y: (y - h) / 2 }, kv];
};
alg.centerCrop = function({ x, y }, { w, h }) {
	const point = { x: 0, y: 0 };
	const rect = { w: 0, h: 0 };

	if (y / x >= h / w) {
		rect.w = (h * x) / y;
		rect.h = h;
		point.x = (w - rect.w) / 2;
	} else {
		rect.w = w;
		rect.h = (w * y) / x;
		point.y = (h - rect.h) / 2;
	}

	return [point, rect, { x: 0, y: 0 }, { w: x, h: y }];
};
alg.centerInside = function({ x, y }, { w, h }) {
	const sourcePoint = { x: 0, y: 0 };
	const sourceRect = { w, h };
	const dirtyRect = { w: 0, h: 0 };
	if (y / x >= h / w) {
		const h1 = (h * x) / w;
		dirtyRect.w = (h1 * x) / h;
		dirtyRect.h = h1;
	} else {
		const w1 = (y * w) / h;
		dirtyRect.w = w1;
		dirtyRect.h = (w1 * y) / w;
	}

	return [
		sourcePoint,
		sourceRect,
		{ x: (x - dirtyRect.w) / 2, y: (y - dirtyRect.h) / 2 },
		dirtyRect
	];
};

alg.__fit = function({ x, y }, { w, h }, position = "center") {
	const sourcePoint = { x: 0, y: 0 };
	const sourceRect = { w, h };
	const dirtyRect = { w: 0, h: 0 };
	if (y / x >= h / w) {
		const h1 = (h * x) / w;
		dirtyRect.w = x;
		dirtyRect.h = h1;
	} else {
		const w1 = (y * w) / h;
		dirtyRect.w = w1;
		dirtyRect.h = y;
	}

	const dirtyPoint = { x: 0, y: 0 };

	switch (position) {
		case "start":
			dirtyPoint.x = 0;
			dirtyPoint.y = 0;
			break;
		case "end":
			dirtyPoint.x = dirtyRect.h === y ? x - dirtyRect.w : 0;
			dirtyPoint.y = dirtyRect.h === y ? 0 : y - dirtyRect.h;
			break;
		case "center":
		default:
			dirtyPoint.x = (x - dirtyRect.w) / 2;
			dirtyPoint.y = (y - dirtyRect.h) / 2;
			break;
	}

	return [sourcePoint, sourceRect, dirtyPoint, dirtyRect];
};

alg.fitCenter = function(point, rect) {
	return alg.__fit(point, rect);
};
alg.fitStart = function(point, rect) {
	return alg.__fit(point, rect, "start");
};
alg.fitEnd = function(point, rect) {
	return alg.__fit(point, rect, "end");
};
alg.fitXY = function({ x, y }, imgRect) {
	const kv = { x: 0, y: 0 };
	return [kv, imgRect, kv, { w: x, h: y }];
};

export default function scaleImg(scaleType = "centerCrop") {
	return alg[scaleType];
}
