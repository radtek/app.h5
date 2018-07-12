<style lang="sass">
@import "../../assets/modules/score/wc-lottery_records.scss"
</style>

<template>
	<ul class="wrap-records">
		<li v-for="(record,index) in list"
		    :key="index"
		    class="item">
			<p class="title">{{record.goodsTitle}}</p>
			<p class="date">{{record.gotTime | formatDate("yyyy-MM-dd hh:mm")}}</p>
			<a v-if="record.receive"
			   href="javascript:;"
			   class="btn">已到账</a>
			<a v-else
			   href="javascript:;"
			   class="btn unreceive">未领取</a>
		</li>
		<li class="wrap-pager"
		    v-if="list && list.length">
			<rx-btn type="info"
			        plain
			        class="pager-prev"
			        :disabled="!prev"
			        @on-click="onClick('prev',$event)">上一页</rx-btn>
			<rx-btn type="info"
			        plain
			        class="pager-prev"
			        :disabled="!next"
			        @on-click="onClick('next',$event)">下一页</rx-btn>
		</li>
	</ul>
</template>
<script>
	export default {
		name: "LotteryRecords",
		props: {
			list: {
				type: Array,
				default() {
					return [];
				}
			},
			prev: { type: Boolean, default: false },
			next: { type: Boolean, default: true }
		},
		methods: {
			__getStatusText(item) {
				return item.receive === true ? "" : "未领取";
			},
			onClick(direction, event) {
				if (!this[direction]) return false;
				this.$emit("on-pager-changed", direction);
			}
		}
	};
</script>

