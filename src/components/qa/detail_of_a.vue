<template>
	<rx-cell @on-img-click="handleGoto"
	         class="detail_of_a">
		<template slot="header">
			<user :user-info="userInfo"
			      padding="t"></user>
		</template>
		<rx-read-more v-if="row.answer"
		              :max-height="165"
		              click-on-expand
		              @on-expand="handleGoto">
			<div v-html="row.answer"
			     @click.stop="handleGoto"></div>
		</rx-read-more>
		<template slot="footer">
			<a-status :row="row"
			          :ques-info="question"></a-status>
			<a-status-v2 :row="row"
			             @on-share="handleAnswerShare"
			             @on-zan="handleAnswerZan"
			             @on-comment="handleGoto">
			</a-status-v2>
		</template>
		<template slot="img"
		          v-if="row.imgPath && row.imgPath.length">
			<rx-row :flex="false"
			        :gutter="8"
			        :class="__getImgPaneClasses(row.imgPath)"
			        v-for="(group,idx) in imgArr"
			        :key="idx">
				<template v-for="(img,index) in group">
					<rx-col :span="__getColSpan(group)"
					        :key="index">
						<rx-img :src="img"
						        @on-click="onImgClick(img,(idx*3)+index,row.imgPath)"
						        @on-error="onImgErr"></rx-img>
					</rx-col>
				</template>
			</rx-row>
		</template>
	</rx-cell>
</template>

<script>
	import { utils } from "~rx";
	import DetailOfAMixin from "~m/__qa-detail_of_a";
	export default {
		name: "DetailOfA",
		asyncListenCmps: "User",
		components: {
			User: () =>
				import(/* webpackChunkName:"wc-user" */ "~c/qa/user.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "DetailOfA")
				),
			AStatus: () =>
				import(/* webpackChunkName:"wc-status_of_a" */ "~c/qa/status_of_a.vue").then(
					utils.asyncCmp.solution
				),
			AStatusV2: () =>
				import(/* webpackChunkName:"wc-status_of_a_v2" */ "~c/qa/status_of_a_v2.vue").then(
					utils.asyncCmp.solution
				)
		},
		mixins: [DetailOfAMixin],
		props: {
			question: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		data() {
			return {
				status: ""
			};
		},
		methods: {
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
		},
		created() {
			this.$rxUtils.asyncCmp.dataReady
				.call(this, "User")
				.ready(this, "User", cmp => {
					if (this.status) {
						cmp.$emit("fn.refresh", this.userInfo.userId, this.status);
					}
				});
			this.$on("fn.refreshUserIMStatus", status => {
				this.broadcast("User", "fn.refresh", [
					this.userInfo.userId,
					(this.status = status)
				]);
			});
		}
	};
</script>

