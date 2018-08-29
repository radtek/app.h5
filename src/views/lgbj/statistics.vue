<style lang="scss">
	[rs-view="statistics"] {
		overflow-x: hidden;

		.rx-card {
			&_header {
				color: #999;
				font-size: 32px;
				border-bottom: none;
				margin-top: 20px;
				margin-bottom: 20px;
			}
		}

		table {
			margin-left: 20px;
			width: 100%;
			border-bottom: 1px solid #e6e6e6;
			thead {
				border-top: 1px solid #e6e6e6;
				border-bottom: 1px solid #e6e6e6;

				th {
					color: #666;
					font-size: 24px;
					padding-top: 22px;
					padding-bottom: 22px;
					text-align: center;
				}
			}
			td {
				padding-top: 20px;
				padding-bottom: 20px;
				text-align: center;
			}
			img {
				width: 48px;
				height: 48px;
			}
		}

		.wrap-retire {
			margin-left: 56px;
			margin-right: 56px;
			text-align: center;
			position: relative;

			&:after,
			&:before {
				display: table;
				clear: both;
				content: "";
			}

			.tooltips {
				position: absolute;
			}
			.circle {
				width: 64px;
				height: 64px;
				border-radius: 50%;
				line-height: 64px;
				color: #fff;
				position: absolute;
				z-index: 1;
				top: -20px;

				&.red {
					background-color: #fc911f;
					right: -55px;
				}

				&.green {
					background-color: #03c162;
					left: -62px;
				}
			}

			.progress {
				float: left;
				height: 24px;

				&.red {
					background-color: #fc911f;
				}

				&.green {
					background-color: #03c162;
				}
			}
		}
	}
</style>


<template>
	<section rs-view="statistics">
		<rx-card>
			<template slot="header">
				<span>基本情况</span>
			</template>
			<v-chart :data="sexData"
			         :width="300"
			         :padding="[10, 'auto']">
				<v-tooltip disabled />
				<v-scale y
				         :options="yOptions" />
				<v-pie :radius="0.8"
				       :inner-radius="0.7"
				       series-field="name"
				       :colors="['#1F9CFC','#FF3766']" />
				<v-legend :options="sexLegendOptions" />
				<v-guide type="html"
				         :options="sexHtmlOptions" />
			</v-chart>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>年龄分布</span>
			</template>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>文化程度</span>
			</template>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>离（退）休情况</span>
			</template>
			<div class="wrap-retire"
			     v-if="retireData.length">
				<div class="circle green">{{retireData[0].name}}</div>
				<div class="circle red">{{retireData[1].name}}</div>
				<p class="tooltips">
					{{retireData[0].percent}}({{retireData[0].num}}人)
				</p>
				<p class="tooltips">
					({{retireData[1].num}}人){{retireData[1].percent}}
				</p>
				<div class="progress green"
				     :style="{width:retireData[0].percent}"></div>
				<div class="progress red"
				     :style="{width:retireData[1].percent}"></div>
			</div>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>兴趣爱好</span>
			</template>
			<table>
				<thead>
					<tr>
						<th width="15%">排名</th>
						<th width="55%">兴趣名称</th>
						<th width="30%">选择人次</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(it,index) in hobbyData"
					    :key="index">
						<td>
							<template v-if="index<=2">
								<img :src="getLocalMduImg('lgbj',index===0?'first':(index==1?'second':'third'))" />
							</template>
							<template v-else>
								{{index+1}}
							</template>
						</td>
						<td>
							{{it.message}}
						</td>
						<td>
							{{it.num}}
						</td>
					</tr>
				</tbody>
			</table>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>专业特长</span>
			</template>
			<table>
				<thead>
					<tr>
						<th>排名</th>
						<th>特长名称</th>
						<th>选择人次</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(it,index) in specialData"
					    :key="index">
						<td>
							<template v-if="index<=2">
								<img :src="getLocalMduImg('lgbj',index===0?'first':(index==1?'second':'third'))" />
							</template>
							<template v-else>
								{{index+1}}
							</template>
						</td>
						<td>
							{{it.message}}
						</td>
						<td>
							{{it.num}}
						</td>
					</tr>
				</tbody>
			</table>
		</rx-card>
	</section>
</template>

<script>
	export default {
		name: "PageOfStatistics",
		data() {
			return {
				sexData: [],
				sexMap: {},
				sexHtmlOptions: {
					position: ["50%", "45%"],
					html: `<div style="width: 100px;height: 40px;text-align: center;"><div style="font-size: 16px">合计</div><div style="font-size: 24px">133.08 人</div></div>`
				},
				sexLegendOptions: {
					position: "right",
					itemFormatter(val) {
						return (
							val +
							"  " +
							this.sexMap[val].percent +
							" " +
							this.sexMap[val].num +
							"人"
						);
					}
				},
				yOptions: {
					formatter(val) {
						return val * 100 + "%";
					}
				},

				hobbyData: [],
				specialData: [],
				retireData: []
			};
		},
		mounted() {
			this.$http.lgbj.getStatisticsOfSex().then(data => {
				let total = 0;
				data.result.forEach(it => {
					total += it.value;
				});
				this.sexData = data.result.map(it => {
					const percent = (it.value / total) * 100;
					this.sexMap[it.name] = {
						percent,
						num: it.value
					};
					return {
						name: it.name,
						percent
					};
				});
			});

			this.$http.lgbj.getStatisticsOfRetire().then(data => {
				let total = 0;
				data.result.forEach(it => {
					if (it.retire === "退休" || it.retire === "离休") {
						total += it.num;
					}
				});
				const arr = [];
				data.result.map(it => {
					if (it.retire === "退休") {
						arr[0] = {
							name: it.retire,
							num: it.num,
							percent: Math.floor((it.num * 100) / total) + "%"
						};
					} else if (it.retire === "离休") {
						arr[1] = {
							name: it.retire,
							num: it.num,
							percent: Math.floor((it.num * 100) / total) + "%"
						};
					}
				});

				this.retireData = arr;
			});

			this.$http.lgbj.getStatisticsOfHobby().then(data => {
				this.hobbyData = data.result;
			});

			this.$http.lgbj.getStatisticsOfSpecial().then(data => {
				this.specialData = data.result;
			});
		}
	};
</script>