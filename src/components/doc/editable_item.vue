<style lang="sass">
	@import "../../assets/modules/doc/wc-item_of_editable_doc.scss"
</style>

<template>
	<rx-swipeout-item @on-download="handleDownload"
	                  @on-collect="handleCollect"
	                  @on-remove="handleRemove"
	                  @on-share="handleShare"
	                  @on-upload="handleUpload"
	                  :disabled="isEdit">
		<template slot="content">
			<rx-row class="editable-item"
			        justify="center"
			        align="center">
				<rx-col :flex-basis="60"
				        v-if="isEdit">
					<rx-chk-icon v-model="item.isChecked"></rx-chk-icon>
				</rx-col>
				<rx-col>
					<rx-cell-avatar @on-click="onClick">
						<template slot="img">
							<rx-icon :name="`doc-${__getMimeType(item.infoDocument.mineType)}`"></rx-icon>
						</template>
						<span slot="header">{{item.infoDocument.fileName}}</span>
						<template slot="footer">
							<rx-row justify="start"
							        align="center">
								<rx-col>
									<span>{{(time||item.infoDocument.createTime) | formatDate('yyyy/MM/dd')}}</span>
									<span>{{item.readProcess>0 || item.infoDocument.readProcess>0 ? `已读${parseFloat((item.readProcess||item.infoDocument.readProcess)*100).toFixed(0)}%` : '未读'}}</span>
								</rx-col>
							</rx-row>
						</template>
					</rx-cell-avatar>
				</rx-col>
			</rx-row>
		</template>
		<template slot="rightMenu">
			<rx-swipeout-btn v-if="canDownload"
			                 :width="60"
			                 text="下载"
			                 action="download"
			                 bg-color="#0097EE"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="canCollect"
			                 :width="60"
			                 text="收藏"
			                 action="collect"
			                 bg-color="#ffac5a"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="canRemove"
			                 :width="60"
			                 text="删除"
			                 action="remove"
			                 bg-color="#ff3254"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="canShare"
			                 :width="60"
			                 text="好友<br/>共享"
			                 action="share"
			                 bg-color="#ffac5a"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="canUpload"
			                 :width="60"
			                 text="上传"
			                 action="upload"
			                 bg-color="#52CE67"></rx-swipeout-btn>
		</template>
	</rx-swipeout-item>
</template>

<script>
	import categoryMap from "~v/doc/data/categoryMap";
	import mimeType from "~f/mimeType";
	export default {
		name: "EditableItemOfDoc",
		inject: {
			page: { default: {} }
		},
		props: {
			isEdit: Boolean,
			item: {
				type: Object,
				default() {
					return {};
				}
			},
			canDownload: { type: Boolean, default: true },
			canCollect: { type: Boolean, default: true },
			canRemove: { type: Boolean, default: true },
			canShare: Boolean,
			canUpload: Boolean,
			category: String,
			time: [String, Number]
		},
		computed: {
			type() {
				return categoryMap[this.category];
			}
		},
		methods: {
			__getMimeType(val) {
				return mimeType(val);
			},
			onClick() {
				const _item = this.item.infoDocument;
				const params = {
					id: _item.id,
					fileName: _item.fileName,
					fileSize: _item.fileSize,
					isCollected: _item.isCollected,
					url: _item.url,
					mineType: _item.mineType
				};
				if (this.$isDev) {
					alert("app原生端打开:" + JSON.stringify(params));
				} else {
					JXRSApi.view.goto({
						title: _item.fileName,
						url: "native://openDoc",
						query: params
					});
				}
			},
			handleDownload() {
				const docs = [this.item.infoDocument];
				// 通知App下载此文档
				if (this.$isDev) {
					alert("通知APP端下载此文档" + JSON.stringify(docs));
				} else {
					JXRSApi.app.doc.download({ docs });
				}
			},
			handleCollect() {
				const documentId = [this.item.infoDocument.id];
				this.$http.doc
					.collectDoc({ documentId })
					.then(resp => {
						// 收藏成功
						this.$toast.text("收藏成功", "bottom");
						if (this.page.__removeDocs) {
							this.page.__removeDocs(documentId);
						}
					})
					.catch(err => {
						this.$toast.text(
							this.$isDev ? err.message : "收藏异常",
							"bottom"
						);
					});
			},
			handleRemove() {
				const ids = [this.item.infoDocument.id];
				this.$http.doc
					.removeDoc({ ids, type: this.type })
					.then(resp => {
						// 删除成功
						this.$toast.text("删除成功", "bottom");
						if (this.page.__removeDocs) {
							this.page.__removeDocs(ids);
						}
					})
					.catch(err => {
						this.$toast.text(
							this.$isDev ? err.message : "删除异常",
							"bottom"
						);
					});
			},
			handleShare() {
				const docs = [this.item.infoDocument];
				// 通知App分享此文档
				if (this.$isDev) {
					alert("通知APP端分享此文档" + JSON.stringify(docs));
				} else {
					JXRSApi.app.doc.share({ docs });
				}
			},
			handleUpload() {
				const docs = [this.item.infoDocument];
				// 通知App上传此文档
				if (this.$isDev) {
					alert("通知APP端上传此文档" + JSON.stringify(docs));
				} else {
					JXRSApi.app.doc.upload({ docs });
				}
			}
		}
	};
</script>

