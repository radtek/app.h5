export default {
	props: {
		info: {
			type: Object,
			default() {
				return {};
			}
		},
		err: Object
	},
	methods: {
		handleTimeClick(moduleName) {
			this.$refs[`${moduleName}Picker`].open();
		},
		__convertDate(sourceName, propName, formatStr = "yyyy-MM-dd") {
			if (this.info[sourceName]) {
				this.info[propName] = this.$rxUtils.formatDate(
					this.info[sourceName],
					formatStr
				);
			} else {
				this.info[propName] = "";
			}
			return this.info[propName];
		}
	}
};
