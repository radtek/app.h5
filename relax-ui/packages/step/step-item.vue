<template>
	<div class="rx-step-item"
	     :class="classes">
		<div class="rx-step-item__tail prev"
		     v-show="prev"></div>
		<div class="rx-step-item__tail next"
		     v-show="next"></div>
		<div class="rx-step-item__header">
			<div class="rx-step-item__circle">
				<i v-if="finished"
				   class="rx-icon icon-success_circle"></i>
			</div>
			<slot name="title"
			      v-if="title || $slots.title">{{title}}</slot>
		</div>
		<div class="rx-step-item__main">
			<slot v-if="content || $slots.default">{{content}}</slot>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RxStepItem",
		inject: {
			rxStep: { default: {} }
		},
		props: {
			icon: String,
			title: String,
			content: String,
			step: Number,
			active: Boolean,
			finished: Boolean,
			prev: { type: Boolean, default: true },
			next: { type: Boolean, default: true }
		},
		computed: {
			classes() {
				return {
					[`__success`]: !!this.finished,
					[`__active`]: !!this.active
				};
			}
		}
	};
</script>

