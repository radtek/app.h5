import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/police/";
import http from "~a/police/";

createVue(Vue, { router: createRoutes(Vue), http });
