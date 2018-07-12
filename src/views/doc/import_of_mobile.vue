<style lang="sass">
@import "../../assets/modules/doc/step.scss"
</style>

<template>
	<section rs-view="doc-mobile-import"
	         style="overflow-x:hidden;position:relative;">
		<div style="overflow-x:hidden;position:relative;height:100%;">

			<div class="step step-1">
				<p class="title">
					<span>步骤一</span>
				</p>
				<div class="second-title">
					<p>在微信、QQ、百度网盘</p>
					<p>等应用中，打开相应文档</p>
				</div>
				<div class="img">
					<img class="animated fadeInLeft"
					     :src="getLocalMduImg('doc','step1')" />
				</div>
			</div>
			<div class="step step-2">
				<p class="title">
					<span>步骤二</span>
				</p>
				<div class="second-title">
					<p>选择 分享按钮/用其他应用打开，</p>
					<p>选择[拷贝到“江西党建云”]</p>
				</div>

				<div class="img">
					<img class="animated fadeInRight"
					     :src="getLocalMduImg('doc','step2')" />
				</div>
			</div>
			<div class="step step-3">
				<p class="title">
					<span>步骤三</span>
				</p>
				<div class="second-title">
					<p>点击拷贝后，会在江西党建云客户端中直接打开文档，</p>
					<p>同时该文档将直接保存在“我的导入”中，可随时查看</p>
				</div>
				<div class="img">
					<img class="animated fadeInUp"
					     :src="getLocalMduImg('doc','step3')" />
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		name: "ImportOfMobile",
		data() {
			return {};
		}
	};
</script>
