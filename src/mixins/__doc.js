export default {
	data() {
		return {
			isChooseMode: false,
			isChooseAll: false
		};
	},
	computed: {
		choosedDocs() {
			if (!this.list || !this.list.length) return [];
			const arr = [];
			this.list.forEach(item => {
				if (item.isChecked) {
					arr.push(item);
				}
			});
			return arr;
		}
	},
	watch: {
		isChooseAll(val) {
			this.list.forEach(item => {
				item.isChecked = val;
			});
		}
	},
	methods: {
		__removeDocs(ids) {
			if (this.list && this.list.length) {
				for (let l = this.list.length; l--;) {
					let l2 = ids.length;
					for (; l2--;) {
						if (ids[l2] === this.list[l].id) {
							this.list.splice(l, 1);
							this.total -= 1;
						}
					}
				}
			}
		}
	},
	created() {
		if (this.$isProd || this.$isTest) {
			// 是否全选
			JXRSApi.wrap("on.app.doc.isChoiceAll", isChoice => {
				this.isChooseAll = isChoice === 1 || isChoice === "1";
			});

			// 是否切换成编辑模式
			JXRSApi.wrap("on.app.doc.isChangeToChooseMode", isChoose => {
				this.isChooseMode = isChoose === 1 || isChoose === "1";
			});
		}
	}
};
