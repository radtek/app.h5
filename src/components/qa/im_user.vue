<template>
  <rx-col class="im-user-item">
    <div class="header">
      <rx-avatar v-if="__isEmptyAvatar(row.imgPath)"
                 :sex="row.sex"
                 :padding="8"
                 :width="50"
                 :height="50"
                 @click="gotoNative('个人中心','userProfile',{userId:row.userId})">
        {{__convertUserName(row.userName)}}
      </rx-avatar>
      <img v-else
           :src="row.imgPath"
           alt="用户头像"
           class="circle"
           @click.stop="gotoNative('个人中心','userProfile',{userId:row.userId})"
           @error="onImgErr($event,true)">
    </div>
    <h3 class="user-name">{{row.userName}}</h3>
    <h5 class="unit-name">{{row.unitName}}</h5>
    <rx-btn type="primary"
            @on-click="handleFriendAddClick(row.userId)"
            v-if="isAdd"
            :plain="addStatus === 1"
            :icon="addStatus === 1 ? '' : 'plus'"
            :loading="isAdding">{{friendText}}</rx-btn>
    <rx-btn type="primary"
            :plain="isOk"
            @on-click="handleInviteClick"
            v-else
            :loading="isInviting">{{inviteText}}</rx-btn>
  </rx-col>
</template>

<script>
  import MixinsOfQAIM from "~m/__qa-im";
  import MixinsOfQAInvite from "~m/__qa-invite";
  import UserNameMixin from "~m/__username";
  export default {
  	name: "ImUser",
  	mixins: [MixinsOfQAIM, MixinsOfQAInvite, UserNameMixin],
  	props: {
  		row: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		isAdd: { type: Boolean, default: true }
  	},
  	mounted() {
  		this.$nextTick(() => {
  			this.dispatch("ImUsers", "fn-ready");
  		});
  	}
  };
</script>

