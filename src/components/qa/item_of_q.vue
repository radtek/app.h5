<style lang="sass">
@import "../../assets/modules/qa/item_qa.scss"
</style>

<template>
	<rx-cell class="item-qa q">
		<div slot="header"
		     @click.stop="goto('问题详情','/detail',{qid: row.id})">{{row.question}}</div>
		<template v-if="row.imgPath && row.imgPath.length">
			<span class="content"
			      :class="[{img:row.imgPath && row.imgPath.length}]">{{row.description | overflowContent}}</span>
			<img ref="img"
			     v-if="async"
			     :data-src="row.imgPath[0]"
			     v-lazyimg
			     @error="onImgErr($event)" />
			<img v-else
			     :src="row.imgPath[0]"
			     @error="onImgErr($event)" />
		</template>
		<template v-else>
			{{row.description | overflowContent}}
		</template>
		<template slot="footer">
			<status v-if="row.isPublish === 1"
			        :row="row"
			        :can-answer="canAnswer && row.isPublish === 1"></status>
			<status3 v-else
			         :row="row"></status3>
		</template>
	</rx-cell>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "ItemOfQ",
		components: {
			Status: () =>
				import(/* webpackChunkName:"wc-status_of_q" */ "~c/qa/status_of_q.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Status3: () =>
				import(/* webpackChunkName:"wc-status_of_q_v3" */ "~c/qa/status_of_q_v3.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			},
			async: Boolean,
			canAnswer: { type: Boolean, default: true }
		},
		data() {
			return {};
		}
	};
</script>
