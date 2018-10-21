<style lang="scss">
	.exam-rule {
		padding: 67px 45px 53px 43px;
		width: 607px;
		height: 511px;

		.header {
			position: absolute;
			width: 190px;
			top: -26px;
			left: 50%;
			transform: translateX(-50%);
			z-index: 11;
			img {
				width: 100%;
			}
			p {
				width: 190px;
				text-align: center;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: 12px;
				z-index: 12;
				color: #0097ee;
				font-size: 26px;
			}
		}

		.rule-content {
			position: absolute;
			top: 0;
			left: 0;
			color: #fff;
			font-size: 26px;
			font-weight: 500;
			z-index: 20;

			li {
				line-height: 40px;
				~ li {
					margin-top: 30px;
				}
			}
		}
	}
</style>

<template>
	<div class="exam-rule pane-box">
		<div class="header">
			<img :src="getLocalMduImg('exam','rule')" />
			<p>答题规则</p>
		</div>
		<div class="mask"></div>
		<div style="position:relative;">
			<ul class="rule-content">
				<li>
					<label>1.考试时间：</label>
					<span>{{item.startTime|formatDate("yyyy-MM-dd hh:mm")}} 至 <br />{{item.endTime | formatDate("yyyy-MM-dd hh:mm")}}内任选时间完成答题</span>
				</li>
				<li>
					<label>2.答题时长：</label>
					<span>{{item.testTime}}分钟内完成</span>
				</li>
				<li>
					<label>3.考试规则：</label>
					<span>{{item.testRule}}</span>
				</li>
				<li>
					<label>4.题量分数：</label>
					<span>本次测试共{{item.amount}}道题，总分{{item.totalScore}}分，及格分数{{item.passMark}}分</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ExamRule",
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		}
	};
</script>

