<style lang="sass">
@import "../../assets/modules/score/view-heart_map.scss"
</style>

<template>
	<section rs-view="heart_map">
		<long-march-map :current.sync="title"
		                :nodes="nodes"
		                @on-node-click="handleNodeClick"></long-march-map>
		<div class="wrap-content">
			<div class="desp"
			     @click="goto('红心介绍','/heart-help')">
				红心长征是什么, 有什么用?
			</div>
			<h3 class="title">路线简介</h3>
			<div class="content"
			     v-html="content"></div>
		</div>
	</section>
</template>
<script>
	import MapData from "~v/score/heart_map.data";
	export default {
		name: "PageOfHeartMap",
		components: {
			LongMarchMap: () =>
				import(/* webpackChunkName:"wc-long_march_map" */ "~c/score/long_march_map.vue")
		},
		data() {
			return {
				title: "",
				content: "",
				nodes: []
			};
		},
		methods: {
			handleNodeClick(node) {
				window.scrollTo(0, 0);
				this.__findMapNode(node);
			},
			__findMapNode(nodeTitle) {
				const target = MapData.filter(item => item.name === nodeTitle);
				this.content = target[0].content;
			}
		},
		created() {
			this.getQS("title");
			this.title = decodeURIComponent(this.title);
			this.nodes = MapData.map(item => item.name);
		},
		mounted() {
			this.__findMapNode(this.title);
		}
	};
</script>
