<template>
    <div @click="__fetch()"><button>123</button></div>
</template>
<script>
export default {
    data(){
        return {
            test:[]
        }
    },
    methods: {
      async  __fetch(){
        const [err, resp] = await this.$sync(this.$http.police.init());
          if(!err){
            this.test = resp.result
            console.log("成功")
        }
    },
    },
    created() {
    },
}
</script>