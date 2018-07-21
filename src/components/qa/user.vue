<template>
	<rx-cell-avatar action-position="top"
	                :avatar="userInfo.imgPath"
	                @on-img-click="onAvatarClick($event)"
	                @on-avatar-err="onImgErr($event,true)">
		<h2 slot="header">{{userInfo.userName}}</h2>
		<span v-if="userInfo.unitName">{{userInfo.unitName}}</span>
		<rx-btn v-if="userInfo.isAnonymous !== 1 && userInfo.userId !== authInfo.userId"
		        slot="rightAction"
		        @on-click="handleFriendAddClick(userInfo.userId)"
		        class="primary"
		        :loading="isAdding"
		        :type="addStatus === 2 ? 'info': 'primary'"
		        :plain="addStatus === 1 || addStatus === 2"
		        :icon="addStatus === 0 ? 'plus' : ''">{{friendText}}</rx-btn>
	</rx-cell-avatar>
</template>

<script>
	import IM from "~m/__qa-im";
	export default {
		name: "User",
		mixins: [IM],
		props: {
			userInfo: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		methods: {
			onAvatarClick(evt) {
				if (this.userInfo.isAnonymous === 1) return;
				this.gotoNative("个人中心", "userProfile", {
					userId: this.userInfo.userId
				});
				this.$emit("on-avatar-click", evt);
			}
		}
	};
</script>

