<style lang="sass">
@import "../../src/styles/widget/alert.scss"
</style>

<template>
    <div class="rx-alert">
        <dlg v-model="show"
             :mask-z-index="maskZIndex"
             :close-on-mask="closeOnMask"
             :transition-name="transitionName"
             :mask-transition="maskTransition"
             @on-show="$emit('on-show')"
             @on-hide="$emit('on-hide')">
            <div class="rx-dialog_header">
                <strong>{{title || $t("rx.alert.title")}}</strong>
            </div>
            <div class="rx-dialog_body">
                <slot>
                    <div v-html="content"></div>
                </slot>
            </div>
            <div class="rx-dialog_footer">
                <rx-btn type="primary"
                        plain
                        @on-click="show = false;">{{okText || $t("rx.alert.ok")}}</rx-btn>
            </div>
        </dlg>
    </div>
</template>

<script>
    import dlg from "../dialog/dialog.vue";
    export default {
    	name: "RxAlert",
    	components: { dlg },
    	props: {
    		value: Boolean,
    		okText: String,
    		title: String,
    		content: String,
    		maskZIndex: [Number, String],
    		maskTransition: String,
    		transitionName: String,
    		closeOnMask: Boolean
    	},
    	data() {
    		return {
    			show: this.value
    		};
    	},
    	watch: {
    		value(val) {
    			this.show = val;
    		},
    		show(val) {
    			this.$emit("input", val);
    		}
    	}
    };
</script>

