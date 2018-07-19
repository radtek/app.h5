import ImgViewer from "./img-viewer.vue";

ImgViewer.install = function(Vue) {
	Vue.component(ImgViewer.name, ImgViewer);
};

export default ImgViewer;
