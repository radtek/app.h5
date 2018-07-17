export default {
	data() {
		return {
			isChooseMode: false,
			isChooseAll: false,
			isPrerender: true
		};
	},
	computed: {
		choosedDocs() {
			if (!this.list || !this.list.length) return [];
			const arr = [];
			this.list.forEach(item => {
				if (item.isChecked) {
					arr.push(item.infoDocument);
				}
			});
			return arr;
		},
		viewStyles() {
			const styles = {};
			if (this.isPrerender) {
				styles.overflow = "hidden";
			}
			return styles;
		}
	},
	methods: {
		__removeDocs(ids) {
			if (this.list && this.list.length) {
				for (let l = this.list.length; l--;) {
					let l2 = ids.length;
					for (; l2--;) {
						if (ids[l2] === this.list[l].infoDocument.id) {
							this.list.splice(l, 1);
							this.total -= 1;
						}
					}
				}
			}
		}
	},
	created() {
		if (!this.$isDev) {
			// 是否全选
			JXRSApi.on("app.doc.isChoiceAll", isChoice => {
				const val = isChoice === 1 || isChoice === "1";
				this.list.forEach(item => {
					item.isChecked = val;
				});
			});

			// 是否切换成编辑模式
			JXRSApi.on("app.doc.isChangeToChooseMode", isChoose => {
				this.isChooseMode = isChoose === 1 || isChoose === "1";
			});
		}
	}
};
