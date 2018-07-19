<template>
	<rx-row justify="space-around"
	        align="center">
		<rx-col>
			<rx-btn type="text"
			        plain
			        icon="answer"
			        @on-click.stop="gotoNative('撰写回答','/createAnswer',{questionId:row.id,title:row.question})">写回答</rx-btn>
		</rx-col>
		<rx-col align="right">
			<rx-btn type="text"
			        icon="comment"
			        @on-click.stop="goto('问题详情','/detail',{qid:row.id})">查看{{row.answerCount}}个回答</rx-btn>
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
			}
		}
	};
</script>

