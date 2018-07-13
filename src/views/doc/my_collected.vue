<template>
	<section rs-view="my-collected">
		<rx-pull ref="pull"
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
			<div class="pane-list"
			     v-if="total>0">
				<rx-skeleton-simple-cell v-if="isPrerender"></rx-skeleton-simple-cell>
				<template v-else>
					<rx-swipeout>
						<doc-item v-for="(doc,index) in list"
						          :key="index"
						          category="collect"
						          :is-edit="isChooseMode"
						          :can-collect="false"
						          :time="doc.createTime"
						          :item="doc"></doc-item>
					</rx-swipeout>
				</template>
			</div>
		</rx-pull>
		<status v-if="isChooseMode && total>0"
		        category="collect"
		        @on-removed="__fetch"
		        @on-collected="__fetch"></status>
		<div class="empty"
		     v-if="total<=0"
		     @click.stop="goto('党建文库','/index')">
			<img :src="getLocalMduImg('doc','empty-collect')" />
			<p>您还没有收藏哦，去看看</p>
		</div>
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
		data() {
			return {
				list: [],
				total: 0,
				page: 1,
				isPrerender: true
			};
		},
		methods: {
			__fetch() {
				this.page = 1;
				this.$http.doc.getUserCollectedDocs().then(resp => {
					const list = resp.result.list;
					list.forEach(item => {
						item.isChecked = false;
					});
					this.list = list;
					this.total = resp.result.total;
					this.isPrerender = false;
				});
			},
			__append() {
				this.$http.doc
					.getUserCollectedDocs({ page: ++this.page })
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							list.forEach(item => {
								item.isChecked = false;
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

