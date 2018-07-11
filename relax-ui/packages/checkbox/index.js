import Checkbox from "./checkbox.vue";
import CheckIcon from "./check-icon.vue";

Checkbox.install = function(Vue) {
	Vue.component(Checkbox.name, Checkbox);
};

CheckIcon.install = function(Vue) {
	Vue.component(CheckIcon.name, CheckIcon);
};

export { Checkbox, CheckIcon };
