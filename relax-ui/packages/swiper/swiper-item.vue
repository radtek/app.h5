<template>
  <div class="rx-swiper-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  	name: "rxSwiperItem",
  	mounted() {
  		this.$parent.init();
  	}
  };
</script>