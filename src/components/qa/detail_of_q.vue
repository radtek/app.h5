<template>
	<rx-card padding
	         v-show="row.question">
		<rx-cell :border="false">
			<p slot="header">{{row.question}}</p>
			<div v-if="row.description"
			     v-html="row.description"></div>
			<template slot="img">
				<rx-row :gutter="6"
				        :class="[{[`img-${qImgs.length}`]:qImgs.length <=2 && qImgs.length >=1}]">
					<rx-col v-for="(url,i) in qImgs"
					        :key="i">
						<rx-img :src="url"
						        :alt="url"
						        @on-click="onImgClick(url,i,qImgs)"
						        @on-error="onImgErr($event)" />
					</rx-col>
				</rx-row>
			</template>
			<q-status :row="row"
			          slot="footer"></q-status>
		</rx-cell>
	</rx-card>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "DetailOfQ",
		components: {
			QStatus: () =>
				import(/* webpackChunkName:"wc-status_of_q" */ "~c/qa/status_of_q.vue").then(
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
			qImgs() {
				if (this.row.imgPath && this.row.imgPath.length) {
					return this.row.imgPath;
				}
				return [];
			}
		},
		methods: {
			onImgClick(currentImgUrl, currentIndex, imgs) {
				const params = {
					currentImgUrl,
					currentIndex,
					imgs,
					aid: ""
				};
				if (this.$isDev) {
					alert("点击图片放大预览:" + JSON.stringify(params));
				} else {
					JXRSApi.app.qa.openImgViewer(params);
				}
			}
		}
	};
</script>

