const errorImgSrc =
	"data:image/png;base64,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";

export default function getWhenImgError(errorImgPathHandler) {
	return {
		methods: {
			onImgErr(evt, params) {
				const img = evt.target;
				img.onerror = null;
				img.src = errorImgPathHandler
					? errorImgPathHandler(params)
					: errorImgSrc;
			}
		}
	};
}
