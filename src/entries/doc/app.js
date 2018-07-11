import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/doc/";
import http from "~a/doc/";

createVue(Vue, { router: createRoutes(Vue), http });
