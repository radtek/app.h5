import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/mall/";
import http from "~a/mall/";

createVue(Vue, { router: createRoutes(Vue), http });
