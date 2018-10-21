<style lang="scss">
	.exam-ques-banner {
		width: 100%;
		height: 80px;
		line-height: 80px;
		background: rgba(0, 0, 0, 0.1);
		position: absolute;
		top: 88px;
		left: 0;
		z-index: 10;

		font-size: 28px;
		color: #fff;
	}
</style>

<template>
	<div class="exam-ques-banner">
		<rx-row justify="center"
		        align="center">
			<template v-if="!isFinished">
				<rx-col>
					<span>{{current}}/{{total}}</span>
				</rx-col>
				<rx-col>
					<i class="rx-icon icon-time"></i>
					<span>剩{{remainTime}}</span>
				</rx-col>
				<rx-col>
					<span>答题卡</span>
				</rx-col>
			</template>
			<template v-else>
				<rx-col :span="14"
				        align="right">
					<span>交卷时间：</span><span>{{endTime}}</span>
				</rx-col>
				<rx-col :span="10">
					<span>用时：</span><span>{{costTime}}</span>
				</rx-col>
			</template>
		</rx-row>
	</div>
</template>

<script>
	export default {
		name: "ExamQuesBanner",
		props: {
			current: Number,
			total: Number,
			testTime: [Number, String],
			endTime: String,
			costTime: String,
			isFinished: Boolean
		},
		data() {
			return {
				time: this.testTime
			};
		},
		watch: {
			testTime(val) {
				this.time = val;
			}
		},
		computed: {
			remainTime() {
				if (this.time) {
					return this.time + "分";
				}
			}
		}
	};
</script>

