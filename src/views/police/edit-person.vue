<style lang="scss">
[rs-view="edit-person"] {
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
</style>

<template>
  <div rs-view="edit-person">
    <top-head
      v-if="isManager"
      :title="title"
      :right="right"
      :left="left"
      @change="change"
      @delete="Delete"
    ></top-head>
    <top-head v-else :title="title" :left="left" @change="change" @delete="Delete"></top-head>
    <div class="top">
      <dialog-join
        :showToast="join"
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
          <li v-show="isManager">
            <img :src="getLocalMduImg('police','redadd')" alt class="add" @click="add">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { setTimeout } from "timers";
export default {
	name: "edit-person",
	data() {
		return {
			isShowUsers: true,
			atPerson: 0,
			allPerson: 20,
			list: [],
			title: "全部参与人员",
			right: "编辑",
			isManager: false,
			left: "",
			id: 0,
			join: false,
			text: "",
			isEdit: true,
			N: 0,
			arr: [],
			Num: 0,
			B: [],
			delArr: []
		};
	},
	components: {
		topHead: () =>
			import(/* webpackChunkName:"police-header" */ "~v/police/__wc__/header/header.vue"),
		dialogJoin: () =>
			import(/* webpackChunkName: "signUp" */ "~v/police/__wc__/join-class.vue")
	},
	methods: {
		async __fetchUser() {
			const [err, resp] = await this.$sync(
				this.$http.police.getAllUser()
			);
			if (!err) {
				this.list = resp.result;
				this.atPerson = this.list.length;
				console.log(this.list);
			}
		},
		async __fetch() {
			await this.__fetchUser();
		},
		change(e) {
			this.right = e;
			if (this.right == "完成") {
				this.left = "删除";
			} else {
				this.left = "";
			}
		},
		changeImg(index) {
			// console.log(index + 1);
			this.cartData[index].isSelect = !this.cartData[index].isSelect;
			this.$set(this.cartData, index, this.cartData[index]);
			var P = this.cartData[index].id;
			this.arr.push(P);
			let A = this.arr;
			this.B = [];
			let C = {};
			for (var i = 0; i < A.length; i++) {
				var item = A[i];
				if (C[item]) {
					C[item] = C[item] + 1;
				} else {
					C[item] = 1;
				}
			}
			for (let K in C) {
				if (C[K] % 2 == 1) {
					this.B.push(K);
				}
			}
			this.delArr = this.B.join("##");
		},
		Cancel() {
			this.join = false;
		},

		async Confirm(index) {
			//发请求
			console.log(this.delArr);
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
				this.join = false;
				Indicator.close();
				location.reload();
			} else {
				this.join = false;
				Indicator.close();
			}
		},
		Delete() {
			var R = this.cartData;
			this.N = 0;
			for (let i of R) {
				if (i.isSelect) {
					this.N++;
				}
			}
			if (this.N !== 0) {
				this.join = !this.join;
			}
		},
		add() {
			this.$router.push({
				path: "/add-person",
				query: {
					isManager: 1
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
		console.log(this.$route.query);
		if (this.$route.query.query == 1) {
			this.isManager = true;
		} else {
			this.isManager = false;
		}
		if (this.$route.query.isManager == 1) {
			this.isManager = true;
		}
		await this.__fetch();
		let nowList = this.list;
		nowList.forEach(item => (item.isSelect = false));
		this.cartData = nowList;
	}
};
</script>