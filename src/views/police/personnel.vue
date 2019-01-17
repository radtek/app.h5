<style lang="scss">
  @import "../../assets/modules/police/view-person.scss";
</style>
<template>
    <div class="person">
      <div class="header">111</div>
      <div class="list">
        <div class="list-header">A</div>
        <div class="list-item">111</div>
        <div class="list-item">111</div>
        <div class="list-item">111</div>
        <div class="list-item">111</div>
      </div>
      <div class="aside">
        <ul>
          <li v-for="i in cityData">{{i}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data(){
    return {
      cityData:[]
    }
  },
  methods: {
    __fetch(){
      this.cityData = ["A","B","C","D","E","F","G"]
    }
  },
  mounted(){
    this.__fetch();
  }
}
</script>