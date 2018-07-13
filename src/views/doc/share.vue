<template>
	<section rs-view="my-share">
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
				<rx-skeleton-simple-cell v-if="isPrerender"></rx-skeleton-simple-cell>
				<template v-else>
					<rx-swipeout>
						<doc-item v-for="(doc,index) in list"
						          :key="index"
						          category="share"
						          :is-edit="isChooseMode"
						          :time="doc.createTime"
						          :item="doc"></doc-item>
					</rx-swipeout>
				</template>
			</div>
		</rx-pull>
		<status v-if="isChooseMode && total>0"
		        category="share"
		        @on-removed="__fetch"
		        @on-collected="__fetch"></status>
		<div class="empty"
		     v-if="total<=0"
		     @click.stop="goto('党建文库','/index')">
			<img :src="getLocalMduImg('doc','empty-share')" />
			<p>好友没有任何分享哦
				<span class="strong">去看看~</span>
			</p>
		</div>
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
				this.$http.doc.getFriendSharedDocs().then(resp => {
					const list = resp.result.list;
					list.forEach(item => {
						if (item.infoDocument) item.infoDocument.isChecked = false;
					});
					this.list = list;
					this.total = resp.result.total;
					this.isPrerender = false;
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

