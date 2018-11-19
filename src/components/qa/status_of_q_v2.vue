<template>
	<rx-row justify="space-around"
	        align="center">
		<rx-col>
			<rx-btn type="text"
			        icon="answer"
			        @on-click.stop="goAnswer">写{{showText}}</rx-btn>
		</rx-col>
		<rx-col align="right">
			<rx-btn type="text"
			        icon="comment"
			        @on-click.stop="goDetail">查看{{row.answerCount}}个{{showText}}</rx-btn>
		</rx-col>
	</rx-row>
</template>
<script>
	export default {
		name: "StatusOfQV2",
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			},
			isTopic: Boolean
		},
		computed: {
			showText() {
				return this.isTopic ? "回复" : "回答";
			}
		},
		methods: {
			goAnswer() {
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
			},
			goDetail() {
				if (this.isTopic) {
					this.goto("话题详情", "/topic.detail", { qid: this.row.id });
					return;
				}
				this.goto("问题详情", "/detail", { qid: this.row.id });
			}
		}
	};
</script>

