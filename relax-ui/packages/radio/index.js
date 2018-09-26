import Radio from "./radio.vue";
import RadioGroup from "./radio-group.vue";

RadioGroup.install = function(Vue) {
	Vue.component(RadioGroup.name, RadioGroup);
};

Radio.install = function(Vue) {
	Vue.component(Radio.name, Radio);
};

export { Radio, RadioGroup };
