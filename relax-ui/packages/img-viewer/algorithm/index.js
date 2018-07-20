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
alg.fitXY = function({ x, y }, { w, h }) {};

export default function scaleImg(scaleType = "centerCrop") {
	return alg[scaleType];
}
