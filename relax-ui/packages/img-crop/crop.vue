<style lang="sass">
@import "../../src/styles/widget/img-crop.scss"
</style>

<template>
	<div class="rx-imgcrop">
		<img v-if="src"
		     ref="img"
		     :class="imgClasses"
		     :style="imgStyles" />
	</div>
</template>

<script>
	export default {
		name: "RxImgCrop",
		props: {
			src: { type: String, default: "" }
		},
		data() {
			return {
				rect: null,
				img: null,
				imgScale: -1,
				attrW: "width",
				attrH: "height"
			};
		},
		computed: {
			imgClasses() {
				return [
					{
						[`fit`]: this.imgScale === 1,
						[`out-box`]: this.imgScale !== 1
					}
				];
			},
			imgStyles() {
				const styles = {};

				if (this.imgScale !== -1 && this.imgScale !== 1) {
					let transformStr = `scale(${this.imgScale})`;

					const x = this.rect.width;
					const y = this.rect.height;
					const w = this.img[this.attrW];
					const h = this.img[this.attrH];

					const scaledW = w * this.imgScale;
					const scaledH = h * this.imgScale;

					const scaledOffsetY = (h - scaledH) / 2;
					const scaledOffsetX = (w - scaledW) / 2;

					const translateX = scaledOffsetX + (w - x) / 2;
					const translateY = scaledOffsetY + (h - y) / 2;

					transformStr =
						`translateX(-${translateX / 2}px) translateY(-${translateY /
							2}px) ` + transformStr;

					styles.transform = transformStr;
				}

				if (styles.transform) {
					styles.webkitTransform = styles.transform;
				}

				return styles;
			}
		},
		methods: {
			__calc() {
				if (this.imgScale !== -1 && this.imgScale !== 1) return;

				const x = this.rect.width;
				const y = this.rect.height;
				const w = this.img[this.attrW];
				const h = this.img[this.attrH];

				const scaleOfBox = x / y;
				const scaleOfImg = w / h;

				if (scaleOfBox < scaleOfImg) {
					this.imgScale = y / h;
				} else if (scaleOfBox > scaleOfImg) {
					this.imgScale = x / w;
				}
			},
			__loadImg() {
				const img = (this.img = new Image());

				img.src = this.src;

				if (img.complete) {
					// 直接从浏览器缓存中读取
					this.__calc();
					this.$refs.img.src = this.src;
				} else {
					// 第一次访问或禁用缓存的情况下
					const timer = setInterval(() => {
						if (img.width && img.height) {
							this.__calc();
							clearInterval(timer);
						}
					});
					img.onload = () => {
						// 计算缩放比例
						this.__calc();
						this.$refs.img.src = this.src;
					};
				}
			}
		},
		created() {
			this.$on("fn.load", () => {
				this.__loadImg();
			});
		},
		mounted() {
			this.rect = this.$el.getBoundingClientRect();
		}
	};
</script>

