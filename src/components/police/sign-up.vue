<style lang="scss">
  @import "../../assets/modules/police/view-signUp.scss";
</style>
<template>
    <div class="sign-up">
        <div class="sign-content">
            <div class="header">
                <span class="left">2019-01-14 周一 20:00 (16/21人已报名)</span>
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
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:{
        personList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

