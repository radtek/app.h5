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
									<template v-for="(option,index) in theme.infoVoteOptionsList">
										<template v-if="option.infoVoteResultList && option.infoVoteResultList.length && option.infoVoteResultList[0].voteMes">
											<template v-if="option.voteOptionType === 1">
												<tr :key="index+'-'+idx">
													<td>{{option.infoVoteResultList[0].voteMes}}</td>
													<td>{{option.attrMap.voteResultCount}}</td>
													<td>{{option.attrMap.resultPercentage}}</td>
												</tr>
											</template>
											<template v-else
											          v-for="(result,idx) in option.infoVoteResultList">
												<tr :key="index+'-'+idx">
													<td>{{result.voteMes}}</td>
													<template v-if="idx===0">
														<td :rowspan="option.infoVoteResultList.length">{{option.attrMap.voteResultCount}}</td>
														<td :rowspan="option.infoVoteResultList.length">{{option.attrMap.resultPercentage}}</td>
													</template>
												</tr>
											</template>
										</template>
										<template v-else>
											<tr :key="index">
												<td>{{option.voteOptionMes}}</td>
												<td>{{option.attrMap.voteResultCount}}</td>
												<td>{{option.attrMap.resultPercentage}}</td>
											</tr>
										</template>
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
				const kv = {};
				options.forEach(option => {
					const results = option.infoVoteResultList;
					results.forEach(r => {
						if (!r.userId) {
							return;
						}
						kv[r.userId] = true;
					});
				});

				for (const key in kv) {
					total += 1;
				}

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
			this.$on("fn.fetch", isMustRefresh => {
				if (isMustRefresh) {
					this.__fetch();
				} else {
					if (this.isLoaded) return;
					this.__fetch().then(() => {
						this.isLoaded = true;
					});
				}
			});
		}
	};
</script>
