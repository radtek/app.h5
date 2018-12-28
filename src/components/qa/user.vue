<style lang="scss">
  .top-im-user {
  	.rx-cell-img {
  		flex: 0 0 84px;
  		img {
  			width: 72px;
  			height: 72px;
  			vertical-align: middle;
  			// margin-top: 5px;
  		}
  	}
  	.rx-cell-content {
  		line-height: 32px;
  		.header {
  			margin: 2.5px 0 10px 0;
  			font-size: 32px;
  		}
  		.body {
  			font-size: 24px;
  		}

  		.rx-btn {
  			i,
  			span {
  				font-size: 22px;
  			}
  		}
  	}

  	.unit-name {
  		max-width: 470px;
  	}
  }
</style>


<template>
  <rx-cell-avatar class="top-im-user"
                  action-position="top"
                  :padding="padding">
    <template slot="img">
      <rx-avatar v-if="__isEmptyAvatar(userInfo.imgPath)"
                 :sex="userInfo.sex"
                 :padding="8"
                 :width="32"
                 :height="32"
                 @click="onAvatarClick($event)">
        {{__convertUserName(userInfo.userName)}}
      </rx-avatar>
      <img v-else
           :src="userInfo.imgPath"
           class="circle"
           alt="头像"
           @click="onAvatarClick($event)"
           @error="onImgErr($event,true)" />
    </template>
    <h2 slot="header">{{userInfo.userName}}</h2>
    <p class="unit-name"
       v-if="userInfo.unitName">{{userInfo.unitName}}</p>
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
  import UserNameMixin from "~m/__username";
  export default {
  	name: "User",
  	mixins: [IM, UserNameMixin],
  	props: {
  		userInfo: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		padding: { type: [Boolean, String], default: true }
  	},
  	methods: {
  		refreshStatus(userId, status) {
  			if (this.userInfo.userId === userId) {
  				this.addStatus = status === 1 || status === "1" ? 2 : 0;
  				this.isAdding = false;
  			}
  		},
  		onAvatarClick(evt) {
  			if (this.userInfo.isAnonymous === 1) return;
  			this.gotoNative("个人中心", "userProfile", {
  				userId: this.userInfo.userId
  			});
  			this.$emit("on-avatar-click", evt);
  		}
  	},
  	created() {
  		this.$on("fn.refresh", this.refreshStatus);
  	}
  };
</script>

