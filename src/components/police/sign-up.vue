<style lang="scss">
  @import "../../assets/modules/police/view-signUp.scss";
</style>
<template>
    <div class="sign-up">
        <div class="sign-content">
            <div class="header">
                <span class="left">2019-01-14  &nbsp;&nbsp;周一 &nbsp;&nbsp;20:00 &nbsp;（16/21人已报名）</span>
                <div class="right">
                    <span>查看全部</span>
                    <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
                </div>
            </div>
            <div class="main">
                <span class="left"><div class="head"></div><div class="head"></div><div class="head"></div></span>
                <div class="right"><img :src="getLocalMduImg('police','button')"></div>
            </div>
            <div class="footer">5人请假，还可以抢名额</div>
        </div>
        <div class="sign-content">
            <div class="header">
                <span class="left">2019-01-14  &nbsp;&nbsp;周一 &nbsp;&nbsp;20:00 &nbsp;（16/21人已报名）</span>
                <div class="right">
                    <span>查看全部</span>
                    <div class="img"><img :src="getLocalMduImg('police','quanbu2')"></div>
                </div>
            </div>
            <div class="main">
                <span class="left"><div class="head"></div><div class="head"></div><div class="head"></div></span>
                <div class="right"><img :src="getLocalMduImg('police','button')"></div>
            </div>
            <div class="footer">5人请假，还可以抢名额</div>
        </div>
        <div class="sign-content">
            <div class="header">
                <span class="left">2019-01-14  &nbsp&nbsp周一 &nbsp&nbsp20:00 &nbsp（16/21人已报名）</span>
                <div class="right">
                    <span>查看全部</span>
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

