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
			this.broadcast("RxImg", "fn.load");
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
