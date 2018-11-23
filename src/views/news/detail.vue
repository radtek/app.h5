
<style lang="scss">
	@import "../../assets/modules/news/view-detail.scss";
	[rs-view="detail"] {
		.pane_of_comment .rx-card_header span {
			border-left: none;
		}
	}
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
					     v-html="info.txt"
					     @click="handleContentClick"></div>
				</div>
				<div class="separate"
				     v-if="recommendNews && recommendNews.length"></div>
				<rx-card v-if="recommendNews && recommendNews.length"
				         class="wrap-recommend"
				         padding="hb">
					<template slot="header">
						<span>相关推荐</span>
					</template>
					<item v-for="(item,index) in recommendNews"
					      :key="index"
					      :channel-id="channelid"
					      :item="item"></item>
				</rx-card>
				<div class="separate"></div>
				<comment-pane ref="comment"
				              :total="total"
				              :list="list"
				              :is-show-zan="false"
				              @on-empty-click="handleCommentEmptyClick">
					<comment-item ref="items"
					              v-for="(comment,index) in list"
					              :key="index"
					              :item="comment"
					              @on-zan="handleZan"></comment-item>
				</comment-pane>
			</rx-pull>
		</template>

	</section>
</template>
<script>
	import { utils } from "~rx";
	import ScrollToComment from "~m/scroll-to-comment";
	import Pull from "~m/pull";
	import { setTimeout } from "timers";
	const REG_HTML_SCRIPT = /<script[^>]*?>[\s\S]*?<\/script>/g;
	const REG_HTML_STYLE = /<style[^>]*?>[\s\S]*?<\/style>/g;
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
				total: 0,
				imgs: []
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
			async __fetchDetail() {
				const [err, data] = await this.$sync(
					this.$http.news.getDetail({ contentId: this.contentid })
				);

				if (err) return;

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

				setTimeout(() => {
					let imgs = document.querySelectorAll(".wrap .content img");

					imgs = Array.prototype.slice.call(imgs);

					const targetImgs = [];

					imgs.forEach((i, index) => {
						if (
							i.hasAttribute("src") ||
							i.src ||
							i.hasAttribute("data-src")
						) {
							const src =
								i.getAttribute("data-src") || i.getAttribute("src");
							if (!src || !~src.indexOf("http")) return;
							targetImgs.push([i, src]);
						}
					});

					targetImgs.forEach((item, index) => {
						item[0].setAttribute("data-index", index);
						this.imgs.push(item[1]);
					});
				}, 300);

				if (this.$isDev) return;

				const content = info.txt
					? info.txt
							.replace(REG_HTML_SCRIPT, "")
							.replace(REG_HTML_STYLE, "")
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
			},
			async __fetchRecommends() {
				const [err, data] = await this.$sync(
					this.$http.news.getRecommends({
						contentId: this.contentid,
						channelId: this.channelid
					})
				);

				if (err) return;

				this.recommendNews = data.list;
			},
			async __fetchComments() {
				this.page = 1;
				const [err, data] = await this.$sync(
					this.$http.news.getComments({ contentId: this.contentid })
				);
				if (err) return;
				this.list = data.list;
				this.total = data.count;
			},
			async __fetch() {
				await this.__fetchDetail();
				await this.__fetchRecommends();
				await this.__fetchComments();
			},
			async __append() {
				// 由于此个页面上拉加载更多只是去加载评论内容
				const [err, data] = await this.$sync(
					this.$http.news.getComments({
						startIndex: ++this.page,
						contentId: this.contentid
					})
				);
				if (err) return;

				const list = data.list;
				if (list && list.length) {
					this.list = this.list.concat(list);
				}
			},
			handleCommentEmptyClick() {
				// 通知App去发表评论
				if (!this.$isDev) {
					JXRSApi.app.news.addComment({
						contentId: this.contentid,
						channelId: this.channelid
					});
				}
			},
			handleZan(item) {
				const isSupported = item.isSupported;
				const action = isSupported
					? "cancelZanToComment"
					: "addZanToComment";
				this.$http.news[action]({
					contentId: this.contentid,
					commentId: item.id
				}).then(() => {
					item.supportNum += isSupported ? -1 : 1;
					item.isSupported = !isSupported;
				});
			},
			handleContentClick(event) {
				const target = event.target;
				if (!this.$isDev && target.tagName === "IMG") {
					const hasDataSrc = target.hasAttribute("data-src");
					JXRSApi.app.news.openImgViewer({
						currentImgUrl: target.getAttribute(
							hasDataSrc ? "data-src" : "src"
						),
						currentIndex: target.getAttribute("data-index") || 0,
						imgs: this.imgs
					});
				}
			}
		},
		created() {
			this.getQS("contentid", "channelid");

			this.$rxUtils.asyncCmpListenApi.on("ItemOfNews.afterMounted", cmp => {
				this.itemReadyCount += 1;
				if (this.itemReadyCount === this.recommendNews.length) {
					this.commentAnchor = this.$refs.comment.$el.getBoundingClientRect().top;
				}
			});

			this.$rxUtils.asyncCmpListenApi.on(
				"ItemOfComment.afterMounted",
				cmp => {
					this.readyCount += 1;
					if (this.readyCount === this.list.length) {
						this.commentHeight = this.$refs.comment.$el.getBoundingClientRect().height;
						if (this.isWaitingForCommentAnchor) {
							this.__scrollToComment();
						}
					}
				}
			);

			if (!this.$isDev) {
				JXRSApi.on("app.news.refreshComments", () => {
					setTimeout(() => {
						this.__fetchComments();
					}, 500);
				})
					.on("app.news.scrollToComment", () => {
						this.__scrollToComment();
					})
					.on("app.news.changePageFontSize", ({ size }) => {
						this.size = size;
					})
					.on("app.news.changePageModeToNight", ({ isNight }) => {
						// 切换夜间模式
						this.isNight = isNight;
					})
					.on("app.news.changeLikeCount", ({ count }) => {
						// 更新点赞数
						this.info.likeCount = count;
					});
			}
		},
		activated() {
			this.__fetch();
		}
	};
</script>

