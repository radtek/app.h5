<style lang="scss">
  @import "../../assets/modules/police/view-index.scss";
</style>
<template>
<div class="index">
  <div class="body">
      <main class="content">
      <div class="backpic"><img :src="getLocalMduImg('police','yujia')"></div>
      <div class="nav"></div>
      <div class="column">
        <div class="column-input">
          <div class="column-text">
            <p class="column-name">活动名称：瑜伽活动</p>
            <p class="column-action">活动地点：江西省南昌市新建区赣江南大道1366号省公安厅201室</p>
          </div>
        </div>
        <div class="column-icon"><div>抢名额</div>
          <img :src="getLocalMduImg('police','minge')"> 
          
        </div>
        
        <div class="column-footer">
          <div class="jion">已有<span class="red">112</span>人参与活动 &nbsp
          <span class="red">查看全部</span>
          <p class="img"><img :src="getLocalMduImg('police','quanbu')"></p></div>
          <div class="tips">温馨提示：排课按顺序循环进行</div>
        </div>
      </div>
      <sign-up class="sign-up"></sign-up>
    </main>
 </div>
  <footer>
    <div class="left">分享</div>
    <div class="right">请假</div>
  </footer>
</div>
</template>

<script>
  export default {
    name: "PoliceIndex",
    components: {
      signUp: () =>
            import(/* webpackChunkName: "signUp" */ "~c/police/sign-up.vue"),
            
            
    }
  };
</script>

