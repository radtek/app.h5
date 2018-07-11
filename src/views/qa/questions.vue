<style lang="sass">
@import "../../assets/modules/qa/view-questions.scss"
</style>
<template>
	<section rs-view="questions">
		<rx-tab :current.sync="tabIndex">
			<rx-tab-pane :index="0"
			             label="最新">
				<latest></latest>
			</rx-tab-pane>
			<rx-tab-pane :index="1"
			             label="最热">
				<hottest></hottest>
			</rx-tab-pane>
		</rx-tab>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfQuestions",
		components: {
			Latest: () =>
				import(/* webpackChunkName:"wc-list_of_latest" */ "~c/qa/list_of_latest.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			Hottest: () =>
				import(/* webpackChunkName:"wc-list_of_hottest" */ "~c/qa/list_of_hottest.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				tabIndex: 0
			};
		},
		watch: {
			tabIndex(val) {
				this.__loadTabData();
			}
		},
		methods: {
			__loadTabData() {
				switch (this.tabIndex) {
					case 1:
						this.broadcast("ListOfHottest", "fn.fetch");
						break;
					case 0:
					default:
						this.broadcast("ListOfLatest", "fn.fetch");
						break;
				}
			}
		}
	};
</script>

