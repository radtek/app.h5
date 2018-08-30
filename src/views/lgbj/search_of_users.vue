<style lang="scss">
	@import "../../assets/modules/lgbj/search.scss";
	[rs-view="search_of_users"] {
		background-color: #fff;

		.mint-cell-title {
			margin-left: 0 !important;
			padding-left: 0 !important;
		}

		.empty {
			color: #999;
			text-align: center;
			margin-top: 30%;
			font-size: 28px;
		}
	}
</style>
<template>
	<section rs-view="search_of_users">
		<div class="wrap-search">
			<search></search>
		</div>
		<div class="ui-detail_addr">
			<label>选择地址：</label>
			<span>{{street}}</span>
			<span>>{{unit}}</span>
		</div>
		<div class="wrap-data">
			<mt-index-list v-if="list && list.length">
				<mt-index-section v-for="item in list"
				                  :key="item.char"
				                  :index="item.char">
					<mt-cell v-for="(item,index) in item.childs"
					         :key="index">
						<user-item :info="item"
						           slot="title"></user-item>
					</mt-cell>
				</mt-index-section>
			</mt-index-list>
			<div class="empty">
				暂无任何数据~
			</div>
		</div>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfSearchUsers",
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
				street: "",
				unit: "",
				keywords: "",
				list: []
			};
		},
		methods: {
			__fetch() {
				this.$http.lgbj
					.searchUsers({
						unitId: this.unitId
					})
					.then(data => {
						if (
							data.result &&
							data.result.userList &&
							data.result.userList.length
						) {
							const list = [];
							const kv = {};
							data.result.userList.forEach(it => {
								const firstChar = window.pinyinUtil.getFirstLetter(
									it.userName[0]
								);

								if (kv[firstChar]) {
									kv[firstChar].childs.push(it);
								} else {
									kv[firstChar] = { childs: [it] };
								}
							});

							for (const key in kv) {
								list.push({
									char: key,
									childs: kv[key].childs
								});
							}
							list.sort((a, b) => {
								return a.char < b.char ? -1 : 1;
							});
							this.list = list;
						}
					});
			}
		},
		activated() {
			this.list = [];
			this.getQS("unitId", "street", "unit");
			this.street = decodeURIComponent(this.street);
			this.unit = decodeURIComponent(this.unit);
			this.__fetch();
		}
	};
</script>
