<template>
	<div class="rx-chk-icon"
	     @click="onClick">
		<icon :name="checkedIcon"
		      v-show="value"></icon>
		<icon :name="uncheckIcon"
		      v-show="!value"></icon>
		<span>
			<slot></slot>
		</span>
	</div>
</template>

<script>
	import Icon from "../icon/icon";

	export default {
		name: "RxChkIcon",
		components: { Icon },
		props: {
			value: Boolean,
			checkedIcon: { type: String, default: "success_circle" },
			uncheckIcon: { type: String, default: "circle" }
		},
		methods: {
			onClick() {
				this.$emit("input", !this.value);
				this.$emit("on-click");
			}
		}
	};
</script>

