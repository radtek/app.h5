<style lang="sass">
@import "../../../assets/__base/item_of_comment.scss"
</style>

<template>
	<rx-cell-avatar class="item_of_comment">
		<template slot="img">
			<img :data-src="item.imgPath ||
					(item.sex === 1
						? $DEFAULT_AVATAR_FEMALE
						: $DEFAULT_AVATAR)"
			     alt="avatar"
			     ref="img"
			     v-lazyimg
			     @click.stop="gotoNative('我的','userProfile',{userId:item.userId})"
			     @error="onImgErr($event,true)" />
		</template>
		<template slot="header">
			<rx-row>
				<rx-col>
					<span class="user-name">{{item.name}}</span>
				</rx-col>
				<rx-col align="right">
					<rx-btn icon="zan"
					        type="text"
					        :plain="!item.supportNum"
					        size="small"
					        @on-click="handleZan">{{item.supportNum || 0}}</rx-btn>
				</rx-col>
			</rx-row>
		</template>
		<template>
			{{item.text}}
		</template>
		<template slot="footer">
			<span>{{item.time | formatDate("MM-dd hh:mm")}}</span>
			<!-- <rx-btn type="info"
			        size="small"
			        round
			        plain>回复{{item.commentNum>0?`(${item.commentNum})`:''}}</rx-btn> -->
		</template>
	</rx-cell-avatar>
</template>


<script>
	export default {
		name: "ItemOfComment",
		props: {
			item: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			handleZan() {
				this.antiRepeatClick(() => {
					const isSupported = this.item.isSupported;
					const action = isSupported
						? "cancelZanToComment"
						: "addZanToComment";
					this.$http.news[action]({
						contentId: this.contentid,
						commentId: this.item.id
					})
						.then(() => {
							this.item.supportNum += isSupported ? -1 : 1;
							this.item.isSupported = !isSupported;
							this.resetRepeatClick();
						})
						.catch(() => {
							this.resetRepeatClick();
						});
				});
			}
		}
	};
</script>
