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
						<p class="title border fbold">
							<span class="strong red">*</span>
							<span>{{index+1}}.{{theme.voteTheme}}</span>
							<span v-if="theme.voteType === 1"
							      class="tips">
								[单选题]
							</span>
						</p>
						<div class="option-list">
							<template v-if="theme.voteType===1">
								<!--单选-->
								<rx-radio-group vertical
								                v-model="theme.reply"
								                @on-change="handleVoteChange(vote,theme)">
									<template v-for="option in theme.infoVoteOptionsList">
										<rx-radio :key="option.voteOptionId"
										          :label="option.voteOptionMes">
											<span>{{option.voteOptionMes}}</span>
											<input class="text"
											       type="text"
											       placeholder="请输入"
											       v-if="option.voteOptionType===2">
										</rx-radio>
									</template>
								</rx-radio-group>
							</template>
							<template v-else-if="theme.voteType === 2">
								<template v-for="option in theme.infoVoteOptionsList">
									<rx-chk-icon vertical
									             :key="option.voteOptionId"
									             v-model="option.status">
										<span>{{option.voteOptionMes}}</span>
										<input class="text"
										       type="text"
										       placeholder="请输入"
										       v-if="option.voteOptionType===2">
									</rx-chk-icon>
								</template>
							</template>
							<template v-else>
								<template v-if="isVoted">
									{{option.voteOptionMes}}
								</template>
								<template v-else>
									<textarea v-model="option.voteOptionMes"></textarea>
								</template>
							</template>
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
		name: "VoteItems",
		props: {
			aid: [String, Number],
			status: Boolean,
			selected: Object
		},
		data() {
			return {
				list: [],
				isVoted: false,
				isLoaded: false
			};
		},
		methods: {
			__fetch() {
				return this.$http.vote
					.getVoteItems({
						activityId: this.aid,
						passport: this.authInfo.passport
					})
					.then(resp => {
						const list = resp.result.list;

						list.forEach(vote => {
							vote.infoVoteThemeList &&
								vote.infoVoteThemeList.forEach(theme => {
									let reply = theme.reply;

									if (theme.voteType === 2) {
										reply = theme.reply.split(",");
									}

									theme.infoVoteOptionsList &&
										theme.infoVoteOptionsList.forEach(
											option => {
												option.text = "";
												if (resp.result.voteStatus) {
													// 如果存在投票结果
													const resultList =
														option.infoVoteResultList;

													const result =
														resultList &&
														resultList.length
															? resultList[0]
															: [];

													switch (theme.voteType) {
														case 1:
															// 单选情况下
															if (
																option.voteOptionType ===
																1
															) {
																// 非文本选项
																option.status =
																	reply ===
																	option.voteOptionMes;
															} else {
																option.status =
																	reply ===
																	result.voteMes;
																if (option.status) {
																	option.text = reply;
																}
															}
															break;
														case 2:
															if (
																option.voteOptionType ===
																1
															) {
																option.status = this.$rxUtils.includes(
																	reply,
																	option.voteOptionMes
																);
															} else {
																option.status = this.$rxUtils.includes(
																	reply,
																	result.voteMes
																);
																if (option.status) {
																	option.text =
																		result.voteMes;
																}
															}
															break;
														case 3:
															option.status =
																reply ===
																result.voteMes;

															if (option.status) {
																option.text = reply;
															}
															break;
														default:
															break;
													}
												} else {
													// 反之不存在
													option.status =
														option.voteOptionType === 2
															? ""
															: false;
												}
											}
										);
								});
						});

						this.list = list;
						this.$emit(
							"update:status",
							(this.isVoted = resp.result.voteStatus)
						);
					});
			},
			submit() {
				const voteIds = [];
				const voteResultList = [];

				for (let i = 0, l = this.list.length; i < l; i++) {
					const vote = this.list[i];

					voteIds.push(vote.voteId);

					for (
						let i2 = 0, l2 = vote.infoVoteThemeList.length;
						i2 < l2;
						i2++
					) {
						const theme = vote.infoVoteThemeList[i2];

						if (theme.voteType === 1) {
							if (!theme.reply) {
								return Promise.reject(
									new Error("你还有未投票内容")
								);
							}
							// 通过reply去查找选中的项
						} else if (theme.voteType === 2) {
							// 多选的情况下
							let hasChecked = false;
							theme.infoVoteOptionsList.forEach(option => {
								if (option.status) {
									hasChecked = true;
									voteResultList.push({
										voteOptionId: option.voteOptionId,
										voteMes: option.voteOptionMes
									});
								}
							});

							if (!hasChecked) {
								return Promise.reject(
									new Error("你还有未投票内容")
								);
							}
						} else if (theme.voteType === 3) {
							theme.infoVoteOptionsList.forEach(option => {
								voteResultList.push({
									voteOptionId: option.voteOptionId,
									voteMes: option.voteOptionMes
								});
							});
						}
					}
				}

				return this.$http.vote.submit({
					activityId: this.aid,
					voteResultList,
					voteIds: voteIds.join(","),
					passport: this.authInfo.passport
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
