<template>
  <section rs-view="address">
    <rx-pull :down="down" :list="address" :total="total" @downing="handleDown" @scroll-end="handleScrollEnd" ref="pull">
      <rx-pull-down slot="down"></rx-pull-down>
      <div class="main">
        <div :key="index" class="contain" v-for="(item,index) in address">
          <div class="font">
            <span class="name">{{item.name}}</span>
            <span class="phone">{{item.phone}}</span>
          </div>
          <div class="address">{{item.addressName}}</div>
          <div class="wire"></div>
          <div class="edit-contain">
            <div @click="change(index)" class="flex">
              <img class="img" src="@/assets/imgs/mall/xuanzhong.png" v-if="nowIndex===index">
              <img class="img" src="@/assets/imgs/mall/weizhong.png" v-else>
              <span class="address-font">默认地址</span>
            </div>
            <div @click="edit" class="flex">
              <img class="editImg" src="@/assets/imgs/mall/edit.png">
              <span class="address-font">编辑</span>
            </div>
            <div @click="del" class="flex">
              <img class="delImg" src="@/assets/imgs/mall/del.png">
              <span class="address-font">删除</span>
            </div>
          </div>
        </div>
      </div>
    </rx-pull>
  </section>
</template>

<script>
  import { utils } from "~rx";
  import Pull from "~m/pull";
  export default {
  	name: "address-manage",
  	mixins: [Pull],
  	data() {
  		return {
  			isSelect: true,
  			address: [],
  			total: 100,
  			nowIndex: 0
  		};
  	},
  	created() {
  		this.__fetch();
  	},
  	methods: {
  		__fetch() {
  			this.address = [
  				{
  					name: "张三",
  					phone: "18160752915",
  					addressName:
  						"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				},
  				{
  					name: "张三",
  					phone: "18160752915",
  					addressName:
  						"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				},
  				{
  					name: "张三",
  					phone: "18160752915",
  					addressName:
  						"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				},
  				{
  					name: "张三",
  					phone: "18160752915",
  					addressName:
  						"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				},
  				{
  					name: "张三",
  					phone: "18160752915",
  					addressName:
  						"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				},
  				{
  					name: "张三",
  					phone: "18160752915",
  					addressName:
  						"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				}
  				// {
  				// 	name: "张三",
  				// 	phone: "18160752915",
  				// 	addressName:
  				// 		"江西省南昌市高新区高新大道123号泰豪软件园区江西国泰利民信息科技有限公司"
  				// }
  			];
  		},
  		change(index) {
  			this.isSelect = !this.isSelect;
  			this.nowIndex = index;
  		},
  		edit() {
  			this.$router.push("/add-address");
  		},
  		del() {
  			this.$confirm("删除提醒", "是否确认删除").then(done => {
  				this.$confirm.close();
  			});
  		}
  	}
  };
</script>

<style  lang="scss">
  [rs-view="address"] {
  	.main {
  		padding-top: 10px;
  		height: 100%;
  		background: rgba(245, 245, 245, 1);
  		.contain {
  			padding-left: 30px;
  			margin-top: 40px;
  			height: 307px;
  			width: 100%;
  			background: white;
  			.font {
  				padding-top: 30px;
  				margin-bottom: 20px;
  				.name {
  					width: 62px;
  					height: 31px;
  					font-size: 32px;
  					font-family: PingFang-SC-Bold;
  					font-weight: bold;
  					color: rgba(51, 51, 51, 1);
  					line-height: 48px;
  				}
  				.phone {
  					padding-left: 40px;
  					width: 183px;
  					height: 22px;
  					font-size: 28px;
  					font-family: PingFang-SC-Medium;
  					color: rgba(51, 51, 51, 1);
  					line-height: 48px;
  				}
  			}
  			.address {
  				margin-bottom: 42px;
  				width: 609px;
  				height: 75px;
  				font-size: 28px;
  				font-family: PingFang-SC-Medium;
  				font-weight: 500;
  				color: rgba(153, 153, 153, 1);
  				line-height: 48px;
  			}
  			.wire {
  				border-bottom: 1px solid rgba(230, 230, 230, 1);
  			}
  			.edit-contain {
  				display: flex;
  				align-items: center;
  				margin-top: 20px;
  				.flex {
  					display: flex;
  					justify-items: center;
  					align-items: center;
  				}
  				.editImg {
  					width: 40px;
  					height: 40px;
  					margin-left: 280px;
  				}
  				.delImg {
  					width: 40px;
  					height: 40px;
  					margin-left: 60px;
  				}
  				.img {
  					width: 40px;
  					height: 40px;
  				}
  				.address-font {
  					font-size: 24px;
  					margin-left: 5px;
  					font-family: PingFang-SC-Medium;
  					color: rgba(153, 153, 153, 1);
  					line-height: 48px;
  				}
  			}
  		}
  	}
  }
</style>