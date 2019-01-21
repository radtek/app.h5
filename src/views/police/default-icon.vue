<style lang="scss">
[rs-view="default-icon"] {
	.top_icon {
		width: 750px;
		height: 889px;
		background: linear-gradient(
			0deg,
			rgba(0, 151, 238, 1),
			rgba(147, 93, 246, 1)
		);
		box-shadow: 0px 4px 20px 0px rgba(0, 151, 238, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		img {
			width: 300px;
			height: 300px;
            margin-top:205px;
		}
		div {
			font-size: 32px;
			font-family: PingFang-SC-Medium;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 48px;
            margin-top: 40px;
		}
	}
}
</style>

<template>
  <div rs-view="default-icon">
    <div class="top_icon">
      <img :src="getLocalMduImg('police','head-icon')" alt>
      <div>默认头像</div>
    </div>
  </div>
</template>

<script>
export default {
	name: "default-icon"
};
</script>