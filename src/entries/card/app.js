import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/card/";
import http from "~a/card/";

createVue(Vue, { router: createRoutes(Vue), http });
