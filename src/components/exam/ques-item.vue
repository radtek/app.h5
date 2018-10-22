<style lang="scss">
	.exam-ques-item {
		.content {
			padding: 75px 44px 73px 44px;
			border-radius: 20px;
			border: 1px solid #fff;
			color: #fff;

			.title {
				font-size: 32px;
				font-weight: bold;
				line-height: 48px;
			}

			.options {
				margin-top: 48px;
				.rx-radio-group-item {
					display: block;
					margin-bottom: 16px;
					font-size: 28px;
				}
				.rx-radio-inner {
					width: 30px;
					height: 30px;
					border: none;
					&:after {
						margin: 0;
						width: 22px;
						height: 22px;
						top: 2px;
						left: 2px;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="exam-ques-item pane-box">
		<div class="mask"></div>
		<div class="content">
			<p class="title">{{index}}.{{item.title}}</p>
			<div class="options">
				<rx-radio-group v-model="currentSelected"
				                @on-change="onChange">
					<rx-radio v-for="(it,index) in item.ans"
					          :key="index"
					          :true-value="it.id"
					          :label="it.answerTag+'.'+it.answerContent"></rx-radio>
				</rx-radio-group>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ExamQuesItem",
		props: {
			taskId: [String, Number],
			index: Number,
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				currentSelected: ""
			};
		},
		watch: {
			item: {
				deep: true,
				handler() {
					if (this.item.selected && this.item.selected.length) {
						const selected = this.item.ans.filter(
							it => it.id === this.item.selected[0]
						);
						if (selected && selected.length) {
							this.currentSelected =
								selected[0].answerTag +
								"." +
								selected[0].answerContent;
						}
					} else {
						this.currentSelected = "";
					}
				}
			}
		},
		methods: {
			onChange({ checked, curValue }) {
				if (checked) {
					this.item.selected = [curValue];
				}
			}
		}
	};
</script>

