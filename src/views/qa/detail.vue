<template>
	<section rs-view="detail">
		<rx-pull ref="pull"
		         :down="down"
		         :up="up"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<div class="pane-question">

			</div>
			<div class="pane-answer">
				<template v-if="total>0">
					<answer-item v-for="(answer,index) in list"
					             :key="index"
					             :row="answer">
					</answer-item>
				</template>
			</div>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "PageOfDetail",
		components: {
			answerItem: () =>
				import(/* webpackChunkName:"wc-item_of_a" */ "~c/qa/item_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		data() {
			return {
				list: [],
				total: 0,
				page: 1
			};
		},
		methods: {
			__fetch() {},
			__append() {}
		},
		created() {}
	};
</script>

