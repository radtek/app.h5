<template>
	<ol class="wrap-rules">
		<li v-for="(rule,index) in rules"
		    :key="index">
			{{index+1}}. {{rule}}
		</li>
	</ol>
</template>
<script>
	export default {
		name: "LotteryRules",
		props: {
			unitId: [Number, String]
		},
		data() {
			return { rules: [] };
		},
		mounted() {
			this.$http.lottery
				.getLotteryRules({ unitId: this.unitid })
				.then(res => {
					this.rules = res.rulers;
				});
		}
	};
</script>
