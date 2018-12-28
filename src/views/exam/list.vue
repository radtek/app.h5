<!-- app端的首页：展示当前用户的所有考试列表 -->
<style lang="scss">
  [rs-view="exam.list"] {
  	.rx-pull-wrap {
  		background-color: transparent;
  	}

  	padding: 20px 30px;
  	background-color: #f5f5f5;

  	.exam-statusbar {
  		margin: 20px 0;
  	}

  	.exam-item {
  		margin-bottom: 20px;
  	}

  	.empty {
  		text-align: center;
  		img {
  			width: 292px;
  			height: 233px;
  			margin: auto;
  			margin-top: 193px;
  		}
  		p {
  			color: #999;
  			font-size: 28px;
  			margin-top: 19px;
  		}
  	}
  	.item-warp {
  		margin-bottom: 40px;
  	}
  }
</style>

<template>
  <section rs-view="exam.list">
    <rx-pull ref="pull"
             :up="up"
             :down="down"
             @uping="handleUp"
             @downing="handleDown"
             @scroll-end="handleScrollEnd"
             :list="list"
             :total="total">
      <rx-pull-down slot="down"></rx-pull-down>
      <rx-pull-up slot="up"></rx-pull-up>
      <template v-if="list && list.length">
        <div v-for="(item,index) in list"
             :key="index"
             class="item-warp">
          <status-bar :state="item.state"
                      v-if="item.childs && item.childs.length"></status-bar>
          <exam-item v-for="(it,idx) in item.childs"
                     :key="idx"
                     :item="it"></exam-item>
        </div>
      </template>
      <div class="empty"
           v-else>
        <img :src="getLocalMduImg('exam','empty')" />
        <p>暂无任何答题测试信息哦</p>
      </div>
    </rx-pull>
  </section>
</template>

<script>
  import Pull from "~m/pull";
  export default {
  	name: "ExamList",
  	components: {
  		statusBar: () =>
  			import(/* webpackChunkName:"wc.exam.statusbar" */ "~c/exam/status-bar.vue"),
  		examItem: () =>
  			import(/* webpackChunkName:"wc.exam.item" */ "~c/exam/list-item.vue")
  	},
  	mixins: [Pull],
  	data() {
  		return {
  			list: [],
  			total: 0,
  			page: 1,
  			pageSize: 100
  		};
  	},
  	methods: {
  		__fetch() {
  			return this.$http.exam
  				.getListOfUser({
  					userId: this.authInfo.userId,
  					page: this.page,
  					pageSize: this.pageSize
  				})
  				.then(data => {
  					if (
  						data.result &&
  						data.result.list &&
  						data.result.list.length
  					) {
  						const list = data.result.list.sort((a, b) =>
  							a.state <= b.state ? 1 : -1
  						);

  						this.total = data.result.total;

  						const newList = [[], [], []];
  						list.forEach(item => {
  							switch (item.state) {
  								case 1:
  									newList[2].push(item);
  									break;
  								case 2:
  									newList[1].push(item);
  									break;
  								case 3:
  									newList[0].push(item);
  									break;
  								default:
  									break;
  							}
  						});
  						this.list = newList.map((it, index) => ({
  							state: Math.abs(3 - index),
  							childs: it
  						}));
  					}
  				});
  		}
  	},
  	activated() {
  		if (!this.$isDev) {
  			JXRSApi.app.exam.tellNativeIsExamIndex();
  		}
  		this.__fetch();
  	}
  };
</script>
