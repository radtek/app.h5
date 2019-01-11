<style lang="scss">
  @import "../../assets/modules/mall/view-payment.scss";
</style>
<style>
@import "//at.alicdn.com/t/font_995983_4aunluqqdb4.css";
</style>
<template>
    <div class="payment">
        <div class="body">
            <router-link :to="{}">
                <rx-row justify="center"
                        class="action"
                        v-for="item in action" :key="index">
                    <rx-col :span="23" class="col-action">
                        <p><span class='name'>{{item.name}}</span>
                            <span class="phone">{{item.phone}}</span></p>
                        <p class="actionMsg">{{item.add}}</p>
                    </rx-col>
                    <rx-col :span="1">
                        <rx-btn icon="goto"
                                type="text"></rx-btn>  
                    </rx-col>
                </rx-row>
            </router-link>
            <div class="pay">
                <div class="choose">选择支付方式</div>
                <div>
                    <rx-row justify="center"
                            type="flex">
                        <rx-col :span="24">
                            <div @click="choosePay('zfb')">
                            <rx-row class="main zhifubao"
                                    type="flex" 
                                    justify="center">
                                <rx-col :span="22">
                                    <rx-btn class="iconfont icon-zhifubao"
                                            type="text"></rx-btn>
                                    <span class="icontexts">支付宝支付</span>
                                </rx-col>
                                <rx-col :span="2">
                                    <input  id="zfb" 
                                            ref="zfb"
                                            type="radio" 
                                            name="item" 
                                            value="zfb"
                                            :checked="isChecked == 'zfb'">
                                    <label for="zfb"></label>
                                    
                                </rx-col>
                                </rx-row>
                                </div>
                                <div @click="choosePay('wx')">
                                <rx-row class="main weixin" 
                                        type="flex" 
                                        justify="center">
                                <rx-col :span="22">
                                    <rx-btn class="iconfont icon-wxpay"
                                            type="text"></rx-btn>
                                    <span class="icontexts">微信支付</span>
                                </rx-col>
                                <rx-col :span="2">
                                    <input  id="wx"
                                            ref="wx" 
                                            type="radio" 
                                            name="item" 
                                            value="wx"
                                            :checked="isChecked == 'wx'">
                                    <label for="wx"></label>
                                </rx-col>
                            </rx-row>
                            </div>
                        </rx-col>
                    </rx-row>
                </div>
            </div>
            <div class="item">
                <div class="list"
                     v-for="item in rows">
                    <div class="left">
                        <span class="name">{{item.name}}</span>
                        <span class="num">×{{item.num}}</span>
                    </div>
                    <div class="right">
                        <span class="price">￥{{item.price}}</span>
                    </div>
                </div>
            </div>
            <div class="pay-score">
                <rx-row justify="center"
                    type="flex">
                    <rx-col :span="20">
                        消费积分
                    </rx-col>
                    <rx-col >
                        {{score}}分
                    </rx-col>
                </rx-row>
            </div>    
        </div>
        <div class="footer">
            <span class="add">总计： ￥{{allPrice}}+{{score}}积分</span>
            <div class="doPay"
                 @click="doPay()"><span>支付</span></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rows:[],
            score:"",
            isChecked:false,
            allPrice :0
        }
    },
    methods: {
        choosePay(pay){
            this.isChecked = pay;
        },
        addPrice(){
            this.rows.forEach(element => {
                            this.allPrice += parseInt(element.price)
                        });
        },
        doPay(){
            if(!this.isChecked){
                return false;
            }
            console.log(this.isChecked)
        },
        __fetch(){
            this.rows = [
                {price:"100.00",
                 name:"女士羽绒服",
                 num:2
                },
                {price:"100.00",
                 name:"男士羽绒服",
                 num:2
                },
                {price:"15.00",
                 name:"邮费",
                 num:1
                },
                ]
            this.action = [{
                name:"张三",
                phone:"1866668888",
                add:"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
            }]
            this.score = 2000;
        }
    },
    created(){
        this.__fetch();
        this.addPrice()
    }
}
</script>