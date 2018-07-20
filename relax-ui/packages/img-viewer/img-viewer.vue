<template>
	<img ref="img"
	     :src="placeholder"
	     @error="$emit('on-error',$event)" />
</template>

<script>
	import { imgPlaceholder } from "../../src/utils/const";
	import isInClientView from "../../src/utils/dom/isInClientView";
	import scaleImg from "./algorithm/index";
	export default {
		name: "RxImgViewer",
		props: {
			placeholder: {
				type: String,
				default: imgPlaceholder
			},
			src: { type: String, default: "" },
			scaleType: { type: String, default: "fitStart" }
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

				const [sourcePoint, sourceRect, dirtyPoint, dirtyRect] = scaleImg(
					this.scaleType
				)({ x, y }, { w: this.img.width, h: this.img.height });

				this.canvasContext.drawImage(
					this.img,
					sourcePoint.x,
					sourcePoint.y,
					sourceRect.w,
					sourceRect.h,
					dirtyPoint.x,
					dirtyPoint.y,
					dirtyRect.w,
					dirtyRect.h
				);

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