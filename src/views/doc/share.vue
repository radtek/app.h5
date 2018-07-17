<style lang="sass">
@import "../../assets/modules/doc/wc-skeleton_of_item.scss"
</style>
<template>
	<section rs-view="my-share"
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
						<doc-item v-for="(doc,index) in list"
						          :key="index"
						          category="share"
						          :is-edit="isChooseMode"
						          :time="doc.createTime"
						          :item="doc"></doc-item>
					</rx-swipeout>
				</div>
			</rx-pull>
			<status v-if="isChooseMode && total>0"
			        category="share"
			        @on-removed="__fetch"
			        @on-collected="__fetch"></status>
			<div class="empty"
			     v-if="!isPrerender && total<=0"
			     @click.stop="goto('党建文库','/index')">
				<img :src="getLocalMduImg('doc','empty-share')" />
				<p>好友没有任何分享哦
					<span class="strong">去看看~</span>
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
		name: "PageOfShare",
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
				this.$http.doc.getFriendSharedDocs().then(resp => {
					const list = resp.result.list;
					list.forEach(item => {
						if (item.infoDocument) item.infoDocument.isChecked = false;
					});
					this.list = list;
					this.total = resp.result.total;
					setTimeout(() => {
						this.isPrerender = false;
					}, 300);
				});
			},
			__append() {
				this.$http.doc
					.getFriendSharedDocs({ page: ++this.page })
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							list.forEach(item => {
								if (item.infoDocument) {
									item.infoDocument.isChecked = false;
								}
							});
							this.list = this.list.concat(list);
						}
					});
			}
		},
		mounted() {
			this.__fetch();
		}
	};
</script>

