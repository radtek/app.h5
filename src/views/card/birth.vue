<style lang="scss">
	[rs-view="birth"] {
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}

		.rx-btn {
			background: #eb5820;
			border-radius: 8px;
			position: absolute;
			bottom: 80px;
			left: 50%;
			transform: translateX(-50%);
			width: 240px;
			line-height: 64px;

			span {
				font-size: 36px;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #fff;
			}
		}

		.abs {
			position: absolute;
			z-index: 1;
			color: #eb5820;
			font-size: 40px;
			font-weight: bolder;
		}

		.name {
			font-size: 55px;
		}
	}
</style>

<template>
	<section rs-view="birth">
		<img :src="img"
		     v-if="img" />
		<span class="abs name"
		      :style="nameStyle">{{cn}}</span>
		<span class="abs year"
		      :style="yearStyle">{{year}}</span>
		<span class="abs month"
		      :style="monthStyle">{{month}}</span>
		<span class="abs day"
		      :style="dayStyle">{{day}}</span>
		<rx-btn @on-click="handleClick">收到祝福</rx-btn>
	</section>
</template>

<script>
	export default {
		name: "PageOfBirth",
		data() {
			return {
				cn: "",
				year: "",
				month: "",
				day: "",
				img: "",
				position: {}
			};
		},
		computed: {
			nameStyle() {
				const style = {};

				if (this.position.nameTop >= 0 && this.position.nameLeft >= 0) {
					style.top = this.position.nameTop * 100 + "%";
					style.left = this.position.nameLeft * 100 + "%";
				}

				return style;
			},
			yearStyle() {
				const style = {};

				if (this.position.yearTop >= 0 && this.position.yearRight) {
					style.top = this.position.yearTop * 100 + "%";
					style.right = this.position.yearRight * 100 + "%";
				}

				return style;
			},
			monthStyle() {
				const style = {};

				if (this.position.monthTop >= 0 && this.position.monthRight) {
					style.top = this.position.monthTop * 100 + "%";
					style.right = this.position.monthRight * 100 + "%";
				}

				return style;
			},
			dayStyle() {
				const style = {};

				if (this.position.dayTop >= 0 && this.position.dayLeft) {
					style.top = this.position.dayTop * 100 + "%";
					style.left = this.position.dayLeft * 100 + "%";
				}

				return style;
			}
		},
		methods: {
			handleClick() {
				if (!this.$isDev) {
					JXRSApi.view.close();
				}
			},
			__initCNAndTime(cn, birth) {
				this.cn = decodeURIComponent(cn);
				if (birth) {
					const date = new Date(birth);
					this.year = date.getFullYear();
					this.month = date.getMonth() + 1;
					this.day = date.getDate();
					this.month = this.month > 9 ? this.month : "0" + this.month;
					this.day = this.day > 9 ? this.day : "0" + this.day;
				}
			}
		},
		created() {
			this.getQS("id");
			if (this.id) {
				this.$http.card
					.getConfig({
						passport: this.authInfo.passport,
						infoCardBirthdayId: this.id
					})
					.then(data => {
						if (data) {
							if (data.result.paramJson) {
								const userInfo = JSON.parse(data.result.paramJson);

								this.__initCNAndTime(
									userInfo.userName,
									parseInt(userInfo.joinTime, 10)
								);
							}

							if (data.result.h5) {
								const h5 = JSON.parse(data.result.h5);
								this.img = h5.img;
								this.position = h5.position;
							}
						}
					})
					.catch(() => {
						this.img =
							"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/w73x8GdhMW%40bg-1.png?Expires=43020012813&OSSAccessKeyId=LTAIO6w6CI0rif2M&Signature=6c0or4fHIz3IXUdsoeH4ne03H%2BQ%3D";
						this.position = {
							nameTop: 276 / 667,
							nameLeft: 91 / 375,
							yearTop: 328 / 667,
							yearRight: 89 / 375,
							monthTop: 328 / 667,
							monthRight: 45 / 375,
							dayTop: 360 / 667,
							dayLeft: 25 / 375
						};

						this.__initCNAndTime("出错了");
					});
			}
		}
	};
</script>

