<style lang="sass">
@import "../../../assets/__base/item_of_comment.scss"
</style>

<template>
  <rx-cell-avatar class="item_of_comment">
    <template slot="img">
      <rx-avatar v-if="__isEmptyAvatar(getProp('imgPath'))"
                 :sex="getProp('sex')"
                 :padding="8"
                 :width="32"
                 :height="32"
                 @click="gotoNative('我的','userProfile',{userId:getProp('userId')})">
        {{__convertUserName(getProp("name"))}}
      </rx-avatar>
      <img v-else
           :data-src="getProp('imgPath')"
           alt="avatar"
           ref="img"
           :src="item.sex === 1 ? $DEFAULT_AVATAR_FEMALE:$DEFAULT_AVATAR"
           @click.stop="gotoNative('我的','userProfile',{userId:getProp('userId')})"
           @error="onImgErr($event,true)" />
    </template>
    <template slot="header">
      <rx-row>
        <rx-col>
          <span class="user-name">{{getProp("name")}}</span>
        </rx-col>
        <rx-col align="right">
          <rx-btn icon="zan"
                  type="text"
                  :plain="!getProp('supportNum')"
                  size="small"
                  @on-click="handleZan">{{getProp('supportNum') || 0}}</rx-btn>
        </rx-col>
      </rx-row>
    </template>
    <template>
      {{getProp("text")}}
    </template>
    <template slot="footer">
      <span>{{getProp('time') | formatDate("MM-dd hh:mm")}}</span>
      <!-- <rx-btn type="info"
			        size="small"
			        round
			        plain>回复{{item.commentNum>0?`(${item.commentNum})`:''}}</rx-btn> -->
    </template>
  </rx-cell-avatar>
</template>


<script>
  import UserNameMixin from "~m/__username";
  export default {
  	name: "ItemOfComment",
  	mixins: [UserNameMixin],
  	props: {
  		item: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		keyMap: {
  			type: Object,
  			default() {
  				return {};
  			}
  		}
  	},
  	methods: {
  		getProp(propName) {
  			if (this.keyMap && this.keyMap.hasOwnProperty(propName)) {
  				return this.item[this.keyMap[propName]];
  			}
  			return this.item[propName];
  		},
  		handleZan() {
  			this.$emit("on-zan", this.item);
  		}
  	}
  };
</script>
