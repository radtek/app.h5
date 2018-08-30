<style lang="scss">
	[rs-view="search-result"] {
		.empty {
			color: #999;
			text-align: center;
			margin-top: 30%;
			font-size: 28px;
		}

		.wrap-data {
			margin-top: 57px;
		}
	}
</style>

<template>
	<section rs-view="search-result">
		<div class="wrap-search">
			<search :redirect="false"
			        :kw.sync="keywords"
			        :show-icon="false"
			        @on-search="handleSearch"
			        @on-clear="handleClear"></search>
		</div>
		<rx-pull :list="list"
		         class="wrap-data"
		         :total="list.length"
		         :can-pull="false"
		         async>
			<template v-if="list && list.length">
				<user-item v-for="(item,index) in list"
				           :key="index"
				           :info="item"
				           :hg-key="keywords"></user-item>
			</template>
			<template v-else>
				<div class="empty">
					快点击上方搜索吧~
				</div>
			</template>
		</rx-pull>
	</section>
</template>
<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfSearchResult",
		components: {
			Search: () =>
				import(/* webpackChunkName:"wc-search" */ "~c/lgbj/search.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			UserItem: () =>
				import(/* webpackChunkName:"wc-user-item" */ "~c/lgbj/user-item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				keywords: "",
				list: []
			};
		},
		methods: {
			handleSearch() {
				this.$http.lgbj
					.searchUsers({
						userName: this.keywords
					})
					.then(data => {
						this.list = [];
						this.$nextTick(() => {
							this.list = data.result.userList;
							this.$nextTick(() => {
								this.broadcast("RxPull", "fn-init");
							});
						});
					});
			},
			handleClear() {
				this.list = [];
			}
		}
	};
</script>

