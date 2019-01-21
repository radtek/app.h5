<template>
    <div class="main">
		<div class="contain">
			<div class="font">
				<span class="name">张三</span>
				<span class="phone">18160752915</span>
			</div>
			<div class="address">江西省南昌市高新区高新大道123号泰豪软件园区
				江西国泰利民信息科技有限公司</div>
			<div class="wire"></div>
			<div  class="edit-contain" >
				<img src="@/assets/imgs/mall/weizhong.png" style="width: 20px;height:20px"></img>
				<span class="address-font" >默认地址</span>
				<img src="@/assets/imgs/mall/edit.png" style="width: 20px;height:20px;margin-left: 140px"></img>
				<span class="address-font">编辑</span>
				<img src="@/assets/imgs/mall/del.png" style="width: 20px;height:20px;margin-left: 30px"></img>
				<span class="address-font">删除</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "address-manage"
	};
</script>

<style  lang="scss"   scoped>
     .main{
		 height: 100%;
		 background:rgba(245,245,245,1);
		 .contain{
			 padding-left: 30px;
			 margin-top: 20px;
			 height: 307px;
			 width: 100%;
			 background: white;
			 .font{
				 margin-top: 30px;
				 margin-bottom: 20px;
				 .name{
					 width:62px;
					 height:31px;
					 font-size:32px;
					 font-family:PingFang-SC-Bold;
					 font-weight:bold;
					 color:rgba(51,51,51,1);
					 line-height:48px;
				 }
				 .phone{
					 padding-left: 40px;
					 width:183px;
					 height:22px;
					 font-size:28px;
					 font-family:PingFang-SC-Medium;
					 color:rgba(51,51,51,1);
					 line-height:48px;
				 }
			 }
			 .address{
				 margin-bottom: 42px;
				 width:609px;
				 height:75px;
				 font-size:28px;
				 font-family:PingFang-SC-Medium;
				 font-weight:500;
				 color:rgba(153,153,153,1);
				 line-height:48px;
			 }
			 .wire{
				 border-bottom: 1px solid rgba(230,230,230,1);
			 }
			 .edit-contain{
				 display: flex;
				 align-items: center;
				 margin-top: 20px;
				 .address-font{
					 font-size: 24px;
					 margin-left: 5px;
					 font-family:PingFang-SC-Medium;
					 color:rgba(153,153,153,1);
					 line-height:48px;
				 }
			 }
			
		 }
	 }
</style>