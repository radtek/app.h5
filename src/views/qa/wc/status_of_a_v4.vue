<template>
	<rx-row justify="start"
	        align="center">
		<rx-col>创建于{{row.createTime | formatDate('yyyy.M.d')}}</rx-col>
		<rx-col>{{row.clickCount}}阅读</rx-col>
		<rx-col>
			<rx-btn plain
			        type="text"
			        size="small"
			        icon="comment"
			        @on-click="onClick('comment')">{{row.commentCount || 0}}</rx-btn>
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
		name: "WcStatusOfAV4",
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
