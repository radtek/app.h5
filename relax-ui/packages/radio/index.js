import Radio from "./radio.vue";
import RadioGroup from "./radio-group.vue";

RadioGroup.install = function(Vue) {
	Vue.component(RadioGroup.name, Radio);
};

Radio.install = function(Vue) {
	Vue.component(Radio.name, Radio);
};

export { Radio, RadioGroup };
