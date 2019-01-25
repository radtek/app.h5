<style lang="scss">
.boxx {
	width: 100%;
	height: 100%;
	z-index: 10;
	position: absolute;
	left: 0;
	top: 0;
}
.mask {
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 1);
	opacity: 0.4;
}
.box1 {
	position: absolute;
	left: 0;
	top: 0;
}
.window1 {
	position: absolute;
	top:400px;
	left: 75px;
	width: 608px;
	height: 442px;
	background: linear-gradient(
		0deg,
		rgba(255, 253, 250, 1) 0%,
		rgba(255, 236, 209, 1) 100%
	);
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.title2 {
		width: 528px;
		height: 362px;
		border: 1px solid rgba(241, 170, 0, 1);
		box-shadow: 1px 0px 1px 0px rgba(255, 255, 255, 1);
		border-radius: 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		.bot2 {
			display: flex;
			align-items: center;
			.cancel {
				width: 70px;
				height: 39px;
				margin-right: 54px;
				margin-left: 89px;
			}
			.cancel1 {
				width: 102px;
				height: 39px;
				margin-right: 54px;
				margin-left: 89px;
			}
			.confirm1 {
				width: 331px;
				height: 176px;
				margin-top: 43px;
			}
		}
	}
	.xx {
		width: 322px;
		margin-top: 24px;
	}
	.text2 {
		font-size: 30px;
		font-family: Adobe Heiti Std R;
		font-weight: normal;
		color: rgba(102, 102, 102, 1);
		line-height: 138px;
	}
}
</style>

<template>
  <div class="boxx" v-if="showToast">
    <div class="mask"></div>
    <div class="box1">
      <div class="window1">
        <div class="title2" v-if="isView">
          <img :src="getLocalMduImg('police','delete')" alt class="xx">
          <div class="text2">{{text}}</div>
          <div class="bot2">
            <img :src="getLocalMduImg('police','cancelText')" alt class="cancel" @click="cancel">
            <img :src="getLocalMduImg('police','confirm')" alt class="confirm1" @click="confirm">
          </div>
        </div>
        <div class="title2" v-else>
          <img :src="getLocalMduImg('police','join')" alt class="xx">
          <div class="text2">{{text}}</div>
          <div class="bot2">
            <img :src="getLocalMduImg('police','again')" alt class="cancel1" @click="cancel">
            <img :src="getLocalMduImg('police','confirm')" alt class="confirm1" @click="confirm">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	props: {
		text: {
			type: String,
			default() {
				return "";
			}
		},
		showToast: {
			type: Boolean,
			default() {
				return false;
			}
		},
		isView: {
			type: Boolean
		}
	},
	methods: {
		cancel() {
			this.$emit("doCancel");
		},
		confirm() {
			this.$emit("doConfirm");
		}
	}
};
</script>