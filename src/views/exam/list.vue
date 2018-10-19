<!-- app端的首页：展示当前用户的所有考试列表 -->
<template>
	<section rs-view="exam.list">
		<rx-pull ref="pull"
		         :up="up"
		         :down="down"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd"
		         :list="list"
		         :total="total">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
		</rx-pull>
	</section>
</template>

<script>
	import Pull from "~m/pull";
	export default {
		name: "ExamList",
		components: {
			statusBar: () =>
				import(/* webpackChunkName:"wc.exam.statusbar" */ "~c/exam/status-bar.vue")
		},
		mixins: [Pull],
		data() {
			return {
				list: [],
				total: 0,
				page: 1,
				pageSize: 100
			};
		},
		methods: {
			__fetch() {
				return this.$http.exam
					.getListOfUser({
						userId: this.authInfo.userId,
						page: this.page,
						pageSize: this.pageSize
					})
					.then(data => {
						console.log(data);
					});
			}
		},
		created() {
			this.__fetch();
		}
	};
</script>
