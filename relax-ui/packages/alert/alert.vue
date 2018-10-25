<style lang="sass">
@import "../../src/styles/widget/alert.scss"
</style>

<template>
	<div class="rx-alert">
		<dlg v-model="show"
		     :mask-z-index="maskZIndex"
		     :close-on-mask="closeOnMask"
		     :transition-name="transitionName"
		     :mask-transition="maskTransition"
		     @on-show="$emit('on-show')"
		     @on-hide="$emit('on-hide')">
			<div class="rx-dialog_header"
			     v-if="title">
				<strong>{{title || $t("rx.alert.title")}}</strong>
			</div>
			<div class="rx-dialog_body">
				<slot>
					<div v-html="content"></div>
				</slot>
			</div>
			<div class="rx-dialog_footer">
				<rx-btn type="primary"
				        plain
				        style="width:100%;"
				        @on-click="handleClick">{{okText || $t("rx.alert.ok")}}</rx-btn>
			</div>
		</dlg>
	</div>
</template>

<script>
	import dlg from "../dialog/dialog.vue";
	export default {
		name: "RxAlert",
		components: { dlg },
		props: {
			value: Boolean,
			okText: String,
			title: String,
			content: String,
			maskZIndex: [Number, String],
			maskTransition: String,
			transitionName: String,
			closeOnMask: Boolean
		},
		data() {
			return {
				show: false
			};
		},
		watch: {
			value(val) {
				this.show = val;
			},
			show(val) {
				this.$emit("input", val);
			}
		},
		methods: {
			handleClick() {
				this.show = false;
				this.$emit("ok");
			}
		},
		created() {
			if (typeof this.value !== "undefined") {
				this.show = this.value;
			}
		}
	};
</script>

