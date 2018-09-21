import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/card/";

createVue(Vue, { router: createRoutes(Vue) });
