import { imgPlaceholder } from "../../src/utils/const";
import isInClientView from "../../src/utils/dom/isInClientView";
import scaleImg from "./algorithm/index";
export default {
	name: "RxImg",
	render(h) {
		return h("img", {
			domProps: {
				src: this.placeholder
			},
			ref: "img",
			on: {
				click: event => {
					this.$emit("on-click", event);
				},
				error: event => {
					this.$emit("on-error", event);
				}
			}
		});
	},
	props: {
		placeholder: { type: String, default: imgPlaceholder },
		src: { type: String, default: "" },
		scaleType: { type: String, default: "centerCrop" },
		// 是否开启智能模式
		useSmartMode: { type: Boolean, default: true },
		// 可允许的误差范围
		rangeOfError: { type: Number, default: 0.2 }
	},
	data() {
		return {
			rect: {},
			img: {},
			canvas: {},
			canvasContext: {},
			isSupportCanvas: true,
			isFetched: false,
			isLoaded: false
		};
	},
	methods: {
		__calc() {
			const x = this.rect.width;
			const y = this.rect.height;

			const w = this.img.width;
			const h = this.img.height;

			let _scaleType = this.scaleType;

			/**
			 * 判断是否是智能模式
			 *  智能模式下：
			 * 	 		(1) 如果图片比例相同或者用户指定的误差范围内，则优先直接利用浏览器缩放来展示图片
			 * 			(2) 如果图片小于外部容器的宽高,则执行centerInside算法展示
			 */

			if (this.useSmartMode) {
				if (w <= x && h <= y) {
					_scaleType = "centerInside";
				} else if (Math.abs(y / x - h / w) <= this.rangeOfError) {
					this.$refs.img.src = this.src;
					return;
				}
			}

			const [sourcePoint, sourceRect, dirtyPoint, dirtyRect] = scaleImg(
				_scaleType
			)({ x, y }, { w, h });

			this.canvas.width = x;
			this.canvas.height = y;

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

			this.$refs.img.src = this.canvas.toDataURL("image/jpeg");

			this.canvasContext.clearRect(
				0,
				0,
				this.canvas.width,
				this.canvas.height
			);
		},
		__loadImg() {
			const img = (this.img = new Image());

			img.onload = () => {
				if (!img.complete) return;
				// 计算缩放比例
				this.__calc();
			};

			img.onerror = () => {
				this.$emit("on-error", { target: this.$el });
			};

			img.src = this.src;

			if (img.complete) {
				// 直接从浏览器缓存中读取
				this.__calc();
			}
		},
		load(parentEl, threshold) {
			if (this.isLoaded) return;
			if (isInClientView(this.$el, parentEl, threshold)) {
				this.__loadImg();
				this.isLoaded = true;
			}
		}
	},
	created() {
		this.$on("fn.load", (parentEl, threshold) => {
			this.load(parentEl, threshold);
		});
	},
	mounted() {
		this.rect = this.$el.getBoundingClientRect();

		// 动态创建一个canvas名称为rx-imgcrop-canvas
		let canvas = document.getElementById("rx-imgcrop-canvas");

		if (!canvas) {
			canvas = document.createElement("canvas");
			canvas.id = "rx-imgcrop-canvas";
			canvas.style.display = "none";
			document.body.appendChild(canvas);
		}

		this.canvas = canvas;

		this.isSupportCanvas = !!canvas.getContext;

		if (this.isSupportCanvas) {
			this.canvasContext = canvas.getContext("2d");
		}

		this.$nextTick(() => {
			this.load();
		});
	}
};
