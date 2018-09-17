<style lang="scss">
	@import "../../assets/modules/lgbj/search.scss";
	[rs-view="search"] {
		background-color: #fff;
	}
</style>

<template>
	<section rs-view="search">
		<div class="wrap-search">
			<search></search>
		</div>
		<div class="ui-detail_addr">
			<label>选择地址：</label>
			<span>{{street}}</span>
			<span v-if="currentUnit">>{{currentUnit}}</span>
		</div>
		<div class="wrap-data">
			<mt-index-list>
				<mt-index-section v-for="item in list"
				                  :key="item.char"
				                  :index="item.char">
					<mt-cell v-for="(item,index) in item.childs"
					         :key="index">
						<span @click="handleCellClick(item)"
						      slot="title">{{item.unitName}}</span>
					</mt-cell>
				</mt-index-section>
			</mt-index-list>
		</div>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfSearchOfUnits",
		components: {
			Search: () =>
				import(/* webpackChunkName:"wc-search" */ "~c/lgbj/search.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				currentUnit: "",
				street: "",
				list: []
			};
		},
		methods: {
			handleCellClick(item) {
				this.currentUnit = item.unitName;

				this.$router.push({
					path: "/search_of_users",
					query: {
						unitId: item.unitId,
						unit: this.currentUnit,
						street: this.street
					}
				});
			},
			__fetch() {
				this.$http.lgbj
					.getUnitsByStreet({
						street: this.street
					})
					.then(data => {
						if (
							data.result &&
							data.result.units &&
							data.result.units.length
						) {
							const list = [];
							const kv = {};
							data.result.units.forEach(it => {
								const firstChar = window.pinyinUtil.getFirstLetter(
									it.unitName[0]
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
			this.getQS("street");
			this.currentUnit = "";
			this.street = decodeURIComponent(this.street);
			this.__fetch();
		}
	};
</script>
