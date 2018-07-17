import Swipeout from "./swipeout";
import SwipeoutItem from "./swipeout-item.vue";
import SwipeoutBtn from "./swipeout-btn.vue";

Swipeout.Item = SwipeoutItem;
Swipeout.Btn = SwipeoutBtn;

Swipeout.install = function(Vue) {
	Vue.component(Swipeout.name, Swipeout);
};

SwipeoutItem.install = function(Vue) {
	Vue.component(SwipeoutItem.name, SwipeoutItem);
};

SwipeoutBtn.install = function(Vue) {
	Vue.component(SwipeoutBtn.name, SwipeoutBtn);
};

export default Swipeout;
