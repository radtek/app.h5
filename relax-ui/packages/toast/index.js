import Toast from "./toast.vue";

Toast.install = function(Vue) {
	Vue.component(Vue.name, Vue);
};

export default Toast;
