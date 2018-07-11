<template>
	<section rs-view="answer">
		<rx-pull ref="pull"
		         :down="down"
		         :up="up"
		         @uping="handleUp"
		         @downing="handleDown"
		         @scroll-end="handleScrollEnd">
			<rx-pull-down slot="down"></rx-pull-down>
			<rx-pull-up slot="up"></rx-pull-up>
		</rx-pull>
	</section>
</template>
<script>
	import { utils } from "~rx";
	import Pull from "~m/pull";
	export default {
		name: "PageOfAnswer",
		components: {},
		mixins: [Pull],
		data() {
			return {};
		}
	};
</script>



