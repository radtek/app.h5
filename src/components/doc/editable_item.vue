<style lang="sass">
	@import "../../assets/modules/doc/wc-item_of_editable_doc.scss"
</style>

<template>
	<rx-row class="editable-item"
	        justify="center"
	        align="center">
		<rx-col :flex-basis="120"
		        v-if="isEdit">
			<rx-chk-icon v-model="item.isChecked"></rx-chk-icon>
		</rx-col>
		<rx-col>
			<rx-cell-avatar @on-click="onClick">
				<template slot="img">
					<rx-icon :name="`doc-${item.mineType}`"></rx-icon>
				</template>
				<span slot="header">{{item.fileName}}</span>
				<template slot="footer">
					<rx-row justify="start"
					        align="center">
						<rx-col>
							<span>{{createTime | formatDate('yyyy/MM/dd')}}</span>
							<span>{{item.isRead ? '已读' : '未读'}}</span>
						</rx-col>
						<!-- <rx-col style="text-align:right;">
							收藏
						</rx-col> -->
					</rx-row>
				</template>
			</rx-cell-avatar>
		</rx-col>
	</rx-row>
</template>

<script>
	export default {
		name: "EditableItemOfDoc",
		props: {
			isEdit: Boolean,
			item: {
				type: Object,
				default() {
					return {};
				}
			},
			createTime: [String, Number]
		},
		methods: {
			onClick() {
				if (this.$isProd || this.$isTest) {
					JXRSApi.view.goto({
						title: this.item.fileName,
						url: "native://openDoc",
						query: {
							docid: this.item.id,
							docType: this.item.mineType,
							url: this.item.url,
							fileSize: this.item.fileSize
						}
					});
				} else {
					console.log({
						docid: this.item.id,
						docType: this.item.mineType,
						url: this.item.url,
						fileSize: this.item.fileSize
					});
					alert("app原生端打开");
				}
			}
		}
	};
</script>

