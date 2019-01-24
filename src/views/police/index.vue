<style lang="scss">
  @import "../../assets/modules/police/view-index.scss";
</style>
<template>
<div class="index">
  <div class="body">
      <main class="content">
      <div class="backpic"><img :src="getLocalMduImg('police','yujia')"></div>
      <div class="nav" v-if="isManager">
        <span  @click="editChange">编辑</span>
        </div>
      <div class="nav" v-else></div>
      <div class="column">
        <div :class="{'column-input':true}">
          <div class="column-text">
            <div class="column-name">
              <span>活动名称：</span> 
              <div >{{infoActivity.subject}}</div></div>
            <div class="column-action">
              <span>活动地点：</span> 
              <div>{{infoActivity.address}}</div></div>
          </div>
        </div>
        <div class="column-icon"
             @click="dialogJoin"><div>抢名额</div>
          <img :src="getLocalMduImg('police','minge')"> 
        </div>
        
        <div class="column-footer">
          <div class="jion">已有<span class="red" @click="goto('全部参与人员','edit-person')">{{total}}</span>人参与活动 &nbsp;
          <span class="red" @click="goto('全部参与人员','edit-person',{query:person.isManager})">查看全部</span>
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
               @join="dlistJoin"
               :person="person"
               :isRefresh="refresh"
               @doRefresh="doRefresh"
               ></sign-up>
      <div class="more" v-if="isManager">
      <div class="more-text">没有更多活动了，快来
        <div class="more-button" @click="goto('创建活动','/create-activities')">
          <span>立即创建</span>
        </div>
      </div>
    </div>
    </main>
 </div>
  <footer :class="[isWebp()?'webp':'']">
    <div class="left">分享</div>
    <div class="right" @click="dialogLeave()">请假</div>
  </footer>
  <dialog-leave :show="leave"
                :kv="kv"
                :leaveDate="leaveDate"
                @doCancel="isLeaveCancel"
                @doSubmit="isLeaveSubmit"></dialog-leave>
  <dialog-join  
                :show="join"
                :kv="kv"
                :joinList="joinList"
                @doCancel="isJoinCancel"
                @doSubmit="isJoinSubmit"></dialog-join>
  <list-join    :show="listJoin"
                :joinData="joinData"
                :kv="kv"
                @doCancel="isJoinCancel"
                @doSubmit="isJoinSubmit"></list-join>
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
      listJoin: () =>
            import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/join-list.vue"),
      toast: () =>
			      import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
    },
    data(){
      return {
      refresh:false,
      infoActivity: [], //获取活动详情
      total:0,
      isManager:false,
      leave:false,
      join:false,
      listJoin:false,
      joinData:{},
      startTime:"",
      startWeek:"",
      toast_text:"",
      person:{},
      leaveDate:[],
      joinList:[],
      kv:{},
      showToast: false,
      }
    },
    methods: {
		editChange(){
    		this.$router.push({
				path:'/create-activities',
				query:{
					type:'edit'
				}
			})
		},
      async __fetchUser(){
        const [err, resp] = await this.$sync(this.$http.police.getAllUser());
          if(!err){
            this.total = resp.result.length;
          }
      },
      async __fetchJoin(){ //抢课列表数据
            const[err,resp] = await this.$sync(this.$http.police.listForRob())
            if(!err){
                this.joinList = resp.result.listForRob
            }
        },
      async __fetchList(){ //请假数据
            const [err, resp] = await this.$sync(this.$http.police.listForLeave({
                userId:this.kv.userId
            }));
          if(!err){
            this.leaveDate = resp.result.listForLeave

          }
        },
      async __fetchActivity(){ //列表数据
        const [err, resp] = await this.$sync(
          this.$http.police.activityList({
            userId:this.person.id
          }
        ));
        
          if(!err){
            this.infoActivity = resp.result.infoActivity; 
            if(this.startTime){
              this.startTime = resp.result.startTime.slice(0,16)
              this.startWeek = resp.result.week
            }
            
          }else{
            this.toast_text =  "数据获取错误，请重新登录"
            this.toast()
          }
      },
      __fetchPerson(){
        this.kv.userId = this.person.id
        if(this.person.isManager == 1){
          this.isManager = true
        }else{
          this.isManager = false;
        }
        
      },
      async __fetch(){
        await this.__fetchPerson()
        await this.__fetchUser()
        await this.__fetchActivity()
        await this.__fetchList()
        await this.__fetchJoin()
      },
      toast() {
        const self = this;
        this.showToast = true;
        setTimeout(function() {
          self.showToast = false;
        }, 2000);
      },
      dialogLeave(){
        this.leave = true;
      },
      dlistJoin(i){
        this.joinData = i
        this.listJoin = true
      },
      dialogJoin(){
        this.join = true;
      },
      doRefresh(){
        if(this.refresh){
        this.refresh = false;
        }
      },
      isLeaveSubmit(){
        this.leave = false;
      },
      isLeaveCancel(){
        if(!this.refresh){
          this.refresh = true
          this.leave= false;
          this.__fetch()
          }
      },
      isJoinSubmit(){
        this.listJoin = false;
        this.join = false;
      },
      isJoinCancel(){
          if(!this.refresh){
          this.refresh = true
          this.listJoin = false;
          this.join = false;
          this.__fetch()
          }
          
      }
    },
    created(){
      if(this.$route.query.id){
      this.person.id = this.$route.query.id
      this.person.isManager = this.$route.query.isManager
      }
      this.__fetch();
    },
    activated() {
      if(this.$route.query.id){
      this.person.id = this.$route.query.id
      this.person.isManager = this.$route.query.isManager
      }
      this.__fetch();
    },
    
  };
</script>

