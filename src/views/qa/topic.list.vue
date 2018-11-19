<style lang="sass">
@import "../../assets/modules/qa/view-questions.scss"
</style>
<template>
	<section rs-view="topics">
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
		name: "VwQATopics",
		components: {
			latest: () =>
				import(/* webpackChunkName:"wc.qa.topic.latest" */ "~v/qa/wc/topic.latest.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			hottest: () =>
				import(/* webpackChunkName:"wc.qa.topic.hottest" */ "~v/qa/wc/topic.hottest.vue").then(
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
						this.broadcast("VmTopicHottest", "fn.fetch");
						break;
					case 0:
					default:
						this.broadcast("VmTopicLatest", "fn.fetch");
						break;
				}
			}
		},
		created() {
			this.$rxUtils.asyncCmpListenApi.on(
				"VmTopicLatest.afterMounted",
				cmp => {
					this.broadcast("VmTopicLatest", "fn.fetch");
				}
			);
		}
	};
</script>

