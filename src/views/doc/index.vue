<style lang="sass">
@import "../../assets/modules/doc/view-index.scss"
</style>

<template>
	<section rs-view="index">
		<rx-pull ref="pull"
		         :up="up"
		         :down="down"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd"
		         :list="list"
		         :total="total">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<msg-box category="doc"
			         :count="msgboxCount"
			         :last-id="msgboxLastId"
			         :avatar="msgboxAvatar"></msg-box>
			<div class="pane-entry">
				<rx-row justify="center"
				        align="center">
					<rx-col v-for="(entry,index) in entries"
					        :key="index">
						<entry-item :item="entry"></entry-item>
					</rx-col>
				</rx-row>
			</div>
			<div class="pane-ad">
				<img :src="getLocalMduImg('doc', 'banner','jpg')"
				     alt="banner" />
			</div>
			<div class="pane-tags">
				<skeleton-tags v-if="isPrerenderTags"></skeleton-tags>
				<template v-else>
					<rx-row v-for="(item,index) in tags"
					        justify="center"
					        align="center"
					        :gutter="2"
					        :key="index"
					        v-if="!isHide || index!==1">
						<rx-col v-for="(tag,idx) in item"
						        :key="idx">
							<tag-item :item="tag"
							          @item-click="handleTagItemClick">
							</tag-item>
						</rx-col>
					</rx-row>
				</template>
			</div>
			<div class="separate"></div>
			<rx-card class="pane-list"
			         padding>
				<template slot="header">
					<rx-icon name="red-heart"></rx-icon>
					<span>为你推荐</span>
				</template>
				<div class="ui-list">
					<rx-skeleton-simple-cell v-if="isPrerender"></rx-skeleton-simple-cell>
					<template v-else>
						<doc-item v-for="(doc,index) in list"
						          :key="index"
						          :item="doc"></doc-item>
					</template>
				</div>
			</rx-card>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	import Msgbox from "~m/__msgbox";
	import Entries from "~v/doc/data/entry";
	export default {
		name: "PageOfIndex",
		components: {
			SkeletonTags: () =>
				import(/* webpackChunkName:"wc-skeleton_of_tags" */ "~c/doc/skeleton_of_tags").then(
					utils.fixAsyncCmpLifeCycle
				),
			EntryItem: () =>
				import(/* webpackChunkName:"wc-item_of_entry" */ "~c/doc/item_of_entry").then(
					utils.fixAsyncCmpLifeCycle
				),
			TagItem: () =>
				import(/* webpackChunkName:"wc-item_of_tag" */ "~c/doc/item_of_tag").then(
					utils.fixAsyncCmpLifeCycle
				),
			DocItem: () =>
				import(/* webpackChunkName:"wc-item_of_doc" */ "~c/doc/item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull, Msgbox],
		provide() {
			return {
				page: this
			};
		},
		data() {
			return {
				tags: [],
				list: [],
				total: 0,
				page: 1,
				isPrerender: true,
				isHide: true,
				isPrerenderTags: true,
				entries: Entries
			};
		},
		methods: {
			__fetch() {
				this.page = 1;
				this.$http.doc.getRecommendDocs().then(resp => {
					this.list = resp.result.list;
					this.total = resp.result.total;
					this.isPrerender = false;
				});
			},
			__append() {
				this.$http.doc
					.getRecommendDocs({ page: ++this.page })
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							this.list = this.list.concat(list);
						}
					});
			},
			__fetchTags() {
				this.$http.doc.getTags().then(resp => {
					const tags = resp.result;
					if (!tags) return;
					this.isPrerenderTags = false;

					const tagRow = parseInt(tags.length / 4, 10);

					const remainTags = tags.length % 4;

					const tempTags = [];

					for (let i = 1; i <= tagRow; i++) {
						tempTags.push(tags.slice(4 * (i - 1), 4 * i));
					}

					if (remainTags > 0) {
						tempTags.push(tags.slice(4 * tagRow));
						tempTags[tempTags.length - 1].push({
							icon: "down"
						});
					}
					this.tags = tempTags;
				});
			},
			handleTagItemClick(item) {
				// 获取标签下的文章列表
				if (item.icon === "down") {
					this.isHide = false;
					item.icon = "up";
				} else if (item.icon === "up") {
					this.isHide = true;
					item.icon = "down";
				} else {
					// 跳转到TagList
					const params = this.$rxUtils.assign(this.authInfo, {
						tagid: item.id
					});
					if (this.$isProd || this.$isTest) {
						JXRSApi.view.goto({
							title: item.category,
							url: `${
								location.origin
							}/doc/docs_of_tag/${this.$rxUtils.qs.stringify(
								params
							)}`,
							query: params
						});
					} else {
						this.$router.push({
							path: "/docs_of_tag",
							query: params
						});
					}
				}
			}
		},
		created() {
			this.recieveAppNotice("doc");
			this.$listenJSApi(
				"refreshItemStatusOfCollect",
				({ docIds, status }) => {
					if (this.list && this.list.length) {
						const list = this.list;
						for (let l = list.length; l--; ) {
							let l2 = docIds.length;
							for (; l2--; ) {
								if ("" + docIds[l2] === "" + list[l].id) {
									list[l].isCollected = status;
								}
							}
						}
					}
				}
			);

			this.$listenJSApi("refreshItemStatusOfReadCount", ({ docId }) => {
				if (this.list && this.list.length) {
					const list = this.list;
					for (let l = list.length; l--; ) {
						if (list[l].id + "" === docId + "") {
							list[l].readCount += 1;
							break;
						}
					}
				}
			});
		},
		mounted() {
			this.__fetchTags();
			this.__fetch();
		}
	};
</script>
