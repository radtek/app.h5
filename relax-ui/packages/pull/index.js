import Pull from "./pull.vue";
import PullDown from "./down";
import PullUp from "./up";

Pull.install = function(Vue) {
	Vue.component(Pull.name, Pull);
};

PullDown.install = function(Vue) {
	Vue.component(PullDown.name, PullDown);
};

PullUp.install = function(Vue) {
	Vue.component(PullUp.name, PullUp);
};

Pull.down = PullDown;
Pull.up = PullUp;

export default Pull;
