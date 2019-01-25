<style lang="scss">
[rs-view="login"] {
	background: url(../../assets/modules/police/imgs/bg.png) no-repeat center;
	background-size: 100% 100%;
	width: 100%;
	.input {
		background: rgba(246, 246, 246, 1);
		opacity: 0.8;
		border: none;
		font-size: 32px;
		line-height: 28px;
	}
	header {
		text-align: center;
		font-size: 32px;
		font-family: PingFang-SC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 48px;
		padding-top: 40px;
		margin-bottom: 128px;
	}
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		.phone {
			width: 660px;
			height: 98px;
			border-radius: 49px;
			background: rgba(246, 246, 246, 1);
			opacity: 0.8;
			border: 1px solid rgba(0, 151, 238, 1);
			display: flex;
			align-items: center;
			position: relative;
			.phone_icon {
				width: 32px;
				height: 32px;
				margin-left: 28px;
				margin-right: 16px;
			}
			.input_phone {
				line-height: 80px;
				width: 65%;
			}

			.input_phone::-ms-cancel {
				display: none;
			}
			.input_phone:valid + .cancel {
				display: inline;
			}
		}

		.login_btn {
			width: 649px;
			height: 110px;
			border: 2px solid rgba(255, 255, 255, 1);
			border-radius: 55px;
			text-align: center;
			margin-top: 162px;
			display: flex;
			justify-content: center;
			align-items: Center;
			.login_text {
				font-size: 36px;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
			}
		}
	}
	.cancel {
		width: 20%;
		text-align: center;
		display: none;
		img {
			width: 36px;
			height: 36px;
		}
	}
	.phone_box{
		width: 15%;
	}
}
</style>

<template>
  <div rs-view="login">
    <header>登录页面</header>
    <main>
      <div class="phone">
        <div class="phone_box">
          <img :src="getLocalMduImg('police','phone')" class="phone_icon">
        </div>

        <input
          ref="phone"
          id="phone"
          type="text"
          class="input_phone input"
          maxlength="11"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          placeholder="请输入手机号"
          v-model="num"
          required
        >
        <div class="cancel">
          <img :src="getLocalMduImg('police','cancel1')" @click="clear()" v-show="this.num !=''">
        </div>

        <toast :text="toast_text" :showToast="showToast"></toast>
      </div>

      <div class="login_btn" @click="login()">
        <div class="login_text">立即登录</div>
      </div>
    </main>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

export default {
	name: "login",
	data() {
		return {
			num: "",
			little_time: 60,
			getCode: "获取验证码",
			toast_text: "",
			showToast: false,
			phoneN: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
			click: 0
		};
	},
	components: {
		toast: () =>
			import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
	},
	methods: {
		clear() {
			this.num = "";
		},

		async login() {
			const Num = this.num;
			if (Num == "") {
				this.toast_text = "请输入手机号";
				this.toast();
			} else if (!this.phoneN.test(Num)) {
				this.toast_text = "手机号格式错误";
				this.toast();
			} else if (this.phoneN.test(Num)) {
				//发请求
				Indicator.open({
					text: "登录中..",
					spinnerType: "snake"
				});
				this.__fetch();
			}
		},
		toast() {
			const self = this;
			this.showToast = true;
			setTimeout(function() {
				self.showToast = false;
			}, 2000);
		},
		async __fetchLogin() {
			const [err, res] = await this.$sync(
				this.$http.police.login({ phone: this.num })
			);
			if (!err) {
			if(res.STATUS===true){
				// 存储信息;
				localStorage.setItem('id',res.result.id)
				localStorage.setItem('isManager',res.result.isManager)
				const curTime= new Date().getTime();
				localStorage.setItem("userName", JSON.stringify({phone:this.num,time:curTime}));
				Indicator.close();
				this.$router.push({
					path: "/index"
				});
			}
			} else {
				Indicator.close();
				this.toast_text = err.msg;
				this.toast();
			}
		},
		async __fetch() {
			await this.__fetchLogin();
		}
	},
	created() {}
};
</script>

