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
			<rx-row :flex="false">
				<rx-col :span="16"
				        v-if="row.answer">
					<span class="content">{{row.answer | overflowContent}}</span>
				</rx-col>
				<rx-col :span="row.answer ?8:24">
					<rx-img :src="row.imgPath[0]"
					        @on-error="onImgErr"
					        ref="rxImg"></rx-img>
				</rx-col>
			</rx-row>
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
			canEdit: { type: Boolean, default: true }
		}
	};
</script>
