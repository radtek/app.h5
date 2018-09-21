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
			top: percentage(276/667);
			left: percentage(91/375);
		}

		.year {
			top: percentage(328/667);
			right: percentage(89/375);
		}

		.month {
			top: percentage(328/667);
			right: percentage(45/375);
		}

		.day {
			top: percentage(360/667);
			left: percentage(25/375);
		}
	}
</style>

<template>
	<section rs-view="birth">
		<img :src="getLocalMduImg('card','bg-1')" />
		<span class="abs name">{{cn}}</span>
		<span class="abs year">{{year}}</span>
		<span class="abs month">{{month}}</span>
		<span class="abs day">{{day}}</span>
		<rx-btn @on-click="handleClick">收到祝福</rx-btn>
	</section>
</template>

<script>
	export default {
		name: "PageOfBirth",
		methods: {
			handleClick() {
				if (!this.$isDev) {
					JXRSApi.view.close();
				}
			}
		},
		created() {
			this.getQS("cn", "birth");
			this.cn = decodeURIComponent(this.cn);
			if (this.birth) {
				const date = new Date(this.birth);
				this.year = date.getFullYear();
				this.month = date.getMonth() + 1;
				this.day = date.getDate();
				this.month = this.month > 9 ? this.month : "0" + this.month;
				this.day = this.day > 9 ? this.day : "0" + this.day;
			}
		}
	};
</script>

