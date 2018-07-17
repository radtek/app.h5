export default {
	data() {
		return {
			isAdding: false,
			addStatus: 0,
			obj: null
		};
	},
	computed: {
		friendText() {
			if (this.isAdding) return "添加中";
			if (this.addStatus === 1) {
				return "待通过";
			}
			if (this.addStatus === 2) {
				return "已添加";
			}
			return "好友";
		}
	},
	methods: {
		handleFriendAddClick(targetUserId) {
			if (this.addStatus === 1 || this.isAdding) return;
			this.isAdding = true;
			if (this.$isProd || this.$isTest) {
				JXRSApi.app.qa.addIMFriend({
					friendId: targetUserId
				});
			}
			setTimeout(() => {
				this.isAdding = false;
				this.addStatus = 1;
			}, 500);
		},
		handleFriendAddClickInObject(targetUserId, obj) {
			if (obj.addStatus === 1 || obj.isAdding) return;
			obj.isAdding = true;
			if (this.$isProd || this.$isTest) {
				JXRSApi.app.qa.addIMFriend({
					friendId: targetUserId
				});
			}
			setTimeout(() => {
				obj.isAdding = false;
				obj.addStatus = 1;
			}, 500);
		},
		getObjFriendText(obj) {
			if (obj) {
				if (obj.isAdding) return "添加中";
				if (obj.addStatus === 1) return "待通过";
				if (obj.addStatus === 2) return "已添加";
			}
			return "好友";
		}
	}
};
