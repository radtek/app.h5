<style lang="scss">
	.exam-statusbar {
		color: #fdfeff;
		border-radius: 8px;
		height: 60px;
		line-height: 60px;
		font-size: 32px;
	}
</style>

<template>
	<div class="exam-statusbar"
	     :style="styles">
		<i :class="iconName"></i>
		<span>{{text}}</span>
	</div>
</template>

<script>
	export default {
		name: "ExamStatusbar",
		props: {
			state: {
				type: Number,
				default: 1
			}
		},
		computed: {
			styles() {
				const styles = {};
				switch (this.state) {
					case 3:
						styles.backgroundColor = "#999999";
						break;
					case 2:
						styles.backgroundColor = "#0097EE";
						break;
					case 1:
					default:
						styles.backgroundColor = "#F39E37";
						break;
				}

				return styles;
			},
			iconName() {
				switch (this.state) {
					case 3:
						return "icon-state-finish";
					case 2:
						return "icon-state-ing";
					case 1:
					default:
						return "icon-state-will";
				}
			},
			text() {
				switch (this.state) {
					case 3:
						return "已结束";
					case 2:
						return "进行中";
					case 1:
					default:
						return "待开始";
				}
			}
		}
	};
</script>