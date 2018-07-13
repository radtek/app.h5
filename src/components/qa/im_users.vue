<style lang="sass">
@import "../../assets/modules/qa/im_users.scss"
</style>

<template>
	<rx-pull :vertical="false"
	         free-scroll>
		<div class="im-user-list"
		     :style="styles"
		     ref="wrap">
			<template v-for="(row,index) in users">
				<im-user ref="item"
				         :key="index"
				         :is-add="isAdd"
				         :row="row"></im-user>
			</template>
		</div>
	</rx-pull>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "ImUsers",
		components: {
			ImUser: () =>
				import(/* webpackChunkName:"wc-im_user" */ "~c/qa/im_user.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		props: {
			isAdd: Boolean,
			questionId: [String, Number],
			unitId: [String, Number]
		},
		provide() {
			return {
				questionId: this.questionId
			};
		},
		data() {
			return {
				users: [],
				width: "100%",
				readyCount: 0
			};
		},
		computed: {
			styles() {
				const styles = {};

				if (this.width) {
					styles.width = `${this.width}px`;
				}

				return styles;
			}
		},
		methods: {
			__calWidth() {
				let totalWidth = 0;
				const items = this.$refs.item;
				if (items && items.length) {
					items.forEach((item, index) => {
						totalWidth +=
							item.$el.getBoundingClientRect().width +
							2 * parseInt(getComputedStyle(item.$el).marginLeft, 10);
					});
					this.width = totalWidth;
				}
			},
			__fetchRecommendUsers(params) {
				this.$http.user
					.getRecommendUsers(params)
					.then(resp => {
						this.users = resp.result;
						if (!this.users || !this.users.length) {
							this.$emit("on-empty");
						} else {
							this.$emit("on-show");
						}
					})
					.catch(() => {
						this.$emit("on-empty");
					});
			},
			__fetchInvitingUsers(params) {
				this.$http.user
					.getRecommentInvitingUsers(params)
					.then(resp => {
						this.users = resp.result;
						if (!this.users || !this.users.length) {
							this.$emit("on-empty");
						} else {
							this.$emit("on-show");
						}
					})
					.catch(() => {
						this.$emit("on-empty");
					});
			},
			__request() {
				const params = { unitId: this.unitId };
				if (this.isAdd) {
					this.__fetchRecommendUsers(params);
				} else {
					this.__fetchInvitingUsers(params);
				}
			}
		},
		created() {
			this.$on("fn-ready", () => {
				this.readyCount += 1;
				if (this.readyCount === this.users.length) {
					this.$nextTick(() => {
						this.__calWidth();
					});
				}
			});

			this.$on("fn.fetch", () => {
				this.__request();
			});
		}
	};
</script>
