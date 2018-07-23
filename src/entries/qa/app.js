import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/qa/";
import { createJSApi } from "~j/index";
import http from "~a/qa/";

createJSApi(
	"refreshAppStatusOfQuesCollect",
	"refreshAppStatusOfAnswer",
	"refreshH5IMInfo",
	"share",
	"addIMFriend"
);

createVue(Vue, { router: createRoutes(Vue), http });
