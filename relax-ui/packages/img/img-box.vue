<template>
	<div class="rx-img-box"
	     :style="styles">

	</div>
</template>
<script>
	export default {
		name: "RxImgBox",
		props: {
			width: String,
			height: String
		},
		computed: {
			styles() {
				const styles = {
					position: "relative",
					overflow: "hidden"
				};

				this.width && (styles.width = this.width);
				this.height && (styles.height = this.height);

				return styles;
			}
		}
	};
</script>
