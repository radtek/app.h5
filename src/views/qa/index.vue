<style lang="sass">
@import "../../assets/modules/qa/view-index.scss"
</style>

<template>
	<section rs-view="index">
		<rx-pull ref="pull"
		         :list="listPart2"
		         :total="total"
		         :down="down"
		         :up="up"
		         @downing="handleDown"
		         @uping="handleUp"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
			<div class="ui-list">
				<!-- <msg-box class="animated fadeInDown"
				         v-if="userAvatar"
				         :avatar="userAvatar"
				         :msgs="msgIds"
				         @on-click="onRedirect('msg-latest-list',{msgIds:msgs})"></msg-box> -->
				<rx-skeleton-cell-avatar v-if="isPrerender"></rx-skeleton-cell-avatar>
				<rx-card v-else
				         class="card-user"
				         :padding="false">
					<rx-cell-avatar :avatar="userInfo.user.imgPath">
						<h2 slot="header">{{userInfo.user.userName}}</h2>
						<span>回答获得{{userInfo.supportCountSum}}赞</span>
						<span>&nbsp;&nbsp;{{userInfo.clickCountSum}}人阅读</span>
						<rx-btn slot="rightAction"
						        class="primary"
						        @on-click="goto('我的问答','/profile')">我的问答</rx-btn>
					</rx-cell-avatar>
					<rx-row justify="center"
					        align="center"
					        class="entry">
						<rx-col>
							<rx-btn icon="dati"
							        type="text"
							        @on-click="goto('问题列表','/questions')">答题</rx-btn>
						</rx-col>
						<rx-col>
							<rx-btn icon="tiwen1"
							        type="text"
							        @on-click="gotoNative('提问','createQuestion')">提问</rx-btn>
						</rx-col>
					</rx-row>
				</rx-card>
				<div class="separate"></div>
				<rx-card class="list-card"
				         padding>
					<template slot="header">
						<span class="title">为你推荐</span>
						<rx-btn type="text"
						        @on-click="goto('问题列表','/questions')">查看更多</rx-btn>
					</template>
					<rx-skeleton-cell v-if="isPrerender2"></rx-skeleton-cell>
					<template v-else>
						<item ref="items"
						      v-for="(q,index) in listPart1"
						      :key="index"
						      :row="q"
						      :can-answer="false"
						      :async="false"></item>
					</template>
					<div class="separate"
					     v-show="isShowUsers"></div>
					<rx-card header="利民问答达人榜"
					         class="card-users"
					         v-show="isShowUsers"
					         padding>
						<im-users ref="imUsers"
						          is-add
						          :unit-id="userInfo.user.unitId"
						          @on-empty="isShowUsers=false"
						          @on-show="isShowUsers=true"></im-users>
					</rx-card>
					<div class="separate"
					     v-if="isShowUsers"></div>
					<item ref="items"
					      v-for="(q,index) in listPart2"
					      :key="listPart1.length + index"
					      :row="q"
					      :can-answer="false"
					      :async="false"></item>
				</rx-card>
			</div>
		</rx-pull>
	</section>
</template>

<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "PageOfIndex",
		components: {
			Item: () =>
				import(/* webpackChunkName:"wc-item_of_qa" */ "~c/qa/item_of_qa.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			ImUsers: () =>
				import(/* webpackChunkName:"wc-im_users" */ "~c/qa/im_users.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
			// ,MsgBox: () =>
			// 	import(/* webpackChunkName:"cmp-msgbox" */ "~c/msg-box/msg-box.vue").then(
			// 		utils.fixAsyncCmpLifeCycle
			// 	)
		},
		mixins: [Pull],
		provide() {
			return {
				qaList: this
			};
		},
		data() {
			return {
				isPrerender: true,
				isPrerender2: true,
				isShowUsers: true,
				userInfo: { user: { unitId: -1 } },
				listPart1: [],
				listPart2: [],
				total: 1000,
				pageIndex: 1
			};
		},
		computed: {
			list() {
				return this.listPart2;
			}
		},
		methods: {
			__fetch() {
				this.$http.user.getUserInfo().then(resp => {
					this.userInfo = resp.result;
					this.isPrerender = false;
					setTimeout(() => {
						this.broadcast("ImUsers", "fn.fetch");
					}, 300);
				});
				this.$http.qa.getRecommendQ().then(resp => {
					const list = resp.result;
					if (list && list.length > 2) {
						this.listPart1 = list.slice(0, 2);
						this.listPart2 = list.slice(2);
					}
					this.isPrerender2 = false;
				});
			},
			__append() {
				this.$http.qa
					.getRecommendQ({ page: ++this.pageIndex })
					.then(resp => {
						const list = resp.result;
						if (list && list.length) {
							this.listPart2 = this.listPart2.concat(list);
						}
					});
			}
		},
		created() {
			// this.recieveAppNotice("qa");
		},
		activated() {
			this.__fetch();
		}
	};
</script>
