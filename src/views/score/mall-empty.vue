<style lang="scss">
	[rs-view="mall"] {
		.empty {
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translateX(-50%) translateY(-40%);
			text-align: center;
			font-size: 30px;
			color: #b7b7b7;

			img {
				width: 90px;
				height: 90px;
			}
			p {
				margin-top: 40px;
				letter-spacing: 2px;
			}
		}
	}
</style>


<template>
	<section rs-view="mall">
		<div class="empty">
			<img :src="getLocalMduImg('score','ic_heart_empty')"
			     alt="">
			<p>商品准备中，敬请期待...</p>
		</div>
	</section>
</template>
