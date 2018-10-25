/**
 * 与服务端交互的API定义在此处
 */
import axios from "axios";
import { stringify } from "qs";

const isProd = process.env.NODE_ENV === "production";

const apiRoot = `http://${process.env.JXRS_ORIGIN}/`;

// axios 配置
axios.defaults.timeout = 15000;
axios.defaults.headers.post["Content-Type"] =
	"application/x-www-form-urlencoded;charset=UTF-8";

if (!isProd) {
	axios.defaults.headers.common["APIKEY"] = "test";
}

const axiosInstance = axios.create({
	baseURL: apiRoot,
	transformRequest: [
		function(data) {
			if (
				~axiosInstance.defaults.headers.post["Content-Type"].indexOf(
					"json"
				)
			) {
				return data ? JSON.stringify(data) : "";
			}

			return data ? stringify(data) : data;
		}
	]
});

const authFields = ["userId", "userPhonenumber", "uuid"];
function HttpWrap() {}

HttpWrap.prototype = {
	constructor: HttpWrap,
	auth(authInfo) {
		authFields.forEach(field => {
			this[field] = authInfo[field];
		});
		return this;
	}
};

/**
 * 动态构造Api请求
 *
 * @param {Array} apiConf api请求的配置数据
 */
export function createApis(...apiMapData) {
	const instance = new HttpWrap();
	apiMapData.forEach(mapItem => {
		const kv = (instance[mapItem.module] = {});
		mapItem.configs.forEach(conf => {
			kv[conf.outKey] = (function(item) {
				return function(clientParams) {
					if (item.needPassport) {
						axiosInstance.defaults.headers.common.passport =
							clientParams.passport;
						axiosInstance.defaults.headers.common["reqClient"] =
							"dj-mobileH5";
					}

					if (item.contentType === "json") {
						axiosInstance.defaults.headers.post["Content-Type"] =
							"application/json;charset=UTF-8";
					} else {
						axiosInstance.defaults.headers.post["Content-Type"] =
							"application/x-www-form-urlencoded;charset=UTF-8";
					}

					const params = {};
					const missingParams = [];

					clientParams = clientParams || {};

					authFields.forEach(field => {
						if (!clientParams.hasOwnProperty(field)) {
							params[field] = instance[field];
						}
					});

					if (item.reqParams) {
						item.reqParams.forEach(param => {
							const paramName = param.name || param;
							if (clientParams.hasOwnProperty(paramName)) {
								params[paramName] = clientParams[paramName];
								return;
							}
							if (param.hasOwnProperty("default")) {
								params[paramName] = param.default;
							} else if (
								typeof param === "string" ||
								param.required !== false
							) {
								missingParams.push(paramName);
							}
						});
					}

					if (missingParams.length) {
						const errmsg = `当前请求${item.outKey}(action:${
							item.action
						})缺少参数${missingParams.join(",")}`;
						return Promise.reject(errmsg);
					}

					const uri = `${apiRoot}${
						item.action[0] === "/"
							? item.action.substr(1)
							: item.action
					}`;

					const promise =
						item.verb === "get"
							? axiosInstance.get(uri, { params })
							: axiosInstance.post(uri, params);

					return promise
						.then(res => {
							const realSrvResp = res.data;
							if (!realSrvResp) {
								return Promise.reject(
									new Error(`${item.action}请求服务端无响应`)
								);
							}
							return realSrvResp.STATUS || realSrvResp.status
								? realSrvResp
								: Promise.reject(realSrvResp);
						})
						.catch(err => {
							const error = {
								result: err.result,
								action: item.action,
								code: "" + err.INFO || err.errorCode || 500,
								msg: err.message || err.msg || err.INFO
							};
							if (err.passErr !== false) {
								return Promise.reject(error);
							}
						});
				};
			})(conf);
		});
	});
	return instance;
}
