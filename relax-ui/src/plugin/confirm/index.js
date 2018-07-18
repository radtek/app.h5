import Vue from "vue";
import ConfirmComponent from "../../../packages/confirm/confirm.vue";
import { mergeVmOptions } from "../../utils/object";

const ConfirmSub = Vue.extend(ConfirmComponent);

let instance;

const done = () => {
	setTimeout(() => {
		instance.$vm.yesLoading = false;
	}, 300);
};

/**
 *
 * @param {String|Object} title
 * @param {String|Object} content
 */
const Confirm = function(title, content) {
	if (Vue.prototype.$isServer) return;

	let options;
	if (typeof title === "object") {
		options = title;
	} else {
		options = { title, content };
	}

	const _content = options.content;
	let pcatch, pready;

	if (!instance) {
		instance = new ConfirmSub(options);
		instance.$vm = instance.$mount();
		document.body.appendChild(instance.$vm.$el);
	}

	if (typeof _content === "function") {
		instance.$slots.default = _content(instance.$createElement);
	}

	instance.$off("on-yes");
	instance.$off("on-hide");

	instance.$on("on-yes", () => {
		Promise.resolve(pready(done)).catch(err => {
			done();
			pcatch(err);
		});
	});

	instance.$on("on-hide", () => {
		pcatch(false);
	});

	mergeVmOptions(instance.$vm, options);

	instance.$vm.show = true;

	return new Promise((resolve, reject) => {
		pready = resolve;
		pcatch = reject;
	});
};

Confirm.close = function() {
	if (instance) {
		instance.$vm.show = false;
	}
};

export default Confirm;
