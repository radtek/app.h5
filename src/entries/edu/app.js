import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/edu/";
import http from "~a/edu/";

createVue(Vue, { router: createRoutes(Vue), http }, [
	"setAudioText",
	"updateStatusInfo",
	"addComment"
]);
