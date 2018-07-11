export default {
	data() {
		return {
			isInviting: false,
			isOk: false
		};
	},
	inject: {
		questionId: { default: "" }
	},
	computed: {
		inviteText() {
			if (this.isOk) return "邀请成功";
			return this.isInviting ? "邀请中" : "邀请";
		}
	},
	methods: {
		handleInviteClick() {
			if (this.isOk || this.isInviting) return false;
			this.isInviting = true;
			const params = this.$rxUtils.assign({}, this.AuthInfo, {
				friendId: this.row.userId,
				questionId: this.questionId,
				userId: this.AuthInfo.userId
			});
			this.$http.user
				.inviteAnswer(params)
				.then(() => {
					// 更新按钮的loading状态
					this.isInviting = false;
					this.isOk = true;
				})
				.catch(() => {
					this.isOk = false;
					this.isInviting = false;
				});
		}
	}
};
