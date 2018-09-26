<style lang="scss">
	.rx-readmore {
		position: relative;
		width: 100%;

		&__body {
			transition: height 0.2s ease-in-out;
		}

		&__hide-box {
			text-align: right;
			position: absolute;
			bottom: 0;
			width: 100%;
			padding-top: 100px;
			background-image: linear-gradient(
				-180deg,
				rgba(255, 255, 255, 0) 0%,
				#fff 70%
			);
			color: #409eff;
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
				<span @click.stop="onExpand">{{expand?"收起":"...全文"}}</span>
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxReadMore",
		props: {
			maxHeight: { type: Number, default: 195 },
			clickOnExpand: { type: Boolean, default: false }
		},
		data() {
			return {
				expand: false,
				needExpand: false,
				isCalced: false
			};
		},
		computed: {
			bodyStyle() {
				const style = {};
				if (this.needExpand && !this.expand && this.maxHeight !== 0) {
					style.maxHeight = this.getRealSize(this.maxHeight);
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
					this.needExpand = rec.height > this.maxHeight;
				}
			});
		}
	};
</script>

