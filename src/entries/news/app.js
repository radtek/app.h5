import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/news/";
import { createJSApi } from "~j/index";
import http from "~a/news/";

createJSApi("updateNewsInfoIcon", "commentInputFocus", "operationTopbar");
createVue(Vue, { router: createRoutes(Vue), http });
