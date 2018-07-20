<style lang="sass">
@import "../../assets/__base/msgbox.scss"
</style>

<template>
	<div class="msgbox">
		<div class="msgbox_content"
		     @click="gotoNative('消息中心',`${category}LatestMsgs`,{lastId})">
			<img :src="avatar"
			     @error="onImgErr($event)">
			<slot>
				<span>{{count}}条新消息</span>
			</slot>
			<rx-icon name="arrow-right"></rx-icon>
		</div>
	</div>
</template>
<script>
	export default {
		name: "MsgBox",
		props: {
			category: String,
			avatar: String,
			count: Number,
			lastId: [String, Number]
		}
	};
</script>

