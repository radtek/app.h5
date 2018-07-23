<template>
	<rx-cell @on-img-click="handleGoto">
		<template slot="header">
			<user :user-info="userInfo"
			      :padding="false"></user>
		</template>
		<rx-clamp-box :text="row.answer"
		              :can-expand="false"
		              hide-tip="...全文"
		              @on-content-click="handleGoto"
		              @on-tip-click="handleGoto"></rx-clamp-box>
		<template slot="footer">
			<a-status :row="row"
			          :ques-info="question"></a-status>
			<a-status-v2 :row="row"
			             @on-share="handleAnswerShare"
			             @on-zan="handleAnswerZan"
			             @on-comment="handleGoto">
			</a-status-v2>
		</template>
		<template slot="img">
			<rx-row :flex="false"
			        :gutter="8">
				<template v-if="row.imgPath && row.imgPath.length"
				          v-for="(img,index) in row.imgPath">
					<rx-col :span="__getColSpan(row.imgPath)"
					        :key="index">
						<rx-img :src="img"
						        @on-error="onImgErr"
						        @on-click="handleGoto"></rx-img>
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
			__getColSpan(imgArr) {
				return imgArr && imgArr.length ? 24 / imgArr.length : 24;
			},
			handleGoto() {
				this.goto("回答详情", "/answer", {
					qid: this.question.id,
					aid: this.row.id
				});
			},
			handleAnswerShare() {
				if (!this.$isDev) {
					JXRSApi.app.qa.share({
						questionId: this.question.id,
						answerId: this.row.id
					});
				}
			},
			handleAnswerZan() {
				const params = { answerId: this.row.id };
				if (this.row.isSupported) {
					this.$http.qa.cancelZanAnswer(params).then(() => {
						this.row.isSupported = false;
						this.row.supportCount += this.row.supportCount > 0 ? -1 : 0;
					});
				} else {
					this.$http.qa.zanAnswer(params).then(() => {
						this.row.isSupported = true;
						this.row.supportCount += 1;
					});
				}
			}
		}
	};
</script>

