import Vue from "vue";
import AlertComponent from "../../../packages/alert/alert.vue";
import { mergeVmOptions } from "../../utils/object";

const AlertSub = Vue.extend(AlertComponent);

let instance;

/**
 *
 * @param {String|Object} title
 * @param {String|Object} content
 * @param {Boolean} isLeftContent
 */
const Alert = function(content, title = "提示", isLeftContent = false) {
	if (Vue.prototype.$isServer) return;
	let options;
	if (typeof content === "object") {
		options = content;
	} else {
		options = { title, content, value: true, contentLeft: isLeftContent };
	}

	if (!instance) {
		instance = new AlertSub(options);
		instance.$vm = instance.$mount();
		document.body.appendChild(instance.$vm.$el);
	}

	let pready;

	instance.$off("ok");

	instance.$on("ok", () => {
		instance.$vm.show = false;
		pready();
	});

	mergeVmOptions(instance.$vm, options);

	instance.$vm.show = true;

	return new Promise((resolve, reject) => {
		pready = resolve;
	});
};

export default Alert;
