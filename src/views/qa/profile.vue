<style lang="sass">
@import "../../assets/modules/qa/view-profile.scss"
</style>

<template>
	<section rs-view="profile">
		<rx-skeleton-cell-avatar v-if="isPrerender"></rx-skeleton-cell-avatar>
		<rx-card v-else
		         class="card-user"
		         :padding="false">
			<rx-cell-avatar :avatar="userInfo.user.imgPath"
			                @on-img-click="gotoNative('个人中心','userProfile',{userId:userInfo.user.userId})">
				<h2 slot="header">{{userInfo.user.userName}}</h2>
				<span>回答获得{{userInfo.supportCountSum}}赞</span>
				<span>&nbsp;&nbsp;{{userInfo.clickCountSum}}人阅读</span>
			</rx-cell-avatar>
		</rx-card>
		<rx-tab :current.sync="tabIndex">
			<rx-tab-pane label="收藏"
			             :index="0">
				<h3 class="sub-title">收藏问题{{collectTotal>0 ? `(${collectTotal})`:''}}</h3>
				<my-collects :current-total.sync="collectTotal"
				             v-if="tabIndex === 0"></my-collects>
			</rx-tab-pane>
			<rx-tab-pane label="提问"
			             :index="1">
				<h3 class="sub-title">我的提问{{quesTotal>0 ? `(${quesTotal})`:''}}</h3>
				<my-questions :current-total.sync="quesTotal"></my-questions>
			</rx-tab-pane>
			<rx-tab-pane label="回答"
			             :index="2">
				<h3 class="sub-title">我的回答{{answerTotal>0 ? `(${answerTotal})`:''}}</h3>
				<my-answers :current-total.sync="answerTotal"></my-answers>
			</rx-tab-pane>
		</rx-tab>
	</section>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "PageOfProfile",
		components: {
			MyCollects: () =>
				import(/* webpackChunkName:"wc-list_of_my_collected" */ "~c/qa/list_of_my_collected.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			MyQuestions: () =>
				import(/* webpackChunkName:"wc-list_of_my_q" */ "~c/qa/list_of_my_q.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			MyAnswers: () =>
				import(/* webpackChunkName:"wc-list_of_my_a" */ "~c/qa/list_of_my_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		data() {
			return {
				isPrerender: true,
				tabIndex: 0,
				userInfo: { user: {} },
				collectTotal: 0,
				quesTotal: 0,
				answerTotal: 0
			};
		},
		watch: {
			tabIndex(val) {
				this.__loadTabData();
			}
		},
		methods: {
			__loadTabData() {
				switch (this.tabIndex) {
					case 1:
						this.broadcast("ListOfMyQ", "fn.fetch");
						break;
					case 2:
						this.broadcast("ListOfMyA", "fn.fetch");
						break;
					case 0:
					default:
						this.broadcast("ListOfMyCollected", "fn.fetch");
						break;
				}
			}
		},
		created() {
			this.$rxUtils.asyncCmpListenApi.on(
				"ListOfMyCollected.afterMounted",
				cmp => {
					this.broadcast("ListOfMyCollected", "fn.fetch");
				}
			);
		},
		mounted() {
			this.$http.user.getUserInfo().then(resp => {
				this.userInfo = resp.result;
				this.isPrerender = false;
			});
		}
	};
</script>

