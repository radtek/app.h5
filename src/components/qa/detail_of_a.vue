<template>
	<rx-cell ref="items"
	         :imgs="row.imgPath"
	         @on-img-click="onRedirect('answer-detail',{qid,aid:row.id})">
		<template slot="header">
			<user :user-info="userInfo"></user>
		</template>
		<div class="multiline-content">
			<div @click.stop="goto('回答详情','/answer',{qid:qid,aid:row.id})"
			     :class="[{overflow:row.overStatus === 1}]">
				{{row.overStatus === 1 ? row.simpleContent:row.answer}}
			</div>
			<p class="tool"
			   v-if="row.overStatus !== -1">
				<span @click.stop="onRedirect('answer-detail',{qid:qid,aid:row.id})">...全文</span>
				<!-- <rx-btn @on-click="row.overStatus = row.overStatus === 1 ? 0 : 1"
								        :icon="row.overStatus === 1 ?'iconfont icon-arrow-down' : 'iconfont icon-arrow-up'"
								        type="text">{{row.overStatus === 1?'展开':'收起'}}</rx-btn> -->
			</p>
		</div>

		<template slot="footer">
			<answer-status :row="answer"
			               :ques-info="question"></answer-status>
			<!-- <answer-status2 :row="answer"
			                @on-share="handleAnswerShare(answer)"
			                @on-zan="handleAnswerZan(answer)"
			                @on-comment="onRedirect('answer-detail',{qid:qid,aid:row.id})">
			</answer-status2> -->
		</template>
	</rx-cell>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "DetailOfA",
		components: {
			User: () =>
				import(/* webpackChunkName:"wc-user" */ "~c/qa/user.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			AStatus: () =>
				import(/* webpackChunkName:"wc-status_of_a" */ "~c/qa/status_of_a.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
			AStatusV2: () =>
				import(/* webpackChunkName:"wc-status_of_a_v2" */ "~c/qa/status_of_a_v2.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		computed: {
			userInfo() {
				if (this.row) {
					if (this.row.isAnonymous === 1) {
						return {
							userName: "匿名",
							imgPath:
								this.row.communityUser.sex === 1
									? this.$DEFAULT_AVATAR
									: this.$DEFAULT_AVATAR_FEMALE,
							isAnonymous: 1
						};
					}
					return this.row.communityUser;
				}
				return {};
			}
		}
	};
</script>

