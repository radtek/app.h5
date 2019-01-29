<style lang="scss">
[rs-view="choose-icon"] {
	.content {
		margin-top: 40px;
		display: flex;
		justify-content: center;
		padding: 0 20px;
		img {
			width: 100px;
			height: 100px;
		}

		ul {
			padding: 0 30px;
			li {
				display: inline-block;
				margin-right: 27.5px;
				margin-top: 20px;
				position: relative;
				.pitch {
					width: 36px;
					height: 36px;
					position: absolute;
					top: 32px;
					left: 32px;
				}
			}
			li:nth-child(5n) {
				margin-right: 0;
			}
			li:nth-last-child(-n + 5) {
				margin-bottom: 0;
			}
		}
	}
}
</style>

<template>
  <div rs-view="choose-icon">
    <top-head :title="title" :right="right" @change="change" :router="router"></top-head>
    <toast :text="toast_text" :showToast="showToast"></toast>

    <div class="content">
      <ul>
        <li v-for="(q,index) in urls" :key="index">
          <img :src="getLocalMduImg('police','pitch')" alt v-show="q.isSelect" class="pitch">
          <img :src="q.icon" alt @click="changeImg(index)">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
	name: "choose-icon",
	components: {
		topHead: () =>
			import(/* webpackChunkName:"police-header" */ "~v/police/__wc__/header/header.vue"),
		toast: () =>
			import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
	},
	data() {
		return {
			title: "选择头像",
			right: "完成",
			router:'add-person',
			urls: {},
			icon: "",
            isCheck: false,
            toast_text:'',
            showToast:false
		};
	},
	methods: {
		change() {
			console.log(this.icon);

			if (this.isCheck) {
				this.$router.push({
					path: "/add-person",
					query: {
						icon: this.icon
					}
				});
			} else {
				this.toast_text = "请选择头像";
				this.toast();
			}
		},
		changeImg(index) {
			console.log(index + 1);
			this.cartData.forEach(item => (item.isSelect = false));
			this.cartData[index].isSelect = !this.cartData[index].isSelect;
			this.$set(this.cartData, index, this.cartData[index]);
			this.icon = this.cartData[index].icon;
			this.isCheck = true;
			console.log(this.icon);
		},
		toast() {
			const self = this;
			this.showToast = true;
			setTimeout(function() {
				self.showToast = false;
			}, 2000);
		}
	},
	created() {
		this.urls = [
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/aE6KFTjE3H%40upload_bbd5329e9663b5473fc4cbb341a826f0.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/tS8sr7xrNP%40upload_79f3e2e762606d10e03a24750b2b8af6.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/zG3rF3zMrd%40upload_4bf93691813b81417c0b711ab863380e.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/GMpRSwDEsB%40upload_770ea5dee5bdc3f428bb5c07aaf12bf2.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/KRKKBFyhrf%40upload_29daa5acc4b286faea248268da0fb58d.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/NseWfNShCN%40upload_cbc069ce00fec63f8c5c0c773ce022a3.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/fZysAyaay7%40upload_d64fd98b60ae974e3531756f58ed32d0.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/A5GGneZ3cw%40upload_a11b3407183e18ef1d3cffb7d8146c39.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/xnDwNXtkTy%40upload_090f3e1e76db4b1cd6ddb9c53d4e43e8.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/yHPwB8Hha3%40upload_7d7f5d4adca07e65ef3d0fdf01b8a678.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/KbB6iEhbDb%40upload_49a73ec5ab650b4e524f4756c808e346.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/pAnb8XkwwX%40upload_dd0548454e3aa5e8bac94a62a3a6b2a5.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/T3hrEDQnfj%40upload_be391fe31f03b5605b3923511ed35024.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/S2phKDpNbS%40upload_81da8b174a59ff918a0acf0999c1155f.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/wRKsTWnJar%40upload_b166bc48a925c31231e76a4a63574d09.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/6ywYSfcyFi%40upload_be1beaf95d16ec7751c72edcea8bb74f.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/jDxRiparNR%40upload_4885c6ac44cae1c276c6bfd9fe41640d.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/K7waSnMF3N%40upload_cb28bf7044f3ec9d85b498ed8fbc7382.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/4AGWz4sWNA%40upload_795fe7bea7c0e88e6e244872b839f64d.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/d4bBQGYHeC%40upload_d5bd8622e2fd1348ac81a712c04dc225.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/BQJSYYYSE8%40upload_3e742ef8a9373d064678a20ce0aefb17.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/AjErsa65kE%40upload_bf87ff64d4bb8815da5e8632a719ad54.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/EYxMe3yzPa%40upload_7ff03d7e64e00aab22b0725020a00e39.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/eS8wxYpsy6%40upload_77e62ac0c4aed1b74be0e2efa4fcd839.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/zYm4PPYmYz%40upload_b9f30b735c40f678b0d4a65f1706101b.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/wm3Z8SGCHy%40upload_daf92a67df94399d7a078a10715e3481.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/dQi4nDwmyi%40upload_5bf970052117d6dabc46ceced24603fa.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/6yepthQhDr%40upload_ba07bea4fa310ff69776211f53d409cd.jpg"
			},
			{
				icon:
					"http://dangjian-limin.oss-cn-hangzhou.aliyuncs.com/7dStb2k4WC%40upload_05db743c6a535a8be7b1b6665cd64aff.jpg"
			}
		];
		let nowList = this.urls;
		nowList.forEach(item => (item.isSelect = false));
		this.cartData = nowList;
	}
};
</script>