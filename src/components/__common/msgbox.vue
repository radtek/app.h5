<style lang="sass">
@import "../../assets/__base/msgbox.scss"
</style>

<template>
	<div class="msgbox animated fadeInDown"
	     v-if="show">
		<div class="msgbox_content"
		     @click="onClick">
			<img v-if="avatar"
			     :src="avatar"
			     @error="onImgErr($event,true)">
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
		},
		data() {
			return { show: !!this.count };
		},
		watch: {
			count(val) {
				this.show = !!val;
			}
		},
		methods: {
			onClick() {
				this.show = false;
				this.gotoNative("消息中心", `${this.category}LatestMsgs`, {
					lastId: this.lastId
				});
			}
		}
	};
</script>

