export default {
	data() {
		return {
			backTopShowDistance: 350,
			up: {
				threshold: 20
			},
			down: {
				threshold: 90,
				stop: 40
			},
			releaseY: 100,
			thresold: 98
		};
	},
	methods: {
		handleBackToTop() {
			this.$refs.pull.scrollTo(0, 0, 300);
		},
		handleScrollEnd(pos, max) {
			this.broadcast(
				"RxBacktop",
				"fn.show",
				Math.abs(pos.y) >= this.backTopShowDistance
			);

			if (!this.$refs.items || !this.$refs.items.length) return;

			this.broadcast("RxImgViewer", "fn.load");

			this.$refs.items.forEach(item => {
				let imgs = item.$refs.img;
				if (!imgs) return;
				if (imgs && !Array.isArray(imgs)) {
					imgs = [imgs];
				}
				imgs.forEach(img => {
					if (
						img.hasAttribute("data-src") &&
						this.$rxUtils.isInClientView(img)
					) {
						img.setAttribute("src", img.getAttribute("data-src"));
						img.removeAttribute("data-src");
					}
				});
			});
		},
		handleDown() {
			this.__fetch();
		},
		handleUp() {
			if (this.total <= this.list.length) {
				this.$refs.pull.finishPullUp("empty");
				this.$refs.pull.refresh();
			} else {
				this.__append();
			}
		}
	}
};
