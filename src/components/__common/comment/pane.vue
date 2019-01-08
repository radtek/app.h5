<style lang="scss">
  @import "../../../assets/__base/pane_of_comment.scss";
</style>
<template>
  <rx-card ref="comment"
           class="pane_of_comment"
           :padding="padding">
    <template slot="header">
      <span>{{title}}{{total>0?`(${total})`:''}}</span>
      <span class="zan"
            v-if="isShowZan">{{zan||0}}赞</span>
    </template>
    <template v-if="list && list.length">
      <slot></slot>
    </template>
    <template v-else>
      <slot name="empty">
        <div class="empty-wrap"
             @click.stop="onEmptyClick">
          <rx-icon name="comment"></rx-icon>
          <p>暂无评论,快来抢占首屏吧</p>
        </div>
      </slot>
    </template>
  </rx-card>
</template>

<script>
  export default {
  	name: "PaneOfComment",
  	props: {
  		title: { type: String, default: "全部评论" },
  		total: { type: Number, default: 0 },
  		list: Array,
  		padding: Boolean,
  		zan: Number,
  		isShowZan: { type: Boolean, default: true }
  	},
  	methods: {
  		onEmptyClick(event) {
  			this.$emit("on-empty-click", event);
  		}
  	}
  };
</script>

