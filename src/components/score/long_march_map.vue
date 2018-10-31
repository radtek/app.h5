<!-- 长征路线图 -->

<style lang="sass">
@import "../../assets/modules/score/wc-long_march_map.scss"
</style>

<template>
	<div class="wrap-map">
		<img :src="bgUrl" />
		<p v-for="(node,index) in nodes"
		   @click.stop="onNodeClick(node)"
		   :key="index"
		   :class="__calcClasses(node,index)">
			{{node}}
		</p>
		<img :src="getLocalMduImg('score','human')"
		     :class="humanClasses"
		     alt="">
	</div>
</template>

<script>
	export default {
		name: "LongMarchMap",
		props: {
			current: String,
			nodes: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				bgUrl: require(`~css/modules/score/imgs/bg-map.jpg`)
			};
		},
		computed: {
			humanClasses() {
				return ["human", `human-${this.__getActiveIndex(this.current)}`];
			}
		},
		methods: {
			__calcClasses(node, index) {
				return [
					`node`,
					`node-${index}`,
					{
						[`active`]: node === this.current
					}
				];
			},
			__getActiveIndex(node) {
				for (let i = 0, l = this.nodes.length; i < l; i++) {
					if (node === this.nodes[i]) return i;
				}
				return -1;
			},
			onNodeClick(node) {
				this.$emit("on-node-click", node);
			}
		}
	};
</script>
