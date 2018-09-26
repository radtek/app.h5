import { utils } from "~rx";
export default {
	components: {
		User: () =>
			import(/* webpackChunkName:"wc-user" */ "~c/qa/user.vue").then(
				utils.fixAsyncCmpLifeCycle
			)
	},
	props: {
		row: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			readyObjCount: 0
		};
	},
	computed: {
		userInfo() {
			if (this.row) {
				if (this.row.isAnonymous === 1) {
					return {
						userName: "匿名",
						imgPath:
							this.row.communityUser.sex === 1
								? this.$DEFAULT_AVATAR
								: this.$DEFAULT_AVATAR_FEMALE,
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
						rslts.push(imgs.slice((i - 1) * 3, len - 1));
					} else {
						rslts.push(imgs.slice((i - 1) * 3, (i - 1) * 3 + 2));
					}
				}
				return rslts;
			}
			return [];
		}
	},
	watch: {
		readyObjCount(val) {
			if (val === 2) {
				this.$nextTick(() => {
					this.$refs.readyCmp.broadcast("RxImg", "fn.load");
					this.$refs.readyCmp.broadcast(
						"RxReadMore",
						"fn.showOrHide"
					);
				});
			}
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
