<template>
  <section rs-view="edu.comments">
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
      <comment-pane ref="comment"
                    :total="total"
                    :list="list"
                    title="学习讨论"
                    :is-show-zan="false"
                    @on-empty-click="handleCommentEmptyClick">
        <comment-item ref="items"
                      v-for="(comment,index) in list"
                      :key="index"
                      :item="comment"
                      @on-zan="handleZan"></comment-item>
      </comment-pane>
    </rx-pull>
  </section>
</template>

<script>
  import Pull from "~m/pull";
  export default {
  	name: "VwEduComments",
  	components: {
  		CommentPane: () =>
  			import(/* webpackChunkName:"wc-pane_of_comment" */ "~c/__common/comment/pane.vue"),
  		CommentItem: () =>
  			import(/* webpackChunkName:"wc-item_of_comment" */ "~c/__common/comment/item.vue")
  	},
  	mixins: [Pull],
  	data() {
  		return {
  			list: [],
  			total: 0,
  			contentid: "",
  			page: 1
  		};
  	},
  	methods: {
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
  		handleCommentEmptyClick() {
  			// 通知App去发表评论
  			if (!this.$isDev) {
  				JXRSApi.app.education.addComment({
  					contentId: this.contentid
  				});
  			}
  		},
  		__fetch() {
  			return this.$http.edu
  				.getComments({
  					contentId: this.contentid,
  					passport: this.authInfo.passport
  				})
  				.then(data => {
  					this.list = data.result.list;
  					this.total = data.result.total;

  					setTimeout(() => {
  						this.__loadLazyImgs();
  					}, 300);
  				});
  		},
  		__append() {
  			return this.$http.edu
  				.getComments({
  					contentId: this.contentid,
  					passport: this.authInfo.passport,
  					page: (this.page += 1)
  				})
  				.then(data => {
  					if (data && data.result.list && data.result.list.length) {
  						this.list = this.list.concat(data.result.list);
  					}
  				});
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
  		}
  	},
  	created() {
  		this.getQS("contentid");
  		if (!this.$isDev) {
  			JXRSApi.on("app.education.refreshComments", () => {
  				setTimeout(() => {
  					this.__fetch();
  				}, 500);
  			});
  		}
  		this.__fetch();
  	}
  };
</script>

