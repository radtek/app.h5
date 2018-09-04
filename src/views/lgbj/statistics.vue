<style lang="scss">
	@import "../../assets/modules/lgbj/wc-table.scss";

	[rs-view="statistics"] {
		overflow-x: hidden;
		padding-bottom: 30px;

		.rx-card {
			&_header {
				color: #999;
				font-size: 32px;
				border-bottom: none;
				margin-top: 20px;
				margin-bottom: 20px;

				span {
					vertical-align: middle;
				}

				a {
					font-size: 24px;
					color: #ccc;
					margin-left: 24px;
					vertical-align: middle;
				}
			}

			&_body {
				padding: 0 0 30px 0 !important;
				margin-left: 48px;
				margin-right: 48px;
				border-bottom: 1px solid #e6e6e6;
			}
		}

		.wrap-retire {
			margin: 60px 86px 100px 86px;
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
				color: #333;
				font-size: 24px;
				top: 64px;
				&.red {
					right: -55px;
				}

				&.green {
					left: -62px;
				}
			}
			.circle {
				width: 64px;
				height: 64px;
				border-radius: 50%;
				line-height: 64px;
				// border: 10px solid #f9f9f9
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

		.wrap-age {
			li {
				line-height: 56px;
				position: relative;
				margin-bottom: 24px;

				> label {
					float: left;
					width: 100px;
					padding-right: 38px;
					vertical-align: middle;
					color: #333;
					font-size: 24px;
				}

				.progress {
					margin-left: 100px;
					position: relative;
					background-color: #f5f5f5;
					border-radius: 4px;

					.progress-bar {
						position: absolute;
						top: 0;
						left: 0;
						z-index: 2;
						background-color: #1f9cfc;
						height: 56px;
						border-top-left-radius: 4px;
						border-bottom-left-radius: 4px;
					}

					.legend {
						text-align: right;
						margin-right: 24px;
						font-size: 24px;
						color: #999;
					}
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
				<router-link :to="{path:'/search',query:{mode:'street'}}">详情></router-link>
			</template>
			<v-chart ref="sex"
			         v-if="sexData.length"
			         :data="sexData"
			         :width="suitableWidth"
			         :height="180"
			         :padding="[10, 'auto']">
				<v-tooltip disabled />
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
				<router-link :to="{path:'/detail_of_statistics',query:{mode:'age'}}">详情></router-link>
			</template>
			<ul class="wrap-age">
				<li v-for="(age,index) in ageData"
				    :key="index">
					<label>{{age.title}}</label>
					<div class="progress">
						<div class="progress-bar"
						     :style="{width:age.percent}"></div>
						<div class="legend">
							<span>{{$rxUtils.formatThousandth(age.num)}}人</span>
							<span>{{age.percent}}</span>
						</div>
					</div>
				</li>
			</ul>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>文化程度</span>
				<router-link :to="{path:'/detail_of_statistics',query:{mode:'education'}}">详情></router-link>
			</template>
			<v-chart ref="education"
			         :width="suitableWidth"
			         v-if="educationData.length"
			         :data="educationData">
				<v-bar />
				<v-tooltip />
				<v-scale y
				         field="percent"
				         :alias="educationYOptions.alias"
				         :formatter="educationYOptions.formatter" />
				<v-guide v-for="(option,index) in educationHtmlOptions"
				         :key="index"
				         type="html"
				         :options="option" />
			</v-chart>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>身体情况</span>
				<router-link :to="{path:'/detail_of_statistics',query:{mode:'health'}}">详情></router-link>
			</template>
			<!-- <v-chart ref="health"
			         :width="suitableWidth"
			         v-if="healthData.length"
			         :data="healthData">
				<v-bar />
				<v-tooltip :show-item-marker="false" />
			</v-chart> -->
			<v-chart ref="health"
			         v-if="healthData.length"
			         :data="healthData"
			         :width="suitableWidth"
			         :height="180"
			         :padding="[10, 'auto']">
				<v-tooltip disabled />
				<v-pie :radius="0.8"
				       :inner-radius="0.7"
				       series-field="name"
				       :colors="['#03C162','#1F9CFC','#FF3766']" />
				<v-legend :options="healthLegendOptions" />
			</v-chart>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>离（退）休情况</span>
				<router-link :to="{path:'/detail_of_statistics',query:{mode:'retire'}}">详情></router-link>
			</template>
			<div class="wrap-retire"
			     v-if="retireData.length">
				<div class="circle green">{{retireData[0].name}}</div>
				<div class="circle red">{{retireData[1].name}}</div>
				<p class="tooltips green">
					{{retireData[0].percent}}（{{$rxUtils.formatThousandth(retireData[0].num)}}人）
				</p>
				<p class="tooltips red">
					（{{$rxUtils.formatThousandth(retireData[1].num)}}人）{{retireData[1].percent}}
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
				<!-- <router-link :to="{path:'/list_of_hobby'}">详情></router-link> -->
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
							{{$rxUtils.formatThousandth(it.num)}}
						</td>
					</tr>
				</tbody>
			</table>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>专业特长</span>
				<!-- <router-link :to="{path:'/list_of_special'}">详情></router-link> -->
			</template>
			<table>
				<thead>
					<tr>
						<th width="15%">排名</th>
						<th width="55%">特长名称</th>
						<th width="30%">选择人次</th>
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
							{{$rxUtils.formatThousandth(it.num)}}
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
					position: ["50%", "45%"]
				},
				sexLegendOptions: {
					position: "right",
					nameStyle: {
						fill: "#333"
					}, // 图例项 key 值文本样式
					valueStyle: {
						fill: "#333" // 图例项 value 值文本样式
					},
					itemFormatter: val => {
						return (
							val +
							"  " +
							Math.floor(this.sexMap[val].percent) +
							"%" +
							" " +
							this.$rxUtils.formatThousandth(this.sexMap[val].num) +
							"人"
						);
					}
				},
				suitableWidth: 300,
				hobbyData: [],
				specialData: [],
				retireData: [],
				ageData: [],
				educationData: [],
				educationHtmlOptions: [],
				educationYOptions: {
					alias: "文化程度",
					formatter(val) {
						return val + "%";
					}
				},
				healthData: [],
				healthMap: {},
				healthLegendOptions: {
					position: "right",
					itemFormatter: val => {
						return (
							val +
							"  " +
							Math.floor(this.healthMap[val].percent) +
							"%" +
							" " +
							this.$rxUtils.formatThousandth(
								this.healthMap[val].num
							) +
							"人"
						);
					}
				}
			};
		},
		created() {
			this.suitableWidth = window.innerWidth - 40;
		},
		mounted() {
			this.$http.lgbj
				.getStatisticsOfSex()
				.then(data => {
					let total = 0;
					data.result.forEach(it => {
						total += it.value;
					});
					this.sexData = data.result.map(it => {
						const percent = Math.floor(it.value * 100) / total;
						this.sexMap[it.name] = {
							percent,
							num: it.value
						};
						return {
							name: it.name,
							percent
						};
					});

					this.sexHtmlOptions.html = `<div style="width: 100px;height: 40px;text-align: center;"><div style="font-size: 12px">合计</div><div style="color:#1F9CFC;padding-top:15px;font-size: 16px">${this.$rxUtils.formatThousandth(
						total
					)}人</div></div>`;

					this.$nextTick(() => {
						this.$refs.sex.rerender();
					});
				})
				.catch(() => {});

			this.$http.lgbj
				.getStatisticsOfAge()
				.then(data => {
					let total = 0;
					data.result.xLocation.forEach(it => {
						total += it;
					});

					this.ageData = data.result.yLocation.map((it, index) => {
						const num = data.result.xLocation[index];
						return {
							title: it,
							num,
							percent: Math.floor((num * 100) / total) + "%"
						};
					});
				})
				.catch(() => {});

			this.$http.lgbj.getStatisticsOfEducation().then(data => {
				let total = 0;
				data.result.yLocation.forEach(it => {
					total += it;
				});

				this.educationData = data.result.xLocation.map((it, index) => {
					const percent = Math.floor(
						(data.result.yLocation[index] * 100) / total
					);

					const name =
						it.length > 2 ? it.substring(0, 2) + it.substring(2) : it;

					if (percent > 0) {
						this.educationHtmlOptions.push({
							position: [name, percent],
							html:
								'<div style="background: #1890ff;font-size: 10px;color: #fff;padding: 2px;text-align: center;border-radius: 2px;">' +
								percent +
								"%</div>",
							alignX: "center",
							alignY: "bottom",
							offsetY: -8
						});
					}

					return {
						name,
						percent
					};
				});

				this.$nextTick(() => {
					this.$refs.education.rerender();
				});
			});

			this.$http.lgbj
				.getStatisticsOfHealth()
				.then(data => {
					let total = 0;
					data.result.forEach(it => {
						total += it.value;
					});
					this.healthData = data.result.map(it => {
						const percent = Math.floor(it.value * 100) / total;
						this.healthMap[it.name] = {
							percent,
							num: it.value
						};
						return {
							name: it.name,
							percent
						};
					});

					this.$nextTick(() => {
						this.$refs.health.rerender();
					});
				})
				.catch(() => {});

			this.$http.lgbj
				.getStatisticsOfRetire()
				.then(data => {
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
				})
				.catch(() => {});

			this.$http.lgbj
				.getStatisticsOfHobby()
				.then(data => {
					this.hobbyData = data.result;
				})
				.catch(() => {});

			this.$http.lgbj
				.getStatisticsOfSpecial()
				.then(data => {
					this.specialData = data.result;
				})
				.catch(() => {});
		}
	};
</script>