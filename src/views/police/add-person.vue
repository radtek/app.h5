<style lang="scss">
[rs-view="add-person"] {
	.fw {
		font-size: 32px;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		color: rgba(102, 102, 102, 1);
	}
	.borderB {
		border-bottom: 1px solid rgba(230, 230, 230, 1);
	}
	.content {
		padding: 0 30px;

		.name {
			padding: 50px 0;
			display: flex;
			align-items: center;

			.name1 {
				margin-left: 63px;
				margin-right: 40px;
			}
			div {
				margin-right: 40px;
			}
			input {
                border: 0;
                width: 70%;
			}
			img {
				width: 100px;
				height: 100px;
			}
		}
	}
	.bottom {
		display: flex;
		justify-content: center;
		.btn {
			width: 689px;
			height: 98px;
			background: linear-gradient(
				90deg,
				rgba(255, 115, 52, 1) 0%,
				rgba(255, 80, 58, 1) 100%
			);
			box-shadow: 5px 19px 40px 0px rgba(255, 132, 19, 0.5),
				-1px -24px 37px 6px rgba(255, 93, 50, 0.57);
			border-radius: 49px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 138px;
			button {
				list-style: none;
				border: 0;
				background: none;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
}
</style>
<template>
  <div rs-view="add-person">
    <top-head :title="title"></top-head>
    <div class="content">
      <div class="name fw borderB">
        <div class="name1">姓名:</div>
        <input type="text" placeholder="请输入姓名" v-model="name">
      </div>
    </div>
    <div class="content">
      <div class="name fw borderB">
        <div>手机号码:</div>
        <input
          type="text"
          placeholder="请输入手机号码"
          maxlength="11"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          v-model="num"
        >
      </div>
    </div>
    <div class="content">
      <div class="name fw">
        <div>上传头像:</div>
        <img :src="getLocalMduImg('police','add')" alt>
      </div>
    </div>
    <div class="bottom">
      <div class="btn">
        <button class="fw" @click="add">立即添加</button>
      </div>
    </div>
    <toast :text="toast_text" :showToast="showToast"></toast>
  </div>
</template>

<script>
export default {
	name: "add-person",
	data() {
		return {
			title: "添加参与人员",
			num: "",
			name: "",
			toast_text: "",
			showToast: false,
			phoneN: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
		};
	},
	components: {
		topHead: () =>
			import(/* webpackChunkName:"police-header" */ "~v/police/__wc__/header/header.vue"),

		toast: () =>
			import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
	},
	methods: {
		add() {
			var Num = this.num;
			var Name = this.name;
			if (Name == "") {
				this.toast_text = "请输入姓名";
				this.toast();
			} else if (Num == "") {
				this.toast_text = "请输入手机号";
				this.toast();
			} else if (!this.phoneN.test(Num)) {
				this.toast_text = "手机号格式错误";
				this.toast();
			}else{
                console.log('发请求')
            }
		},
		toast() {
			var self = this;
			this.showToast = true;
			setTimeout(function() {
				self.showToast = false;
			}, 2000);
		}
	}
};
</script>