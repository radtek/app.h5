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
		__validDownloadStatusFromApp(data) {
			if (!data || !data.length) return;

			if (!this.$isDev) {
				const waitingValidDocs = data.map(item => ({
					fileName: item.infoDocument.fileName,
					mineType: item.infoDocument.mineType
				}));
				waitingValidDocs.length &&
					JXRSApi.app.doc.validDownloadStatus(
						{ docs: waitingValidDocs },
						(err, rslt) => {
							if (!err) {
								rslt.forEach(
									(item, index) =>
										(data[index].isDownloaded = item)
								);
							}
						}
					);
			}
		},
		__closeSwipeOfItem(id) {
			for (let l = this.list.length; l--;) {
				if ("" + this.list[l].infoDocument.id === id) {
					this.$refs.docItem[l].closeSwipe();
				}
			}
		},
		__collectDocs(ids) {
			if (this.list && this.list.length) {
				this.list
					.filter(item => ~ids.indexOf(item.infoDocument.id))
					.forEach(item => (item.infoDocument.isCollected = true));

				// for (let l = this.list.length; l--;) {
				// 	let l2 = ids.length;
				// 	for (; l2--;) {
				// 		if (
				// 			"" + ids[l2] ===
				// 			"" + this.list[l].infoDocument.id
				// 		) {
				// 			this.list[l].infoDocument.isCollected = true;
				// 		}
				// 	}
				// }
			}
		},
		__removeDocs(ids, removeLocal) {
			if (!this.list || !this.list.length) return;
			const removedDocs = [];
			for (let l = this.list.length; l--;) {
				let l2 = ids.length;
				for (; l2--;) {
					if ("" + ids[l2] === "" + this.list[l].infoDocument.id) {
						removeLocal &&
							removedDocs.push({
								fileName: this.list[l].infoDocument.fileName
							});
						this.list.splice(l, 1);
						this.total -= 1;
						break;
					}
				}
			}
			if (!this.$isDev && removeLocal) {
				if (removedDocs.length) {
					JXRSApi.app.doc.removeLocalDocs({ docs: removedDocs });
				}
			}
			this.__showAppTopRightAction();
		},
		__showAppTopRightAction() {
			if (!this.$isDev) {
				const isShow = this.list && this.list.length ? 1 : 0;
				JXRSApi.app.doc.showTopRightAction({ isShow });
			}
		},
		__updateCollectStatus(ids, val) {
			if (!this.list || !this.list.length) return;

			this.list
				.filter(doc => ~ids.indexOf(doc.infoDocument.id))
				.forEach(it => (it.infoDocument.isCollected = val));

			// for (let l = this.list.length; l--;) {
			// 	const id = "" + this.list[l].infoDocument.id;

			// 	for (let i2 = 0, l2 = ids.length; i2 < l2; i2++) {
			// 		if (id === "" + ids[l2]) {
			// 			this.list[l].infoDocument.isCollected = val;
			// 		}
			// 	}
			// }
		},
		__initTopAction() {
			if (!this.$isDev) {
				// 是否切换成编辑模式
				JXRSApi.on("app.doc.isChangeToChooseMode", isChoose => {
					this.isChooseMode = isChoose === 1 || isChoose === "1";

					if (this.isChooseMode) {
						// 让选择模式和左滑互斥
						if (this.$refs.docItem) {
							if (Array.isArray(this.$refs.docItem)) {
								this.$refs.docItem.forEach(item => {
									item.closeSwipe();
								});
							} else {
								this.$refs.docItem.closeSwipe();
							}
						}
					} else {
						this.list.forEach(item => {
							item.isChecked = false;
						});
					}
				})
					.on("app.doc.isChoiceAll", isChoice => {
						// 是否全选
						const val = (this.isChooseAll =
							isChoice === 1 || isChoice === "1");
						this.list.forEach(item => {
							item.isChecked = val;
						});
					})
					.on("app.doc.refreshUIOfDownloaded", ({ docIds }) => {
						if (docIds && docIds.length) {
							docIds.forEach(id => {
								this.__closeSwipeOfItem("" + id);
							});
						}
					});
			}
		}
	}
};
