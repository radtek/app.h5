import formatDate from "./formatDate";
import { loadJS } from "./dom/async-load";
import { on, off } from "./dom/event";
import getScroll from "./dom/getScroll";
import getScrollBottom from "./dom/getScrollBottom";
import isInClientView from "./dom/isInClientView";
import isSupportWebp from "./dom/isSupportWebp";
import {
	asyncCmpListenApi,
	fixAsyncCmpLifeCycle
} from "./async-cmp-lifecycle.fix";
import throttle from "./throttle";
import qs from "./querystring";
import { assign } from "./object";
import { includes } from "./array";
import { formatThousandth } from "./number";

import asyncCmp from "./async-cmp-solution";

export default {
	loadJS,
	on,
	off,
	getScroll,
	getScrollBottom,
	isInClientView,
	isSupportWebp,
	asyncCmp,
	asyncCmpListenApi,
	fixAsyncCmpLifeCycle,
	throttle,
	formatDate,
	formatThousandth,
	assign,
	qs,
	includes
};
