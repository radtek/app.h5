<style lang="scss">
	@import "../../assets/modules/doc/view-import_of_pc.scss";
</style>

<template>
	<section rs-view="doc-pc-import">
		<p class="status-text animated zoomInDown">{{statusText}}</p>
		<img class="animated fadeInDown"
		     :src="getLocalMduImg('doc','import_bg')" />
		<div class="step step-1"
		     v-show="status ===0">
			<p class="title">
				<span>步骤一</span>
			</p>
			<div class="second-title">
				<p>在电脑浏览器中输入下列网址：</p>
				<p class="url">{{url}}</p>
			</div>
		</div>
		<div class="step step-2"
		     v-show="status ===0">
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
					<span class="number-text">{{code}}</span>
				</rx-col>
				<rx-col style="text-align:right;">
					<rx-btn type="info"
					        size="mini"
					        plain
					        :loading="isRefreshing"
					        @on-click="handleClick">{{isRefreshing ? '刷新中':'刷新'}}</rx-btn>
				</rx-col>
			</rx-row>
		</div>
		<div class="step step-3"
		     v-show="status!==0">
			<p class="title">
				<span>步骤三</span>
			</p>
			<div class="second-title">
				<p>请从电脑选择要导入的文档</p>
			</div>
			<div class="img">
				<img class="animated fadeInLeft"
				     :src="getLocalMduImg('doc','pc-step3')" />
			</div>
		</div>
		<div class="fixed-footer"
		     v-show="status===0">
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
				status: 0,
				isRefreshing: false,
				code: ""
			};
		},
		computed: {
			statusText() {
				switch (this.status) {
					case 1:
						return "已连接成功";
					case 2:
						return "已上传成功";
					case 0:
					default:
						return "等待传输";
				}
			},
			socketUrl() {
				return this.$isProd ? "" : "";
			},
			url() {
				return this.$Prod
					? "http://manage.jxdangjian.com/page/docImport/docImportLogin.html"
					: "http://whrdd.f3322.net:8889/page/docImport/docImportLogin.html";
			}
		},
		methods: {
			__fetchCode() {
				return this.$http.doc.getLinkCode().then(resp => {
					this.code = resp.result;
				});
			},
			handleClick() {
				// 刷新连接码
				if (this.isRefreshing) return;
				this.isRefreshing = true;
				this.__fetchCode()
					.then(() => {
						this.isRefreshing = false;
					})
					.catch(() => {
						this.isRefreshing = false;
					});
			}
		},
		mounted() {
			this.__fetchCode();

			this.$rxUtils.loadJS(
				"https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js",
				{},
				() => {
					const socket = io(this.socketUrl);

					socket.on("connect", () => {
						socket.on(`${this.authInfo.userId}`, msg => {
							this.status = 1;
						});

						socket.on(`down${this.authInfo.userId}`, msg => {
							// my msg
							if (typeof msg === "string") {
								msg = JSON.parse(msg);
							}
							if (msg.uploadState === 1) {
								this.status = 2;
							}
						});
					});
				}
			);
		}
	};
</script>