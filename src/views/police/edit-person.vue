<style lang="scss">
[rs-view="edit-person"] {
	display: flex;
	min-height: 100%;
	text-decoration: none;
	width: 100%;
	height: 100%;
	flex-direction: column;
	.body {
		flex: 1;
		overflow-y: scroll;
		display: flex;
		background: rgba(245, 245, 245, 1);
		.index {
			flex: 1;
			// position: relative;
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

				.icon_head {
					width: 100px;
					position: relative;
					background: #000;
					border-radius: 50%;
					height: 100px;
				}

				.icon1 {
					width: 100px;
					height: 100px;
					border-radius: 50%;
					opacity: 0.6;
					filter: alpha(opacity=60);
				}
				.icon {
					width: 100px;
					height: 100px;
					border-radius: 50%;
				}

				.circle {
					background: url(../../assets/modules/police/imgs/circle.png)
						no-repeat;
					background-size: 36px 36px;
					width: 36px;
					height: 36px;
					position: absolute;
					top: 32px;
					left: 32px;
				}
				.pitch {
					background: url(../../assets/modules/police/imgs/pitch.png)
						no-repeat;
					background-size: 100% 100%;
					width: 36px;
					height: 36px;
					position: absolute;
					top: 32px;
					left: 32px;
				}
				.name {
					width: 120px;
					text-align: center;
					margin-top: 10px;
					margin-bottom: 30px;
					font-size: 28px;
					font-family: PingFang-SC-Medium;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
			}
		}
	}
}
</style>

<template>
  <div rs-view="edit-person">
    <div class="body">
      <div class="index">
        <top-head
          v-if="isManager == 1"
          :title="title"
          :right="right"
          :left="left"
          :router="router"
          @change="change"
          @delete="Delete"
        ></top-head>
        <top-head
          v-else
          :title="title"
          :left="left"
          :router="router"
          @change="change"
          @delete="Delete"
        ></top-head>
        <div class="top">
          <dialog-join
            :showToast="isShow"
            :isView="isEdit"
            :text="num"
            @doCancel="Cancel"
            @doConfirm="Confirm"
          ></dialog-join>
          <div class="title1">
            <img :src="getLocalMduImg('police','line')" alt class="line">
            <span class="fw">参与人员({{atPerson}})</span>
          </div>
          <div class="content">
            <ul>
              <li v-for="(q,index) in list" :key="index">
                <div class="person">
                  <div class="icon_head">
                    <img :src="q.iconUrl" :class="[right == '完成'?'icon1':'icon']">
                    <div
                      class="circle"
                      :class="{pitch:q.isSelect}"
                      v-show="right=='完成'"
                      @click="changeImg(index)"
                    ></div>
                  </div>

                  <div class="name">{{q.name}}</div>
                </div>
              </li>
              <li v-show="isManager == 1 && right=='编辑'">
                <img :src="getLocalMduImg('police','redadd')" alt class="add" @click="add">
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
	  <toast :text="toast_text" :showToast="showToast"></toast>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { utils } from "~rx";
export default {
	name: "edit-person",
	data() {
		return {
			isShowUsers: true,
			atPerson: 0,
			allPerson: 20,
			list: [],
			router: "index",
			title: "全部参与人员",
			right: "编辑",
			isManager: localStorage.getItem("isManager"),
			left: "",
			id: 0,
			isShow: false,
			text: "",
			isEdit: true,
			N: 0,
			arr: [],
			Num: 0,
			arr1: [],
			delArr: [],
			showToast: false,
			toast_text: "",
			router: "index"
		};
	},
	components: {
		topHead: () =>
			import(/* webpackChunkName:"top-header" */ "~v/police/__wc__/header/header.vue").then(
				utils.fixAsyncCmpLifeCycle),
		dialogJoin: () =>
			import(/* webpackChunkName: "dialog-join" */ "~v/police/__wc__/join-class.vue").then(
				utils.fixAsyncCmpLifeCycle),
		toast: () =>
			import(/* webpackChunkName:"toast" */ "~v/police/__wc__/phone-toast.vue").then(
				utils.fixAsyncCmpLifeCycle)
	},
	methods: {
		toast() {
			const self = this;
			this.showToast = true;
			setTimeout(function() {
				self.showToast = false;
			}, 2000);
		},
		async __fetchUser() {
			const [err, resp] = await this.$sync(
				this.$http.police.getAllUser()
			);
			if (!err) {
				this.list = resp.result;
				this.atPerson = this.list.length;
				let nowList = this.list;
				nowList.forEach(item => (item.isSelect = false));
				this.cartData = nowList;
			}
		},
		async __fetch() {
			await this.__fetchUser();
		},
		change(e) {
			this.right = e;
			if (this.right === "完成") {
				this.left = "删除";
			} else {
				this.left = "";
			}
		},
		changeImg(index) {
			this.cartData[index].isSelect = !this.cartData[index].isSelect;
			this.$set(this.cartData, index, this.cartData[index]);
			const Pid = this.cartData[index].id;
			this.arr.push(Pid);
			let Arr = this.arr;
			this.arr1 = [];
			let Obj = {};
			for (let i = 0; i < Arr.length; i++) {
				const item = Arr[i];
				if (Obj[item]) {
					Obj[item] = Obj[item] + 1;
				} else {
					Obj[item] = 1;
				}
			}
			for (let K in Obj) {
				if (Obj[K] % 2 == 1) {
					this.arr1.push(K);
				}
			}
			this.delArr = this.arr1.join("##");
		},
		Cancel() {
			this.isShow = false;
		},

		async Confirm(index) {
			//发请求
			Indicator.open({
				text: "删除中..",
				spinnerType: "snake"
			});
			const [err, resp] = await this.$sync(
				this.$http.police.delUser({
					userIds: this.delArr
				})
			);
			if (!err) {
				this.isShow = false;
				Indicator.close();
				await this.__fetch();
				this.arr=[]
			} else {
				this.isShow = false;
				this.toast_text =err.msg;
				this.toast();
				Indicator.close();
			}
		},
		Delete() {
			const R = this.cartData;
			this.N = 0;
			for (let i of R) {
				if (i.isSelect) {
					this.N++;
				}
			}
			if (this.N !== 0) {
				this.isShow = !this.isShow;
			}
		},
		add() {
			this.$router.push({
				path: "/add-person",
				query: {
					isManager: localStorage.getItem("isManager")
				}
			});
		}
	},
	computed: {
		leaveP: function() {
			return this.allPerson - this.atPerson;
		},
		num: function() {
			return `确定要删除${this.N}个学员吗`;
		}
	},
	async activated() {
		await this.__fetch();
		
	}
};
</script>