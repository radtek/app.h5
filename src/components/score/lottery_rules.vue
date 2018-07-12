<style lang="sass">
@import "../../assets/modules/score/wc-lottery_rules.scss"
</style>

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
				.getLotteryRules({ unitId: this.unitId })
				.then(res => {
					this.rules = res.rulers;
				});
		}
	};
</script>
