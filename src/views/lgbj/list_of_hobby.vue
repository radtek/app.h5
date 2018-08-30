<style lang="scss">
	@import "../../assets/modules/lgbj/wc-table.scss";

	[rs-view="list_of_hobby"] {
		padding-top: 30px;
	}
</style>

<template>
	<section rs-view="list_of_hobby">
		<rx-card>
			<table>
				<thead>
					<tr>
						<th width="15%">排名</th>
						<th width="55%">兴趣名称</th>
						<th width="30%">选择人次</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(it,index) in list"
					    :key="index">
						<td>
							<template v-if="index<=2">
								<img :src="getLocalMduImg('lgbj',index===0?'first':(index==1?'second':'third'))" />
							</template>
							<template v-else>
								{{index+1}}
							</template>
						</td>
						<td>
							{{it.message}}
						</td>
						<td>
							{{$rxUtils.formatThousandth(it.num)}}
						</td>
					</tr>
				</tbody>
			</table>
		</rx-card>
	</section>
</template>

<script>
	export default {
		name: "PageOfSpecialList",
		data() {
			return {
				list: []
			};
		},
		methods: {
			__fetch() {
				this.$http.lgbj
					.getStatisticsOfHobby()
					.then(data => {
						this.list = data.result;
					})
					.catch(() => {});
			}
		},
		activated() {
			this.__fetch();
		}
	};
</script>
