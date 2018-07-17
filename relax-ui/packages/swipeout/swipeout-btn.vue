<template>
	<button type="button"
	        class="rx-swipeout-btn"
	        :style="btnStyles"
	        @click.stop="onClick">
		<slot>
			<p v-html="text"></p>
		</slot>
	</button>
</template>

<script>
	export default {
		name: "RxSwipeoutBtn",
		inject: {
			swipeoutItem: { default: {} }
		},
		props: {
			color: { type: String, default: "#fff" },
			bgColor: String,
			text: String,
			width: { type: Number, default: 80 },
			action: String
		},
		computed: {
			btnStyles() {
				const styles = {};
				if (this.color) styles.color = this.color;
				if (this.bgColor) styles.backgroundColor = this.bgColor;
				if (this.width) styles.width = this.getRealSize(this.width);
				return styles;
			}
		},
		methods: {
			onClick(evt) {
				this.swipeoutItem.handleMenuClick(this.action, evt);
			}
		}
	};
</script>
