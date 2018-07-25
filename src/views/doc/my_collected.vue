<style lang="sass">
@import "../../assets/modules/doc/wc-skeleton_of_item.scss"
</style>
<template>
	<section rs-view="my-collected"
	         :style="viewStyles">
		<template v-if="isPrerender">
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
			<rx-skeleton-cell-avatar></rx-skeleton-cell-avatar>
		</template>
		<template v-else>
			<rx-pull v-if="total>0"
			         ref="pull"
			         :can-pull="!isChooseMode"
			         :bottom-offset="isChooseMode?50:0"
			         :up="up"
			         :down="down"
			         @uping="handleUp"
			         @downing="handleDown"
			         @scroll-end="handleScrollEnd"
			         :list="list"
			         :total="total">
				<rx-pull-down slot="down"></rx-pull-down>
				<rx-pull-up slot="up"></rx-pull-up>
				<div class="pane-list">
					<rx-swipeout>
						<doc-item ref="docItem"
						          v-for="(doc,index) in list"
						          :key="index"
						          category="collect"
						          :is-edit="isChooseMode"
						          :time="doc.createTime"
						          :item="doc"></doc-item>
					</rx-swipeout>
				</div>
			</rx-pull>
			<status v-if="isChooseMode && total>0"
			        category="collect"
			        @on-removed="__removeDocs"></status>
			<div class="empty"
			     v-if="!isPrerender && total<=0"
			     @click.stop="goto('党建文库','/index')">
				<img :src="getLocalMduImg('doc','empty-collect')" />
				<p>您还没有收藏哦，
					<span class="strong">去逛逛~</span>
				</p>
			</div>
		</template>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	import Doc from "~m/__doc";
	export default {
		name: "PageOfMyCollected",
		components: {
			DocItem: () =>
				import(/* webpackChunkName:"wc-item_of_editable_doc" */ "~c/doc/editable_item.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Status: () =>
				import(/* webpackChunkName:"wc-status_of_item" */ "~c/doc/status_of_item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull, Doc],
		provide() {
			return {
				page: this
			};
		},
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
				this.$http.doc.getUserCollectedDocs().then(resp => {
					const list = resp.result.list;
					list.forEach(item => {
						item.isChecked = item.isDownloading = item.isRemoving = item.isCollecting = item.isSharing = false;
					});
					this.list = list;
					this.total = resp.result.total;
					setTimeout(() => {
						this.isPrerender = false;
						this.__showAppTopRightAction();
					}, 300);
				});
			},
			__append() {
				this.$http.doc
					.getUserCollectedDocs({ page: ++this.page })
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							list.forEach(item => {
								item.isChecked = item.isDownloading = item.isRemoving = item.isCollecting = item.isSharing = false;
							});
							this.list = this.list.concat(list);
						}
					});
			}
		},
		created() {
			this.__initTopAction();
		},
		mounted() {
			this.__fetch();
		}
	};
</script>

