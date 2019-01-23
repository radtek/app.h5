<template>
	<div class="contain">
		<input id="switch" class="mui-switch mui-switch-animbg" type="checkbox" @click="test">
	</div>
</template>

<script>
	export default {
		name: "switchBut",
		methods:{
			test(){
				// console.log(!document.getElementById('switch').checked ? "未选中" : "选中");
			}
		},
		props:{
			item:[]
		}
	};
</script>

<style lang="scss" scoped>
	.contain{
		width: 124px;
		.mui-switch {
			width: 104px;
			height: 62px;
			position: relative;
			border: 1px solid #dfdfdf;
			background-color: #fdfdfd;
			box-shadow: #dfdfdf 0 0 0 0 inset;
			border-radius: 40px;
			border-top-left-radius: 40px;
			border-top-right-radius: 40px;
			border-bottom-left-radius: 40px;
			border-bottom-right-radius: 40px;
			background-clip: content-box;
			display: inline-block;
			-webkit-appearance: none;
			user-select: none;
			outline: none; }
		.mui-switch:before {
			content: '';
			width: 58px;
			height: 58px;
			position: absolute;
			top: 0px;
			left: 0;
			border-radius: 40px;
			border-top-left-radius: 40px;
			border-top-right-radius: 40px;
			border-bottom-left-radius: 40px;
			border-bottom-right-radius: 40px;
			background-color: #fff;
			box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4); }
		.mui-switch:checked {
			border-color:#FF6936;
			box-shadow: #FF6936 0 0 0 16px inset;
			background-color: #FF6936; }
		.mui-switch:checked:before {
			left: 42px; }
		.mui-switch.mui-switch-animbg {
			transition: background-color ease 0.4s; }
		.mui-switch.mui-switch-animbg:before {
			transition: left 0.3s; }
		.mui-switch.mui-switch-animbg:checked {
			box-shadow: #dfdfdf 0 0 0 0 inset;
			background-color:#FF6936;
			transition: border-color 0.4s, background-color ease 0.4s; }
		.mui-switch.mui-switch-animbg:checked:before {
			transition: left 0.3s; }
		.mui-switch.mui-switch-anim {
			transition: border cubic-bezier(0, 0, 0, 1) 0.4s, box-shadow cubic-bezier(0, 0, 0, 1) 0.4s; }
		.mui-switch.mui-switch-anim:before {
			transition: left 0.3s; }
		.mui-switch.mui-switch-anim:checked {
			box-shadow:#FF6936 0 0 0 16px inset;
			background-color: #FF6936;
			transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s; }
		.mui-switch.mui-switch-anim:checked:before {
			transition: left 0.3s;
		}
	}
	
	
</style>