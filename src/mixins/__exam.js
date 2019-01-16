export default {
	data() {
		return {
			userId: "",
			taskId: "",
			testId: "",
			name: "",
			ltype: "",
			atype: "",
			type: "",
			act: "",
			pwd: "",
			index: ""
		};
	},
	methods: {
		__gotoResult(isReplace) {
			this.$router[isReplace ? "replace" : "push"]({
				path: "/result",
				query: {
					pwd: this.pwd,
					act: this.act,
					ltype: this.ltype,
					atype: this.atype,
					type: this.type,
					name: this.name,
					userId: this.userId,
					taskId: this.taskId,
					testId: this.testId
				}
			});
		},
		__errHnd(err) {
			switch (err.code) {
				case "65":
					this.$toast.text("您的账号已在另一台设备登录", "top");
					this.$router.replace({
						path: "/login",
						query: { taskId: this.taskId }
					});
					break;
				case "64":
				case "68":
				case "70":
					this.__gotoResult();
					break;
				default:
					return false;
			}
			return true;
		}
	},
	created() {
		if (!this.$isDev) {
			JXRSApi.on("app.exam.back", () => {
				this.handleBack();
			});
		}
	},
	activated() {
		if (!this.$isDev) {
			try {
				JXRSApi.app.exam.hideHeader();
			} catch (e) {}
		}

		this.getQS(
			"taskId",
			"testId",
			"userId",
			"name",
			"ltype",
			"atype",
			"type",
			"act",
			"pwd",
			"index"
		);

		this.name = this.name ? decodeURIComponent(this.name) : "";
		this.act = this.act ? decodeURIComponent(this.act) : "";

		this.__fetch && this.__fetch();
	}
};
