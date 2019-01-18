<style lang="sass">
	@import "../../assets/modules/doc/wc-item_of_editable_doc.scss"
</style>

<template>
	<rx-swipeout-item @on-download="handleDownload"
	                  @on-collect="handleCollect"
	                  @on-remove="handleRemove"
	                  @on-share="handleShare"
	                  @on-upload="handleUpload"
	                  :disabled="isEdit"
	                  ref="item">
		<template slot="content">
			<rx-row class="editable-item"
			        justify="center"
			        align="center">
				<rx-col :flex-basis="60"
				        v-if="isEdit">
					<rx-chk-icon v-model="item.isChecked"
					             @on-click="handleIconClick"></rx-chk-icon>
				</rx-col>
				<rx-col>
					<rx-cell-avatar @on-click="onClick">
						<template slot="img">
							<rx-icon :name="`doc-${__getMimeType(docItem.mineType)}`"></rx-icon>
						</template>
						<span slot="header">{{docItem.fileName}}</span>
						<template slot="footer">
							<rx-row :flex="false"
							        align="center">
								<rx-col :span="category==='upload' || category==='share'?14:18">
									<span>{{(time||docItem.createTime) | formatDate('yyyy/MM/dd')}}</span>
									<span>{{docItem.readProcess>0 ? `已读${parseFloat(docItem.readProcess*100).toFixed(0)}%` : '未读'}}</span>
								</rx-col>
								<rx-col v-if="category=='upload'"
								        :span="10"
								        align="right">
									<span :class="statusClass">
										<rx-icon name="warning"
										         v-if="docItem.isPublished===2"></rx-icon>{{docItem.isPublished | auditState(docItem) }}</span>
								</rx-col>
								<rx-col v-else-if="category=='share'"
								        :span="10"
								        align="right">
									<img :src="docItem.userImage"
									     @error="onImgErr($event)" />
									<span>{{docItem.userName}}</span>
								</rx-col>
							</rx-row>
						</template>
					</rx-cell-avatar>
				</rx-col>
			</rx-row>
		</template>
		<template slot="rightMenu">
			<rx-swipeout-btn v-if="showDownload"
			                 :width="70"
			                 action="download"
			                 :text="item.isDownloaded ? '已下载' : '下载'"
			                 :bg-color="item.isDownloaded ? '#ccc':'#0097EE'"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="showCollect"
			                 :width="70"
			                 action="collect"
			                 :text="docItem.isCollected === 0 ? '收藏' : '已收藏'"
			                 :bg-color="docItem.isCollected === 0 ? '#ffac5a':'#ccc'"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="showRemove"
			                 :width="70"
			                 text="删除"
			                 action="remove"
			                 bg-color="#ff3254"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="showShare"
			                 :width="70"
			                 text="好友<br/>共享"
			                 action="share"
			                 bg-color="#ffac5a"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="showUpload"
			                 :width="70"
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
			category: String,
			time: [String, Number]
		},
		computed: {
			docItem() {
				return this.item.infoDocument;
			},
			showDownload() {
				return this.category !== "upload" && this.category !== "download";
			},
			showCollect() {
				return (
					(this.category !== "collect" && this.category !== "upload") ||
					(this.category === "upload" && this.docItem.visibleType !== 1)
				);
			},
			showRemove() {
				return (
					this.category !== "upload" ||
					(this.category === "upload" &&
						(this.docItem.visibleType !== 3 ||
							this.docItem.isPublished === 2))
				);
			},
			showShare() {
				return this.category === "upload" && this.docItem.visibleType === 1;
			},
			showUpload() {
				return this.category === "upload" && this.docItem.visibleType === 1;
			},
			type() {
				return categoryMap[this.category];
			},
			statusClass() {
				const _item = this.docItem;
				const val = _item.isPublished;

				if (_item.visibleType === 1) return "private";
				switch (val) {
					case 0:
						return "auditing";
					case 2:
						return "refuse";
					case 1:
					default:
						return _item.visibleType === 2 ? "friend" : "platform";
				}
			}
		},
		filters: {
			auditState(val, _item) {
				if (_item.visibleType === 1) return "未上传";

				switch (val) {
					case 0:
						return "上传审核中";
					case 2:
						return "审核未通过";
					case 1:
					default:
						return _item.visibleType === 2 ? "好友共享" : "已上传";
				}
			}
		},
		methods: {
			__getMimeType(val) {
				return mimeType(val);
			},
			__convertSizeUnit(val) {
				if (val < 1024) {
					return `${parseFloat(val).toFixed(2)}K`;
				}
				return parseFloat(Math.ceil(val / 1024)).toFixed(2) + "M";
			},
			handleIconClick() {
				if (!this.item.isChecked) {
					!this.$isDev &&
						JXRSApi.app.doc.changeChooseAllStatus({ isSelect: 0 });
				} else {
					let hasUnChecked = false;

					/* eslint-disable space-in-parens */
					for (let i = this.page.list.length; i--; ) {
						if (!this.page.list[i].isChecked) {
							hasUnChecked = true;
							break;
						}
					}
					!this.$isDev &&
						JXRSApi.app.doc.changeChooseAllStatus({
							isSelect: hasUnChecked ? 0 : 1
						});
				}
			},
			closeSwipe() {
				this.$refs.item.close();
			},
			onClick() {
				if (this.isEdit || this.$refs.item.isOpen) return;

				const _item = this.docItem;
				const params = {
					id: _item.id,
					fileName: _item.fileName,
					fileSize: _item.fileSize,
					isCollected: _item.isCollected,
					url: _item.url,
					mineType: _item.mineType
				};

				const list = this.page.list;
				if (list && list.length) {
					for (let l = list.length; l--; ) {
						if (list[l].infoDocument.id === _item.id) {
							const item = list[l];
							list.splice(l, 1);
							list.unshift(item);
							break;
						}
					}
				}

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
				if (this.item.isDownloaded || this.docItem.isDownloading) return;

				this.docItem.isDownloading = true;

				const docs = [this.docItem];

				this.$http.doc
					.downloadDoc({ documentIds: [this.docItem.id], type: 0 })
					.then(() => {
						// this.$emit("on-downloaded");
						this.docItem.isDownloading = false;
						// 获取已经选择的文档的信息
						// 通知App下载此文档
						if (this.$isDev) {
							alert("通知APP端下载此文档" + JSON.stringify(docs));
						} else {
							JXRSApi.app.doc.download({ docs });
						}
					})
					.catch(err => {
						this.docItem.isDownloading = false;
						if (err.msg === "Network Error") {
							this.$toast.text("网络异常", "bottom");
						} else {
							this.$toast.text(
								this.$isDev ? err.message : "下载发生异常",
								"bottom"
							);
						}
					});
			},
			handleCollect() {
				if (this.docItem.isCollected === 1 || this.docItem.isCollecting) {
					return;
				}

				this.docItem.isCollecting = true;

				const documentId = [this.docItem.id];
				this.$http.doc
					.collectDoc({ documentId })
					.then(resp => {
						this.docItem.isCollecting = false;
						// 收藏成功
						this.$toast.text("收藏成功", "bottom");
						this.$refs.item.close();
						this.docItem.isCollected = 1;
						if (!this.$isDev) {
							JXRSApi.app.doc.refreshIndexPageItemStatusOfCollected({
								docIds: documentId,
								status: 1
							});
						}
					})
					.catch(err => {
						this.docItem.isCollecting = false;

						if (err.msg === "Network Error") {
							this.$toast.text("网络异常", "bottom");
						} else {
							this.$toast.text(
								this.$isDev ? err.message : "收藏发生异常",
								"bottom"
							);
						}
					});
			},
			handleRemove() {
				this.$confirm({
					yesText: "删除",
					loadingText: "删除中...",
					title: "",
					content: "是否确认删除?"
				})
					.then(done => {
						const ids = [this.docItem.id];

						return this.$http.doc
							.removeDoc({ ids, type: this.type })
							.then(resp => {
								// 删除成功
								this.$toast.text("删除成功", "bottom");

								done();

								this.$confirm.close();

								this.$refs.item.close();

								if (this.page.__removeDocs) {
									this.page.__removeDocs(ids);
								}

								if (this.page.list) {
									if (!this.page.list.length) {
										// 当前删除的是当前面板的最后一条
										setTimeout(() => {
											this.page.__fetch &&
												this.page.__fetch();
										}, 300);
									}
								}
							})
							.catch(err => {
								done();
								this.$confirm.close();

								if (err.msg === "Network Error") {
									this.$toast.text("网络异常", "bottom");
								} else {
									this.$toast.text(
										this.$isDev ? err.msg : "删除异常",
										"bottom"
									);
								}
							});
					})
					.catch(err => {
						if (err !== false) {
							this.$toast.text(
								this.$isDev ? err.message : "删除失败",
								"bottom"
							);
						}
					});
			},
			handleShare() {
				const doc = this.docItem;

				const iconName = `doc-${this.__getMimeType(doc.mineType)}`;
				const fileSize = this.__convertSizeUnit(doc.fileSize);

				this.$confirm({
					yesText: "上传",
					loadingText: "上传中...",
					title: "文档共享，好友可见",
					content(h) {
						return h("div", null, [
							h(
								"rx-cell-avatar",
								{
									class: "__dialog_content_cell"
								},
								[
									h("rx-icon", {
										props: {
											name: iconName
										},
										slot: "img"
									}),
									h(
										"span",
										{
											slot: "header"
										},
										doc.fileName
									),
									h(
										"p",
										{
											slot: "footer"
										},
										[
											h("span", null, "文件大小:"),
											h(
												"span",
												{ style: { marginLeft: "4px" } },
												fileSize
											)
										]
									)
								]
							),
							h(
								"p",
								{ style: "padding:1.5em 0;" },
								"是否将文档共享给好友,大家一起进步哟~"
							)
						]);
					}
				})
					.then(done => {
						return this.$http.doc
							.shareDocToFriend({
								documentId: doc.id
							})
							.then(resp => {
								// 改变状态
								doc.visibleType = 2;
								this.$refs.item.close();
								done();
								this.$confirm.close();
								this.$toast.text("好友分享成功", "bottom");
							})
							.catch(err => {
								done();
								this.$confirm.close();

								if (err.msg === "Network Error") {
									this.$toast.text("网络异常", "bottom");
								} else {
									this.$toast.text(
										this.$isDev ? err.msg : "好友分享发生异常",
										"bottom"
									);
								}
							});
					})
					.catch(err => {
						if (err !== false) {
							this.$toast.text(
								this.$isDev ? err.message : "好友分享失败"
							);
						}
					});
			},
			handleUpload() {
				// 先弹出选择框
				const doc = this.docItem;
				const iconName = `doc-${this.__getMimeType(doc.mineType)}`;
				const fileSize = this.__convertSizeUnit(doc.fileSize);
				this.$confirm({
					yesText: "上传",
					loadingText: "上传中...",
					title: "分享文档,发现价值",
					content(h) {
						return h("div", null, [
							h(
								"rx-cell-avatar",
								{
									class: "__dialog_content_cell"
								},
								[
									h("rx-icon", {
										props: {
											name: iconName
										},
										slot: "img"
									}),
									h(
										"span",
										{
											slot: "header"
										},
										doc.fileName
									),
									h(
										"p",
										{
											slot: "footer"
										},
										[
											h("span", null, "文件大小:"),
											h(
												"span",
												{ style: { marginLeft: "4px" } },
												fileSize
											)
										]
									)
								]
							),
							h(
								"p",
								{ style: "padding:1.5em 0;" },
								"是否上传文档至资料库,感谢您的贡献~"
							)
						]);
					}
				})
					.then(done => {
						return this.$http.doc
							.shareDocToPlatform({
								documentId: doc.id
							})
							.then(resp => {
								// 改变状态
								this.docItem.visibleType = 3;
								this.$refs.item.close();
								done();
								this.$confirm.close();
								this.$toast.text("上传成功", "bottom");
							})
							.catch(err => {
								done();
								this.$confirm.close();

								if (err.msg === "Network Error") {
									this.$toast.text("网络异常", "bottom");
								} else {
									this.$toast.text(
										this.$isDev ? err.msg : "上传发生异常",
										"bottom"
									);
								}
							});
					})
					.catch(err => {
						if (err !== false) {
							this.$toast.text(err.message);
						}
					});
			}
		}
	};
</script>

