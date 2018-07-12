<template>
	<button :style="styles"
	        type="button"
	        @click.stop="onButtonClick">
		<slot>{{text}}</slot>
	</button>
</template>

<script>
	export default {
		name: "RxSwipeCellButton",
		inject: {
			SwipeCellItem: {
				default: {}
			}
		},
		props: {
			width: { type: Number, default: 80 },
			color: String,
			bgColor: String,
			text: String
		},
		computed: {
			styles() {
				const styles = {};

				if (this.color) {
					styles.color = this.color;
				}

				if (this.bgColor) {
					styles.backgroundColor = this.bgColor;
				}

				if (this.width) {
					styles.width = this.getRealSize(this.width);
				}

				return styles;
			}
		},
		methods: {
			onButtonClick() {
				if (this.$parent.$options.name === "RxSwipeoutItem") {
					this.$parent.onItemClick(this.text);
				}
			}
		}
	};
</script>

