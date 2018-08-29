import Step from "./step.vue";
import StepItem from "./step-item.vue";

Step.install = function(Vue) {
	Vue.component(Step.name, Step);
};

StepItem.install = function(Vue) {
	Vue.component(StepItem.name, StepItem);
};

Step.Item = StepItem;

export default Step
;
