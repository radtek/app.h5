<template>

	<rx-pull ref="pull"
	         :down="down"
	         :up="up"
	         :list="list"
	         :total="total"
	         @downing="handleDown"
	         @uping="handleUp"
	         @scroll-end="handleScrollEnd">
		<rx-pull-down slot="down"></rx-pull-down>
		<rx-pull-up slot="up"></rx-pull-up>
		<div class="qa-list">
			<rx-skeleton-cell v-if="isPrerender"></rx-skeleton-cell>
			<template v-else>
				<item ref="items"
				      v-for="(q,index) in list"
				      :key="index"
				      :row="q"
				      is-topic
				      :show-tag="false"
				      async></item>
			</template>
		</div>
	</rx-pull>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "VmTopicLatest",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_qa" */ "~c/qa/item_of_qa.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		props: {},
		data() {
			return {
				isPrerender: true,
				list: [],
				total: 0
			};
		},
		methods: {
			__fetch() {
				return this.$http.qa.getLatestTopics().then(resp => {
					this.total = resp.result.total;
					this.list = resp.result.list;
					this.isPrerender = false;
				});
			},
			__append() {
				return this.$http.qa
					.getLatestTopics({
						id:
							this.list.length > 0
								? this.list[this.list.length - 1].id
								: 0,
						freshType: 1
					})
					.then(resp => {
						const list = resp.result.list;
						if (list && list.length) {
							this.list = this.list.concat(list);
						}
					});
			}
		},
		created() {
			this.$on("fn.fetch", () => {
				if (!this.list || !this.list.length) {
					this.__fetch();
				}
			});
			this.$rxUtils.asyncCmpListenApi.on("ItemOfQA.afterMounted", cmp => {
				cmp.$refs.rxImg && cmp.$refs.rxImg.load();
			});
		}
	};
</script>
