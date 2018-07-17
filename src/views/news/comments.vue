<template>
	<div rs-view="comments">
		<comment-pane :total="total"
		              :list="list"
		              @on-empty-click="handleCommentEmptyClick">
			<rx-pull ref="pull"
			         :list="list"
			         :total="total"
			         :up="up"
			         :down="down"
			         @downing="handleDown"
			         @uping="handleUp"
			         @scroll-end="handleScrollEnd">
				<rx-pull-down slot="down"></rx-pull-down>
				<rx-pull-up slot="up"></rx-pull-up>
				<comment-item ref="items"
				              v-for="(comment,index) in list"
				              :key="index"
				              :item="comment"></comment-item>
			</rx-pull>
		</comment-pane>
	</div>
</template>
<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "PageOfNewsComments",
		components: {
			CommentPane: () =>
				import(/* webpackChunkName:"wc-pane_of_comment" */ "~c/__common/comment/pane.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			CommentItem: () =>
				import(/* webpackChunkName:"wc-item_of_comment" */ "~c/__common/comment/item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		data() {
			return {
				list: [],
				total: 0,
				page: 1
			};
		},
		methods: {
			__fetch() {
				this.page = 1;
				return this.$http.news
					.getComments({
						contentId: this.contentid
					})
					.then(data => {
						this.list = data.list;
						this.total = data.count;
					});
			},
			__append() {
				return this.$http.news
					.getComments({
						startIndex: ++this.page,
						contentId: this.contentid
					})
					.then(data => {
						const list = data.list;
						if (list && list.length) {
							this.list = this.list.concat(list);
						}
					});
			},
			handleCommentEmptyClick() {
				// 通知App去发表评论
				if (!this.$isDev) {
					JXRSApi.app.news.commentInputFocus({
						contentId: this.contentid,
						channelId: this.channelid
					});
				}
			}
		},
		created() {
			this.getQS("contentid");
			if (!this.$isDev) {
				JXRSApi.on("app.news.refreshComments", () => {
					this.__fetch();
				});
			}
		},
		mounted() {
			this.__fetch();
		}
	};
</script>

