<style lang="sass">
@import "../../assets/modules/score/view-lottery.scss"
</style>

<template>
	<section rs-view="lottery">
		<turntable></turntable>
		<rolling :unit-id="unitid"></rolling>
		<div class="pane">
			<h3 class="title">我的中奖
				<span class="right-tip">已中奖{{recordsTotal}}次</span>
			</h3>
			<records :list="records"
			         :prev="recordsPageIndex>1"
			         :next="recordsNeedNext"
			         @on-pager-changed="handleRecordsPagerChanged"></records>
		</div>
		<div class="pane">
			<h3 class="title">活动规则</h3>
			<rules :unit-id="unitid"></rules>
		</div>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfLottery",
		components: {
			Turntable: () =>
				import(/* webpackChunkName:"wc-lottery_turntable" */ "~c/score/lottery_turntable.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Records: () =>
				import(/* webpackChunkName:"wc-lottery_records" */ "~c/score/lottery_records.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Rules: () =>
				import(/* webpackChunkName:"wc-lottery_rules" */ "~c/score/lottery_rules.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Rolling: () =>
				import(/* webpackChunkName:"wc-lottery_rolling" */ "~c/score/lottery_rolling.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				records: [],
				recordsTotal: 0,
				recordsPageIndex: 1,
				recordsPageSize: 10
			};
		},
		computed: {
			recordsNeedNext() {
				const lastIndex = this.recordsTotal / this.recordsPageSize;
				return lastIndex > this.recordsPageIndex;
			}
		},
		methods: {
			__fetchRecords() {
				return this.$http.lottery
					.getMyLotteriedRecords({
						unitId: this.unitid,
						pageNo: this.recordsPageIndex
					})
					.then(res => {
						this.records = res.record;
						this.recordsTotal = res.total;
					});
			},
			handleRecordsPagerChanged(direction) {
				if (direction === "prev") {
					this.recordsPageIndex -= 1;
				} else {
					this.recordsPageIndex += 1;
				}
				this.__fetchRecords();
			}
		},
		created() {
			this.getQS("unitid");
			this.__fetchRecords();
		}
	};
</script>
