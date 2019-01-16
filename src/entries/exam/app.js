import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/exam/";
import http from "~a/exam/";

createVue(Vue, { router: createRoutes(Vue), http }, [
	"tellNativeIsExamIndex",
	"hideHeader",
	"share",
	"back"
]);
