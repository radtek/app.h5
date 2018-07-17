<template>
	<rx-row justify="start"
	        align="center"
	        :class="[{'can-answer':canAnswer}]">
		<rx-col v-if="canAnswer">
			<rx-btn type="text"
			        @on-click.stop="gotoNative('撰写回答','createAnswer',{questionId: row.id,title: row.question})">回答</rx-btn>
		</rx-col>
		<rx-col>{{row.answerCount || 0}}人回答·{{supportText}}</rx-col>
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
			canAnswer: Boolean
		},
		computed: {
			supportText() {
				return !this.row.collectionCount || this.row.collectionCount === 0
					? "暂无收藏"
					: `${this.row.collectionCount}人收藏`;
			}
		}
	};
</script>
