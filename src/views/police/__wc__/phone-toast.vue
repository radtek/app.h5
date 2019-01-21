<style lang="scss">
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
</style>

<template>
  <div class="box" v-if="showToast">
    <div class="window">
      <img src="../../../assets/modules/police/imgs/x.png" alt class="x">
      <div class="text">{{text}}</div>
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
		}
    },
    
};
</script>