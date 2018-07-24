import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/doc/";
import { createJSApi } from "~j/index";
import http from "~a/doc/";

import "~css/modules/doc/empty.scss";
import "~css/modules/doc/relax-ui/toast.scss";

createJSApi(
	"changeChooseAllStatus",
	"download",
	"audioImport",
	"showTopRightAction",
	"removeLocalDocs"
);
createVue(Vue, { router: createRoutes(Vue), http });
