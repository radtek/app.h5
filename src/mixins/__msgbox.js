import { utils } from "~rx";
export default {
	components: {
		MsgBox: () =>
			import(/* webpackChunkName:"wc-msgbox" */ "~c/__common/msgbox.vue").then(
				utils.asyncCmp.solution
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
			if (!this.$isDev) {
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
};
