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
				empty: "no data!",
				error: "netword error,click to refreshing"
			},
			up: {
				ing: "loading",
				complete: "load success",
				empty: "no more data!",
				error: "netword error,click to loading"
			}
		},
		alert: {
			ok: "ok"
		},
		confirm: {
			yes: "yes",
			no: "no",
			loading: "handling..."
		}
	}
};
