export default {
	data() {
		return {
			readyCount: 0,
			commentAnchor: 0,
			commentHeight: 0,
			isWaitingForCommentAnchor: false
		};
	},
	methods: {
		__scrollToComment() {
			if (this.commentHeight === 0) {
				this.isWaitingForCommentAnchor = true;
				return;
			}
			if (window.innerHeight > this.commentAnchor) {
				// 如果评论在可视化区域,则判断评论列表的长度是否
				if (this.commentHeight >= window.innerHeight) {
					this.$refs.pull.scrollTo(0, -this.commentAnchor, 200);
				} else if (
					this.commentHeight >
					window.innerHeight - this.commentAnchor
				) {
					this.$refs.pull.scrollTo(
						0,
						-(
							this.commentHeight -
							window.innerHeight +
							this.commentAnchor
						),
						0
					);
				}
			} else {
				this.$refs.pull.scrollTo(0, -this.commentAnchor, 200);
			}
		}
	}
};
