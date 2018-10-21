import { createApis } from "~a/create";
import configsOfNotice from "~a/h5/conf_of_notice";
import configsOfVote from "~a/h5/conf_of_vote";
import configsOfEducation from "~a/h5/conf_of_education";

export default createApis(
	{ module: "notice", configs: configsOfNotice },
	{ module: "vote", configs: configsOfVote },
	{ module: "edu", configs: configsOfEducation }
);
