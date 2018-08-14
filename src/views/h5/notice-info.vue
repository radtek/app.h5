<style lang="scss">
	[rs-view="notice_info"] {
		.content {
			padding: 20px;
			line-height: 50px;
		}
	}
</style>


<template>
	<section rs-view="notice_info">
		<div class="content"
		     v-html="info"></div>
	</section>
</template>

<script>
	export default {
		name: "PageOfNoticeInfo",
		data() {
			return {
				info: ""
			};
		},
		methods: {
			__fetch() {
				return this.$http.notice
					.getInfo({
						noticeId: this.noticeId,
						passport: this.authInfo.passport
					})
					.then(resp => {
						this.info = resp.result.text;
					});
			}
		},
		created() {
			this.getQS("noticeId");
		},
		mounted() {
			this.__fetch();
		}
	};
</script>

