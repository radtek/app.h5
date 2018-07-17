<style lang="sass">
@import "../../assets/modules/qa/item_qa.scss"
</style>
<template>
	<rx-cell class="item-qa a">
		<div slot="header"
		     @click.stop="goto('回答详情','/answer',{
				qid: row.infoQuestion.id,
				aid:row.id
			})">{{row.infoQuestion.question}}</div>
		<template v-if="row.imgPath && row.imgPath.length">
			<span class="content"
			      :class="[{img:row.imgPath && row.imgPath.length}]">{{row.answer | overflowContent}}</span>
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
			<div>
				{{row.answer | overflowContent}}
			</div>
		</template>
		<template slot="footer">
			<status v-if="row.isPublished === 1"
			        :row="row"
			        :ques-info="row.infoQuestion"
			        :theme="2"
			        :can-edit="canEdit"></status>
			<status3 v-else
			         :row="row"></status3>
		</template>
	</rx-cell>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "ItemOfA",
		components: {
			Status: () =>
				import(/* webpackChunkName:"wc-status_of_a" */ "~c/qa/status_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Status3: () =>
				import(/* webpackChunkName:"wc-status_of_a_v3" */ "~c/qa/status_of_a_v3.vue").then(
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
			canEdit: { type: Boolean, default: true }
		}
	};
</script>
