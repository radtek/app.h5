import { createApis } from "~a/create";
import lotteryConfigs from "~a/score/confOfLottery";
import exchangeConfigs from "~a/score/confOfExchange";
import heartConfigs from "~a/score/confOfHeart";

export default createApis(
	{ module: "lottery", configs: lotteryConfigs },
	{ module: "exchange", configs: exchangeConfigs },
	{ module: "heart", configs: heartConfigs }
);
