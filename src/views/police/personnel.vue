<style lang="scss">
  @import "../../assets/modules/police/view-person.scss";
</style>
<template>
    <div class="person">
      <Header left="取消"
              right="完成"
              title="选择参与人员"></Header>
      <div class="person-header"><div></div><div></div><div></div></div>
      <div class="list">
        <div class="list-header">A</div>
        <div class="list-item" v-for="i in person">
          <div class="choose">
            <input type="checkbox" :id="i.id" >
            <label :for="i.id" :class="[isWebp()?'labelWebp':'']">
            </label>
          </div>
          <div class="list-pic"><div></div></div>
          <div class="person-name">{{i.name}}</div>
        </div>
      </div>
      <div class="aside">
        <ul>
          <li v-for="i in cityData">{{i}}</li>
        </ul>
      </div>
    </div>
</template>

<script>
import { utils } from "~rx";
export default {
  components: {
			Header: () =>
				import(/* webpackChunkName:"wc-header" */ "@/views/police/components/header/header.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
		},
  data(){
    return {
      cityData:[],
      person:[],
    }
  },
  methods: {
    __fetch(){
      this.person=[
        {name:"钢铁侠",id:"1"},
        {name:"蜘蛛侠",id:"2"},
        {name:"铁蛋侠",id:"3"},
        {name:"钢铁侠",id:"4"},
        {name:"蜘蛛侠",id:"5"},
        {name:"铁蛋侠",id:"6"},
        {name:"钢铁侠",id:"7"},
        {name:"蜘蛛侠",id:"8"},
        {name:"铁蛋侠",id:"9"}];
      this.cityData = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    }
  },
  mounted(){
    this.__fetch();
  }
}
</script>