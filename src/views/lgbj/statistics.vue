<style lang="scss">
	[rs-view="statistics"] {
		overflow-x: hidden;
	}
</style>


<template>
	<section rs-view="statistics">
		<rx-card>
			<template slot="header">
				<span>基本情况</span>
			</template>
			<v-chart :data="data2"
			         :width="300"
			         :padding="[10, 'auto']">
				<v-tooltip disabled />
				<v-scale y
				         :options="yOptions" />
				<v-pie :radius="0.8"
				       :inner-radius="0.7"
				       series-field="name"
				       :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
				<v-legend :options="legendOptions" />
				<v-guide type="html"
				         :options="htmlOptions" />
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
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>兴趣爱好</span>
			</template>
		</rx-card>
		<rx-card>
			<template slot="header">
				<span>专业特长</span>
			</template>
		</rx-card>
	</section>
</template>

<script>
	const data = [
		{ name: "股票类", percent: 83.59, a: "1" },
		{ name: "债券类", percent: 2.17, a: "1" },
		{ name: "现金类", percent: 14.24, a: "1" }
	];

	const map = {};
	data.map(obj => {
		map[obj.name] = obj.percent + "%";
	});
	export default {
		name: "PageOfStatistics",
		data() {
			return {
				data2: data,
				htmlOptions: {
					position: ["50%", "45%"],
					html: `<div style="width: 100px;height: 40px;text-align: center;">
																											<div style="font-size: 16px">总资产</div>
																											<div style="font-size: 24px">133.08 亿</div>
																											</div>`
				},
				legendOptions: {
					position: "right",
					itemFormatter(val) {
						return val + "  " + map[val];
					}
				},
				yOptions: {
					formatter(val) {
						return val * 100 + "%";
					}
				}
			};
		}
	};
</script>