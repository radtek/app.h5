<style lang="sass">
@import "../../../src/styles/widget/cell-avatar.scss"
</style>
<template>
	<div :class="classes">
		<div class="rx-cell-img"
		     @click.stop="onImgClick"
		     v-if="imgPosition === 'left'">
			<slot name="img">
				<img :src="avatar"
				     :class="[{'circle':circle}]"
				     alt="头像"
				     @error="$emit('on-avatar-err',$event)" />
			</slot>
		</div>
		<div class="rx-cell-content"
		     @click.stop="onClick">
			<div class="content">
				<div class="header"
				     v-if="$slots.header">
					<slot name="header"></slot>
				</div>
				<div class="body"
				     v-if="$slots.default">
					<slot></slot>
				</div>
				<div class="footer"
				     v-if="$slots.footer">
					<slot name="footer"></slot>
				</div>
			</div>
			<div class="action"
			     :class="[`${actionPosition}`]"
			     v-if="$slots.rightAction">
				<slot name="rightAction"></slot>
			</div>
		</div>
		<div class="rx-cell-img"
		     @click.stop="onImgClick"
		     v-if="imgPosition === 'right'">
			<slot name="img">
				<img :src="avatar"
				     :class="[{'circle':circle}]"
				     alt="头像"
				     @error="$emit('on-avatar-err',$event)" />
			</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxCellAvatar",
		props: {
			imgPosition: { type: String, default: "left" },
			avatar: String,
			circle: { type: Boolean, default: true },
			actionPosition: { type: String, default: "center" },
			padding: { type: [Boolean, String], default: true }
		},
		computed: {
			classes() {
				const isStr = typeof this.padding === "string";
				return [
					"rx-cell-avatar",
					{
						[`no-body`]: !this.$slots.default,
						[`p`]: this.padding === true,
						[`p-t`]: isStr && ~this.padding.indexOf("t"),
						[`p-r`]: isStr && ~this.padding.indexOf("r"),
						[`p-b`]: isStr && ~this.padding.indexOf("b"),
						[`p-l`]: isStr && ~this.padding.indexOf("l")
					}
				];
			}
		},
		methods: {
			onClick(evt) {
				this.$emit("on-click", evt);
			},
			onImgClick(evt) {
				this.$emit("on-img-click", evt);
			}
		}
	};
</script>

