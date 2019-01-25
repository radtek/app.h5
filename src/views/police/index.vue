<style lang="scss">
  @import "../../assets/modules/police/view-index.scss";
</style>
<template>
  <div class="index">
    <div class="body">
      <main class="content">
        <div class="backpic"><img :src="getLocalMduImg('police','yujia')"></div>
        <div class="nav"
             v-if="isManager == 1">
          <span @click="editChange">编辑</span>
        </div>
        <div class="nav"
             v-else></div>
        <div class="column">
          <div :class="{'column-input':true}">
            <div class="column-text">
              <div class="column-name">
                <span>活动名称：</span>
                <div>{{infoActivity.subject}}</div>
              </div>
              <div class="column-action">
                <span>活动地点：</span>
                <div>{{infoActivity.address}}</div>
              </div>
            </div>
          </div>
          <div class="column-icon"
               @click="robbing">
            <div>抢名额</div>
            <img :src="getLocalMduImg('police','minge')">
          </div>

          <div class="column-footer">
            <div class="jion">已有<span class="red">{{userCount}}</span>人参与活动 &nbsp;
              <router-link :to="{path:'/edit-person',query:{query:isManager}}">
                <span class="red">查看全部</span>
              </router-link>
              <p class="img"><img :src="getLocalMduImg('police','quanbu')"></p>
            </div>
            <div class="tips"
                 v-if="this.startTime">温馨提示：您最近的课程是
              <span class='red'>{{this.startTime}} {{this.startWeek}}</span>
            </div>
            <div class="tips"
                 v-else>温馨提示：
              <span class="nored">排课按顺序循环进行</span>
            </div>
          </div>
        </div>
        <div class="sign-up">
          <course-item v-for="(item,i) in joinListOfCourse"
                       :key="i"
                       @join="dlistJoin"
                       :item="item"
                       :leave-item="leaveListOfCourse[i]"></course-item>
        </div>

      </main>
    </div>
    <footer :class="[isWebp()?'webp':'']">
      <div class="left">分享</div>
      <div class="right"
           @click="isLeave">请假</div>
    </footer>
    <dialog-leave v-model="leave"
									@refresh="__fetch()"
                  :leaveDate="leaveDate"></dialog-leave>
    <dialog-join v-model="join"
								 @refresh="__fetch()"
                 :join-list="joinList"></dialog-join>
    <toast :text="toast_text"
           :showToast="showToast"></toast>
  </div>
</template>

<script>
  export default {
  	name: "PoliceIndex",
  	components: {
  		courseItem: () =>
  			import(/* webpackChunkName:"police.course.item" */ "~v/police/__wc__/course-item.vue"),
  		dialogLeave: () =>
  			import(/* webpackChunkName: "police.dlg.leave" */ "~v/police/__wc__/leave-index.vue"),
  		dialogJoin: () =>
  			import(/* webpackChunkName: "police.dlg.join" */ "~v/police/__wc__/join-index.vue"),
  		toast: () =>
  			import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
  	},
  	data() {
  		return {
  			userCount: 0,
  			infoActivity: {}, // 获取活动详情
  			joinListOfCourse: [],
  			leaveListOfCourse: [],
  			isManager: localStorage.getItem('isManager'),
  			leave: false,
				join: false,
				lJoin:false,
  			listJoin: false,
  			joinData: {},
  			startTime: "",
  			startWeek: "",
  			toast_text: "",
  			leaveDate: [],
  			joinList: [],
  			showToast: false
  		};
  	},
  	methods: {
  		editChange() {
  			this.$router.push({
  				path: "/create-activities",
  				query: {
  					type: "edit"
  				}
  			});
			},
			robbing(){
				if(!this.joinList.length){
					this.toast_text = "没有多余名额~";
					this.toast();
				}else{
					this.join = true
				}

			},
			isLeave(){
				if(!this.leaveDate.length){
					this.toast_text = "暂时没有课程安排~";
					this.toast();
				}else{
					this.leave = true
				}
			},
  		async __fetchJoin() {
  			// 抢课列表数据
  			const [err, resp] = await this.$sync(
  				this.$http.police.listForRob()
  			);
  			if (!err) {
					this.joinList = resp.result.listForRob;
  			}
  		},
  		async __fetchList() {
  			// 请假数据
  			const [err, resp] = await this.$sync(
  				this.$http.police.listForLeave({
  					userId: localStorage.getItem('id')
  				})
  			);
  			if (!err) {
  				this.leaveDate = resp.result.listForLeave;
  			}
  		},
  		async __fetchActivity() {
  			// 列表数据
  			const [err, resp] = await this.$sync(
  				this.$http.police.activityList({
  					userId: localStorage.getItem('id')
  				})
  			);

  			if (!err) {
  				this.infoActivity = resp.result.infoActivity;
  				this.userCount = resp.result.userCount;
  				this.joinListOfCourse = resp.result.joinList;
  				this.leaveListOfCourse = resp.result.leaveList;

  				if (resp.result.startTime) {
  					this.startTime = resp.result.startTime.slice(0, 16);
  					this.startWeek = resp.result.week;
  				}
  			} else {
  				this.toast_text = "数据获取错误，请重新登录";
  				this.toast();
  			}
  		},
  		async __fetch() {
				this.startTime = null
  			await this.__fetchActivity();
  			await this.__fetchList();
  			await this.__fetchJoin();
  		},
  		toast() {
  			this.showToast = true;
  			setTimeout(() => {
  				this.showToast = false;
  			}, 1500);
  		},
  		dlistJoin(i) {
  			this.joinData = i;
  			this.listJoin = true;
  		},
  	},
  	activated() {
			console.log(this.isManager)
  		this.__fetch();
  	}
  };
</script>

