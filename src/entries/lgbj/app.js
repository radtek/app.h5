import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/lgbj/";
import http from "~a/lgbj/";

import { IndexList, IndexSection, DatetimePicker, Picker, Actionsheet, Popup, Cell } from "mint-ui";

Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Popup.name, Popup);
Vue.component(Cell.name, Cell);

createVue(Vue, { router: createRoutes(Vue), http });
