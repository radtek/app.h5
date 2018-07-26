<style lang="sass">
@import "../../src/styles/widget/confirm.scss"
</style>

<template>
	<div class="rx-confirm">
		<dlg v-model="show"
		     :mask-z-index="maskZIndex"
		     :close-on-mask="closeOnMask"
		     :transition-name="transitionName"
		     :mask-transition="maskTransition"
		     @on-show="$emit('on-show')"
		     @on-hide="$emit('on-hide')">
			<div class="rx-dialog_header"
			     v-if="title || $slots.header">
				<slot name="header">
					<strong>{{title || $t("rx.confirm.title")}}</strong>
				</slot>
			</div>
			<div class="rx-dialog_body">
				<slot>
					<div v-html="content"></div>
				</slot>
			</div>
			<div class="rx-dialog_footer">
				<p>
					<rx-btn type="info"
					        plain
					        @on-click="show = false;">{{noText || $t("rx.confirm.no")}}</rx-btn>
				</p>
				<p>
					<rx-btn type="primary"
					        plain
					        :loading="yesLoading"
					        @on-click="handleClick()">{{yesBtnText}}</rx-btn>
				</p>
			</div>
		</dlg>
	</div>
</template>

<script>
	import Dlg from "../dialog/dialog";
	export default {
		name: "RxConfirm",
		components: { Dlg },
		props: {
			value: Boolean,
			title: String,
			content: String,
			yesText: String,
			noText: String,
			maskZIndex: [Number, String],
			maskTransition: String,
			transitionName: String,
			closeOnMask: Boolean,
			isYesNeedLoading: { type: Boolean, default: true },
			loadingText: String
		},
		data() {
			return {
				show: false,
				yesLoading: false
			};
		},
		computed: {
			yesBtnText() {
				if (this.yesLoading) {
					return this.loadingText || this.$t("rx.confirm.loading");
				}
				return this.yesText || this.$t("rx.confirm.yes");
			}
		},
		watch: {
			value(val) {
				this.show = val;
				if (!val) this.yesLoading = false;
			},
			show(val) {
				this.$emit("input", val);
				if (!val) this.yesLoading = false;
			}
		},
		methods: {
			handleClick() {
				if (this.isYesNeedLoading) {
					if (this.yesLoading) return;
					this.yesLoading = true;
				}
				this.$emit("on-yes");
			}
		},
		created() {
			this.show = this.value;
		}
	};
</script>

