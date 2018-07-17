import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/score/";
import http from "~a/score/";

createVue(Vue, { router: createRoutes(Vue), http });
