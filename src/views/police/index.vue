<template>
	<div id="app">
		<transition name="fade">
			<div class="calendar-dropdown" :style="{'left':calendar3.left+'px','top':calendar3.top+'px'}" v-if="calendar3.show">
				<calendar :zero="calendar3.zero" :lunar="calendar3.lunar" :value="calendar3.value" :begin="calendar3.begin" :end="calendar3.end" @select="calendar3.select"></calendar>
			</div>
		</transition>
	</div>
</template>

<script>

	import calendar from './components/calendar/calendar.vue'

	export default {
		name: 'app',
		components: {
			calendar
		},
		data(){
			return {
				calendar3:{
					display:"2019/01/16",
					show:true,
					zero:true,
					value:[2019,1,16], //默认日期
					lunar:true, //显示农历
					select:(value)=>{
						console.log(value)
						this.calendar3.value=value;
						this.calendar3.display=value.join("/");
					}
				},
			}
		},
		methods:{

		}

	}
</script>

<style>
	/*demo*/

	/*下拉框*/
	.calendar-dropdown{
		background: #fff;
		position: absolute;
		left:0;
		top:0;
		padding:20px;
		border: 1px solid #eee;
		border-radius: 2px;
	}
	.calendar-dropdown:before {
		position: absolute;
		left:30px;
		top: -10px;
		content: "";
		border:5px solid rgba(0, 0, 0, 0);
		border-bottom-color: #DEDEDE;
	}
	.calendar-dropdown:after {
		position: absolute;
		left:30px;
		top: -9px;
		content: "";
		border:5px solid rgba(0, 0, 0, 0);
		border-bottom-color: #fff;
	}
</style>
