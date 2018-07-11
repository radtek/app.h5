export default {
	methods: {
		getAuthInfo() {
			const qs = this.$rxUtils.qs.parse();
			return {
				userId: qs.userId || qs.userid,
				uuid: qs.uuid,
				userPhonenumber: qs.phone || qs.userPhonenumber
			};
		},
		getQS(...keys) {
			const qs = this.$rxUtils.qs.parse();
			keys &&
				keys.forEach(key => {
					this[key] = qs[key];
				});
		}
	}
};
