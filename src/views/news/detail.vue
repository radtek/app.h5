
<style lang="sass">
@import "../../assets/modules/news/view-detail.scss"
</style>

<template>
	<section rs-view="detail"
	         :class="classes">
		<template v-if="!info">
			<skeleton></skeleton>
		</template>
		<template v-else>
			<rx-pull ref="pull"
			         :list="list"
			         :total="total"
			         :up="up"
			         :down="down"
			         @downing="handleDown"
			         @uping="handleUp"
			         @scroll-end="__handleScrollEnd">
				<rx-pull-down slot="down"></rx-pull-down>
				<rx-pull-up slot="up"></rx-pull-up>
				<div class="wrap"
				     :class="[{[`not_wechat`]: channelid !== '48' && channelid !== '13'&& channelid !== '50'}]">
					<h3 class="title">{{info.title}}</h3>
					<div class="status">
						<span>{{info.origin}}</span>
						<span>{{info.publishTime | formatDate("yyyy-M-d hh:mm")}}</span>
						<span v-if="info.clickCount">{{info.clickCount || 0}}浏览</span>
						<span v-if="info.likeCount">{{info.likeCount}}点赞</span>
						<span>{{info.commentCount}}评论</span>
					</div>
					<div class="content"
					     ref="content"
					     v-html="info.txt"></div>
				</div>
				<div class="separate"
				     v-if="recommendNews && recommendNews.length"></div>
				<rx-card v-if="recommendNews && recommendNews.length"
				         class="wrap-recommend"
				         padding>
					<template slot="header">
						<span>相关推荐</span>
					</template>
					<item v-for="(item,index) in recommendNews"
					      :key="index"
					      :channel-id="channelid"
					      :item="item"></item>
				</rx-card>
				<div class="separate"></div>
				<comment-pane :total="total"
				              :list="list"
				              @on-empty-click="handleCommentEmptyClick">
					<comment-item ref="items"
					              v-for="(comment,index) in list"
					              :key="index"
					              :item="comment"></comment-item>
				</comment-pane>
			</rx-pull>
		</template>

	</section>
</template>
<script>
	import { utils } from "~rx";
	import ScrollToComment from "~m/scroll-to-comment";
	import Pull from "~m/pull";
	export default {
		name: "PageOfNewsDetail",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item" */ "~c/news/item.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			CommentPane: () =>
				import(/* webpackChunkName:"wc-pane_of_comment" */ "~c/__common/comment/pane.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			CommentItem: () =>
				import(/* webpackChunkName:"wc-item_of_comment" */ "~c/__common/comment/item.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Skeleton: () =>
				import(/* webpackChunkName:"wc-skeleton" */ "~c/news/skeleton.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [ScrollToComment, Pull],
		data() {
			return {
				isNight: false,
				size: "",
				info: null,
				recommendNews: [],
				itemReadyCount: 0,
				page: 1,
				list: [],
				total: 0
			};
		},
		computed: {
			classes() {
				return [
					{
						isnight: this.isNight,
						[`${this.size}`]: this.size !== "default"
					}
				];
			}
		},
		methods: {
			__loadLazyImgs() {
				let imgs = document.querySelectorAll("img[data-src]");
				if (imgs && imgs.length) {
					imgs = Array.prototype.slice.call(imgs);
					imgs.forEach(img => {
						if (
							img.hasAttribute("data-src") &&
							this.$rxUtils.isInClientView(img)
						) {
							img.setAttribute("src", img.getAttribute("data-src"));
							img.removeAttribute("data-src");
						}
					});
				}
			},
			__handleScrollEnd(pos) {
				this.handleScrollEnd(pos);
				this.__loadLazyImgs();
			},
			__fetchDetail() {
				return this.$http.news
					.getDetail({ contentId: this.contentid })
					.then(data => {
						const info = data.list[0];
						if (info && info.txt) {
							info.txt = info.txt.replace(
								/\bsrc\b\s*=\s*(['"]?([^'"]*)['"]?)/gi,
								"data-src=$1"
							);
						}
						this.info = info;
						this.$nextTick(() => {
							this.__loadLazyImgs();
						});

						if (!this.$isDev) {
							const content = info.txt
								? info.txt
									.replace(
										/<script[^>]*?>[\s\S]*?<\/script>/g,
										""
									)
									.replace(
										/<style[^>]*?>[\s\S]*?<\/style>/g,
										""
									)
									.replace(/<[^<>]+>/g, "")
									.replace(/(^\s*)|(\s*&)/g, "")
									.replace(/[\r\n]/g, "")
								: "";

							JXRSApi.app.news.updateNewsInfoIcon({
								contentId: parseInt(this.contentid, 10),
								channelId: parseInt(this.channelid, 10),
								isCollected: !!info.isCollected,
								isSupported: !!info.isSupported,
								likeCount: info.likeCount,
								commentCount: info.commentCount || 0,
								content
							});
						}
					});
			},
			__fetchRecommends() {
				return this.$http.news
					.getRecommends({
						contentId: this.contentid,
						channelId: this.channelid
					})
					.then(data => {
						this.recommendNews = data.list;
					});
			},
			__fetchComments() {
				this.page = 1;
				return this.$http.news
					.getComments({ contentId: this.contentid })
					.then(data => {
						this.list = data.list;
						this.total = data.count;
					});
			},
			__fetch() {
				this.__fetchDetail();
				this.__fetchRecommends();
				this.__fetchComments();
			},
			__append() {
				// 由于此个页面上拉加载更多只是去加载评论内容
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
					JXRSApi.app.news.addComment({
						contentId: this.contentid,
						channelId: this.channelid
					});
				}
			}
		},
		created() {
			this.getQS("contentid", "channelid");

			// this.$on("fn.newsItem.ready", () => {
			// 	this.itemReadyCount += 1;
			// 	if (this.itemReadyCount === this.recommendNews.length) {
			// 		this.commentAnchor = this.$refs.comment.$el.getBoundingClientRect().top;
			// 	}
			// });

			// this.$on("fn.commentItem.ready", () => {
			// 	this.readyCount += 1;
			// 	if (this.readyCount === this.list.length) {
			// 		this.commentHeight = this.$refs.comment.$el.getBoundingClientRect().height;
			// 		if (this.isWaitingForCommentAnchor) {
			// 			this.__scrollToComment();
			// 		}
			// 	}
			// });

			if (!this.$isDev) {
				JXRSApi.on("app.news.refreshComments", () => {
					this.__fetchComments();
				});
				JXRSApi.on("app.news.scrollToComment", () => {
					this.__scrollToComment();
				});
				JXRSApi.on("app.news.changePageFontSize", ({ size }) => {
					this.size = size;
				});
				// 切换夜间模式
				JXRSApi.on("app.news.changePageModeToNight", ({ isNight }) => {
					this.isNight = isNight;
				});
				// 更新点赞数
				JXRSApi.on("app.news.changeLikeCount", ({ count }) => {
					this.info.likeCount = count;
				});
			}
		},
		activated() {
			this.__fetch();
		}
	};
</script>

