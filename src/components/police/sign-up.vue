<style lang="scss">
@import "../../assets/modules/police/view-signUp.scss";
</style>
<template>
    <div class="sign-up">
        <div class="sign-content" v-for="(i,index) in rows" :key="index">
            <div class="header">
                <span class="left">{{formatDate(index)}} {{i.week}}  ({{i.total}}/21人已报名)</span>
                <div class="right">
                    <router-link :to="{path:'/view-person',query:{priority_no:i.priority_no,userId:person.id}}">
                    <span>查看全部</span>
                    </router-link>
                    <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
                </div>
            </div>
            <div class="main">
                <span class="left"><div class="head" v-for="(url,index) in i.iconUrls" :key="index"><img  :src="url" ></div></span>
                <div class="right" v-if="Add"><img :src="getLocalMduImg('police','button')"
                                        @click="dialogJoin(i)"></div>
            </div>
            <div class="footer" v-if="i.leaveCount">{{i.leaveCount}}人请假，还可以抢名额</div>
            <div class="footer" v-else></div>
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
            leavePeople:[],
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
            if(this.isRefresh){
                this.__fetch()
                this.$emit('doRefresh')
            }
        }
    },
    methods: {
        dialogJoin(i){
        this.$emit('join',i,this.person)
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
            this.rows = resp.result.joinList
            const leave = resp.result.leaveList
            leave.forEach(e => {
                this.leavePeople.push(e.count)
            })
            this.rows.forEach((e,index) => {
              if(e.names){this.rows[index].names =  e.names.split(',')}
              this.total.push(this.rows[index].count)
              if(this.rows[index].iconUrls){
                  this.rows[index].iconUrls =  e.iconUrls.split(',')
              }
              this.rows[index].leaveCount = this.leavePeople[index]
              this.rows[index].total = this.total[index]
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

