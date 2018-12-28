export default {
	props: {
		row: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		userInfo() {
			if (this.row) {
				if (this.row.isAnonymous === 1) {
					return {
						userName: "匿名",
						sex: this.row.communityUser.sex,
						imgPath: "",
						isAnonymous: 1
					};
				}
				return this.row.communityUser;
			}
			return {};
		},
		imgArr() {
			if (this.row && this.row.imgPath && this.row.imgPath.length) {
				const imgs = this.row.imgPath;
				const len = imgs.length;
				if (len <= 3) {
					return [imgs];
				}

				let fullNum = len / 3;
				const remainNum = len % 3;
				if (remainNum > 0) {
					fullNum += 1;
				}

				const rslts = [];

				for (let i = 1; i <= fullNum; i++) {
					if (i === fullNum) {
						rslts.push(imgs.slice((i - 1) * 3));
					} else {
						rslts.push(imgs.slice((i - 1) * 3, (i - 1) * 3 + 3));
					}
				}
				return rslts;
			}
			return [];
		}
	},
	methods: {
		__getColSpan(imgArr) {
			return imgArr && imgArr.length ? 8 : 24;
		},
		__getImgPaneClasses(imgArr) {
			return imgArr && imgArr.length === 1 ? ["img-1"] : "";
		},
		onImgClick(currentImgUrl, currentIndex, imgs) {
			const params = {
				currentImgUrl,
				currentIndex,
				imgs,
				aid: this.row.id
			};
			if (this.$isDev) {
				alert("点击图片放大预览:" + JSON.stringify(params));
			} else {
				JXRSApi.app.qa.openImgViewer(params);
			}
		}
	}
};
