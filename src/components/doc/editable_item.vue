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
							<rx-icon :name="`doc-${__getMimeType(item.infoDocument.mineType)}`"></rx-icon>
						</template>
						<span slot="header">{{item.infoDocument.fileName}}</span>
						<template slot="footer">
							<rx-row :flex="false"
							        align="center">
								<rx-col :span="category==='upload' || category==='share'?7:12">
									<span>{{(time||item.infoDocument.createTime) | formatDate('yyyy/MM/dd')}}</span>
									<span>{{item.infoDocument.readProcess>0 ? `已读${parseFloat(item.infoDocument.readProcess*100).toFixed(0)}%` : '未读'}}</span>
								</rx-col>
								<rx-col v-if="category=='upload'"
								        :span="5"
								        style="text-align:right;">
									<span :class="statusClass">
										<rx-icon name="warning"
										         style="color:#ff3254"
										         v-if="item.infoDocument.isPublished===2"></rx-icon>{{item.infoDocument.isPublished | auditState(item.infoDocument) }}</span>
								</rx-col>
								<rx-col v-else-if="category=='share'"
								        :span="5"
								        style="text-align:right;">
									<img :src="item.infoDocument.userImage"
									     @error="onImgErr($event)" />
									<span>>{{item.infoDocument.userName}}</span>
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
			                 text="下载"
			                 action="download"
			                 bg-color="#0097EE"></rx-swipeout-btn>
			<rx-swipeout-btn v-if="showCollect"
			                 :width="70"
			                 action="collect"
			                 :text="item.infoDocument.isCollected === 0 ? '收藏' : '已收藏'"
			                 :bg-color="item.infoDocument.isCollected === 0 ? '#ffac5a':'#ccc'"></rx-swipeout-btn>
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
			                 text="上传<br/>文库"
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
			showDownload() {
				return this.category !== "upload";
			},
			showCollect() {
				return (
					this.category !== "collect" ||
					(this.category === "upload" &&
						this.item.infoDocument.visibleType !== 1)
				);
			},
			showRemove() {
				return this.category !== "upload";
			},
			showShare() {
				return (
					this.category === "upload" &&
					this.item.infoDocument.visibleType === 1
				);
			},
			showUpload() {
				return (
					this.category === "upload" &&
					this.item.infoDocument.visibleType === 1
				);
			},
			type() {
				return categoryMap[this.category];
			},
			statusClass() {
				const _item = this.item.infoDocument;
				const val = _item.isPublished;

				switch (val) {
					case 0:
						return "auditing";
					case 2:
						return "refuse";
					case 1:
					default:
						return _item.visibleType === 1
							? "private"
							: _item.visibleType === 2
								? "friend"
								: "platform";
				}
			}
		},
		filters: {
			auditState(val, _item) {
				switch (val) {
					case 0:
						return "上传审核中";
					case 2:
						return "审核未通过";
					case 1:
					default:
						return _item.visibleType === 1
							? "私有"
							: _item.visibleType === 2
								? "好友共享"
								: "已上传文库";
				}
			}
		},
		methods: {
			__getMimeType(val) {
				return mimeType(val);
			},
			handleIconClick() {
				if (!this.item.isChecked) {
					!this.$isDev &&
						JXRSApi.app.doc.changeChooseAllStatus({ isSelect: 0 });
				} else {
					let hasUnChecked = false;
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
			onClick() {
				if (this.isEdit || this.$refs.item.isOpen) return;

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
				if (this.item.infoDocument.isCollected === 1) return;
				const documentId = [this.item.infoDocument.id];
				this.$http.doc
					.collectDoc({ documentId })
					.then(resp => {
						// 收藏成功
						this.$toast.text("收藏成功", "bottom");
						this.$refs.item.close();
						this.item.infoDocument.isCollected = 1;
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

						this.$refs.item.close();

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
				this.$http.doc
					.shareDocToFriend({
						documentId: this.item.infoDocument.id
					})
					.then(resp => {
						this.$toast.text("好友分享成功", "bottom");
						this.$refs.item.close();
					});
			},
			handleUpload() {
				// 先弹出选择框

				this.$http.doc
					.shareDocToPlatform({
						documentId: this.item.infoDocument.id
					})
					.then(resp => {
						this.$toast.text("上传文库成功", "bottom");
						this.$refs.item.close();
					});
			}
		}
	};
</script>

