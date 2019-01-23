<style lang="scss">
  @import "../../assets/modules/police/view-index.scss";
</style>
<template>
<div class="index">
  <div class="body">
      <main class="content">
      <div class="backpic"><img :src="getLocalMduImg('police','yujia')"></div>
      <div class="nav" v-if="isManager">
        <span v-if="!edit" @click="inEdit()">编辑</span>
        <span v-else @click="inFulfil()">完成</span>
        </div>
      <div class="nav" v-else></div>
      <div class="column">
        <div :class="{'column-input':true,'editActive':edit}">
          <div class="column-text">
            <div class="column-name">
              <span>活动名称：</span> 
              <div v-if="!edit">{{infoActivity.subject}}</div>
              <textarea v-model="infoActivity.subject" 
                        v-else 
                        rows="2"
                        placeholder="请输入名称"
                        maxlength="30"></textarea></div>
            <div class="column-action">
              <span>活动地点：</span> 
              <div v-if="!edit">{{infoActivity.address}}</div>
              <textarea v-model="infoActivity.address" 
                        v-else 
                        rows="2"
                        placeholder="请输入地点"
                        maxlength="100"></textarea></div>
          </div>
        </div>
        <div class="column-icon"
             @click="dialogJoin"><div>抢名额</div>
          <img :src="getLocalMduImg('police','minge')"> 
        </div>
        
        <div class="column-footer">
          <div class="jion">已有<span class="red" @click="goto('全部参与人员','edit-person')">{{total}}</span>人参与活动 &nbsp;
          <span class="red" @click="goto('全部参与人员','edit-person')">查看全部</span>
          <p class="img"><img :src="getLocalMduImg('police','quanbu')"></p></div>
          <div class="tips" v-if="this.startTime">温馨提示：您最近的课程是
            <span class='red'>{{this.startTime}} {{this.startWeek}}</span>
          </div>
          <div class="tips" v-else>温馨提示：
            <span class="nored" >排课按顺序循环进行</span>
          </div>
        </div>
      </div>
      <sign-up class="sign-up"
               @join="dialogJoin"
               :person="person"
               ></sign-up>
    </main>
 </div>
  <footer :class="[isWebp()?'webp':'']">
    <div class="left">分享</div>
    <div class="right" @click="dialogLeave()">请假</div>
  </footer>
  <dialog-leave :show="leave"
                :kv="kv"
                @doCancel="isLeaveCancel"
                @doSubmit="isLeaveSubmit"></dialog-leave>
  <dialog-join  
                :show="join"
                @doCancel="isJoinCancel"
                @doSubmit="isJoinSubmit"></dialog-join>
  <toast :text="toast_text" :showToast="showToast"></toast>
</div>
</template>

<script>
  import { utils } from "~rx";
  export default {
    name: "PoliceIndex",
    components: {
      signUp: () =>
            import(/* webpackChunkName: "signUp" */ "~c/police/sign-up.vue"),
      dialogLeave: () =>
            import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/leave-index.vue"),
      dialogJoin: () =>
            import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/join-index.vue"),
      toast: () =>
			      import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
    },
    data(){
      return {
      edit:false,
      infoActivity: [], //获取活动详情
      total:0,
      isManager:false,
      leave:false,
      join:false,
      startTime:"",
      startWeek:"",
      toast_text:"",
      person:{},
      kv:{},
      showToast: false,
      }
    },
    methods: {
      async __fetchUser(){
        const [err, resp] = await this.$sync(this.$http.police.getAllUser());
          if(!err){
            this.total = resp.result.length;
          }
      },
      async __fetchActivity(){
        const [err, resp] = await this.$sync(
          this.$http.police.activityList({
            userId:this.person.id
          }
        ));
        
          if(!err){
            this.infoActivity = resp.result.infoActivity; 
            this.startTime = resp.result.startTime.slice(0,16)
            this.startWeek = resp.result.week
          }else{
            this.toast_text =  "请重试"
            this.toast()
          }
      },
      __fetchPerson(){
        this.kv.userId = this.person.id
        if(this.person.isManager == 1){
          this.isManager = true
        }
      },
      async __fetch(){
        await this.__fetchPerson()
        await this.__fetchUser()
        await this.__fetchActivity()
      },
      toast() {
        const self = this;
        this.showToast = true;
        setTimeout(function() {
          self.showToast = false;
        }, 2000);
      },
      inEdit(){
        if(!this.edit){
          this.edit = true;
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
    created() {
      this.person = this.$route.query
      this.__fetch();
    },
    
  };
</script>

