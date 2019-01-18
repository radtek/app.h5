<style lang="scss">
[rs-view="view-person"] {
	.fw {
		font-family: PingFang-SC-Bold;
		font-weight: bold;
	}
	.title {
		display: flex;
		align-items: center;
		margin: 0 30px;
		border-bottom: 1px solid rgba(230, 230, 230, 1);
		padding-top: 40px;
		padding-bottom: 18px;
		.line {
			width: 19px;
			height: 41px;
			margin-right: 8px;
		}
		span {
			font-size: 32px;
			color: rgba(102, 102, 102, 1);
		}
	}
	.content {
		margin-top: 40px;
		margin-left: 30px;
		ul {
			li {
				display: inline-block;
			}
		}
	}
	.person {
		width: 100px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-right: 48px;
		img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
		}
	}
}
</style>

<template>
  <div rs-view="view-person">
    <div class="top">
      <div class="title">
        <img :src="getLocalMduImg('police','line')" alt class="line">
        <span class="fw">参与人员({{atPerson}}/{{allPerson}})</span>
      </div>
      <div class="content">
        <ul>
          <li v-for="(q,index) in list" :key="index">
            <div class="person">
              <img :src="q.iconUrl" class="head_icon">
              <div>{{q.name}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="separate" v-show="isShowUsers"></div>
  </div>
</template>

<script>
export default {
	name: "view-person",
	data() {
		return {
			isShowUsers: true,
			atPerson: 16,
			allPerson: 20,
			list: []
		};
	},
	methods: {},
	created() {
		this.list = [
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵1"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵2"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵3"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵4"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵5"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵6"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵7"
			},
			{
				iconUrl:
					"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2951924714,3607611016&fm=26&gp=0.jpg",
				name: "宋海兵8"
			}
		];
	}
};
</script>