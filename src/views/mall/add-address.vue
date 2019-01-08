<template>
	<div>
		<div class="consignee-contain">
			<span class="consignee">收货人</span>
			<input class="input" placeholder="请输入收货人姓名">
			<div class="wire"></div>
		</div>
		<div class="phone-contain">
			<span class="phone">手机号码</span>
			<input class="input" placeholder="请输入收货人电话">
			<div class="wire"></div>
		</div>
		<div class="address-contain">
			<span class="address">选择省</span>
			<img src="@/assets/imgs/mall/down2.png"></img>
			<span class="address" style="margin-left: 51px">选择市</span>
			<img src="@/assets/imgs/mall/down2.png"></img>
			<span class="address" style="margin-left: 51px">选择区</span>
			<img src="@/assets/imgs/mall/down2.png"></img>
			<div class="wire"></div>
		</div>
		<div class="detail-contain">
			<span class="detail">详细地址</span>
			<div>
				<input class="detail-des" placeholder="请填写您的详细所在地，例如街道、单位、门牌号"/>
			</div>
			<div class="wire"></div>
		</div>
		<div class="footer">
			<button>保存</button>
		</div>
		<div class="default">
			<span class="font">设为默认地址</span>
			<img src="@/assets/imgs/mall/miss.png">
		</div>
	</div>
  
</template>

<script>
	export default {
		name: "add-address"
	};
</script>

<style  lang="scss" scoped>
	.consignee-contain{
		padding: 29px;
		.consignee{
			width:96px;
			height:31px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:48px;
		}
		.input{
			border: none;
			padding-left: 70px;
			height:26px;
			font-size:28px;
			font-family:PingFang-SC-Regular;
		}
		input::placeholder{
			font-size:28px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:48px;
		}
		.wire{
			margin-top: 20px;
			border-bottom: 1px solid rgba(230,230,230,1);
		}
	}
	.phone-contain{
		padding:0 29px;
		.phone{
			width:128px;
			height:31px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:48px;
		}
		.input{
			border: none;
			padding-left: 38px;
			height:26px;
			font-size:28px;
			font-family:PingFang-SC-Regular;
		}
		input::placeholder{
			font-size:28px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:48px;
		}
		.wire{
			margin-top: 20px;
			border-bottom: 1px solid rgba(230,230,230,1);
		}
	}
	.address-contain{
		padding:29px;
		.address{
			height:31px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:48px;
		}
		img{
			margin-left: 10px;
			vertical-align: middle;
			width: 32px;
			margin-bottom: 7px;
		}
		.wire{
			margin-top: 20px;
			border-bottom: 1px solid rgba(230,230,230,1);
		}
	}
	.detail-contain{
		padding:0 29px;
		height: 176px;
		.detail{
			height:31px;
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:48px;
		}
		.detail-des{
			margin-top: 39px;
			border: none;
			width:615px;
			height:28px;
			font-family:PingFang-SC-Regular;
		}
		input::placeholder{
			font-size:28px;
			font-family:PingFang-SC-Regular;
			font-weight:400;
			color:rgba(153,153,153,1);
			line-height:48px;
		}
		.wire{
			margin-top: 30px;
			border-bottom: 1px solid rgba(230,230,230,1);
		}
	}
	.default{
		padding:0 29px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.font{
			font-size:32px;
			font-family:PingFang-SC-Medium;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:48px;
		}
		img{
			height: 40px;
			width: 40px;
		}
	}
	.footer{
		position: fixed;
		bottom: 0;
		button{
			border: none;
			font-size:32px;
			font-family:PingFang-SC-Bold;
			font-weight:bold;
			color:rgba(255,255,255,1);
			line-height:48px;
			width:750px;
			height:98px;
			background:rgba(0,151,238,1);
			box-shadow:0px -1px 0px 0px rgba(230,230,230,1);
		}
		
	}
	
</style>