<style lang="scss">
  @import "../../../assets/modules/police/view-signUp.scss";
</style>

<template>
  <div class="sign-content">
    <div class="header">
      <span class="left">{{$rxUtils.formatDate(item.start_time,'yyyy-MM-dd hh:mm')}} {{item.week}} ({{item.count}}/{{totalCount}}人已报名)</span>
      <div class="right">
        <router-link :to="{path:'/view-person',query:{priority_no:item.priority_no,userId:person.id}}">
          <span>查看全部</span>
        </router-link>
        <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
      </div>
    </div>
    <div class="main">
      <span class="left">
        <div class="head"
             v-for="(url,index) in icons"
             :key="index"><img :src="url" /></div>
      </span>
      <div class="right"
           v-if="item.count<totalCount"><img :src="getLocalMduImg('police','button')"
             @click="doJoin(item)"></div>
    </div>
    <div class="footer"
         v-if="leaveItem.count">{{leaveItem.count}}人请假，还可以抢名额</div>
  </div>
</template>

<script>
  export default {
  	name: "CourseItem",
  	props: {
  		person: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		item: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		leaveItem: {
  			type: Object,
  			default() {
  				return {};
  			}
  		}
  	},
  	data() {
  		return {
  			totalCount: 21
  		};
  	},
  	computed: {
  		icons() {
  			return this.item && this.item.iconUrls
  				? this.item.iconUrls.split(",")
  				: [];
  		}
  	},
  	methods: {
  		doJoin(item) {
  			this.$emit("join", item, this.person);
  		}
  	}
  };
</script>

