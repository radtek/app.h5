<template>
	<rx-card padding
	         v-show="row.question">
		<rx-cell :border="false">
			<p slot="header">{{row.question}}</p>
			<div class="multiline-content">
				<div :class="[{overflow:row.overStatus === 1}]">
					{{row.overStatus===1 ? row.simpleContent:row.description}}
				</div>
				<p class="tool"
				   v-if="row.overStatus !== -1">
					<rx-btn @on-click="row.overStatus = row.overStatus === 1 ? 0 : 1"
					        :icon="row.overStatus===1 ?'iconfont icon-arrow-down' : 'iconfont icon-arrow-up'"
					        type="text">{{row.overStatus===1?'展开':'收起'}}</rx-btn>
				</p>
			</div>
			<template slot="img">
				<rx-row :gutter="6"
				        :class="[{[`img-${qImgs.length}`]:qImgs.length <=2 && qImgs.length >=1}]">
					<rx-col v-for="(url,i) in qImgs"
					        :key="i">
						<rx-img :src="url"
						        :alt="url"
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
		}
	};
</script>

