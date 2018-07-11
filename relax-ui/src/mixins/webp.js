import isSupportWebp from "../utils/dom/isSupportWebp";

export default {
	methods: {
		isWebp() {
			return isSupportWebp();
		}
	}
};
