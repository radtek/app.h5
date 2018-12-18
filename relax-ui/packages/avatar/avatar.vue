<style lang="scss">
  .rx-avatar {
  	position: relative;
  	border-radius: 50%;
  	display: inline-block;
  	vertical-align: middle;

  	&__name {
  		position: absolute;
  		display: inline-block;
  		left: 50%;
  		top: 50%;
  		color: #fff;
  		text-align: center;
  		line-height: 32px;
  		white-space: nowrap;
  		font-size: 32px;
  	}
  }
</style>


<template>
  <span class="rx-avatar"
        :style="styles"
        @click="$emit('click',$event)">
    <span class="rx-avatar__name"
          :style="nameStyles"
          ref="name">
      <slot></slot>
    </span>
  </span>
</template>

<script>
  export default {
  	name: "RxAvatar",
  	props: {
  		sex: { type: Number, default: 0 },
  		sexColor: {
  			type: Array,
  			default() {
  				return ["#0097ee", "#ff8789"];
  			}
  		},
  		width: Number,
  		height: Number,
  		padding: { type: Number, default: 8 }
  	},
  	data() {
  		return {
  			scale: 1
  		};
  	},
  	computed: {
  		styles() {
  			const styles = {
  				backgroundColor: this.sexColor[this.sex || 0] || "#0097ee"
  			};

  			if (this.width) {
  				styles.width = this.getRealSize(this.width);
  			}

  			if (this.height) {
  				styles.height = this.getRealSize(this.height);
  			}

  			return styles;
  		},
  		nameStyles() {
  			const styles = {};

  			if (this.scale !== 1) {
  				styles.msTransform = styles.WebkitTransform = styles.transform = `translateX(-50%) translateY(-50%) translateZ(0) scale(${
  					this.scale
  				})`;
  			} else {
  				styles.msTransform = styles.WebkitTransform = styles.transform =
  					"translateX(-50%) translateY(-50%) translateZ(0)";
  			}

  			return styles;
  		}
  	},
  	methods: {
  		__resetScale() {
  			// 当前组件的宽度
  			const elWidth = this.$el.getBoundingClientRect().width;
  			// 子元素的宽度
  			const nameWidth = this.$refs.name.offsetWidth;

  			if (elWidth - this.padding < nameWidth) {
  				this.scale = (elWidth - this.padding) / nameWidth;
  			} else {
  				this.scale = 1;
  			}
  		}
  	},
  	mounted() {
  		this.__resetScale();
  	},
  	updated() {
  		this.__resetScale();
  	}
  };
</script>
