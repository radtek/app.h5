<style lang="sass">
@import "../../assets/modules/h5/view-vote.scss"
</style>

<template>
	<section rs-view="vote">
		<rx-tab :current.sync="tabIndex"
		        ref="tab"
		        :class="[{[`single`]:!showVoteItems}]">
			<template v-if="showVoteItems">
				<rx-tab-pane ref="pane"
				             label="投票选项"
				             :index="0">
					<div class="vote_items">
						<vote-items :aid="activityId"
						            :status.sync="voteStatus"
						            :mzpy="mzpy"
						            :unit-id="unitid"
						            :user-id="userid"
						            ref="voteItems"></vote-items>
					</div>
				</rx-tab-pane>
				<rx-tab-pane ref="pane"
				             label="统计结果"
				             :index="1">
					<vote-statistics :aid="activityId"></vote-statistics>
				</rx-tab-pane>
			</template>
			<template v-else>
				<rx-tab-pane ref="pane"
				             label="统计结果"
				             :index="0">
					<vote-statistics :aid="activityId"></vote-statistics>
				</rx-tab-pane>
			</template>
		</rx-tab>
		<div class="fixed-bottom"
		     v-if="tabIndex === 0 && showVoteItems">
			<rx-btn :type="!voteStatus?'primary':'info'"
			        :disabled="voteStatus"
			        :loading.sync="isSubmiting"
			        @on-click="handleVoteSubmit">
				{{btnText}}
			</rx-btn>
		</div>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfVote",
		components: {
			VoteItems: () =>
				import(/* webpackChunkName:"wc-vote_items" */ "~c/h5/vote-items.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			VoteStatistics: () =>
				import(/* webpackChunkName:"wc-vote_statistics" */ "~c/h5/vote-statistics.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				// 是否是民主评议投票的链接 1:是
				mzpy: "",
				unitid: "",
				userid: "",
				voteStatus: false,
				isSubmiting: false,
				tabIndex: 0,
				selected: {},
				showVoteItems: false
			};
		},
		computed: {
			btnText() {
				if (this.mzpy === "1") {
					return this.voteStatus
						? "互评已提交"
						: this.isSubmiting
							? "提交中..."
							: "提交互评";
				}
				return this.voteStatus
					? "你已投票"
					: this.isSubmiting
						? "投票中..."
						: "确定投票";
			}
		},
		watch: {
			tabIndex(val) {
				if (this.showVoteItems) {
					if (this.tabIndex === 0) {
						this.broadcast("VoteItems", "fn.fetch");
					} else {
						this.broadcast("VoteStatistics", "fn.fetch");
					}
				} else {
					this.broadcast("VoteStatistics", "fn.fetch");
				}
			},
			showVoteItems(val) {
				this.$nextTick(() => {
					this.$refs.tab.resetTabs();
				});
			}
		},
		methods: {
			handleVoteSubmit() {
				if (this.voteStatus) return;

				if (this.isSubmiting) return;

				this.isSubmiting = true;

				this.$refs.voteItems
					.submit()
					.then(() => {
						this.isSubmiting = false;
						this.voteStatus = true;
						this.$toast.text("投票成功", "bottom");

						this.broadcast("VoteStatistics", "fn.fetch", true);
					})
					.catch(err => {
						this.isSubmiting = false;
						if (err === false) return;
						this.$alert(err.message || "投票发生异常", "");
					});
			}
		},
		created() {
			this.getQS("activityId", "mzpy", "unitid", "userid");
			this.$rxUtils.asyncCmpListenApi.on("VoteItems.afterMounted", cmp => {
				this.broadcast("VoteItems", "fn.fetch");
				this.broadcast("VoteStatistics", "fn.fetch");
			});
		},
		mounted() {
			this.$http.vote
				.validVoteAccess({
					activityId: this.activityId,
					passport: this.authInfo.passport
				})
				.then(() => {
					this.showVoteItems = true;
					setTimeout(() => {
						this.broadcast("VoteItems", "fn.fetch");
						this.broadcast("VoteStatistics", "fn.fetch");
					}, 600);
				})
				.catch(() => {
					this.showVoteItems = false;
					setTimeout(() => {
						this.broadcast("VoteStatistics", "fn.fetch");
					}, 600);
				});
		}
	};
</script>

