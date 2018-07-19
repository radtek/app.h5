<style lang="sass">
@import "../../assets/modules/qa/item_qa.scss"
</style>

<template>
	<rx-cell class="item-qa q_a">
		<div slot="header"
		     class="title"
		     @click.stop="goto('问题详情','/detail',{qid: row.id})">{{row.question}}</div>
		<template v-if="row.infoAnswer">
			<div @click.stop="onAnswerDetailClick">
				<template v-if="row.infoAnswer.imgPath && row.infoAnswer.imgPath.length">
					<rx-row :flex="false">
						<rx-col :span="16"
						        v-if="row.infoAnswer.answer">
							<span class="content">{{row.infoAnswer.answer | overflowContent}}</span>
						</rx-col>
						<rx-col :span="row.infoAnswer.answer ?8:24"
						        align="right">
							<!-- <rx-img-crop ref="imgCrop"
							             :src="row.infoAnswer.imgPath[0]"
							             @on-error="onImgErr"></rx-img-crop> -->
							<img ref="img"
							     v-if="async"
							     :data-src="row.infoAnswer.imgPath[0]"
							     v-lazyimg
							     @error="onImgErr($event)" />
							<img v-else
							     :src="row.infoAnswer.imgPath[0]"
							     @error="onImgErr($event)" />
						</rx-col>
					</rx-row>
				</template>
				<template v-else>
					{{row.infoAnswer.answer | overflowContent}}
				</template>
			</div>
		</template>
		<template slot="footer">
			<status :row="row"
			        :can-answer="canAnswer"></status>
		</template>
	</rx-cell>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "ItemOfQA",
		components: {
			Status: () =>
				import(/* webpackChunkName:"wc-status_of_q" */ "~c/qa/status_of_q.vue").then(
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
		methods: {
			onAnswerDetailClick() {
				this.goto("回答详情", "/answer", {
					qid: this.row.id,
					aid: this.row.infoAnswer.id
				});
			}
		},
		mounted() {
			// this.broadcast("RxImgCrop", "fn.load");
		}
	};
</script>

