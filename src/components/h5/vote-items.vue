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
							<span class="user-info">{{index+1}}. <img v-if="theme.userInfo&&theme.userInfo.iconUrl"
								     :src="theme.userInfo.iconUrl" /> {{theme.voteTheme}}</span>
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
								                @on-change="onRadioChange">
									<template v-for="option in theme.infoVoteOptionsList">
										<rx-radio :key="option.voteOptionId"
										          :disabled="status"
										          :label="option.voteOptionMes">
											<span>{{option.voteOptionMes}}</span>
											<input class="text"
											       type="text"
											       :disabled="status"
											       placeholder="请输入"
											       v-model="option.text"
											       v-if="option.voteOptionType===2">
										</rx-radio>
									</template>
								</rx-radio-group>
							</template>
							<template v-else-if="theme.voteType === 2">
								<template v-for="option in theme.infoVoteOptionsList">
									<rx-chk-icon vertical
									             :disabled="status"
									             :key="option.voteOptionId"
									             v-model="option.status">
										<span>{{option.voteOptionMes}}</span>
										<input class="text"
										       type="text"
										       :disabled="status"
										       placeholder="请输入"
										       v-model="option.text"
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
			selected: Object,
			mzpy: String,
			unitId: String,
			userId: String
		},
		data() {
			return {
				list: [],
				isVoted: false,
				isLoaded: false
			};
		},
		methods: {
			__calcYXCount() {
				const vote = this.list[0];

				let count = 0;

				vote.infoVoteThemeList.forEach(theme => {
					if (theme.voteType !== 1) return;
					theme.infoVoteOptionsList.forEach(option => {
						if (
							option.voteOptionType === 1 &&
							theme.reply === "优秀" &&
							option.voteOptionMes === theme.reply
						) {
							count += 1;
						}
					});
				});

				if (count / vote.infoVoteThemeList.length > 0.3) {
					this.$alert(
						"您所投的优秀党员票数超额，请您修改互评投票结果",
						"提示",
						true
					);
				}
			},
			onRadioChange() {
				this.__calcYXCount();
			},
			__reBuildOption(option, theme, voteStatus) {
				option.text = "";
				if (!voteStatus) {
					// 反之不存在
					option.status = option.voteOptionType === 2 ? "" : false;
					return;
				}
				// 如果存在投票结果
				const resultList = option.infoVoteResultList;

				const result = resultList && resultList.length ? resultList[0] : {};

				switch (theme.voteType) {
					case 1:
						// 单选情况下
						if (option.voteOptionType === 1) {
							// 非文本选项
							option.status = result.voteMes === option.voteOptionMes;

							if (option.status) {
								theme.reply = result.voteMes;
							}
						} else {
							option.status = !!result.voteMes;
							if (option.status) {
								option.text = result.voteMes;

								theme.reply = result.voteMes;
							}
						}
						break;
					case 2:
						if (option.voteOptionType === 1) {
							option.status = result.voteMes === option.voteOptionMes;
						} else {
							option.status = !!result.voteMes;
							if (option.status) {
								option.text = result.voteMes;
							}
						}
						break;
					case 3:
						option.status = !!result.voteMes;

						if (option.status) {
							option.text = result.voteMes;
						}
						break;
					default:
						break;
				}
			},
			async __fetch() {
				const [err, resp] = await this.$sync(
					this.$http.vote.getVoteItems({
						activityId: this.aid,
						isMZPY: this.mzpy,
						passport: this.authInfo.passport
					})
				);

				if (err) {
					this.$alert("投票问卷信息查询失败!");
					return;
				}
				const list = resp.result.list;

				list.forEach(vote => {
					if (!vote.infoVoteThemeList || !vote.infoVoteThemeList.length) {
						return;
					}

					let theme;

					for (let l = vote.infoVoteThemeList.length; l--; ) {
						theme = vote.infoVoteThemeList[l];

						const userInfo = theme.userinfoJson
							? JSON.parse(theme.userinfoJson)
							: "";

						if (userInfo) {
							if (userInfo.userId === this.userId) {
								vote.infoVoteThemeList.splice(l, 1);
							} else {
								theme.userInfo = userInfo;
								if (!userInfo.iconUrl) {
									theme.userInfo.iconUrl =
										theme.userInfo.userSex === 1
											? this.$DEFAULT_AVATAR_FEMALE
											: this.$DEFAULT_AVATAR;
								}
							}
						}

						if (
							!theme.infoVoteOptionsList ||
							!theme.infoVoteOptionsList.length
						) {
							return;
						}

						for (let l2 = theme.infoVoteOptionsList.length; l2--; ) {
							this.__reBuildOption(
								theme.infoVoteOptionsList[l2],
								theme,
								resp.result.voteStatus
							);
						}
					}
				});

				this.list = list;
				this.$emit(
					"update:status",
					(this.isVoted = resp.result.voteStatus)
				);
				// 弹出提示框
				if (this.mzpy === "1" && !this.isVoted) {
					this.$alert(
						"投优秀的票数不能超过总投票数的1/3哦",
						"投票规则",
						true
					);
				}
			},
			submit() {
				const voteIds = [];
				const voteResultList = [];

				const mzpyYXList = [];

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
							let hasSelect = false;
							theme.infoVoteOptionsList.forEach(option => {
								if (option.voteOptionType === 1) {
									if (option.voteOptionMes === theme.reply) {
										hasSelect = true;

										if (theme.reply === "优秀") {
											mzpyYXList.push(option.voteOptionId);
										}

										voteResultList.push({
											voteOptionId: option.voteOptionId,
											voteMes: option.voteOptionMes
										});
									}
								} else if (option.text) {
									hasSelect = true;
									voteResultList.push({
										voteOptionId: option.voteOptionId,
										voteMes: option.text
									});
								}
							});
							if (!hasSelect) {
								return Promise.reject(
									new Error(
										this.mzpy === "1"
											? "还有党员未对其投票评议"
											: "您还有部分问题未填写意见，请填写完整"
									)
								);
							}
							// 通过reply去查找选中的项
						} else if (theme.voteType === 2) {
							// 多选的情况下
							let checkedLen = 0;
							let hasOtherNoText = false;
							theme.infoVoteOptionsList.forEach(option => {
								if (option.status) {
									if (option.voteOptionType === 1) {
										checkedLen += 1;
										voteResultList.push({
											voteOptionId: option.voteOptionId,
											voteMes: option.voteOptionMes
										});
									} else if (option.text) {
										checkedLen += 1;
										voteResultList.push({
											voteOptionId: option.voteOptionId,
											voteMes: option.text
										});
									} else {
										hasOtherNoText = true;
									}
								}
							});

							if (checkedLen === 0 || hasOtherNoText) {
								return Promise.reject(
									new Error(
										"您还有部分问题未填写意见，请填写完整"
									)
								);
							}
						} else if (theme.voteType === 3) {
							let checkedLen = 0;
							theme.infoVoteOptionsList.forEach(option => {
								if (option.voteOptionMes) {
									checkedLen += 1;
									voteResultList.push({
										voteOptionId: option.voteOptionId,
										voteMes: option.voteOptionMes
									});
								}
							});
							if (checkedLen !== theme.infoVoteOptionsList.length) {
								return Promise.reject(
									new Error(
										"您还有部分问题未填写意见，请填写完整"
									)
								);
							}
						}
					}
				}

				if (this.mzpy === "1") {
					const rate = mzpyYXList.length / voteResultList.length;
					if (rate > 0.3) {
						this.$alert(
							"您所投的优秀党员票数超额，请您修改互评投票结果",
							"提示",
							true
						);
						return Promise.reject(false);
					}
				}

				return this.$http.vote.submit({
					activityId: this.aid,
					voteResultList,
					voteIds: voteIds.join(","),
					passport: this.authInfo.passport,
					isMZPY: this.mzpy || "",
					unitId: this.unitId || ""
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
