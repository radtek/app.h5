<template>
    <div class="leave" v-if="show">
    <div class="mask"></div>
    <div class="dialog1">
      <div class="content">
        <div class="mark">
          <img :src="getLocalMduImg('police','qingjia')">
        </div>
        <div class="item">
          <div class="list" v-for="i,index in leaveDate">
            <div class="time"><span></span>{{formatDate(index)}}</div>
            <div class="choose">
              <input type="radio" 
                     :id="i.id" 
                     name="leaveData"
                     :value="i.id"
                     v-model="kv.id">
              <label :for="i.id" :class="[isWebp()?'labelWebp':'']">
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
    <div class="dialog2" v-if="dialog2">
        <img :src="getLocalMduImg('police','qjcg')">
        <div class="cancel"
             @click="cancel"></div>
    </div>
  </div>
</template>

<script>
import { utils } from "~rx";
export default {
    data(){
        return {
            leaveDate:[],
            leave:[],
            dialog2:false,
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
            rype:Object,
            default(){
                return {}
            }
        }
    },
    methods: {
        formatDate(i){
            return utils.formatDate(this.leaveDate[i].startTime,"yyyy-MM-dd hh:mm")
        },
        async __fetchList(){
            const [err, resp] = await this.$sync(this.$http.police.getInfoActivity());
          if(!err){
            this.leaveDate = resp.result.infoActivityPlanList
          }
        },
        async __fetch(){
            await this.__fetchList();
        },
        cancel(){
            this.dialog2 = false
            this.$emit("doCancel")
        },
        async submit(){
            if(!this.kv.id){
                return false;
            }
            const [err, resp] = await this.$sync(this.$http.police.leaveClass({
                priorityNo:2,
                userId:6,
            }));
            console.log(err)
          if(!err){
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
        .dialog2 {
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
                opacity: 0.2;
                left:110px;
            }
        }
    }  
</style>
