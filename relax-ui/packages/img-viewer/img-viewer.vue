<template>
	<img ref="img"
	     :src="placeholder"
	     @error="$emit('on-error',$event)" />
</template>

<script>
	import { imgPlaceholder } from "../../src/utils/const";
	import isInClientView from "../../src/utils/dom/isInClientView";
	export default {
		name: "RxImgViewer",
		props: {
			placeholder: {
				type: String,
				default: imgPlaceholder
			},
			src: { type: String, default: "" },
			scaleType: { type: String, default: "center-crop" }
		},
		data() {
			return {
				rect: {},
				img: {},
				canvas: {},
				canvasContext: {},
				isSupportCanvas: true,
				dataURL: "",
				isFetched: false,
				isLoaded: false
			};
		},
		computed: {
			imgSrc() {
				return this.isSupportCanvas ? this.dataURL : this.src;
			}
		},
		methods: {
			__calc() {
				this.canvasContext.clearRect(
					0,
					0,
					this.canvas.width,
					this.canvas.height
				);

				const x = this.rect.width * 2;
				const y = this.rect.height * 2;

				this.canvas.width = x;
				this.canvas.height = y;

				const w = this.img.width;
				const h = this.img.height;

				const scaleOfBox = y / x;
				const scaleOfImg = h / w;

				const sourcePoint = { x: 0, y: 0 };
				const sourceRect = { w: 0, h: 0 };

				if (this.scaleType === "center-crop") {
					if (scaleOfBox >= scaleOfImg) {
						sourceRect.w = (h * x) / y;
						sourceRect.h = h;
						sourcePoint.x = (w - sourceRect.w) / 2;
					} else {
						sourceRect.w = w;
						sourceRect.h = (w * y) / x;
						sourcePoint.y = (h - sourceRect.h) / 2;
					}

					this.canvasContext.drawImage(
						this.img,
						sourcePoint.x,
						sourcePoint.y,
						sourceRect.w,
						sourceRect.h,
						0,
						0,
						x,
						y
					);
				}

				this.dataURL = this.canvas.toDataURL("image/jpeg");
			},
			__loadImg() {
				const img = (this.img = new Image());

				img.onload = () => {
					if (!img.complete) return;
					// 计算缩放比例
					this.__calc();
					this.$refs.img.src = this.imgSrc;
				};

				img.onerror = () => {
					this.$emit("on-error", { target: this.$el });
				};

				img.src = this.src;

				if (img.complete) {
					// 直接从浏览器缓存中读取
					this.__calc();
					this.$refs.img.src = this.imgSrc;
				}
			}
		},
		created() {
			this.$on("fn.load", (parentEl, threshold) => {
				if (this.isLoaded) return;
				if (isInClientView(this.$el, parentEl, threshold)) {
					this.__loadImg();
					this.isLoaded = true;
				}
			});
		},
		mounted() {
			this.rect = this.$el.getBoundingClientRect();
			// 动态创建一个canvas名称为rx-imgcrop-canvas
			let canvas = document.getElementById("rx-imgcrop-canvas");

			if (!canvas) {
				canvas = document.createElement("canvas");
				canvas.id = "rx-imgcrop-canvas";
				document.body.appendChild(canvas);
			}

			this.canvas = canvas;

			this.isSupportCanvas = !!canvas.getContext;

			if (this.isSupportCanvas) {
				this.canvasContext = canvas.getContext("2d");
			}
		}
	};
</script>