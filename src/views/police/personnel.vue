<style lang="scss">
  @import "../../assets/modules/police/view-person.scss";
</style>
<template>
    <!--<div class="person">-->
      <!--<Header left="取消"-->
              <!--right="完成"-->
              <!--title="选择参与人员"></Header>-->
      <!--<div class="person-header"><div></div><div></div><div></div></div>-->
      <!--<div class="list">-->
        <!--<div class="list-header">A</div>-->
        <!--<div class="list-item" v-for="i in person">-->
          <!--<div class="choose">-->
            <!--<input type="checkbox" :id="i.id" >-->
            <!--<label :for="i.id" :class="[isWebp()?'labelWebp':'']">-->
            <!--</label>-->
          <!--</div>-->
          <!--<div class="list-pic"><div></div></div>-->
          <!--<div class="person-name">{{i.name}}</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="aside">-->
        <!--<ul>-->
          <!--<li v-for="i in cityData">{{i}}</li>-->
        <!--</ul>-->
      <!--</div>-->
    <!--</div>-->
	<mt-index-list>
    <Header left="取消"
            :right="'完成'+'('+(num)+')'"
            title="选择参与人员"></Header>
    <div class="person-header"><div></div><div></div><div></div></div>
		<mt-index-section  v-for="item in alphabet" :index="item.initial">
			<mt-cell v-for="cell,index in item.cells">
      <div class="choose">
        <input type="checkbox" 
               :id="cell" 
               v-model="checkRows"
               ref="check"
               :value="cell">
        <label :for="cell" :class="[isWebp()?'labelWebp':'']">
        </label>
      </div>
      <div class="list-pic"><div></div></div>
      <div class="person-name">{{cell}}</div>
      </mt-cell>
		</mt-index-section>
	</mt-index-list>
</template>

<script>
import Vue from 'vue'
import { utils } from "~rx";
import { IndexList, IndexSection } from 'mint-ui';
import { Cell } from 'mint-ui';
Vue.component(Cell.name, Cell);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
	const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];
export default {
  components: {
			Header: () =>
				import(/* webpackChunkName:"wc-header" */ "@/views/police/__wc__/header/header.vue").then(
					utils.fixAsyncCmpLifeCycle
				),
		},
  data(){
    return {
      checkRows:[],
      person:[],
      alphabet: [],
      num:0
    }
  },
  watch: {
    checkRows(){
      this.num = this.checkRows.length;
      if(this.num==25){
        this.$refs.check.forEach(check => {
          if(!check.checked){
            check.disabled=true
          }
        })
      }else {
        this.$refs.check.forEach(check => {
          check.disabled=false
        })
      }
    }
  },
	created(){
		'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {
			let cells = NAMES.filter(name => name[0] === initial);
			this.alphabet.push({
				initial,
				cells
			});
		});
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
    },
    getValue(list){
    },
  },
  mounted(){
    this.__fetch();
  }
}
</script>