<template>
    <div @click="__fetch()" 
         class="class"><button>点击自动排课</button>
    <toast :text="toast_text"
           :showToast="showToast"></toast>
    </div>
</template>
<script>
export default {
    components: {
        toast: () =>
  			import(/* webpackChunkName:"police-phone-toast" */ "~v/police/__wc__/phone-toast.vue")
  	},
    data(){
        return {
            test:[],
            toast_text: "",
            showToast: false
        }
    },
    methods: {
      async  __fetch(){
        const [err, resp] = await this.$sync(this.$http.police.init());
          if(!err){
            this.test = resp.result
            console.log("成功")
            this.toast_text = "排课成功!~";
					this.toast();
        }else{
            console.log(err)
            this.toast_text = "请重试";
					this.toast();
        }
    },
    toast() {
  			this.showToast = true;
  			setTimeout(() => {
  				this.showToast = false;
  			}, 1500);
  		},
    },
    created() {
    },
}
</script>
<style lang="scss">
    .class{
        button {
            position: relative;
            top:50%;
            left:50%;
            margin-left:-100px;
            width:200px;
            height:100px;
        }
    }
</style>