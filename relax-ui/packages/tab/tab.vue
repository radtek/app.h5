<style lang="sass">
@import "../../src/styles/widget/tab.scss"
</style>

<template>
	<div class="rx-tab">
		<div class="rx-tab-navs">
			<div v-for="tab in tabs"
			     :key="tab.index"
			     :class="['rx-tab-nav',{'active':tab.index === currentIndex}]"
			     @click.stop="onNavClick(tab)">
				{{tab.label}}
			</div>
		</div>
		<div class="rx-tab-content"
		     :style="contentStyles"
		     ref="panels">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxTab",
		provide() {
			return {
				tabs: this.tabs
			};
		},
		props: {
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabs: [],
				currentIndex: this.current
			};
		},
		computed: {
			contentStyles() {
				const p =
					this.currentIndex === 0 ? "0%" : `-${this.currentIndex}00%`;

				let style = {};

				if (this.currentIndex > -1) {
					style = {
						transfrom: `translateX(${p}) translateZ(0)`
					};
					style.webkitTransform = style.transfrom;
				}

				return style;
			}
		},
		watch: {
			currentIndex(val) {
				this.$emit("update:current", val);
			},
			current(val) {
				this.currentIndex = val;
			}
		},
		methods: {
			onNavClick(tab) {
				this.currentIndex = tab.index;
			}
		}
	};
</script>

