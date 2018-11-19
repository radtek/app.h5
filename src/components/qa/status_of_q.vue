<template>
	<rx-row justify="start"
	        align="center"
	        :class="[{'can-answer':canAnswer,'has-tag':showTag}]">
		<rx-col v-if="canAnswer || showTag"
		        :class="[{'only-tag':showTag && !canAnswer,'only-answer':!showTag && canAnswer,'has':showTag && canAnswer}]">
			<span v-if="showTag"
			      :class="['tag',{'topic':isTopic}]">{{isTopic?'话题':'问答'}}</span>
			<rx-btn type="text"
			        v-if="canAnswer"
			        @on-click.stop="go">{{showText}}</rx-btn>
		</rx-col>
		<rx-col>{{row.answerCount || 0}}人{{showText}}·{{supportText}}</rx-col>
	</rx-row>
</template>
<script>
	export default {
		name: "StatusOfQ",
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			},
			showTag: { type: Boolean, default: true },
			canAnswer: Boolean,
			isTopic: Boolean
		},
		computed: {
			showText() {
				return this.isTopic ? "回复" : "回答";
			},
			supportText() {
				return !this.row.collectionCount || this.row.collectionCount === 0
					? "暂无收藏"
					: `${this.row.collectionCount}人收藏`;
			}
		},
		methods: {
			go() {
				if (this.isTopic) {
					this.gotoNative("回复话题", "createAnswer", {
						questionId: this.row.id,
						title: this.row.question,
						topicFlag: this.row.topicTag
					});
					return;
				}
				this.gotoNative("撰写回答", "createAnswer", {
					questionId: this.row.id,
					title: this.row.question
				});
			}
		}
	};
</script>
