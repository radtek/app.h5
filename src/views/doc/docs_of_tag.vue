<!-- 资料库 我的导入 -->
<style lang="scss">
	@import "../../assets/modules/doc/view-docs_of_tag.scss";
	[rs-view="tags"] {
		.prerender-pane-banner {
			background: #e5e5e5;
			animation: fade 1s ease-in-out infinite;
			width: 100%;
			height: 100px;
		}

		.rx-skeleton {
			padding: 0 15px;

			.rx-cell-footer {
				display: flex;
			}

			.block2 {
				background: #e5e5e5;
				animation: fade 1s ease-in-out infinite;
				height: 30px;
				flex: 1;

				&:first-child {
					margin-right: 200px;
				}

				&:last-child {
					margin-left: 200px;
				}
			}
		}
	}
</style>

<template>
	<section rs-view="tags">
		<div class="pane-banner"
		     v-if="background">
			<img :src="background"
			     alt="">
		</div>
		<template v-if="prerender">
			<div class="prerender-pane-banner"></div>
			<div class="rx-skeleton rx-cell">
				<div class="rx-cell-header">
					<p class="block"></p>
					<p class="block"></p>
				</div>
				<div class="rx-cell-footer">
					<p class="rx-col-6 block2"></p>
					<p class="rx-col-6 block2"></p>
				</div>
			</div>
			<div class="rx-skeleton rx-cell">
				<div class="rx-cell-header">
					<p class="block"></p>
					<p class="block"></p>
				</div>
				<div class="rx-cell-footer">
					<p class="rx-col-6 block2"></p>
					<p class="rx-col-6 block2"></p>
				</div>
			</div>
			<div class="rx-skeleton rx-cell">
				<div class="rx-cell-header">
					<p class="block"></p>
					<p class="block"></p>
				</div>
				<div class="rx-cell-footer">
					<p class="rx-col-6 block2"></p>
					<p class="rx-col-6 block2"></p>
				</div>
			</div>
		</template>
		<template v-else>
			<rx-pull v-if="total>0"
			         ref="pull"
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
		</template>
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
				prerender: true,
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
					this.prerender = false;
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
				JXRSApi.on("app.doc.fetchDocsOfTag", ({ tagId }) => {
					this.tagid = tagId;
					this.__fetch();
				});

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
			}
		},
		mounted() {
			// 获取数据
			this.__fetch();
		}
	};
</script>
