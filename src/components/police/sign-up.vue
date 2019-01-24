<style lang="scss">
@import "../../assets/modules/police/view-signUp.scss";
</style>
<template>
    <div class="sign-up">
        <div class="sign-content" v-for="(i,index) in rows" :key="index">
            <div class="header">
                <span class="left">{{formatDate(index)}} {{i.week}}  ({{i.total}}/21人已报名)</span>
                <div class="right">
                    <span @click="goto('查看参与人员','view-person',{priority_no:i.priority_no,userId:person.id})">查看全部</span>
                    <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
                </div>
            </div>
            <div class="main">
                <span class="left"><div class="head" v-for="(url,index) in i.iconUrls" :key="index"><img  :src="url" ></div></span>
                <div class="right" v-if="Add"><img :src="getLocalMduImg('police','button')"
                                        @click="dialogJoin(i)"></div>
            </div>
            <div class="footer">5人请假，还可以抢名额</div>
        </div>
      <div class="main">
        <span class="left">
          <div class="head">
          </div>
        </span>
        <div class="right">
          <img :src="getLocalMduImg('police','button')" @click="dialogJoin">
        </div>
      </div>
      <div class="footer">5人请假，还可以抢名额</div>
    <div class="more" v-if="isManager">
      <div class="more-text">没有更多活动了，快来
        <div class="more-button" @click="goto('创建活动','/create-activities')">
          <span>立即创建</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { utils } from "~rx";
export default {
    data(){
        return {
            rows:[],
            imgurl:[],
            activeList:[],
            total:[],
            kv:{},
            Add:true,
            isLeave:[],
            isManager:false
        }
    },
    props: {
        person: {
            type:Object,
            default(){
                return {}
            }      
        },
        isRefresh: {
            type:Boolean,
            default(){
                return false
            }
        }
    },
    watch: {
        total(){
            if(this.total == 21){
                this.Add = false
            }
        },
        isRefresh(){
            console.log(this.isRefresh)
            if(this.isRefresh){
                console.log('一刷新')
                this.__fetch();
            }
        }
    },
    methods: {
        dialogJoin(i){
        this.$emit('join',i)
      },
      __fetchPerson(){
          if(this.person.isManager == 1){
              this.isManager = true
          }
      },
        formatDate(i){
            return utils.formatDate(this.rows[i].start_time,"yyyy-MM-dd hh:mm")
        },
        async __fetchActivity(){
            const [err, resp] = await this.$sync(
                this.$http.police.activityList({
                    userId:this.person.id
                }));
          if(!err){
            this.rows = resp.result.list
            this.rows.forEach((e,index) => {
              this.rows[index].names =  e.names.split(',')
              this.rows[index].userIds = e.userIds.split(',')
              this.rows[index].total = this.rows[index].userIds.length
              if(this.rows[index].iconUrls){
                  this.rows[index].iconUrls =  e.iconUrls.split(',')
              }
            })
            console.log(this.rows)
          }
        },
        __fetch(){
            this.__fetchPerson()
            this.__fetchActivity();
        }
    },
    mounted(){
        this.__fetch()
    },
}
</script>

