<template>
    <div class="item-mall">
        <rx-row type="flex" >
            <rx-col :span="12" v-for="(item,index) in data" :key="index">
                <div @click="goto('商品详情','/details',{id:item.id})">
                    <img :src="item.imgPath" alt="图片">
                    <div class="item-text">
                        <h2>{{item.title}}</h2>
                        <p><span>{{item.score}}</span>积分+￥{{item.price}}</p>
                        <div class="oldPrice">￥{{item.oldPrice}}</div>
                    </div>
                </div>
            </rx-col>
        </rx-row> 
    </div>
</template>

<script>
export default {
    props:{
        data: {
            type:Array,
            default(){
                return []
            }
        }

    },
    methods: {

    }
}
</script>

<style lang="scss">
    .item-mall {
        .rx-row {
            flex-flow: row wrap;
            flex:1 0.5 auto;
            .rx-col{
                border-bottom: 1px solid #e6e6e6;
                padding: 30px 0;
                text-align: center;
                &:nth-child(odd) {
                    border-right: 1px solid #e6e6e6;
                }
            }
                img {
    
                    width:298px;
                    height:234px;  
                }
                .item-text {
                    display:inline-block;
                    text-align: left;
                    width:298px;
                }
                h2 {
                    font-size:28px;
                    font-family:"PingFang-SC-Medium";
                    font-weight:500;
                    color:rgba(51,51,51,1);
                    line-height:48px;
                }
                p {
                    span{
                        color:rgba(235,141,80,1);
                    }
                    font-size:28px;
                    font-family:"PingFang-SC-Bold";
                    font-weight:bold;
                    color:#333333;
                    line-height:48px;
                }
                .oldPrice {
                    font-size:24px;
                    font-family:"PingFang-SC-Medium";
                    font-weight:500;
                    text-decoration:line-through;
                    color:rgba(153,153,153,1);
                    line-height:48px;
                    position: absolute;
                    bottom:28px;
                    right:28px;
                }
            
    
        }
    }
</style>