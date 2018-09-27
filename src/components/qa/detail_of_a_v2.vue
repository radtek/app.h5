<template>
	<rx-cell :border="false">
		<template slot="header">
			<user :user-info="userInfo"
			      :padding="false"></user>
		</template>
		<rx-read-more v-if="row.answer"
		              mode="line">
			<div v-html="row.answer"></div>
		</rx-read-more>
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
		<template slot="footer">
			<a-status-v3 :row="row"></a-status-v3>
		</template>
	</rx-cell>
</template>

<script>
	import DetailOfAMixin from "~m/__qa-detail_of_a";
	import { utils } from "~rx";
	export default {
		name: "DetailOfAV2",
		asyncListenCmps: "User",
		components: {
			User: () =>
				import(/* webpackChunkName:"wc-user" */ "~c/qa/user.vue").then(
					cmp => utils.asyncCmp.solution(cmp, "DetailOfAV2")
				),
			AStatusV3: () =>
				import(/* webpackChunkName:"wc-status_of_a_v3" */ "~c/qa/status_of_a_v3.vue").then(
					utils.asyncCmp.solution
				)
		},
		mixins: [DetailOfAMixin],
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

