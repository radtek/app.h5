<style lang="scss">
	.rs-tab-radio {
		.radio-text {
			color: #666;
			font-size: 28px;

			&.active {
				border: 2px solid #1f9cfc;
				color: #1f9cfc;
			}
		}
	}
</style>


<template>
	<rx-row class="rs-tab-radio"
	        align="center"
	        justify="center">
		<rx-col class="radio-text"
		        v-for="(opt,index) in options"
		        :class="[{'active': opt.val === currentValue}]"
		        :key="index">
			<div v-html="opt.label"
			     @click="onItemClick(opt.val,$event)"></div>
		</rx-col>
	</rx-row>
</template>

<script>
	export default {
		name: "RsTabRadio",
		props: {
			value: Number,
			options: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				currentValue: this.value
			};
		},
		watch: {
			value(val) {
				this.currentValue = val;
			},
			currentValue(val) {
				this.$emit("input", val);
			}
		},
		methods: {
			onItemClick(value) {
				this.currentValue = value;
				this.$emit("on-change", value);
			}
		}
	};
</script>

