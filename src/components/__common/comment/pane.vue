<style lang="sass">
@import "../../../assets/__base/pane_of_comment.scss"
</style>
<template>
	<rx-card ref="comment"
	         class="pane_of_comment"
	         :padding="padding">
		<template slot="header">
			<span>全部评论{{total>0?`(${total})`:''}}</span>
		</template>
		<template v-if="list && list.length">
			<slot></slot>
		</template>
		<template v-else>
			<slot name="empty">
				<div class="empty"
				     @click.stop="onEmptyClick">
					<rx-icon name="comment"></rx-icon>
					<p>暂无评论,快来抢占首屏吧</p>
				</div>
			</slot>
		</template>
	</rx-card>
</template>

<script>
	export default {
		name: "PaneOfComment",
		props: {
			total: { type: Number, default: 0 },
			list: Array,
			padding: Boolean
		},
		methods: {
			onEmptyClick(event) {
				this.$emit("on-empty-click", event);
			}
		}
	};
</script>

