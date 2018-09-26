<template>
	<rx-pull ref="pull"
	         :list="list"
	         :total="total"
	         :down="down"
	         :up="up"
	         @uping="handleUp"
	         @downing="handleDown"
	         @scroll-end="handleScrollEnd">
		<rx-pull-down slot="down"></rx-pull-down>
		<rx-pull-up slot="up"></rx-pull-up>
		<div class="loading"
		     v-if="loading">
			<rx-icon loading></rx-icon>
		</div>
		<template v-else>
			<div class="qa-list">
				<template v-if="total>0">
					<item ref="items"
					      v-for="(ques,index) in list"
					      :key="index"
					      :row="ques.infoQuestion"
					      async>
					</item>
				</template>
				<div v-else
				     class="empty"
				     @click.stop="goto('问题列表','/questions')">
					<rx-icon name="collect"></rx-icon>
					<p>您还没有任何收藏，赶紧去收藏吧</p>
				</div>
			</div>
		</template>
	</rx-pull>
</template>
<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "ListOfMyCollected",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_qa" */ "~c/qa/item_of_qa.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		mixins: [Pull],
		props: {
			currentTotal: Number
		},
		data() {
			return {
				loading: true,
				isPrerender: true,
				list: [],
				total: 0,
				page: 1
			};
		},
		methods: {
			__fetch() {
				return this.$http.qa.getUserCollection().then(resp => {
					this.list = resp.result.infoCollections;
					this.total = resp.result.sumCount;
					this.$emit("update:currentTotal", this.total);
					this.isPrerender = false;
					this.loading = false;
				});
			},
			__append() {
				this.$http.qa
					.getUserCollection({
						page: ++this.page
					})
					.then(resp => {
						const list = resp.result.infoCollections;
						if (list && list.length) {
							this.list = this.list.concat(list);
						}
						this.broadcast("RxImg", "fn.load");
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

