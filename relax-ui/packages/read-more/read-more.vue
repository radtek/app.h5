<style lang="scss">
	.rx-readmore {
		position: relative;
		width: 100%;

		&__body {
			transition: height 0.2s ease-in-out;
			line-height: 48px;
		}

		&__hide-box {
			text-align: right;
			position: absolute;
			bottom: 0;
			width: 100%;
			padding-top: 0;
			height: 48px;
			// background-image: linear-gradient(
			// 	-180deg,
			// 	rgba(255, 255, 255, 0) 0%,
			// 	#fff 70%
			// );
			background-image: none;
			color: #409eff;

			.tip-block {
				width: 92px;
				background: #fff;
				float: right;
				vertical-align: top;
				line-height: 38px;
				padding-top: 5px;
			}
		}

		&.is-expand &__body {
			padding-bottom: 35px;
		}

		&.is-expand &__hide-box {
			padding-top: 10px;
			background-image: none;
		}
	}
</style>


<template>
	<div class="rx-readmore"
	     :class="[{'is-expand':expand}]">
		<div class="rx-readmore__body"
		     :style="bodyStyle"
		     ref="body">
			<slot></slot>
		</div>
		<div class="rx-readmore__hide-box"
		     v-show="needExpand">
			<slot name="hideBox">
				<p class="tip-block"
				   @click.stop="onExpand">{{expand?"收起":"...全文"}}</p>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxReadMore",
		props: {
			// 限制内容的模式: 高度-height 行数-line (行数需要样式里面明确指定了line-height)
			mode: { type: String, default: "height" },
			maxLine: { type: Number, default: 7 },
			maxHeight: { type: Number, default: 195 },
			clickOnExpand: { type: Boolean, default: false }
		},
		data() {
			return {
				expand: false,
				needExpand: false,
				isCalced: false,
				lineHeight: 0,
				lineHeightUnit: ""
			};
		},
		computed: {
			bodyStyle() {
				const style = {};
				if (this.needExpand && !this.expand) {
					if (this.mode === "height") {
						style.maxHeight = this.getRealSize(this.maxHeight);
					} else if (this.lineHeight && this.lineHeightUnit) {
						style.maxHeight =
							this.lineHeight * this.maxLine + this.lineHeightUnit;
					}
					style.overflow = "hidden";
				} else {
					style.height = "auto";
				}
				return style;
			}
		},
		methods: {
			onExpand() {
				if (!this.clickOnExpand) {
					this.expand = !this.expand;
				}
				this.$emit("on-expand", this.expand);
			}
		},
		created() {
			if (this.maxHeight <= 0) {
				this.needExpand = false;
			}
			this.$on("fn.showOrHide", () => {
				if (this.$refs.body) {
					if (this.isCalced) return;
					this.isCalced = true;
					const rec = this.$refs.body.getBoundingClientRect();
					if (this.mode === "line") {
						const styles = window.getComputedStyle(
							this.$refs.body,
							null
						);

						const matches = /^\d+(\.\d+)?/g.exec(styles.lineHeight);

						this.lineHeight = matches[0];
						this.lineHeightUnit = styles.lineHeight.replace(
							this.lineHeight,
							""
						);

						if (this.lineHeightUnit === "px") {
							this.needExpand =
								rec.height > this.lineHeight * this.maxLine;
						} else if (
							this.lineHeightUnit === "rem" &&
							window.lib &&
							window.lib.flexible
						) {
							this.needExpand =
								rec.height >
								window.lib.flexible.rem2px(
									this.lineHeight * this.maxLine
								);
						}
					} else {
						this.needExpand = rec.height > this.maxHeight;
					}
				}
			});
		}
	};
</script>

