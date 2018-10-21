<style lang="scss">
	.exam-statusbar {
		color: #fdfeff;
		border-radius: 10px;
		height: 60px;
		line-height: 60px;
		font-size: 32px;
		padding-left: 30px;
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
				default: 2
			}
		},
		computed: {
			styles() {
				const styles = {};
				switch (this.state) {
					case 1:
						styles.backgroundColor = "#999999";
						break;
					case 3:
						styles.backgroundColor = "#0097EE";
						break;
					case 2:
					default:
						styles.backgroundColor = "#F39E37";
						break;
				}

				return styles;
			},
			iconName() {
				switch (this.state) {
					case 1:
						return "rx-icon icon-finish";
					case 3:
						return "rx-icon icon-time";
					case 2:
					default:
						return "rx-icon icon-start";
				}
			},
			text() {
				switch (this.state) {
					case 1:
						return "已结束";
					case 3:
						return "进行中";
					case 2:
					default:
						return "待开始";
				}
			}
		}
	};
</script>