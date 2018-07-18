import { utils } from "~rx";
export default {
	components: {
		MsgBox: () =>
			import(/* webpackChunkName:"wc-msgbox" */ "~c/__common/msgbox.vue").then(
				utils.fixAsyncCmpLifeCycle
			)
	},
	data() {
		return {
			msgboxAvatar: "",
			msgboxCount: 0,
			msgboxLastId: 0
		};
	},
	methods: {
		recieveAppNotice(moduleName) {
			if (this.$isProd || this.$isTest) {
				JXRSApi.on(
					`app.${moduleName}.showTopNotices`,
					({ img, count, lastId }) => {
						this.msgboxAvatar = img;
						this.msgboxCount = count;
						this.msgboxLastId = lastId;
					}
				);
			}
		}
	}
	// ,
	// created() {
	// 	setTimeout(() => {
	// 		this.msgboxAvatar =
	// 			"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/avatar_male.png?Expires=43020012813&OSSAccessKeyId=LTAIO6w6CI0rif2M&Signature=zVQ5Y7%2Bickigq1WqW8cYbZ4SsGc%3D";
	// 		this.msgboxCount = 1;
	// 		this.msgboxLastId = 1;
	// 	}, 3000);
	// }
};
