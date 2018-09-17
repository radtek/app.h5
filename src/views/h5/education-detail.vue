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
			         :up="false"
			         :down="down"
			         @downing="handleDown"
			         @scroll-end="__handleScrollEnd">
				<rx-pull-down slot="down"></rx-pull-down>
				<div class="wrap">
					<h3 class="title">{{info.title}}</h3>
					<div class="status">
						<span>{{info.origin}}</span>
						<span>{{info.publishTime | formatDate("yyyy-M-d hh:mm")}}</span>
						<span v-if="info.clickCount">{{info.clickCount || 0}}浏览</span>
					</div>
					<div class="content"
					     ref="content"
					     v-html="info.txt"></div>
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
			</rx-pull>
		</template>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	const REG_HTML_SCRIPT = /<script[^>]*?>[\s\S]*?<\/script>/g;
	const REG_HTML_STYLE = /<style[^>]*?>[\s\S]*?<\/style>/g;
	export default {
		name: "PageOfEducationDetail",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-education-item_of_attach" */ "~c/h5/education-item_of_attach.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Skeleton: () =>
				import(/* webpackChunkName:"wc-skeleton" */ "~c/news/skeleton.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		data() {
			return {
				isNight: false,
				size: "",
				info: null,
				attachments: [],
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
			__fetch() {
				return this.$http.education
					.getDetail({
						contentId: this.contentid,
						passport: this.authInfo.passport
					})
					.then(data => {
						this.info = data.result.content;

						if (this.info) {
							const content = this.info.txt
								? this.info.txt
										.replace(REG_HTML_SCRIPT, "")
										.replace(REG_HTML_STYLE, "")
										.replace(/<[^<>]+>/g, "")
										.replace(/(^\s*)|(\s*&)/g, "")
										.replace(/[\r\n]/g, "")
								: "";

							if (!this.$isDev) {
								JXRSApi.app.education.setAudioText({ content });
							}
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
					});
			}
		},
		created() {
			this.getQS("contentid");

			if (!this.$isDev) {
				JXRSApi.wrap("app.education.setAudioText");
				JXRSApi.on("app.education.changePageFontSize", ({ size }) => {
					this.size = size;
				}).on("app.education.changePageModeToNight", ({ isNight }) => {
					// 切换夜间模式
					this.isNight = isNight;
				});
			}
		},
		activated() {
			this.__fetch();
		}
	};
</script>
