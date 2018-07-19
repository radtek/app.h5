<style lang="sass">
@import "../../assets/modules/score/view-mall.scss"
</style>

<template>
	<section rs-view="mall">
		<rx-tab :current.sync="tabIndex">
			<rx-tab-pane label="兑换商城"
			             :index="0">
				<div class="mall-list">
					<rx-row v-for="(project,index) in projects"
					        :key="index"
					        justify="center"
					        align="center">
						<rx-col class="list_item"
						        v-for="(item,idx) in project"
						        :key="idx">
							<div class="wrap-img">
								<img :src="getLocalMduImg('score',item.src)">
							</div>
							<p class="title">{{item.title}}</p>
							<rx-row class="footer">
								<rx-col>
									<span class="strong">{{item.cost}}</span>红心
								</rx-col>
								<rx-col>
									<span v-if="item.exchangedCount">已有{{item.exchangedCount}}人兑换</span>
									<span v-else>暂无兑换</span>
								</rx-col>
							</rx-row>
						</rx-col>
					</rx-row>
				</div>
			</rx-tab-pane>
			<rx-tab-pane label="我的兑换"
			             :index="1">
				<div class="temp-div">兑换功能尚未开放,请耐心等待!

					<canvas ref="cva"
					        style="width:300px;height:300px;"></canvas>

				</div>
			</rx-tab-pane>
		</rx-tab>
	</section>
</template>

<script>
	export default {
		name: "PageOfMall",
		data() {
			return {
				tabIndex: 0,
				projects: [
					[
						{
							src: "temp-project/1",
							title: "信仰改变中国",
							cost: 200,
							exchangedCount: 25
						},
						{
							src: "temp-project/2",
							title: "我家的抗战故事",
							cost: 200,
							exchangedCount: 15
						}
					],
					[
						{
							src: "temp-project/3",
							title: "打铁必须自身硬",
							cost: 200,
							exchangedCount: 0
						},
						{
							src: "temp-project/4",
							title: "红色家属",
							cost: 300,
							exchangedCount: 2
						}
					],
					[
						{
							src: "temp-project/5",
							title: "筑梦中国",
							cost: 300,
							exchangedCount: 5
						},
						{
							src: "temp-project/6",
							title: "中国共产党的九十年",
							cost: 500,
							exchangedCount: 2
						}
					]
				]
			};
		}
	};
</script>

