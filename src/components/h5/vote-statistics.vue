<template>
	<div class="vote-container">
		<template v-for="vote in list">
			<div :key="vote.voteId"
			     class="vote-item">
				<p class="title">{{vote.voteTitle}}</p>
				<p>{{vote.voteMes}}</p>
				<p class="separate"></p>
			</div>
			<template v-for="(theme,index) in vote.infoVoteThemeList">
				<div class="vote-theme_item"
				     :key="theme.voteThemeId">
					<div class="vote-theme_item_inner">
						<p class="title">
							<span class="strong">第{{index+1}}题：</span>
							<span>{{theme.voteTheme}}</span>
							<span v-if="theme.voteType === 1"
							      class="tips">
								[单选题]
							</span>
						</p>
						<div class="wrap_of_tb">
							<table>
								<thead>
									<tr>
										<th>选项</th>
										<th>小计</th>
										<th>比例</th>
									</tr>
								</thead>
								<tbody>
									<template v-for="option in theme.infoVoteOptionsList">
										<tr :key="option.voteOptionId">
											<td>{{option.voteOptionMes}}</td>
											<td>{{option.attrMap.voteResultCount}}</td>
											<td>{{option.attrMap.resultPercentage}}</td>
										</tr>
									</template>
									<tr>
										<td>本题填写人次</td>
										<td>{{__calcVoteResultTotal(theme.infoVoteOptionsList)}}</td>
										<td></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<p class="separate"></p>
				</div>
			</template>
		</template>
	</div>
</template>

<script>
	export default {
		name: "VoteStatistics",
		props: {
			aid: [String, Number]
		},
		data() {
			return {
				list: [],
				isLoaded: false
			};
		},
		methods: {
			__calcVoteResultTotal(options) {
				let total = 0;
				options.forEach(
					option => (total += option.attrMap.voteResultCount)
				);
				return total;
			},
			__fetch() {
				return this.$http.vote
					.getVoteStatistics({
						activityId: this.aid,
						requestUserId: this.uid,
						passport: this.authInfo.passport
					})
					.then(resp => {
						this.list = resp.result.list;
					});
			}
		},
		created() {
			this.$on("fn.fetch", () => {
				if (this.isLoaded) return;
				this.__fetch().then(() => {
					this.isLoaded = true;
				});
			});
		}
	};
</script>
