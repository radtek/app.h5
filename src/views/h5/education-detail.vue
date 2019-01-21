<style lang="scss">
  @import "../../assets/modules/news/view-detail.scss";
  [rs-view="detail"] {
  	.content {
  		img {
  			width: 90%;
  			margin-left: 5%;
  		}
  	}

  	.pane_of_comment .rx-card_header span {
  		border-left: none;
  	}

  	.editable-item > .rx-col:last-child {
  		border: none;
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
        <div class="wrap">
          <h3 class="title">{{info.title}}</h3>
          <div class="status">
            <span>{{info.origin}}</span>
            <span>{{info.publishTime | formatDate("yyyy-M-d hh:mm")}}</span>
            <span>{{info.clickCount || 0}}浏览</span>
            <span>{{total || 0}}评论</span>
          </div>
          <div class="content"
               ref="content"
               v-html="info.txt"
               @click.stop="handleContentClick"></div>
        </div>
        <div class="separate"
             v-if="attachments && attachments.length"></div>
        <rx-card v-if="attachments && attachments.length"
                 class="wrap-recommend"
                 padding="h">
          <template slot="header">
            <span>学习附件</span>
          </template>
          <ul>
            <item v-for="(file,index) in attachments"
                  :key="index"
                  :row="file">
            </item>
          </ul>
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
  import Pull from "~m/pull";
  import ScrollToComment from "~m/scroll-to-comment";
  const REG_HTML_SCRIPT = /<script[^>]*?>[\s\S]*?<\/script>/g;
  const REG_HTML_STYLE = /<style[^>]*?>[\s\S]*?<\/style>/g;
  export default {
  	name: "VwEduDetail",
  	components: {
  		Item: () =>
  			import(/* webpackChunkName:"wc-education-item_of_attach" */ "~c/edu/education-item_of_attach.vue").then(
  				cmp => utils.asyncCmp.solution(cmp, "VwEduDetail")
  			),
  		CommentPane: () =>
  			import(/* webpackChunkName:"wc-pane_of_comment" */ "~c/__common/comment/pane.vue").then(
  				utils.fixAsyncCmpLifeCycle
  			),
  		CommentItem: () =>
  			import(/* webpackChunkName:"wc-item_of_comment" */ "~c/__common/comment/item.vue").then(
  				cmp => utils.asyncCmp.solution(cmp, "VwEduDetail")
  			),
  		Skeleton: () =>
  			import(/* webpackChunkName:"wc-skeleton" */ "~c/news/skeleton.vue")
  	},
  	mixins: [Pull, ScrollToComment],
  	data() {
  		return {
  			isNight: false,
  			size: "",
  			info: null,
  			attachments: [],
  			page: 1,
  			list: [],
  			total: 0,
  			fileItemReady: 0
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
  		},
  		imgs() {
  			if (this.info && this.info.txt) {
  				const arr = [];
  				let match;
  				while (
  					(match = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim.exec(
  						this.info.txt
  					))
  				) {
  					arr.push(match[2]);
  				}
  				return arr;
  			}
  			return [];
  		}
  	},
  	methods: {
  		handleContentClick(event) {
  			const target = event.target;
  			if (!this.$isDev && target.tagName === "IMG") {
  				const hasDataSrc = target.hasAttribute("data-src");
  				JXRSApi.app.h5.openImgViewer({
  					currentImgUrl: target.getAttribute(
  						hasDataSrc ? "data-src" : "src"
  					),
  					currentIndex: target.getAttribute("data-index") || 0,
  					imgs: this.imgs,
  					aid: ""
  				});
  			}
  		},
  		__loadLazyImgs() {
  			let imgs = document.querySelectorAll("img[data-src]");
  			if (imgs && imgs.length) {
  				imgs = Array.prototype.slice.call(imgs);
  				imgs.forEach((img, index) => {
  					img.setAttribute("data-index", index);
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
  		__fetch() {
  			return this.$http.edu
  				.getDetail({
  					contentId: this.contentid,
  					passport: this.authInfo.passport
  				})
  				.then(data => {
  					const info = data.result.content;

  					if (info) {
  						const content = info.txt
  							? info.txt
  									.replace(REG_HTML_SCRIPT, "")
  									.replace(REG_HTML_STYLE, "")
  									.replace(/<[^<>]+>/g, "")
  									.replace(/(^\s*)|(\s*&)/g, "")
  									.replace(/[\r\n]/g, "")
  							: "";

  						if (!this.$isDev) {
  							JXRSApi.app.education.setAudioText({ content });
  							JXRSApi.app.education.updateStatusInfo({
  								contentId: parseInt(this.contentid, 10),
  								isCollected: !!info.isCollected,
  								isSupported: !!info.isSupported,
  								likeCount: info.likeCount,
  								commentCount: info.commentCount || 0,
  								content
  							});
  						}

  						this.info = info;
  					}

  					if (data.result.files && data.result.files.length) {
  						this.attachments = data.result.files.map(it => {
  							return {
  								id: 0,
  								fileName: it.name,
  								fileSize: it.fileSize,
  								url: it.fileUrl,
  								mineType: it.name.substring(
  									it.name.indexOf(".") + 1
  								)
  							};
  						});
  					}
  					this.$rxUtils.asyncCmp.dataReady.call(
  						this,
  						"RsEduItemOfAttach"
  					);
  				});
  		},
  		__fetchComments() {
  			return this.$http.edu
  				.getComments({ contentId: this.contentid })
  				.then(data => {
  					this.list = data.list;
  					this.result = data.total;
  					this.$nextTick(() => {
  						this.$rxUtils.asyncCmp.dataReady.call(
  							this,
  							"ItemOfComment"
  						);
  					});
  				});
  		},
  		__append() {
  			return this.$http.edu
  				.getComments({
  					contentId: this.contentid,
  					page: (this.page += 1)
  				})
  				.then(data => {
  					this.list = data.list;
  					this.result = data.total;
  					this.$nextTick(() => {
  						this.$rxUtils.asyncCmp.dataReady.call(
  							this,
  							"ItemOfComment"
  						);
  					});
  				});
  		},
  		handleCommentEmptyClick() {
  			// 通知App去发表评论
  			if (!this.$isDev) {
  				JXRSApi.app.education.addComment({
  					contentId: this.contentid
  				});
  			}
  		},
  		handleZan(item) {
  			const isSupported = item.isSupported;
  			const action = isSupported
  				? "cancelZanToComment"
  				: "addZanToComment";
  			this.$http.edu[action]({
  				contentId: this.contentid,
  				commentId: item.id
  			}).then(() => {
  				item.supportNum += isSupported ? -1 : 1;
  				item.isSupported = !isSupported;
  			});
  		}
  	},
  	created() {
  		this.getQS("contentid");
  		if (!this.$isDev) {
  			JXRSApi.on("app.education.changePageFontSize", ({ size }) => {
  				this.size = size;
  			})
  				.on("app.education.changePageModeToNight", ({ isNight }) => {
  					// 切换夜间模式
  					this.isNight = isNight;
  				})
  				.on("app.education.refreshComments", () => {
  					this.__fetchComments();
  				})
  				.on("app.education.scrollToComment", () => {
  					this.__scrollToComment();
  				});
  		}

  		this.$rxUtils.asyncCmp
  			.ready(this, "RsEduItemOfAttach", cmp => {
  				this.fileItemReady += 1;
  				if (this.fileItemReady === this.attachments.length) {
  					setTimeout(() => {
  						this.commentAnchor = this.$refs.comment.$el.getBoundingClientRect().top;
  					}, 300);
  				}
  			})
  			.ready(this, "ItemOfComment", cmp => {
  				this.readyACount += 1;
  				if (this.readyACount === this.list.length) {
  					setTimeout(() => {
  						const rect = this.$refs.comment.$el.getBoundingClientRect();
  						if (!this.commentAnchor) {
  							this.commentAnchor = rect.top;
  						}
  						this.commentHeight = rect.height;
  						if (this.isWaitingForCommentAnchor) {
  							this.__scrollToComment();
  						}
  					}, 300);
  				}
  			});
  	},
  	activated() {
  		this.__fetch();
  		this.__fetchComments();
  	}
  };
</script>
