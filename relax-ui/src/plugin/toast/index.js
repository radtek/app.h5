import Vue from "vue";
import ToastComponent from "../../../packages/toast/toast.vue";
import { mergeVmOptions } from "../../utils/object";

const ToastSub = Vue.extend(ToastComponent);

let instance;

const Toast = function(options) {
	if (Vue.prototype.$isServer) return;

	options = options || {};

	if (typeof options === "string") {
		options = {
			text: options
		};
	}

	// 生成组件
	instance = new ToastSub({});

	// 组件需要挂载在dom元素上
	instance.$vm = instance.$mount();
	document.body.appendChild(instance.$vm.$el);

	// TODO:判断下 text的值是否是VNode

	mergeVmOptions(instance.$vm, options);
	instance.$vm.value = true;

	return instance.$vm;
};

Toast.show = function(options) {
	return new Toast(options);
};

Toast.text = function(text, position = "top") {
	return Toast.show({ text, position });
};

Toast.hide = function() {
	if (instance && instance.$vm) {
		instance.$vm.show = false;
	}
};

export default Toast;
