<style lang="sass">
@import "../../assets/modules/news/wc-news_item.scss"
</style>

<template>
	<rx-row class="rs-news_item"
	        justify="center"
	        align="center">
		<rx-col :flex-basis="140"
		        v-if="isEdit">
			<rx-chk-icon v-model="item.isChecked"></rx-chk-icon>
		</rx-col>
		<rx-col>
			<template v-if="isSingleImage">
				<rx-cell-avatar img-position="right"
				                @on-click="goto(item.title,'/info',{contentid:item.id,channelid:channelId,title:item.title})">
					<span slot="header"
					      class="item_title">{{item.title}}</span>
					<template slot="footer">
						<status :item="item"></status>
					</template>
					<template slot="img">
						<rx-img :src="imgArr[0]"
						        @on-error="onImgErr"></rx-img>
					</template>
				</rx-cell-avatar>
			</template>
			<template v-else>
				<rx-cell @on-click="goto(item.title,'/info',{contentid:item.id,channelid:channelId,title:item.title})">
					<span slot="header"
					      class="item_title">{{item.title}}</span>
					<template v-if="imgArr && imgArr.length">
						<rx-row justify="center"
						        align="center"
						        :gutter="6">
							<rx-col :span="8"
							        v-for="(img,index) in imgArr"
							        :key="index">
								<rx-img :src="img"
								        class="item_img"
								        @on-error="onImgErr" />
							</rx-col>
						</rx-row>
					</template>
					<template slot="footer">
						<status :item="item"></status>
					</template>
				</rx-cell>
			</template>
		</rx-col>
	</rx-row>
</template>

<script>
	import { utils } from "~rx";
	export default {
		name: "ItemOfNews",
		components: {
			Status: () =>
				import(/* webpackChunkName:"wc-status" */ "~c/news/status.vue").then(
					utils.fixAsyncCmpLifeCycle
				)
		},
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			},
			isEdit: Boolean,
			channelId: String
		},
		computed: {
			imgArr() {
				const arr = this.item.imgs ? this.item.imgs.split(",") : [];
				if (arr.length > 3) {
					arr.splice(3, arr.length - 3);
				} else if (arr.length === 2) {
					arr.splice(1, 1);
				}
				return arr;
			},
			isSingleImage() {
				return !this.item.video && this.imgArr.length === 1;
			}
		}
	};
</script>

