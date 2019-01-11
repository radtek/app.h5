<template>
<div>
    <rx-cell :title="item.title" 
             v-for="(item,index) in rows"
             :key="index">
        <div v-for="(list,index2) in item.list"
             :key="index2"
             class=type-div>
        <input type="radio"
               ref="radio"
               :id="list" 
               @click="getValue(index,list)"
               class="type-radio"
               :name="item.title"
               :value="list">
        <label :for="list"
               class="type-label"
               >{{list}}
        </label>
        </div>
    </rx-cell>
    <div class="type-button"
         @click="doSubmit"><span>确定</span></div>
</div>
</template>

<script>
export default {
    data(){
        return {
            isActive:[],
            rows:[],
            item:[],
        }
    },
    methods: {
        __fetch() {
  			this.getRows();
  		},
        getRows(){
            this.rows = [
                {
                title:"尺码",
                list:["S","M","L","XL","XXL"]
                },
                {
                title:"颜色",
                list:["红色","黄色","蓝白色","卡其色","驼粉色","橙黄色","精灵白"]
                },
                {
                title:"套餐类型",
                list:["官方默认套餐","自选套餐二","豪华精选套餐"]
                },
            ]
        },
        getValue(index,list){
            this.item[index] = list;
        },
        doSubmit(){
            console.log(this.item)
        }
    },
    created(){
        this.__fetch();
    }
}
</script>

<style lang="scss">
    .rx-cell {
        padding-left:30px;
        padding-top:18px;
    .type-div {
        display: inline-block;
    }
    .type-radio {
        position:absolute;
        clip:rect(0px,0px,0px,0px);
    }
    .type-label {
        text-align: center;
        display:inline-block;
        min-width:100px;
        height:50px;
        background:rgba(245,245,245,1);
        border-radius:8px;
        font-size:24px;
        font-family:"PingFang-SC-Medium";
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:48px;
        margin:10px 12px;
        padding:0 28px;
        border:1px solid white;
    }
    input[type=radio]:checked + label {
        background:rgba(237,247,253,1);
        border:1px solid rgba(0,151,238,1);
    }
    }
    .type-button {
        width:100%;
        height:98px;
        text-align: center;
        line-height: 98px;
        background:rgba(0,151,238,1);
        position: absolute;
        bottom:0;
        span {
            font-size:32px;
            font-family:"PingFang-SC-Bold";
            font-weight:bold;
            color:rgba(255,255,255,1);
        }
    }
</style>
