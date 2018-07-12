<style lang="scss">
	@import "../../assets/modules/doc/step.scss";

	.step {
		.url {
			padding: 28px 0;
			color: #333;
			font-size: 36px;
			text-align: center;
		}

		.wrap-input {
			position: relative;
			width: 360px;
			height: 100px;
			padding: 0 18px;
			border: 2px solid #e6e6e6;
			border-radius: 4px;
			margin: auto;
			line-height: 72px;

			.number-text {
				color: #0097ee;
				font-size: 36px;
			}
		}
	}

	[rs-view="doc-pc-import"] {
		.status-text {
			position: absolute;
			top: 46px;
			left: 50%;
			color: #999;
			font-size: 20px;
			transform: translateX(-50%) translateZ(0);
			z-index: 10;
		}

		.fixed-footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			text-align: center;
		}

		.tips {
			@include tips();
		}
	}
</style>

<template>
	<section rs-view="doc-pc-import"
	         style="overflow-x:hidden;">
		<p class="status-text animated zoomInDown">{{status}}</p>
		<img class="animated fadeInDown"
		     :src="getLocalMduImg('doc','import_bg')" />
		<div class="step step-1">
			<p class="title">
				<span>步骤一</span>
			</p>
			<div class="second-title">
				<p>在电脑浏览器中输入下列网址：</p>
				<p class="url">{{url}}</p>
			</div>
		</div>
		<div class="step step-2">
			<p class="title">
				<span>步骤二</span>
			</p>
			<div class="second-title">
				<p>使用连接码登录</p>
			</div>
			<div class="tips">
				<p>*连接码有效时间为1小时</p>
				<p>*如果获取失败，请点击右侧刷新</p>
			</div>
			<rx-row justify="start"
			        class="wrap-input">
				<rx-col>
					<span class="number-text">550020</span>
				</rx-col>
				<rx-col style="text-align:right;">
					<rx-btn type="primary"
					        size="mini"
					        :loading="isRefreshing"
					        @on-click="handleClick">{{isRefreshing ? '刷新中':'刷新'}}</rx-btn>
				</rx-col>
			</rx-row>
		</div>
		<div class="fixed-footer">
			<div class="tips">
				<p>在电脑上导入的文档将保存至“我的导入”中</p>
				<p>由于网络状况差异，“我的导入”中文件列表更新可能有少许延迟</p>
			</div>
		</div>
	</section>
</template>
<script>
	export default {
		name: "ImportOfPC",
		data() {
			return {
				status: "等待传输",
				isRefreshing: false
			};
		},
		computed: {
			url() {
				return "http://manage.jxdangjian.com/doc-import";
			}
		},
		methods: {
			handleClick() {
				// 刷新连接码
				if (this.isRefreshing) return;
				this.isRefreshing = true;
			}
		}
	};
</script>