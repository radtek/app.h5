<style lang="scss">
	[rs-view="ques-detail"] {
		.top-card .rx-card_header {
			height: 140px;
			padding-top: 20px;
			vertical-align: middle;

			p {
				color: #999;
				font-size: 28px;

				&:first-child {
					color: #333;
					font-size: 36px;
				}
			}
		}

		.rx-cell.b-b {
			border: none;
		}

		.rx-cell-header {
			font-size: 36px;
		}
	}
</style>

<template>
	<section rs-view="ques-audit">
		<rx-card class="top-card"
		         padding>
			<template slot="header">
				<p>您的提问可能会被重新编辑</p>
			</template>
			<div>
				<rx-skeleton-cell v-if="isPrerender"></rx-skeleton-cell>
				<item v-else
				      :row="info"
				      :has-status="false"
				      :can-answer="false"></item>
			</div>
		</rx-card>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfQuesAudit",
		asyncListenCmps: "ItemOfQ",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_q" */ "~c/qa/item_of_q.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "PageOfQuesAudit")
				)
		},
		data() {
			return {
				isPrerender: true,
				qid: "",
				info: {}
			};
		},
		methods: {
			__fetch() {
				return this.$http.qa
					.getQuesDetail({
						questionId: this.qid
					})
					.then(resp => {
						this.info = resp.result.question;
						// if (!this.unitId) {
						// 	this.unitId = this.question.communityUser.unitId;
						// }
						this.isPrerender = false;
						this.$rxUtils.asyncCmp.dataReady.call(this, "ItemOfQ");
					});
			}
		},
		created() {
			this.getQS("qid", "unitId");
			this.$rxUtils.asyncCmp.ready(this, "ItemOfQ", cmp => {
				this.$nextTick(() => {
					cmp.broadcast("RxImg", "fn.load");
				});
			});
			return this.__fetch();
		}
	};
</script>

