<template>
    <div class="leave" v-if="show">
    <div class="mask"></div>
    <div class="dialog1" v-if="dialog1">
      <div class="content">
        <div class="mark">
          <img :src="getLocalMduImg('police','active')">
        </div>
        <div class="item">
          <div class="list" v-for="i,index in joinData">
            <div class="time"><span></span>{{formatDate(index)}}</div>
            <div class="choose">
              <input type="radio" 
                     :id="i.start_time" 
                     name="leaveData"
                     v-model="kv.priority_no"
                     :value="i.priority_no">
              <label :for="i.start_time" :class="[isWebp()?'labelWebp':'']">
              </label>
            </div>
          </div>
        </div>
        <div class="comfirm">
          <div class="cancel" @click="cancel">
            <img :src="getLocalMduImg('police','cancelText')">
          </div>
          <div class="sure" @click="submit">
            <img :src="getLocalMduImg('police','comfirm')">
          </div>
        </div>
      </div>
    </div>
    <div :class="[state?'dialog2-cg':'dialog2-sb']" v-if="dialog2">
        <div v-if="state">
        <img :src="getLocalMduImg('police','bmcg')" >
        <div class="cancel" @click="cancel"></div>
        </div>
        <div v-else>
            <img :src="getLocalMduImg('police','bmsb')" >
            <img :src="getLocalMduImg('police','zdl')" @click="cancel">
        </div>
    </div>
  </div>
</template>

<script>
import { utils } from "~rx";
export default {
    data(){
        return {
            dialog2:false,
            state:true,
            joinData:[],
            dialog1:true
        }
    },
    props: {
        show: {
            type:Boolean,
            default(){
                return false
            }
        },
        kv: {
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        formatDate(i){
            return utils.formatDate(this.joinData[i].start_time,"yyyy-MM-dd hh:mm")
        },
        cancel(){
            this.dialog2 = false
            this.$emit("doCancel")
        },
        async __fetch(){
            const[err,resp] = await this.$sync(this.$http.police.listForRob())
            if(!err){
                this.joinData = resp.result.listForRob
            }
        },
        async submit(){
            console.log(this.kv)
            if(!this.kv.priority_no){
                return false
            }
            
            const [err, resp] = await this.$sync(this.$http.police.robbingClass({
                priorityNo:this.kv.priority_no,
                userId:this.kv.userId,
            }));
            if(!err){
                this.dialog1 = false;
                this.dialog2 = true;
            }
            
            
        }
    },
    mounted() {
    this.__fetch()
    },
}
</script>

<style lang="scss">
  .leave {
        width:100%;
        height:100%;
        position: absolute;
        .mask {
            width:100%;
            height:100%;
            background:rgba(0,0,0,1);
            opacity:0.4;
        }
        .dialog1    {
            position: absolute;
            top:50%;
            left:50%;
            margin: -266px 0 0 -304px;
            width:608px;
            height:532px;
            background:linear-gradient(0deg,rgba(255,253,250,1) 0%,rgba(255,236,209,1) 100%);
            border-radius:20px; 
            display: flex;
            justify-content:center;
            align-items:Center;

            .content {
                width:528px;
                height:452px;
                border:1px solid rgba(241,170,0,1);
                box-shadow:1px 0px 1px 0px rgba(255,255,255,1);
                border-radius:10px;

                .mark {
                    width:234px;
                    height:53px;
                    margin:24px 0 0 -15px;
                    img {
                        width:100%;
                        height:100%;
                    }
                }
                .item {
                    margin:0 30px;
                    height:200px;
                    overflow: scroll;

                    .list {
                        display:flex;
                        position: relative;
                        justify-content: space-between;
                        line-height: 100px;
                        
                        .time {
                            font-size:30px;
                            font-family:Adobe Heiti Std R;
                            font-weight:normal;
                            color:rgba(102,102,102,1);
                            vertical-align: middle;
                            span {
                                display: inline-block;
                                background:rgba(102,102,102,1);
                                width:8px;
                                height:8px;
                                border-radius:50%;
                                vertical-align: middle;
                                margin-right:8px;
                            }
                        }
                        .choose {
                            input[type=radio] {
                                display:none;
                            }
                            input[type=radio]:checked + label {
                                background:url("../police/imgs/check2.png") 427px 31px no-repeat;
                                background-size: 36px 36px;
                            }
                            input[type=radio]:checked + .labelWebp {
                                background:url("../police/imgs/webp/check2.webp") 427px 31px no-repeat;
                                background-size: 36px 36px;
                            }
                            label {
                                position: absolute;
                                background:url("../police/imgs/check1.png") 427px 31px no-repeat;
                                background-size: 36px 36px;
                                top:0;
                                left:0;
                                width:464px;
                                height:98px;

                                
                                img {
                                    position: absolute;
                                    right:0;
                                    top:32px;
                                    width:36px;
                                    height:36px;
                                }
                            }
                            .labelWebp {
                                position: absolute;
                                background:url("../police/imgs/webp/check1.webp") 427px 31px no-repeat;
                                background-size: 36px 36px;
                                top:0;
                                left:0;
                                width:464px;
                                height:98px;
                                img {
                                    position: absolute;
                                    right:0;
                                    top:32px;
                                    width:36px;
                                    height:36px;
                                }
                            }
                        }
                        
                    }
                }
                .comfirm {
                    display:flex;
                    align-items:center;
                    margin-left:90px;
                    .cancel {
                        width:70px;
                        height:39px;
                        margin-right:54px;
                        img {
                            width:100%;
                            height:100%;
                        }
                    }
                    .sure {
                        width:331px;
                        height:176px;
                        margin-top:20px;
                        img {
                            width:100%;
                            height:100%;
                        }
                    }
                }

            }
        }
        .dialog2-cg {
            width:690px;
            height:920px;
            position: absolute;
            top:50%;
            left:50%;
            margin:-460px 0 0 -345px;
            img {
                width:100%;
                height:100%;
            }
            .cancel {
                width:470px;
                height:100px;
                position: absolute;
                bottom:60px;
                left:110px;
            }
        }
        .dialog2-sb {
            width:470px;
            height:498px;
            position: absolute;
            top:50%;
            left:50%;
            margin:-249px 0 0 -235px;
            img {
                width:100%;
                height:100%;
            }
        }
    }  
</style>
