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
		__convertDate(sourceName, propName) {
			if (this.info[sourceName]) {
				this.info[propName] = this.$rxUtils.formatDate(
					this.info[sourceName],
					"yyyy-MM-dd"
				);
			} else {
				this.info[propName] = "";
			}
			return this.info[propName];
		}
	}
}
;
