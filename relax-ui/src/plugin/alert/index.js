import Vue from "vue";
import AlertComponent from "../../../packages/alert/alert.vue";
import { mergeVmOptions } from "../../utils/object";

const AlertSub = Vue.extend(AlertComponent);

let instance;

/**
 *
 * @param {String|Object} title
 * @param {String|Object} content
 */
const Alert = function(title, content) {
	if (Vue.prototype.$isServer) return;
	let options;
	if (typeof title === "object") {
		options = title;
	} else {
		options = { title, content, value: true };
	}

	if (!instance) {
		instance = new AlertSub(options);
		instance.$vm = instance.$mount();
		document.body.appendChild(instance.$vm.$el);
	}
	mergeVmOptions(instance.$vm, options);

	instance.$vm.show = true;
};

export default Alert;
