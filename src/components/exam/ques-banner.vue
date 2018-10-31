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
				<rx-col v-if="usage==='ques'">
					<span>{{current}}/{{total}}</span>
				</rx-col>
				<rx-col>
					<i class="rx-icon icon-time"></i>
					<span>剩{{time}}</span>
				</rx-col>
				<rx-col v-if="usage==='ques'">
					<span @click="handleToCard">答题卡</span>
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
			usage: { type: String, default: "ques" },
			current: Number,
			total: Number,
			testTime: [Number, String],
			endTime: String,
			costTime: String,
			isFinished: Boolean
		},
		data() {
			return {
				timeout: null,
				time: "",
				numberTime: this.testTime
			};
		},
		watch: {
			testTime(val) {
				this.numberTime = val;
				this.__calc();
			}
		},
		methods: {
			handleToCard() {
				this.endInterval();
				this.$emit("to-card");
			},
			endInterval() {
				if (this.timeout) {
					clearTimeout(this.timeout);
				}
			},
			__calc() {
				this.numberTime -= 1000;

				if (this.numberTime <= 0) {
					this.time = "0分0秒";
					this.$emit("time-end");
					return;
				}

				this.time =
					parseInt(this.numberTime / 1000 / 60, 10) +
					"分" +
					parseInt((this.numberTime % (1000 * 60)) / 1000, 10) +
					"秒";

				this.timeout = setTimeout(() => {
					this.__calc();
				}, 1000);
			}
		}
	};
</script>

