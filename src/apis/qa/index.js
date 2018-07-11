import { createApis } from "~a/create";
import configs from "~a/qa/conf";
import configsOfUser from "~a/qa/conf_user";

export default createApis(
	{ module: "qa", configs },
	{ module: "user", configs: configsOfUser }
);
