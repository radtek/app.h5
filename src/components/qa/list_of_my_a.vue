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
					      v-for="(item,index) in list"
					      :key="index"
					      :row="item"
					      async>
					</item>
				</template>
				<div v-else
				     class="empty"
				     @click.stop="goto('问题列表','/questions')">
					<rx-icon name="collect"></rx-icon>
					<p>您还没有任何回答，赶紧去答题吧</p>
				</div>
			</div>
		</template>
	</rx-pull>
</template>
<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "ListOfMyA",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_a" */ "~c/qa/item_of_a.vue").then(
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
				list: [],
				total: 0,
				page: 1
			};
		},
		methods: {
			__fetch() {
				return this.$http.qa.getUserCreatedA().then(resp => {
					this.list = resp.result.infoAnswers;
					this.total = resp.result.sumCount;
					this.$emit("update:currentTotal", this.total);
					this.loading = false;
				});
			},
			__append() {
				this.$http.qa
					.getUserCreatedA({
						page: ++this.page
					})
					.then(resp => {
						const list = resp.result.infoAnswers;
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
		}
	};
</script>

