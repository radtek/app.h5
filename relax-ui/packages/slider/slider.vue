<style lang="scss">
	.rx-slider {
		min-height: 1px;
		position: relative;

		&-group {
			position: relative;
			overflow: hidden;
			white-space: nowrap;
		}

		&-item {
			float: left;
			box-sizing: border-box;
			overflow: hidden;
		}

		.rx-dots {
			position: absolute;
			right: 0;
			left: 0;
			bottom: 24px;
			transform: translateZ(1px);
			text-align: center;
			font-size: 0;
			.rx-dot {
				display: inline-block;
				margin: 0 8px;
				width: 16px;
				height: 16px;
				border-radius: 50%;
				background: #ccc;
				&.active {
					width: 40px;
					border-radius: 10px;
					background: #fff;
				}
			}
		}
	}
</style>

<template>
	<div class="rx-slider"
	     ref="slider">
		<div class="rx-slider-group"
		     ref="sliderGroup">
			<slot></slot>
		</div>
		<div v-if="dot"
		     class="rx-dots">
			<span class="rx-dot"
			      :class="{active: currentIndex === index }"
			      v-for="(item, index) in dots"
			      :key="index"></span>
		</div>
	</div>
</template>
<script  type="text/ecmascript-6">
	import BScroll from "better-scroll";
	import { addClass } from "../../src/utils/dom/class-mgr";
	export default {
		name: "RxSlider",
		props: {
			loop: { type: Boolean, default: true },
			autoPlay: { type: Boolean, default: true },
			dot: { type: Boolean, default: true },
			click: { type: Boolean, default: true },
			interval: { type: Number, default: 2000 },
			threshold: { type: Number, default: 0.3 },
			speed: { type: Number, default: 400 },
			async: Boolean,
			offset: { type: Number, default: 0 },
			gutter: { type: Number, default: 0 }
		},
		data() {
			return {
				innerClick: true,
				dots: [],
				currentIndex: 0,
				slider: null,
				timer: null
			};
		},
		watch: {
			loop() {
				this.__reset();
			},
			autoPlay() {
				this.__reset();
			},
			speed() {
				this.__reset();
			},
			threshold() {
				this.__reset();
			},
			innerClick(val) {
				this.$emit("update:click", val);
			},
			click(val) {
				this.innerClick = val;
			}
		},
		methods: {
			// 初始化Better-Scroll
			__initSlide() {
				this.slider = new BScroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					bounce: false,
					// 多用在嵌套 scroll 的场景
					stopPropagation: true,
					click: this.innerClick,
					snap: {
						loop: this.loop,
						threshold: this.threshold,
						speed: this.speed
					}
				});

				this.slider.on("beforeScrollStart", () => {
					// 考虑到会开启定时器与手势触摸,在手势触摸
					if (this.autoPlay) {
						this.__play();
					}
				});

				this.slider.on("touchEnd", () => {
					if (this.autoPlay) {
						this.__play();
					}
				});

				this.slider.on("scrollEnd", () => {
					this.currentIndex = this.slider.getCurrentPage().pageX;
					if (this.autoPlay) {
						this.__play();
					}
				});
			},
			__reset() {
				if (this.slider) {
					this.slider.destroy();
				}
				this.$nextTick(() => {
					clearTimeout(this.timer);
					this.currentIndex = 0;
					this.__setSlideWidth();
					if (this.dot) {
						this.__initDots();
					}
					this.__initSlide();
					if (this.autoPlay) {
						this.__play();
					}
				});
			},
			__initDots() {
				this.dots = new Array(this.children.length);
			},
			__setSlideWidth(isResize) {
				this.children = this.$refs.sliderGroup.children;
				let width = 0;
				const slideWidth = this.$refs.slider.clientWidth;
				for (let i = 0; i < this.children.length; i++) {
					const child = this.children[i];
					addClass(child, "rx-slider-item");
					child.style.width = slideWidth + this.offset + "px";

					if (this.gutter) {
						child.style.marginLeft = child.style.marginRight = `${this
							.gutter / 2}px`;
					}

					if (this.loop && i === 0) {
						child.style.paddingLeft = `${Math.abs(
							Math.abs(this.offset) - Math.abs(this.gutter / 2)
						)}px`;
					}

					width += slideWidth + this.offset + this.gutter;
				}
				if (this.loop && !isResize) {
					width += 2 * (slideWidth + this.offset + this.gutter);
				}
				this.$refs.sliderGroup.style.width = width + "px";
			},
			__play() {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.slider.next();
				}, this.interval);
			},
			prev() {
				this.slider && this.slider.prev();
			},
			next() {
				this.slider && this.slider.next();
			},
			refresh() {
				this.__setSlideWidth(true);
				this.slider.refresh();
			}
		},
		created() {
			// IOS端无需开启click:true的配置
			const ua = navigator.userAgent.toLowerCase();
			this.innerClick = !!~ua.indexOf("android");

			this.$on("fn.init", () => {
				this.__reset();
			});
		},
		mounted() {
			if (!this.async) {
				setTimeout(() => {
					this.__reset();
				}, 30);
			}
		},
		beforeDestroy() {
			this.slider && this.slider.disable();
			clearTimeout(this.timer);
		}
	};
</script>
