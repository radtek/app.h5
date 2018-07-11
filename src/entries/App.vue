<style lang="sass">
@import "../assets/__base/index.scss"
</style>

<template>
	<div id="app">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
	export default {
		name: "App"
	};
</script>


