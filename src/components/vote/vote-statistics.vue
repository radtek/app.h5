<style lang="sass">
 @import "../../assets/modules/vote/statistics.scss"
</style>
<template>
  <div class="vote-statistics">
    <template v-if="role === '1'">
      <div class="empty-wrapper">
        <img :src="noAccessImg" />
        <p class="tips">您无权查看该页面</p>
      </div>
    </template>
    <template v-else
              v-for="vote in list">
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
            <div v-if="theme.kfx">
              <p @click.stop="goto('结果详情','/vote.statistics.kfx',{index,aid,vtid:theme.voteThemeId})"
                 class="kfx-btn">查看结果详情>></p>
            </div>
            <div v-else
                 class="wrap_of_tb">
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
  		aid: [String, Number],
  		mzpy: String,
  		role: String
  	},
  	data() {
  		return {
  			noAccessImg: require("~css/modules/vote/no-access.png"),
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
  		async __fetch() {
  			const [err, resp] = await this.$sync(
  				Promise.all([
  					this.$http.vote.getVoteStatistics({
  						activityId: this.aid,
  						requestUserId: this.uid,
  						isMZPY: this.mzpy,
  						passport: this.authInfo.passport
  					}),
  					this.$http.vote.getKFXVotes({
  						activityId: this.aid,
  						passport: this.authInfo.passport
  					})
  				])
  			);

  			if (!err) {
  				console.log(resp);
  				const kfxVotes = [];
  				const temp = {};
  				if (resp[1] && resp[1].result) {
  					resp[1].result.forEach(it => {
  						if (temp[it.voteId] >= 0) {
  							kfxVotes[temp[it.voteId]].infoVoteThemeList.push({
  								kfx: true,
  								voteThemeId: it.voteThemeId,
  								voteTheme: it.voteTheme
  							});
  						} else {
  							temp[it.voteId] = kfxVotes.length;
  							kfxVotes[kfxVotes.length] = {
  								voteId: it.voteId,
  								voteTitle: it.voteTitle,
  								infoVoteThemeList: [
  									{
  										kfx: true,
  										voteThemeId: it.voteThemeId,
  										voteTheme: it.voteTheme
  									}
  								]
  							};
  						}
  					});
  				}
  				if (resp[0] && resp[0].result) {
  					if (resp[0].result.list && resp[0].result.list.length) {
  						this.list = kfxVotes.concat(resp[0].result.list);
  					} else {
  						this.list = kfxVotes;
  					}
  				}

  				this.list.sort((a, b) => (a <= b ? -1 : 1));
  			}
  		}
  	},
  	created() {
  		this.$on("fn.fetch", isMustRefresh => {
  			if (this.role === "1") return;
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
