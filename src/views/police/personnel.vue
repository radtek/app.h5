<!--<style lang="scss">-->
  <!--@import "../../assets/modules/police/view-person.scss";-->
<!--</style>-->
<!--<template>-->
    <!--&lt;!&ndash;<div class="person">&ndash;&gt;-->
      <!--&lt;!&ndash;<Header left="取消"&ndash;&gt;-->
              <!--&lt;!&ndash;right="完成"&ndash;&gt;-->
              <!--&lt;!&ndash;title="选择参与人员"></Header>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="person-header"><div></div><div></div><div></div></div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="list">&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="list-header">A</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="list-item" v-for="i in person">&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="choose">&ndash;&gt;-->
            <!--&lt;!&ndash;<input type="checkbox" :id="i.id" >&ndash;&gt;-->
            <!--&lt;!&ndash;<label :for="i.id" :class="[isWebp()?'labelWebp':'']">&ndash;&gt;-->
            <!--&lt;!&ndash;</label>&ndash;&gt;-->
          <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="list-pic"><div></div></div>&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="person-name">{{i.name}}</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--&lt;!&ndash;<div class="aside">&ndash;&gt;-->
        <!--&lt;!&ndash;<ul>&ndash;&gt;-->
          <!--&lt;!&ndash;<li v-for="i in cityData">{{i}}</li>&ndash;&gt;-->
        <!--&lt;!&ndash;</ul>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</div>&ndash;&gt;-->
	<!--<mt-index-list>-->
		<!--<mt-index-section  v-for="item in alphabet" :index="item.initial">-->
			<!--<mt-cell v-for="cell in item.cells" :title="cell"></mt-cell>-->
		<!--</mt-index-section>-->
	<!--</mt-index-list>-->
<!--</template>-->

<!--<script>-->
	<!--import Vue from 'vue'-->
<!--import { utils } from "~rx";-->
<!--import { IndexList, IndexSection } from 'mint-ui';-->
	<!--import { Cell } from 'mint-ui';-->
	<!--Vue.component(Cell.name, Cell);-->
<!--Vue.component(IndexList.name, IndexList);-->
<!--Vue.component(IndexSection.name, IndexSection);-->
	<!--const NAMES = ['Aaron', 'Alden', 'Austin', 'Baldwin', 'Braden', 'Carl', 'Chandler', 'Clyde', 'David', 'Edgar', 'Elton', 'Floyd', 'Freeman', 'Gavin', 'Hector', 'Henry', 'Ian', 'Jason', 'Joshua', 'Kane', 'Lambert', 'Matthew', 'Morgan', 'Neville', 'Oliver', 'Oscar', 'Perry', 'Quinn', 'Ramsey', 'Scott', 'Seth', 'Spencer', 'Timothy', 'Todd', 'Trevor', 'Udolf', 'Victor', 'Vincent', 'Walton', 'Willis', 'Xavier', 'Yvonne', 'Zack', 'Zane'];-->
<!--export default {-->
  <!--components: {-->
			<!--Header: () =>-->
				<!--import(/* webpackChunkName:"wc-header" */ "@/views/police/__wc__/header/header.vue").then(-->
					<!--utils.fixAsyncCmpLifeCycle-->
				<!--),-->
		<!--},-->
  <!--data(){-->
    <!--return {-->
      <!--cityData:[],-->
      <!--person:[],-->
		<!--alphabet: []-->
    <!--}-->
  <!--},-->
	<!--created(){-->
		<!--'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(initial => {-->
			<!--let cells = NAMES.filter(name => name[0] === initial);-->
			<!--this.alphabet.push({-->
				<!--initial,-->
				<!--cells-->
			<!--});-->
		<!--});-->
	<!--},-->
  <!--methods: {-->
    <!--__fetch(){-->
      <!--this.person=[-->
        <!--{name:"钢铁侠",id:"1"},-->
        <!--{name:"蜘蛛侠",id:"2"},-->
        <!--{name:"铁蛋侠",id:"3"},-->
        <!--{name:"钢铁侠",id:"4"},-->
        <!--{name:"蜘蛛侠",id:"5"},-->
        <!--{name:"铁蛋侠",id:"6"},-->
        <!--{name:"钢铁侠",id:"7"},-->
        <!--{name:"蜘蛛侠",id:"8"},-->
        <!--{name:"铁蛋侠",id:"9"}];-->
    <!--}-->
  <!--},-->
  <!--mounted(){-->
    <!--this.__fetch();-->
  <!--}-->
<!--}-->
<!--</script>-->