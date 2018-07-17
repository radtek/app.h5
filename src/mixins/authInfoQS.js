export default {
	methods: {
		getQS(...keys) {
			const qs = this.$rxUtils.qs.parse();
			keys &&
				keys.forEach(key => {
					this[key] = qs[key];
				});
		}
	}
};
