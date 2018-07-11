export default {
	rx: {
		pull: {
			down: {
				prepare: {
					release: "release to refresh",
					normal: "drop-down refresh"
				},
				ing: "refreshing",
				complete: "refreshing success",
				empty: "sorry,no data!",
				error: "netword error,click to refreshing"
			},
			up: {
				ing: "loading",
				complete: "load success",
				empty: "sorry,no data!",
				error: "netword error,click to loading"
			}
		}
	}
};
