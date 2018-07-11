<template>
	<div :class="classes"
	     v-html="text">
	</div>
</template>

<script>
export default {
	name: "rxPullDown",
	props: {
		downObj: {
			type: Object,
			default() {
				return {
					status: "prepare"
				};
			}
		},
		textFn: Function,
		releaseY: { type: Number, default: 100 }
	},
	computed: {
		classes() {
			return [
				{
					[`prepare`]: this.isPrepare,
					[`ing`]: this.isRefreshing,
					[`complete`]: !this.isPrepare && !this.isRefreshing
				}
			];
		},
		isPrepare() {
			return this.downObj.status === "prepare";
		},
		isRefreshing() {
			return this.downObj.status === "ing";
		},
		text() {
			if (this.textFn) {
				return this.textFn(this.downObj);
			}
			return this.isPrepare
				? this.downObj.pos.y >= this.releaseY
					? "松开手指即可刷新"
					: "下拉刷新"
				: this.isRefreshing
					? "<i class='iconfont icon-loading rx-looping'></i>正在更新中"
					: "更新成功";
		}
	}
};
</script>

