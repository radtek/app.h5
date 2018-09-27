import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/h5/";
import http from "~a/h5/";

createVue(Vue, { router: createRoutes(Vue), http }, ["openImgViewer"]);
