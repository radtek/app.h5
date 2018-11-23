<style lang="sass">
@import "../../assets/modules/qa/item_qa.scss"
</style>

<template>
	<rx-cell class="item-qa q_a">
		<template slot="header">
			<div class="title"
			     @click.stop="go">{{row.question}}</div>
		</template>
		<template v-if="row.infoAnswer">
			<div @click.stop="onAnswerDetailClick">
				<template v-if="row.infoAnswer.imgPath && row.infoAnswer.imgPath.length">
					<rx-row :flex="false">
						<rx-col :span="16"
						        v-if="row.infoAnswer.answer">
							<span class="content">{{row.infoAnswer.answer | removeHtmlTag | overflowContent}}</span>
						</rx-col>
						<rx-col :span="row.infoAnswer.answer ?8:24"
						        align="right">
							<rx-img :src="row.infoAnswer.imgPath[0]"
							        :range-of-error="0.26"
							        @on-error="onImgErr"
							        ref="rxImg"></rx-img>
						</rx-col>
					</rx-row>
				</template>
				<template v-else>
					{{row.infoAnswer.answer | removeHtmlTag | overflowContent}}
				</template>
			</div>
		</template>
		<template slot="footer">
			<status :row="row"
			        :show-tag="showTag"
			        :can-answer="canAnswer"
			        :is-topic="isTopic"></status>
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
			showTag: { type: Boolean, default: true },
			isTopic: Boolean,
			async: Boolean,
			canAnswer: { type: Boolean, default: true }
		},
		methods: {
			go() {
				if (this.isTopic) {
					this.goto("话题详情", "/topic.detail", { qid: this.row.id });
					return;
				}
				this.goto("问题详情", "/detail", { qid: this.row.id });
			},
			onAnswerDetailClick() {
				this.goto("回答详情", "/answer", {
					qid: this.row.id,
					aid: this.row.infoAnswer.id
				});
			}
		}
	};
</script>

