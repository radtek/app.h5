<style lang="scss">
  @import "../../assets/modules/police/view-signUp.scss";
</style>
<template>
    <div class="sign-up">
        <div class="sign-content" v-for="i,index in rows.list">
            <div class="header">
                <span class="left">{{formatDate(index)}} {{i.week}}  (16/21人已报名)</span>
                <div class="right">
                    <span @click="goto('查看参与人员','view-person')">查看全部</span>
                    <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
                </div>
            </div>
            <div class="main">
                <span class="left"><div class="head"></div><div class="head"></div><div class="head"></div></span>
                <div class="right"><img :src="getLocalMduImg('police','button')"
                                        @click="dialogJoin"></div>
            </div>
            <div class="footer">5人请假，还可以抢名额</div>
        </div>
        <div class="more" v-if="isManager">
            <div class="more-text">没有更多活动了，快来
                <div class="more-button" @click="goto('创建活动','/create-activities')"><span>立即创建</span></div></div>
            
        </div>
    </div>
</template>
<script>
import { utils } from "~rx";
export default {
    data(){
        return {
            rows:[],
            activeList:[],
            isManager:false
        }
    },
    props: {
        person: {
            type:Object,
            default(){
                return {}
            }      
        }
    },
    methods: {
        dialogJoin(){
        this.$emit('join')
      },
      __fetchPerson(){
          if(this.person.isManager == 1){
              this.isManager = true
          }
      },
        formatDate(i){
            return utils.formatDate(this.rows.list[i].start_time,"yyyy-MM-dd hh:mm")
        },
        async __fetchActivity(){
            const [err, resp] = await this.$sync(
                this.$http.police.activityList({
                    userId:this.person.id
                }));
          if(!err){
            this.rows = resp.result
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

