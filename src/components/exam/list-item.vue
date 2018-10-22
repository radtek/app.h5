<style lang="scss">
	.exam-item {
		position: relative;
		background: #fff;
		box-shadow: 0px 0px 0px 0px rgba(102, 102, 102, 0.15);
		border-radius: 8px;
		padding: 30px;

		.top-right-news {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
			width: 68px;
			height: 65px;
		}

		.header {
			position: relative;
			.name {
				font-weight: bold;
				font-size: 32px;
				color: #333;
				margin: 0;
			}

			.count {
				position: absolute;
				font-size: 22px;
				font-weight: 500;
				color: #999;
				top: 5px;
				right: 15px;
			}
		}
		.content {
			margin-top: 39px;
			font-size: 26px;
			color: #999;
			line-height: 1;

			li {
				~ li {
					margin-top: 20px;
				}
			}
		}

		.score {
			position: absolute;
			bottom: 90px;
			right: 45px;
			font-size: 32px;
			z-index: 1;
			line-height: 1;

			&.finished {
				color: #999;
				font-weight: bold;
			}

			&.unexam,
			.unexam {
				color: #ff3254;
			}
			.num {
				font-size: 60px;
			}
		}
	}
</style>

<template>
	<li class="exam-item"
	    @click.stop="handleClick">
		<img v-if="item.answerState === 0 && item.state !== 1"
		     :src="getLocalMduImg('exam','news')"
		     class="top-right-news" />
		<div class="header">
			<h1 class="name">{{item.name}}</h1>
			<span class="count">共{{item.amount||0}}题</span>
		</div>
		<ul class="content">
			<li>
				<label>答题时长：</label>
				<span>{{item.testTime || 0}}分钟</span>
			</li>
			<li>
				<label>考试状态：</label>
				<span :style="stateStyle">{{stateText}}</span>
			</li>
			<li>
				<label>{{item.startTime | formatDate("yyyy-MM-dd hh:mm")}} 至 {{item.endTime | formatDate("yyyy-MM-dd hh:mm")}}</label>
			</li>
		</ul>
		<template v-if="item.state!==2">
			<span class="score"
			      :class="[{[`finished`]:item.state ===1,[`unexam`]:item.state === 3}]"
			      v-if="item.answerState===0">未答</span>
			<p class="score"
			   :class="[{[`finished`]:item.state ===1}]"
			   v-else>
				<span :class="[{[`unexam`]:item.state === 3}]"
				      v-if="item.score === '未答' ">未答</span>
				<template v-else>
					<span class="num">{{parseInt(item.score,10)}}</span>分
				</template>
			</p>
		</template>
	</li>
</template>
<script>
	export default {
		name: "ExamItem",
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		computed: {
			stateText() {
				switch (this.item.state) {
					case 1:
						return "已结束";
					case 3:
						return "进行中";
					case 2:
					default:
						return "待开始";
				}
			},
			stateStyle() {
				const styles = {};
				switch (this.item.state) {
					case 1:
						styles.color = "#999999";
						break;
					case 3:
						styles.color = "#0097EE";
						break;
					case 2:
					default:
						styles.color = "#F39E37";
						break;
				}

				return styles;
			}
		},
		methods: {
			handleClick() {
				if (this.item.state !== 1) {
					this.item.answerState = 1;
					this.$http.exam.updateAnswerState({
						taskId: this.item.id,
						userId: this.authInfo.userId
					});
				}
				this.$router.push({
					path: "/info",
					query: {
						taskId: this.item.id,
						userId: this.authInfo.userId,
						isin:
							this.item.answerState !== 0 &&
							this.item.score !== "未答"
								? 1
								: 0
					}
				});
			}
		}
	};
</script>
