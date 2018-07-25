import Vue from "vue";
import { createVue } from "~e/base";
import { createRoutes } from "~r/doc/";
import http from "~a/doc/";

import "~css/modules/doc/empty.scss";
import "~css/modules/doc/relax-ui/toast.scss";

createVue(Vue, { router: createRoutes(Vue), http }, [
	"changeChooseAllStatus",
	"download",
	"audioImport",
	"showTopRightAction",
	"removeLocalDocs",
	"refreshIndexPageItemStatusOfCollected"
]);
