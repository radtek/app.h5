<style lang="sass">
@import "../../../src/styles/widget/cell.scss"
</style>

<template>
	<div class="rx-cell"
	     :class="classes"
	     @click.stop="onClick">
		<div class="rx-cell-header"
		     v-if="$slots.header || title">
			<slot name="header">
				{{title}}
			</slot>
		</div>
		<div class="rx-cell-body"
		     v-if="$slots.default">
			<div class="rx-cell-content">
				<slot></slot>
			</div>
			<div class="rx-cell-imgs"
			     v-if="$slots.img || (imgs && imgs.length)">
				<slot name="img">
					<row :gutter="6"
					     :flex="false"
					     :class="[{[`img-${imgs.length}`]:imgs && imgs.length <=2 && imgs.length >=1}]">
						<i-col :span="imgs.length === 2? 12: imgs.length === 1 ? 24: 8"
						       v-for="(url,i) in imgs"
						       :key="i">
							<img :src="url"
							     :alt="url"
							     @click.stop="onImgClick(url)"
							     @error="onImgErr($event)" />
						</i-col>
					</row>
				</slot>
			</div>
		</div>
		<div class="rx-cell-footer"
		     v-if="$slots.footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script>
	import Row from "../../row/row";
	import Col from "../../col/col";
	export default {
		name: "rxCell",
		components: { Row, iCol: Col },
		props: {
			title: String,
			border: { type: [String, Boolean], default: "b" },
			imgs: {
				type: Array,
				default() {
					return [];
				}
			},
			imgShowMode: { type: String, default: "flex" }
		},
		computed: {
			classes() {
				const isStr = typeof this.border === "string";
				return [
					{
						[`b`]: this.border === true,
						[`b-t`]: isStr && ~this.border.indexOf("t"),
						[`b-r`]: isStr && ~this.border.indexOf("r"),
						[`b-b`]: isStr && ~this.border.indexOf("b"),
						[`b-l`]: isStr && ~this.border.indexOf("l")
					}
				];
			}
		},
		methods: {
			onClick() {
				this.$emit("on-click");
			},
			onImgClick(url) {
				this.$emit("on-img-click", url, this.imgs);
			}
		}
	};
</script>

