import formatDate from "./formatDate";
import { on, off } from "./dom/event";
import getScroll from "./dom/getScroll";
import getScrollBottom from "./dom/getScrollBottom";
import isInClientView from "./dom/isInClientView";
import isSupportWebp from "./dom/isSupportWebp";
import fixAsyncCmpLifeCycle from "./async-cmp-lifecycle.fix";
import throttle from "./throttle";
import qs from "./querystring";
import { assign } from "./object";

export default {
	on,
	off,
	getScroll,
	getScrollBottom,
	isInClientView,
	isSupportWebp,

	fixAsyncCmpLifeCycle,
	throttle,
	formatDate,
	assign,
	qs
};
