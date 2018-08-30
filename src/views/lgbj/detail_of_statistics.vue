<style lang="scss">
	[rs-view="detail_of_statistics"] {
		.wrap-statistics {
			background-color: #f5f5f5;
			height: 60px;
			line-height: 60px;
			color: #666;
			font-size: 24px;
			padding-left: 30px;
		}

		.empty {
			color: #999;
			text-align: center;
			margin-top: 30%;
			font-size: 28px;
		}

		.wrap-query {
			padding: 30px 26px;
			padding-bottom: 0;
			li {
				margin-bottom: 30px;
				border-radius: 10px;
				border: 1px solid #ccc;
				display: inline-block;
				margin-left: 16px;
				margin-right: 16px;
				width: 196px;
				line-height: 60px;
				text-align: center;
				font-size: 24px;
				color: #666;

				&.active {
					border-color: #1f9cfc;
					color: #1f9cfc;
				}
			}
		}

		.wrap-data {
			margin-top: 34px;
		}
	}
</style>


<template>
	<section rs-view="detail_of_statistics">
		<div class="wrap-query">
			<ul>
				<li v-for="(item,index) in queryItems"
				    :key="index"
				    :class="[{'active':item.active}]"
				    @click="handleQuery(item)">
					{{item.name}}
				</li>
			</ul>
		</div>
		<div class="wrap-statistics">
			<label>合计：</label>
			<span>{{$rxUtils.formatThousandth(list.length)}}人</span>
		</div>
		<rx-pull :list="list"
		         class="wrap-data"
		         :total="list.length"
		         :can-pull="false"
		         async>
			<template v-if="list && list.length">
				<user-item v-for="(item,index) in list"
				           :key="index"
				           :info="item"></user-item>
			</template>
			<template v-else>
				<div class="empty">
					暂无任何数据~
				</div>
			</template>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfDetailOfStatistics",
		components: {
			UserItem: () =>
				import(/* webpackChunkName:"wc-user-item" */ "~c/lgbj/user-item.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				queryKey: "",
				list: [],
				queryItems: [],
				queryInfo: {}
			};
		},
		methods: {
			__fetch() {
				this.$http.lgbj
					.searchUsers({
						[`${this.queryInfo.key}`]: this.queryInfo.value
					})
					.then(data => {
						this.list = data.result.userList;
						this.$nextTick(() => {
							this.broadcast("RxPull", "fn-init");
						});
					});
			},
			handleQuery(item) {
				if (item.active) return;

				this.queryInfo.value = item.value;

				this.queryItems.forEach(it => {
					it.active = it.value === item.value;
				});

				this.__fetch();
			}
		},
		activated() {
			this.getQS("mode");

			this.queryItems = [];

			switch (this.mode) {
				case "age":
					this.queryItems.push(
						{ name: "50~60", value: 1, active: true },
						{ name: "61~70", value: 2, active: false },
						{ name: "71~80", value: 3, active: false },
						{ name: "81~90", value: 4, active: false },
						{ name: "91~100", value: 5, active: false },
						{ name: "100+", value: 6, active: false }
					);
					this.queryInfo = {
						key: "ageType",
						value: 1
					};
					this.__fetch();
					break;
				case "education":
					this.$http.lgbj.getEducationList().then(data => {
						if (data.result && data.result.length) {
							this.queryItems = data.result.map((it, index) => {
								return {
									name: it.name,
									value: it.id,
									active: index === 0
								};
							});

							this.queryInfo = {
								key: "education",
								value: this.queryItems[0].value
							};

							this.__fetch();
						}
					});
					break;
				case "health":
					this.queryItems.push(
						{ name: "良好", value: "良好", active: true },
						{ name: "一般", value: "一般", active: false },
						{ name: "较差", value: "较差", active: false }
					);
					this.queryInfo = {
						key: "health",
						value: "良好"
					};
					this.__fetch();
					break;
				case "retire":
					this.queryItems.push(
						{ name: "离休", value: "离休", active: true },
						{ name: "退休", value: "退休", active: false }
					);
					this.queryInfo = {
						key: "retire",
						value: "离休"
					};
					this.__fetch();
					break;
				default:
					break;
			}
		}
	};
</script>
