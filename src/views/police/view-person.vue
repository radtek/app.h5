<style lang="scss">
[rs-view="view-person"] {
	.fw {
		font-family: PingFang-SC-Bold;
		font-weight: bold;
	}
	.title1 {
		display: flex;
		align-items: center;
		margin: 0 30px;
		border-bottom: 1px solid rgba(230, 230, 230, 1);
		padding-top: 40px;
		padding-bottom: 18px;
		.line {
			width: 19px;
			height: 41px;
			margin-right: 8px;
		}
		span {
			font-size: 32px;
			color: rgba(102, 102, 102, 1);
		}
	}
	.content {
		margin-top: 40px;
		display: flex;
		padding: 0 20px;
		ul {
			li {
				display: inline-block;
				margin-right: 27.5px;

				.add {
					width: 100px;
					height: 100px;
				}
			}
			li:nth-child(5n) {
				margin-right: 0;
			}
			li:nth-last-child(-n + 5) {
				margin-bottom: 0;
			}
		}
	}
	.person {
		width: 120px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			margin-bottom: 10px;
		}
		div {
			width: 120px;
			text-align: center;
			margin-bottom: 30px;
			font-size: 28px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
		}
	}
}
</style>

<template>
  <div rs-view="view-person">
    <top-head :title="title"></top-head>
    <div class="top">
      <div class="title1">
        <img :src="getLocalMduImg('police','line')" alt class="line">
        <span class="fw">参与人员({{atPerson}}/{{allPerson}})</span>
      </div>
      <div class="content">
        <ul>
          <li v-for="(q,index) in list" :key="index">
            <div class="person">
              <img :src="q.iconUrl" class="head_icon">
              <div>{{q.name}}</div>
            </div>
          </li>
          <li v-show="leaveP > 0">
            <img :src="getLocalMduImg('police','redadd')" alt class="add" @click="dialogJoin">
          </li>
        </ul>
      </div>
      <dialog-join
        :showToast="join"
        :text="text"
        @doCancel="Cancel"
        @doConfirm="Confirm"
      ></dialog-join>
    </div>
    <div class="separate" v-show="isShowUsers && leaveP > 0"></div>

    <div class="top" v-show="leaveP > 0">
      <div class="title1">
        <img :src="getLocalMduImg('police','line')" alt class="line">
        <span class="fw">请假人员({{leaveP}})</span>
      </div>
      <div class="content">
        <ul>
          <li v-for="(q,index) in list" :key="index">
            <div class="person">
              <img :src="q.iconUrl" class="head_icon">
              <div>{{q.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	name: "view-person",
	data() {
		return {
			isShowUsers: true,
			atPerson: 16,
			allPerson: 20,
			list: [],
			title: "参与人员",
			join: false,
			text:'该课程还有剩余名额，是否加入？'
		};
	},
	components: {
		topHead: () =>
			import(/* webpackChunkName:"police-header" */ "~v/police/__wc__/header/header.vue"),
		dialogJoin: () =>
			import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/join-class.vue")
	},
	methods: {
		dialogJoin() {
			this.join = !this.join;
		},
		Cancel(){
			this.join = false;
		},
		Confirm(){
			this.join = false;
		}
	},
	computed: {
		leaveP: function() {
			return this.allPerson - this.atPerson;
		}
	},
	created() {
		this.list = [
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵啊"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵3"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵4"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵5"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵6"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵7"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵8"
			}
		];
	}
};
</script>