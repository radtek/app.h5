<style lang="scss">
	[rs-view="birth"] {
		overflow: hidden;
		position: relative;

		img {
			width: 100%;
			height: 100%;
		}

		.abs {
			position: absolute;
			z-index: 1;
			color: #eb5820;
			font-size: 40px;
			font-weight: bolder;
		}

		.mask,
		.content {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			margin: auto;
		}

		.mask {
			z-index: 1;
			background: #333333;
			opacity: 0.45;
		}

		.content {
			z-index: 2;
		}

		.pane {
			position: relative;
			width: 100%;
			height: 100%;
			z-index: 3;
			color: #653427;
			font-size: 32px;

			$top-basic: 350px;
			$left-basic: 101px;
			$right-basic: 102px;

			&-header {
				position: absolute;
				top: $top-basic;
				left: 0;
				padding-left: $left-basic;
				font-weight: bolder;
				width: 100%;
				padding-right: $right-basic;
			}

			&-body {
				width: 100%;
				position: absolute;
				top: $top-basic + 102px;
				left: 0;
				padding-left: $left-basic;
				padding-right: $right-basic;
				text-indent: 80px;

				.blessing {
					word-break: break-all;
					line-height: 60px;
				}
			}

			.btns {
				margin-top: 80px;
				display: flex;
			}
		}

		.rx-btn {
			background: #f7594c;
			border-radius: 25px;
			line-height: 42px;

			flex: 1;

			margin: 0 60px;

			span {
				font-size: 28px;
				font-weight: 400;
				color: #fff;
				vertical-align: baseline;
			}
		}
	}
</style>

<template>
	<section rs-view="birth">
		<div class="mask"></div>
		<div class="content">
			<div class="pane">
				<img :src="cardInfo.img"
				     v-if="cardInfo.img" />
				<div class="pane-header">
					<span>亲爱的{{userInfo.userName}}</span>
				</div>
				<div class="pane-body">
					<div class="blessing">{{this.birthInfo.blessing}}</div>
					<div class="btns">
						<rx-btn @on-click="handleClick">收到祝福</rx-btn>
						<rx-btn @on-click="gotoNative('生日感言','myBirthSpeech',{speech:birthInfo.speech})">生日感言</rx-btn>
					</div>
				</div>
			</div>

			<!-- <span class="abs name"
			      :style="nameStyle">{{cn}}</span> -->
			<!-- <span class="abs year"
			      :style="yearStyle">{{year}}</span>
			<span class="abs month"
			      :style="monthStyle">{{month}}</span>
			<span class="abs day"
			      :style="dayStyle">{{day}}</span> -->
		</div>
	</section>
</template>

<script>
	export default {
		name: "PageOfBirth",
		data() {
			return {
				// cn: "",
				// year: "",
				// month: "",
				// day: "",
				// img: "",
				// position: {},
				cardInfo: {},
				userInfo: {},
				birthInfo: {}
			};
		},
		// computed: {
		// 	nameStyle() {
		// 		const style = {};

		// 		if (this.position.nameTop >= 0 && this.position.nameLeft >= 0) {
		// 			style.top = this.position.nameTop * 100 + "%";
		// 			style.left = this.position.nameLeft * 100 + "%";
		// 		}

		// 		return style;
		// 	},
		// 	yearStyle() {
		// 		const style = {};

		// 		if (this.position.yearTop >= 0 && this.position.yearRight) {
		// 			style.top = this.position.yearTop * 100 + "%";
		// 			style.right = this.position.yearRight * 100 + "%";
		// 		}

		// 		return style;
		// 	},
		// 	monthStyle() {
		// 		const style = {};

		// 		if (this.position.monthTop >= 0 && this.position.monthRight) {
		// 			style.top = this.position.monthTop * 100 + "%";
		// 			style.right = this.position.monthRight * 100 + "%";
		// 		}

		// 		return style;
		// 	},
		// 	dayStyle() {
		// 		const style = {};

		// 		if (this.position.dayTop >= 0 && this.position.dayLeft) {
		// 			style.top = this.position.dayTop * 100 + "%";
		// 			style.left = this.position.dayLeft * 100 + "%";
		// 		}

		// 		return style;
		// 	}
		// },
		methods: {
			handleClick() {
				if (!this.$isDev) {
					JXRSApi.view.close();
				}
			}
			//, __initCNAndTime(cn, birth) {
			// 	this.cn = decodeURIComponent(cn);
			// 	if (birth) {
			// 		const date = new Date(birth);
			// 		this.year = date.getFullYear();
			// 		this.month = date.getMonth() + 1;
			// 		this.day = date.getDate();
			// 		this.month = this.month > 9 ? this.month : "0" + this.month;
			// 		this.day = this.day > 9 ? this.day : "0" + this.day;
			// 	}
			// }
		},
		async created() {
			this.getQS("id");

			if (!this.id) return;

			const [err, resp] = await this.$sync(
				this.$http.card.getConfig({
					passport: this.authInfo.passport,
					infoCardBirthdayId: this.id
				})
			);

			if (err) {
				return;
			}

			if (resp.result.paramJson) {
				this.userInfo = JSON.parse(resp.result.paramJson);
				this.userInfo.userName = decodeURIComponent(this.userInfo.userName);
			}
			this.birthInfo = {
				blessing: resp.result.blessing,
				speech: resp.result.speech
			};

			if (!resp.result.blessing) {
				if (this.userInfo.joinTime) {
					const date = new Date(this.userInfo.joinTime);
					let month = date.getMonth() + 1;
					let day = date.getDate();
					month = month > 9 ? month : "0" + month;
					day = day > 9 ? day : "0" + day;
					this.birthInfo.blessing = `今天是您的入党纪念日，${date.getFullYear()}年${month}月${day}日，您光荣加入中国共产党员，在这神圣的日子里，向您致以“生日”的问候，希望您时刻牢记党员身份，不忘初心，继续前进。祝您工作进步，身体健康，生活愉快！`;
				}
			}

			if (resp.result.h5) {
				this.cardInfo = JSON.parse(resp.result.h5);
			}
		}
	};
</script>

