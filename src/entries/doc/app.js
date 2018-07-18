import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/doc/";
import { createJSApi } from "~j/index";
import http from "~a/doc/";

createJSApi(
	"changeChooseAllStatus",
	"share",
	"download",
	"upload",
	"audioImport"
);
createVue(Vue, { router: createRoutes(Vue), http });