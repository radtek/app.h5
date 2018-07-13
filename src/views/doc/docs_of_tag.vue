<!-- 资料库 我的导入 -->
<style lang="sass">
@import "../../assets/modules/doc/view-docs_of_tag.scss"
</style>

<template>
	<section rs-view="tags">
		<div class="pane-banner"
		     v-if="background">
			<img :src="background"
			     alt="">
		</div>
		<rx-pull v-if="total>0"
		         ref="pull"
		         :top-offset="background ? 140:0"
		         :list="list"
		         :total="total"
		         :up="up"
		         :down="down"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<rx-card padding>
				<doc-item v-for="(item,index) in list"
				          :key="index"
				          :item="item"></doc-item>
			</rx-card>
		</rx-pull>
		<div class="empty"
		     v-else
		     @click.stop="goto('党建文库','/index')">
			<img :src="getLocalMduImg('doc','empty-tag')"
			     alt="">
			<p>还没有内容哦,
				<span class="strong">去看看其他的~</span>
			</p>
		</div>
	</section>
</template>

<script>
	import Pull from "~m/pull";
	import { utils } from "~rx";
	export default {
		name: "PageOfTags",
		components: {
			DocItem: () =>
				import(/* webpackChunkName:"wc-item_of_doc" */ "~c/doc/item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		data() {
			return {
				isPrerender: true,
				list: [],
				total: 0,
				page: 1,
				background: ""
			};
		},
		methods: {
			__fetch() {
				this.page = 1;
				this.$http.doc.getRecommendDocs({ id: this.tagid }).then(resp => {
					this.list = resp.result.list;
					this.total = resp.result.total;
					this.background = resp.result.background;
					this.isPrerender = false;
				});
			},
			__append() {
				this.$http.doc
					.getRecommendDocs({
						page: ++this.page,
						id: this.tagid
					})
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							this.list = this.list.concat(list);
						}
					});
			}
		},
		created() {
			this.getQS("tagid");

			if (!this.$isDev) {
				JXRSApi.wrap("on.app.doc.fetchDocsOfTag", ({ tagId }) => {
					this.tagid = tagId;
					this.__fetch();
				});
			}
		},
		mounted() {
			// 获取数据
			this.__fetch();
		}
	};
</script>
