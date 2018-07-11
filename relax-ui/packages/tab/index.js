import Tab from "./tab.vue";
import TabPane from "./pane";

Tab.install = function(Vue) {
	Vue.component(Tab.name, Tab);
};

TabPane.install = function(Vue) {
	Vue.component(TabPane.name, TabPane);
};

export { Tab, TabPane };
