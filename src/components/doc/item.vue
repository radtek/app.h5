<style lang="sass">
@import "../../assets/modules/doc/wc-item_of_doc.scss"
</style>

<template>
	<rx-cell class="doc-item"
	         @on-click="onClick">
		<p slot="header">{{item.fileName}}</p>
		<template slot="footer">
			<rx-row justify="start"
			        align="center">
				<rx-col>
					<rx-icon :name="item.mineType | mimeType"></rx-icon>
					<span>{{item.readCount || 0}}人阅读</span>
				</rx-col>
				<rx-col align="right">
					<span>收藏</span>
					<rx-icon :name="iconName"
					         :class="[{[`active`]:item.isCollected}]"
					         stop-click
					         @on-click="onCollectClick"></rx-icon>
				</rx-col>
			</rx-row>
		</template>
	</rx-cell>
</template>

<script>
	export default {
		name: "ItemOfDoc",
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		computed: {
			iconName() {
				return this.item.isCollected ? "star-fill" : "star";
			}
		},
		methods: {
			onClick() {
				const _item = this.item;
				const params = {
					id: _item.id,
					fileName: _item.fileName,
					fileSize: _item.fileSize,
					isCollected: _item.isCollected,
					url: _item.url,
					mineType: _item.mineType
				};
				if (this.$isDev) {
					alert("app原生端打开" + JSON.stringify(params));
				} else {
					JXRSApi.view.goto({
						title: _item.fileName,
						url: "native://openDoc",
						query: params
					});
				}
			},
			onCollectClick() {
				// 添加收藏
				if (this.item.isCollected) {
					this.$http.doc
						.removeDoc({
							ids: [this.item.id],
							type: 3
						})
						.then(() => {
							this.item.isCollected = false;
						});
				} else {
					this.$http.doc
						.collectDoc({
							documentId: this.item.id
						})
						.then(() => {
							this.item.isCollected = true;
						});
				}
			}
		}
	};
</script>

