<style lang="scss">
  @import "../../assets/modules/police/view-signUp.scss";
</style>
<template>
    <div class="sign-up">
        <div class="sign-content" v-for="i,index in rows">
            <div class="header">
                <span class="left">{{formatDate(index)}} {{i.week}}  (16/21人已报名)</span>
                <div class="right">
                    <span @click="goto('查看参与人员','view-person')">查看全部</span>
                    <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
                </div>
            </div>
            <div class="main">
                <span class="left"><div class="head"></div><div class="head"></div><div class="head"></div></span>
                <div class="right"><img :src="getLocalMduImg('police','button')"></div>
            </div>
            <div class="footer">5人请假，还可以抢名额</div>
        </div>
        <div class="more">
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
        }
    },
    methods: {
        formatDate(i){
            return utils.formatDate(this.rows[i].startTime,"yyyy-MM-dd hh:mm")
        },
        async __fetchActivity(){
            const [err, resp] = await this.$sync(this.$http.police.getInfoActivity());
          if(!err){
            this.rows = resp.result.infoActivityPlanList
          }
        },
        __fetch(){
            this.__fetchActivity()
        }
    },
    created(){
        this.__fetch()
    }
}
</script>

