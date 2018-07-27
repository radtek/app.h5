import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/news/";
import http from "~a/news/";

createVue(Vue, { router: createRoutes(Vue), http }, [
	"updateNewsInfoIcon",
	"commentInputFocus",
	"operationTopbar"
]);
