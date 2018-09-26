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
		<div class="loading"
		     v-if="loading">
			<rx-icon loading></rx-icon>
		</div>
		<template v-else>
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
			     @click.stop="gotoNative('提问','createQuestion')">
				<rx-icon name="tiwen1"></rx-icon>
				<p>您还没有任何提问，赶紧去提问吧</p>
			</div>
		</template>
	</rx-pull>
</template>
<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "ListOfMyQ",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_q" */ "~c/qa/item_of_q.vue").then(
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
				return this.$http.qa.getUserCreatedQ().then(resp => {
					this.list = resp.result.infoQuestions;
					this.total = resp.result.sumCount;
					this.$emit("update:currentTotal", this.total);
					this.loading = false;
				});
			},
			__append() {
				this.$http.qa
					.getUserCreatedQ({
						page: ++this.page
					})
					.then(resp => {
						const list = resp.result.infoQuestions;
						if (list && list.length) {
							this.list = this.list.concat(list);
						}
						this.broadcast("RxImg", "fn.load");
					});
			},
			handleRedirect(item) {
				switch (item.isPublish) {
					case 1:
						this.goto("问题详情", "/detail", { qid: item.id });
						break;
					case 2:
						if (this.$isProd || this.$isTest) {
							JXRSApi.ui.alert("提示", "此提问审核未通过");
						}
						break;
					case 0:
					default:
						this.goto("问题待审核", "/audit-detail", {
							qid: item.id
						});
						break;
				}
			}
		},
		created() {
			this.$on("fn.fetch", () => {
				if (!this.list || !this.list.length) {
					this.__fetch();
				}
			});

			this.$rxUtils.asyncCmpListenApi.on("ItemOfQ.afterMounted", cmp => {
				cmp.$refs.rxImg && cmp.$refs.rxImg.load();
			});
		}
	};
</script>

