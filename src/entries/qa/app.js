import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/qa/";
import http from "~a/qa/";

createVue(Vue, { router: createRoutes(Vue), http }, [
	"refreshAppStatusOfQuesCollect",
	"refreshAppStatusOfAnswer",
	"refreshH5IMInfo",
	"share",
	"addIMFriend",
	"openImgViewer"
]);
