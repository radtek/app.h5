<style lang="sass">
@import "../../assets/modules/score/view-heart_help.scss"
</style>

<template>
  <rx-pull ref="pull"
           :list="[]"
           :total="0"
           :down="false"
           :up="false">
    <div rs-view="heart_help">
      <ul class="container">
        <li v-for="(item,index) in list"
            :key="index">
          <div class="header"
               :class="[{active:item.isExpand}]"
               @click.stop="onClick(item)">{{item.title}}</div>
          <collapse-transition>
            <div class="content"
                 v-show="item.isExpand"
                 v-html="__convertBr(item.value)"></div>
          </collapse-transition>
        </li>
      </ul>
    </div>
  </rx-pull>
</template>

<script>
  import Pull from "~m/pull";
  export default {
  	name: "PageOfHeartHelp",
  	mixins: [Pull],
  	data() {
  		return {
  			list: []
  		};
  	},
  	methods: {
  		__convertBr(val) {
  			return val.replace(/\n/g, "<br/>");
  		},
  		onClick(item) {
  			const preExpand = item.isExpand;
  			this.list.forEach(item => (item.isExpand = false));
  			item.isExpand = !preExpand;
  		}
  	},
  	activated() {
  		this.$http.heart.getDesps().then(res => {
  			res.result.forEach(item => (item.isExpand = false));
  			this.list = res.result;
  		});
  	}
  };
</script>
