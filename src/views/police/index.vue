<style lang="scss">
  @import "../../assets/modules/police/view-index.scss";
</style>
<template>
<div class="index">
  <div class="body">
      <main class="content">
      <div class="backpic"><img :src="getLocalMduImg('police','yujia')"></div>
      <div class="nav">
        <span v-if="!edit" @click="inEdit()">编辑</span>
        <span v-else @click="inFulfil()">完成</span>
        </div>
      <div class="column">
        <div :class="{'column-input':true,'editActive':edit}">
          <div class="column-text" v-for="i in rows">
            <div class="column-name">
              <span>活动名称：</span> 
              <div v-if="!edit">{{i.name}}</div>
              <textarea v-model="i.name" v-else rows="1"></textarea></div>
            <div class="column-action">
              <span>活动地点：</span> 
              <div v-if="!edit">{{i.action}}</div>
              <textarea v-model="i.action" v-else rows="2"></textarea></div>
          </div>
        </div>
        <div class="column-icon"
             @click="dialogJoin"><div>抢名额</div>
          <img :src="getLocalMduImg('police','minge')"> 
        </div>
        
        <div class="column-footer">
          <div class="jion">已有<span class="red">112</span>人参与活动 &nbsp
          <span class="red">查看全部</span>
          <p class="img"><img :src="getLocalMduImg('police','quanbu')"></p></div>
          <div class="tips">温馨提示：您最近的课程是 <span class='red'>2019-01-14 周一20：00</span></div>
        </div>
      </div>
      <sign-up class="sign-up"></sign-up>
    </main>
 </div>
  <footer :class="[isWebp()?'webp':'']">
    <div class="left">分享</div>
    <div class="right" @click="dialogLeave()">请假</div>
  </footer>
  <dialog-leave v-if="leave"
                @doCancel="isLeaveCancel"
                @doSubmit="isLeaveSubmit"></dialog-leave>
  <dialog-join  v-if="join"
                @doCancel="isJoinCancel"
                @doSubmit="isJoinSubmit"></dialog-join>
</div>
</template>

<script>
  export default {
    name: "PoliceIndex",
    components: {
      signUp: () =>
            import(/* webpackChunkName: "signUp" */ "~c/police/sign-up.vue"),
      dialogLeave: () =>
            import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/leave-index.vue"),
      dialogJoin: () =>
            import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/join-index.vue"),

    },
    data(){
      return {
      edit:false,
      rows:[],
      leave:false,
      join:false,
      }
    },
    methods: {
      inEdit(){
        if(!this.edit){
          this.edit = true;
          console.log(this.edit)
        }
      },
      inFulfil(){
        if(this.edit){
          this.edit = false;
        }
      },
      dialogLeave(){
        this.leave = true;
      },
      dialogJoin(){
        this.join = true;
      },
      isLeaveSubmit(){
        this.leave = false;
      },
      isLeaveCancel(){
        this.leave= false;
      },
      isJoinSubmit(){
        this.join = false;
      },
      isJoinCancel(){
        this.join = false;
      }
    },
    mounted(){
      this.rows = [{name:"瑜伽活动",action:"江西省南昌市新建区赣江南大道1366号省公安厅201室"}]
      }
    
  };
</script>

