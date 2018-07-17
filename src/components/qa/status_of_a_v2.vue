<template>
	<rx-row justify="center"
	        align="center">
		<!-- <rx-col>
			<rx-btn plain
			        type="text"
			        size="small"
			        icon="share"
			        @on-click="onClick('share')">转发</rx-btn>
		</rx-col> -->
		<rx-col>
			<rx-btn plain
			        type="text"
			        size="small"
			        icon="comment"
			        @on-click="onClick('comment')">{{row.commentCount || 0}}</rx-btn>
		</rx-col>
		<rx-col>
			<rx-btn :plain="!row.isSupported"
			        type="text"
			        size="small"
			        icon="zan"
			        @on-click="onClick('zan')">{{row.supportCount|| 0}}</rx-btn>
		</rx-col>
	</rx-row>
</template>

<script>
	export default {
		name: "StatusOfAV2",
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			onClick(action) {
				this.$emit(`on-${action}`);
			}
		}
	};
</script>

