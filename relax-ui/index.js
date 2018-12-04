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
import { RadioGroup, Radio } from "./packages/radio/index";

import Row from "./packages/row/index";
import Col from "./packages/col/index";

import Pull from "./packages/pull/index";
import Slider from "./packages/slider/index";
import { Cell, CellAvatar } from "./packages/cell/index";

import Card from "./packages/card/index";

import Backtop from "./packages/backtop/index";
import { Tab, TabPane } from "./packages/tab/index";
import { lazyImgDirective } from "./packages/lazyload/index";

import Swipeout from "./packages/swipeout/index";

import Img from "./packages/img/index";

import Toast from "./packages/toast/index";
import ToastPlugin from "./src/plugin/toast/index";
import AlertPlugin from "./src/plugin/alert/index";
import ConfirmPlugin from "./src/plugin/confirm/index";

import ClampBox from "./packages/clamp-box/index";
import ReadMore from "./packages/read-more/index";

import Step from "./packages/step/index";
import Form from "./packages/form/index";

import VArea from "./packages/v-chart/v-area.vue";
import VAxis from "./packages/v-chart/v-axis.vue";
import VBar from "./packages/v-chart/v-bar.vue";
import VChart from "./packages/v-chart/v-chart.vue";
import VGuide from "./packages/v-chart/v-guide.vue";
import VLegend from "./packages/v-chart/v-legend.vue";
import VLine from "./packages/v-chart/v-line.vue";
import VPie from "./packages/v-chart/v-pie.vue";
import VPoint from "./packages/v-chart/v-point.vue";
import VScale from "./packages/v-chart/v-scale.vue";
import VTooltip from "./packages/v-chart/v-tooltip.vue";

import Header from "./packages/header/index";

import { Swiper, SwiperItem } from "./packages/swiper/index";

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
	Slider,
	CheckIcon,
	RadioGroup,
	Radio,
	Backtop,
	Swipeout,
	Swipeout.Item,
	Swipeout.Btn,
	Img,
	CollapseTransition,
	Toast,
	ClampBox,
	ReadMore,
	Step,
	Step.Item,
	Form,
	Form.Item,
	VArea,
	VAxis,
	VBar,
	VChart,
	VGuide,
	VLegend,
	VLine,
	VPie,
	VPoint,
	VScale,
	VTooltip,
	Header,
	Swiper,
	SwiperItem
];

function install(Vue, options = {}) {
	// locale.use(options.locale);

	components.forEach(component => {
		Vue.component(component.name || "", component);
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

	Vue.prototype.$toast = ToastPlugin;
	Vue.prototype.$alert = AlertPlugin;
	Vue.prototype.$confirm = ConfirmPlugin;
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
	Slider,
	lazyImgDirective,
	CheckIcon,
	RadioGroup,
	Radio,
	Backtop,
	Swipeout,
	Img,
	CollapseTransition,
	Toast,
	ToastPlugin,
	AlertPlugin,
	ConfirmPlugin,
	ClampBox,
	ReadMore,
	Step,
	Form,
	VArea,
	VAxis,
	VBar,
	VChart,
	VGuide,
	VLegend,
	VLine,
	VPie,
	VPoint,
	VScale,
	VTooltip,
	Header,
	Swiper,
	SwiperItem
};

export default install;
