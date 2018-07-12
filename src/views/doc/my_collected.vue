<template>
	<section rs-view="my-collected">
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
			<div class="pane-list"
			     v-if="total>0">
				<rx-skeleton-simple-cell v-if="isPrerender"></rx-skeleton-simple-cell>
				<template v-else>
					<doc-item v-for="(doc,index) in list"
					          :key="index"
					          :item="doc"></doc-item>
				</template>
			</div>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "PageOfMyCollected",
		components: {
			DocItem: () =>
				import(/* webpackChunkName:"wc-item_of_editable_doc" */ "~c/doc/editable_item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		data() {
			return {
				list: [],
				total: 0,
				page: 1,
				isPrerender: true
			};
		}
	};
</script>

