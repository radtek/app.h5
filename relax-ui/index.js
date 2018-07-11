import locale from "./src/locale/index";
import Emitter from "./src/mixins/emitter";
import Flexible from "./src/mixins/flexible";
import getWhenImgError from "./src/mixins/img-error";
import Webp from "./src/mixins/webp";
import TransferDom from "./src/directives/transfer-dom";
import CollapseTransition from "./src/transition/collapse-transition";

/** ******* utils ******* */
import utils from "./src/utils/index";

import Icon from "./packages/icon/index";
import Button from "./packages/button/index";

import { CheckIcon } from "./packages/checkbox/index";

import Row from "./packages/row/index";
import Col from "./packages/col/index";

import Pull from "./packages/pull/index";
import { Cell, CellAvatar } from "./packages/cell/index";

import Card from "./packages/card/index";

import Backtop from "./packages/backtop/index";
import { Tab, TabPane } from "./packages/tab/index";
import { lazyImgDirective } from "./packages/lazyload/index";

import SwipeCell from "./packages/swipe-cell/index";

import ImgCrop from "./packages/img-crop/index";

const components = [
	Row,
	Col,
	Icon,
	Button,
	Card,
	Cell,
	Cell.Skeleton,
	Cell.SkeletonSimple,
	CellAvatar,
	CellAvatar.Skeleton,
	Tab,
	TabPane,
	Pull,
	Pull.down,
	Pull.up,
	CheckIcon,
	Backtop,
	SwipeCell,
	ImgCrop,
	CollapseTransition
];

function install(Vue, options = {}) {
	// locale.use(options.locale);

	components.forEach(component => {
		Vue.component(component.name, component);
	});

	Vue.prototype.$RX = {
		minPixelValue: options.minPixelValue || 5,
		remUnit: options.remUnit || 75
	};
	Vue.prototype.$t = locale.t;
	Vue.prototype.$rxUtils = utils;

	Vue.use(lazyImgDirective);

	Vue.directive("transfer-dom", TransferDom);

	Vue.mixin(Emitter);
	Vue.mixin(Flexible);
	Vue.mixin(getWhenImgError(options.onImgErrSrcGetter));
	Vue.mixin(Webp);

	Vue.filter("formatDate", utils.formatDate);
}

if (typeof window !== "undefined" && window.Vue) {
	install(window.Vue);
}

export {
	utils,
	locale,
	Emitter,
	Flexible,
	getWhenImgError,
	TransferDom,
	Row,
	Col,
	Icon,
	Button,
	Card,
	Cell,
	CellAvatar,
	Tab,
	TabPane,
	Pull,
	lazyImgDirective,
	CheckIcon,
	Backtop,
	SwipeCell,
	ImgCrop,
	CollapseTransition
};

export default install;
