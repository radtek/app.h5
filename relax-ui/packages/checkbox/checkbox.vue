<template>
    <label class="rx-chk"
           role="checkbox"
           aria-checked="true"
           :name="name"
           :class="classes">

    </label>
</template>

<script>
export default {
	name: "rxChk",
	props: {
		value: [Number, String, Boolean],
		name: String
	},
	methods: {
		classes() {
			return [];
		}
	}
};
</script>

