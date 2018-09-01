<style lang="scss">
	.rs-edu-attach-item {
		margin: 0 30px;

		~ li {
			border-bottom: 1px solid #e6e6e6;
		}

		.rx-cell-avatar {
			padding-right: 0;
			padding-left: 0;

			.header {
				font-size: 32px;
			}
		}

		.rx-cell-avatar .rx-cell-img {
			.rx-icon {
				font-size: 90px;
			}
		}
	}
	.isnight {
		.rs-edu-attach-item {
			.rx-cell-avatar {
				.header {
					color: #707070;
				}
			}
		}
	}
</style>


<template>
	<li class="rs-edu-attach-item">
		<rx-cell-avatar @on-click="onClick">
			<template slot="img">
				<rx-icon :name="`doc-${__getMimeType(row.mineType)}`"></rx-icon>
			</template>
			<span slot="header">{{row.fileName}}</span>
		</rx-cell-avatar>
	</li>
</template>

<script>
	import mimeType from "~f/mimeType";
	export default {
		name: "RsEduItemOfAttach",
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			__getMimeType(val) {
				return mimeType(val);
			},
			onClick() {
				const item = this.row;

				const params = {
					id: item.id,
					fileName: item.fileName,
					fileSize: item.fileSize,
					isCollected: 0,
					url: item.url,
					mineType: item.mineType
				};

				if (this.$isDev) {
					alert("app原生端打开:" + JSON.stringify(params));
				} else {
					JXRSApi.view.goto({
						title: item.fileName,
						url: "native://openDoc",
						query: params
					});
				}
			}
		}
	};
</script>
