export default {
	methods: {
		getLocalImg(imgPath, defaultExt = "png") {
			if (defaultExt !== "gif" && this.isWebp()) {
				return require(`~imgs/webp/${imgPath}.webp`);
			}
			return require(`~imgs/${imgPath}.${defaultExt}`);
		},
		getLocalMduImg(mdu, imgPath, defaultExt = "png") {
			if (defaultExt !== "gif" && this.isWebp()) {
				return require(`~css/modules/${mdu}/imgs/webp/${imgPath}.webp`);
			}
			return require(`~css/modules/${mdu}/imgs/${imgPath}.${defaultExt}`);
		}
	}
};
