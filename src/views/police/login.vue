<style lang="scss">
[rs-view="login"] {
	background: url(../../assets/imgs/police/bg.png) no-repeat center;
	background-size: 100% 100%;
	width: 750px;
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
		.phone {
			width: 660px;
			height: 98px;
			border-radius: 49px;
			background: rgba(246, 246, 246, 1);
			opacity: 0.8;
			border: 1px solid rgba(0, 151, 238, 1);
			margin-left: 45px;
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
				width: 400px;
			}
			.cancel {
				width: 32px;
				height: 32px;
				right: 61px;
				position: absolute;
				display: none;
			}
			.input_phone::-ms-cancel {
				display: none;
			}
			.input_phone:valid + .cancel {
				display: inline;
			}
		}
		.code {
			margin-top: 32px;
			.input_code {
				margin-left: 34px;
			}
			.get_code {
				outline: none;
				border: none;
				background: rgba(246, 246, 246, 1);
				font-size: 32px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(0, 151, 238, 1);
				line-height: 28px;
				opacity: 0.8;
				position: absolute;
				right: 62px;
			}
			.again_get {
				outline: none;
				border: none;
				font-size: 32px;
				font-family: PingFang-SC-Medium;
				font-weight: 500;
				color: rgba(102, 102, 102, 1);
				opacity: 0.8;
				background: rgba(246, 246, 246, 1);
				line-height: 28px;
			}
		}
		.login_btn {
			width: 649px;
			height: 110px;
			border: 2px solid rgba(255, 255, 255, 1);
			border-radius: 55px;
			text-align: center;
			margin-left: 51px;
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
		.box {
			width: 100%;
			height: 100%;
			z-index: 10;
			position: fixed;
			left: 0;
			top: 0;
			display: flex;
			justify-content: center;
			margin-top: 290px;
		}

		.window {
			width: 392px;
			height: 235px;
			background: rgba(51, 51, 51, 1);
			opacity: 0.8;
			border-radius: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			.x {
				width: 48px;
				height: 48px;
				margin-top: 61px;
			}
			.text {
				font-size: 28px;
				font-family: PingFang-SC-Medium;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);
				margin-top: 50px;
			}
		}
	}
}
</style>

<template>
  <div rs-view="login">
    <header>登录页面</header>
    <main>
      <div class="phone">
        <img src="../../assets/imgs/police/phone.png" class="phone_icon">
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
        <img
          class="cancel"
          src="../../assets/imgs/police/cancel.png"
          @click="clear()"
          v-show="this.num !=''"
        >
      </div>
      <div class="code phone">
        <input
          type="text"
          class="input input_code"
          onkeyup="this.value=this.value.replace(/\D/g,'')"
          placeholder="请输入验证码"
          v-model="code"
        >
        <button class="get_code" @click="get_code()" v-show="isCode">{{getCode}}</button>
        <button class="again_get" v-show="!isCode">再次获取（{{little_time}}）</button>
        <div class="box" v-if="showToast">
          <div class="window">
            <img src="../../assets/imgs/police/x.png" alt class="x">
            <div class="text">{{toast_text}}</div>
          </div>
        </div>
      </div>
      <div class="login_btn">
        <div class="login_text" @click="login()">立即登录</div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			num: "",
			little_time: 60,
			getCode: "获取验证码",
			isCode: true,
			toast_text: "",
			showToast: false,
			code: "",
			phoneN: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
		};
	},
	methods: {
		clear() {
			this.num = "";
		},
		get_code() {
			var Num = this.num;
			if (this.num == "") {
				this.toast_text = "请输入手机号";
				this.toast();
			} else if (!this.phoneN.test(Num)) {
				this.toast_text = "手机号格式错误";
				this.toast();
			} else if (this.phoneN.test(Num)) {
				//发请求
				console.log("要发请求了");
				this.isCode = false;
				this.little_time = 60;
				var Countdown = setInterval(() => {
					this.little_time--;
					if (this.little_time <= 0) {
						this.isCode = true;
						this.getCode = "重新获取";
						clearInterval(Countdown);
					}
				}, 1000);
			}
		},
		login() {
			var Num = this.num;
			var Code = this.code;

			if (Num == "") {
				this.toast_text = "请输入手机号";
				this.toast();
			} else if (!this.phoneN.test(Num)) {
				this.toast_text = "手机号格式错误";
				this.toast();
			}
			if (this.phoneN.test(Num) && Code == "") {
				this.toast_text = "请输入验证码";
				this.toast();
			} else if (this.phoneN.test(Num) && Code != "") {
				//发请求
                console.log("要发请求了");
                localStorage.setItem('username',Num)
			}
		},
		toast() {
			var self = this;
			this.showToast = true;
			setTimeout(function() {
				self.showToast = false;
			}, 2000);
		}
	},
	created() {}
};
</script>

