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
				if (this.isRemoving) return;
				this.isRemoving = true;
				const type = categoryMap[this.category];
				this.$http.doc
					.removeDoc({
						ids: this.choosedDocIds,
						type
					})
					.then(() => {
						this.$emit("on-removed");
						this.isRemoving = false;
						this.$toast("批量删除成功", "bottom");
					})
					.catch(err => {
						this.isRemoving = false;
						this.$toast(
							this.$isDev ? err.message : "批量删除发生异常",
							"bottom"
						);
					});
			},
			handleBatchDownload() {
				if (this.isDownloading) return;
				this.isDownloading = true;
				this.$http.doc
					.downloadDoc({ documentIds: this.choosedDocIds, type: 0 })
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
				this.$http.doc
					.collectDoc({
						documentId: this.choosedDocIds,
						type: 0
					})
					.then(() => {
						// this.$emit("on-collected");
						this.isCollecting = false;
					})
					.catch(() => {
						this.isCollecting = false;
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

