export default {
	methods: {
		getRealSize(sourceValue) {
			const remMin = this.$RX ? this.$RX.minPixelValue || 5 : 5;
			// 判断用户是否使用了淘宝flexible的rem的解决方案
			if (
				typeof window !== "undefined" &&
				window.lib &&
				window.lib.flexible &&
				sourceValue > remMin
			) {
				return `${window.lib.flexible.px2rem(sourceValue)}rem`;
			}
			return `${sourceValue}px`;
		},
		isRem(val) {
			const remMin = this.$RX ? this.$RX.minPixelValue || 5 : 5;
			return val > remMin;
		}
	}
};
