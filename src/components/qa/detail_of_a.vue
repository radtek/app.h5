<template>
	<rx-cell ref="items"
	         @on-img-click="handleGoto">
		<template slot="header">
			<user :user-info="userInfo"></user>
		</template>
		<rx-clamp-box :text="row.answer"
		              :can-expand="false"
		              hide-tip="...全文"
		              @on-content-click="handleGoto"
		              @on-tip-click="handleGoto"></rx-clamp-box>
		<template slot="footer">
			<!-- <answer-status :row="answer"
			               :ques-info="question"></answer-status> -->
			<!-- <answer-status2 :row="answer"
			                @on-share="handleAnswerShare(answer)"
			                @on-zan="handleAnswerZan(answer)"
			                @on-comment="onRedirect('answer-detail',{qid:qid,aid:row.id})">
			</answer-status2> -->
		</template>
		<template slot="img">
			<rx-row :flex="false"
			        :gutter="7">
				<template v-for="(img,index) in row.imgPath">
					<rx-col :span="12"
					        :key="index">
						<rx-img :src="img"></rx-img>
					</rx-col>
				</template>
			</rx-row>
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
			},
			question: {
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
		},
		methods: {
			handleGoto() {
				this.goto("回答详情", "/answer", {
					qid: this.question.id,
					aid: this.row.id
				});
			}
		}
	};
</script>

