<template>
	<div class="item_status">
		<span>
			{{item.source | trim}}
		</span>
		<span>{{item.date | timeDiff}}</span>
		<span v-if="item.likeCount">{{item.likeCount}}点赞 </span>
		<span v-if="item.clickCount">{{item.clickCount}}浏览 </span>
		<span v-if="item.commentCount">{{item.commentCount}}评论</span>
	</div>
</template>
<script>
	export default {
		name: "StatusOfNewsItem",
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		}
	};
</script>

