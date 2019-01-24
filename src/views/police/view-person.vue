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
			word-break: break-all;
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
        <span class="fw">参与人员({{list1.length}}/21)</span>
      </div>
      <div class="content">
        <ul>
          <li v-for="(q,index) in list1" :key="index">
            <div class="person">
              <img :src="q.icon_url" class="head_icon">
              <div>{{q.name}}</div>
            </div>
          </li>
          <li v-show="atP > 0">
            <img :src="getLocalMduImg('police','redadd')" alt class="add" @click="dialogJoin">
          </li>
        </ul>
      </div>
      <dialog-join :showToast="join" :text="text" @doCancel="Cancel" @doConfirm="Confirm"></dialog-join>
    </div>
    <div class="separate" v-show="isShowUsers && list2.length > 0"></div>

    <div class="top" v-show="list2.length > 0">
      <div class="title1">
        <img :src="getLocalMduImg('police','line')" alt class="line">
        <span class="fw">请假人员({{list2.length}})</span>
      </div>
      <div class="content">
        <ul>
          <li v-for="(q,index) in list2" :key="index">
            <div class="person">
              <img :src="q.icon_url" class="head_icon">
              <div>{{q.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

export default {
	name: "view-person",
	data() {
		return {
			isShowUsers: true,
			atPerson: "",
			allPerson: "",
			list: [],
			list1: [],
			list2: [],
			title: "参与人员",
			join: false,
			text: "该课程还有剩余名额，是否加入？",
			person: {}
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
		Cancel() {
			this.join = false;
		},
		async Confirm() {
			Indicator.open({
				text: "正在加入..",
				spinnerType: "snake"
			});
			await this.__fetchRob();
		},
		async __fetchDetails() {
			this.person = this.$route.query;
			const [err, resp] = await this.$sync(
				this.$http.police.listForCouse({
					priorityNo: this.person.priorityNo
				})
			);
			console.log(err, resp);
			if (!err && resp.STATUS) {
				console.log(resp);
				this.list = resp.result.listForCouse;
				console.log(this.list);
				this.list1 = this.list.filter(function(item, index, array) {
					return item.is_leave == 0;
				});
				console.log(this.list1);
				this.list2 = this.list.filter(function(item, index, array) {
					return item.is_leave == 1;
				});
			}
		},
		async __fetchRob() {
			this.person = this.$route.query;
			console.log(this.person.priorityNo)
			console.log(this.person.id)
			const [err, resp] = await this.$sync(
				this.$http.police.robbingClass({
					priorityNo: this.person.priorityNo,
					userId: this.person.id
				})
			);
			console.log(err, resp);
			if (!err && resp.STATUS) {
				Indicator.close();
				this.join = false;
			} else {
				Indicator.close();
				this.join = false;
				alert('抢课失败')
			}
		},
		async __fetch() {
			await this.__fetchDetails();
		}
	},
	computed: {
		atP: function() {
			return 21 - this.list1.length;
		}
	},
	async created() {
		await this.__fetch();
	}
};
</script>