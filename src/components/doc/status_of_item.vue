<style lang="sass">
	@import "../../assets/modules/doc/wc-status_of_item.scss"
</style>
<template>
	<div class="doc-statusbar">
		<rx-row justify="center"
		        align="center">
			<template v-if="category === 'upload'">
				<rx-col>
					<rx-btn plain
					        type="text"
					        icon="audio"
					        @on-click="handleAudioUpload">语音导入</rx-btn>
				</rx-col>
				<rx-col>
					<rx-btn plain
					        type="text"
					        icon="pc"
					        @on-click="handlePCUpload">电脑导入</rx-btn>
				</rx-col>
				<rx-col>
					<rx-btn plain
					        type="text"
					        icon="mobile"
					        @on-click="handleMobileUpload">手机导入</rx-btn>
				</rx-col>
			</template>
			<template v-else>
				<rx-col>
					<rx-btn plain
					        :loading="isRemoving"
					        type="text"
					        icon="remove"
					        @on-click="handleBatchRemove">删除{{text}} </rx-btn>
				</rx-col>
				<rx-col v-if="category!=='download'">
					<rx-btn plain
					        :loading="isDownloading"
					        type="text"
					        icon="download"
					        @on-click="handleBatchDownload">下载{{text}} </rx-btn>
				</rx-col>
				<rx-col v-if="category!=='collect'">
					<rx-btn plain
					        :loading="isCollecting"
					        type="text"
					        icon="collect"
					        @on-click="handleBatchCollect">收藏{{text}} </rx-btn>
				</rx-col>
			</template>

		</rx-row>
	</div>
</template>

<script>
	import categoryMap from "~v/doc/data/categoryMap";
	export default {
		name: "StatusOfDocItem",
		props: {
			category: String
		},
		inject: {
			page: { default: {} }
		},
		data() {
			return {
				isRemoving: false,
				isDownloading: false,
				isCollecting: false
			};
		},
		computed: {
			text() {
				return this.choosedDocIds && this.choosedDocIds.length
					? `(${this.choosedDocIds.length})`
					: "";
			},
			choosedDocs() {
				return this.$parent.choosedDocs;
			},
			choosedDocIds() {
				if (this.choosedDocs && this.choosedDocs.length) {
					return this.choosedDocs.map(doc => doc.id);
				}
				return [];
			}
		},
		methods: {
			handleBatchRemove() {
				const ids = this.choosedDocIds.slice();

				if (!ids || !ids.length) {
					this.$toast.text("您还未选择任何文档", "bottom");
					return;
				}

				this.$confirm({
					yesText: "删除",
					loadingText: "删除中...",
					title: "",
					content: "是否确认删除?"
				})
					.then(done => {
						const type = categoryMap[this.category];
						this.$http.doc.removeDoc({ ids, type }).then(() => {
							this.$emit("on-removed", ids);
							done();
							this.$confirm.close();
							this.$toast.text("删除成功", "bottom");
							if (!this.page.list.length) {
								// 当前删除的是当前面板的最后一条
								setTimeout(() => {
									this.page.__fetch &&
										this.page.__fetch().then(() => {
											// 判断当前是否是选中状态
											if (
												this.page.isChooseMode === 1 &&
												this.page.isChooseAll
											) {
												JXRSApi.invoke(
													"app.doc.isChoiceAll",
													1
												);
											}
										});
								}, 300);
							}
						});
					})

					.catch(err => {
						if (err !== false) {
							this.$toast.text(
								this.$isDev ? err.message : "批量删除发生异常",
								"bottom"
							);
						}
					});
			},
			handleBatchDownload() {
				if (this.isDownloading) return;
				this.isDownloading = true;

				const documentIds = this.choosedDocIds;

				if (!documentIds || !documentIds.length) {
					this.$toast.text("您还未选择任何文档", "bottom");
					this.isDownloading = false;
					return;
				}

				this.$http.doc
					.downloadDoc({ documentIds, type: 0 })
					.then(() => {
						// this.$emit("on-downloaded");
						this.isDownloading = false;
						// 获取已经选择的文档的信息
						if (!this.$isDev) {
							JXRSApi.app.doc.download({ docs: this.choosedDocs });
						}
					})
					.catch(() => {
						this.isDownloading = false;
					});
			},
			handleBatchCollect() {
				if (this.isCollecting) return;
				this.isCollecting = true;

				const documentId = this.choosedDocIds;

				if (!documentId || !documentId.length) {
					this.$toast.text("您还未选择任何文档", "bottom");
					this.isCollecting = false;
					return;
				}

				this.$http.doc
					.collectDoc({ documentId, type: 0 })
					.then(() => {
						this.isCollecting = false;
						this.$toast.text("收藏成功", "bottom");
						this.$emit("on-collected", documentId);
						if (!this.$isDev) {
							JXRSApi.app.doc.refreshIndexPageItemStatusOfCollected({
								docIds: documentId,
								status: 1
							});
						}
					})
					.catch(() => {
						this.isCollecting = false;
						this.$toast.text("收藏异常", "bottom");
					});
			},
			handleAudioUpload() {
				if (this.$isProd || this.$isTest) {
					JXRSApi.app.doc.audioImport();
				} else {
					alert("通知客戶端语音导入");
				}
			},
			handlePCUpload() {
				const qsStr = this.$rxUtils.qs.stringify(this.authInfo);
				if (this.$isProd || this.$isTest) {
					JXRSApi.view.goto({
						title: "电脑导入",
						url: `${location.origin}/doc/import_of_pc${qsStr}`,
						query: this.authInfo
					});
				} else {
					this.$router.push({
						path: "/import_of_pc",
						query: this.authInfo
					});
				}
			},
			handleMobileUpload() {
				const qsStr = this.$rxUtils.qs.stringify(this.authInfo);
				if (this.$isProd || this.$isTest) {
					JXRSApi.view.goto({
						title: "手机导入",
						url: `${location.origin}/doc/import_of_mobile${qsStr}`,
						query: this.authInfo
					});
				} else {
					this.$router.push({
						path: "/import_of_mobile",
						query: this.authInfo
					});
				}
			}
		}
	};
</script>

