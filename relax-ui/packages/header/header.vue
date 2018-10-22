<style lang="scss">
	.rx-header {
		width: 100%;
		height: 88px;
		line-height: 88px;
		color: #fff;

		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			z-index: 1000;
		}

		&_back {
			font-size: 36px;
			.rx-icon {
				font-size: 60px;
			}
		}

		&_title {
			text-align: center;
			font-size: 36px;
		}

		&_right {
			text-align: right;
		}
	}
</style>


<template>
	<rx-row class="rx-header"
	        :class="[{[`fixed`]:this.fixed}]"
	        justify="center">
		<rx-col :span="4">
			<div class="rx-header_back"
			     @click="onBackClick"
			     v-if="showBack">
				<slot name="back">
					<i class="rx-icon icon-arrow-left"></i>
				</slot>
			</div>
		</rx-col>
		<rx-col :span="16">
			<div class="rx-header_title"
			     @click="onTitleClick">
				<slot v-if="$slots.default || title">{{title}}</slot>
			</div>
		</rx-col>
		<rx-col :span="4">
			<div class="rx-header_next"
			     @click="onRightClick"
			     v-if="showRight">
				<slot name="right"></slot>
			</div>
		</rx-col>
	</rx-row>
</template>

<script>
	export default {
		name: "RxHeader",
		props: {
			fixed: { type: Boolean, default: true },
			title: String,
			showRight: Boolean,
			showBack: { type: Boolean, default: true }
		},
		methods: {
			onBackClick() {
				this.$emit("back");
			},
			onTitleClick() {
				this.$emit("title-click");
			},
			onRightClick() {
				this.$emit("right-click");
			}
		}
	};
</script>

