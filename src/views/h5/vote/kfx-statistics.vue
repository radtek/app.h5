<style lang="sass">
@import "../../../assets/modules/vote/view-vote.scss"
</style>

<template>
  <section rs-view="vote">
    <div class="vote-theme_item">
      <div class="vote-theme_item_inner"
           v-for="(item,idx) in list"
           :key="idx">
        <div class="title">
          <span class="strong">第{{parseInt(index,10)+1}}题：</span>
          <span>{{item.voteTheme}}</span>
        </div>
        <div class="wrap_of_tb">
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>回答内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(it,i) in item.results"
                  :key="i">
                <td>{{it.userName}}</td>
                <td>{{it.voteMes}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
  	name: "VoteKFXStatistics",
  	data() {
  		return {
  			vtid: "",
  			aid: "",
  			index: "",
  			list: []
  		};
  	},
  	methods: {
  		async __fetch() {
  			const [err, res] = await this.$sync(
  				this.$http.vote.getKFXStatistics({
  					activityId: this.aid,
  					voteThemeId: this.vtid,
  					passport: this.authInfo.passport
  				})
  			);

  			if (!err) {
  				const list = [];
  				const kv = {};

  				if (!res.result || !res.result.length) return;

  				res.result.forEach(it => {
  					if (kv[it.voteId] >= 0) {
  						list[kv[it.voteId]].results.push({
  							voteMes: it.voteMes,
  							userName: it.userName
  						});
  					} else {
  						list[(kv[it.voteId] = list.length)] = {
  							voteTheme: it.voteTheme,
  							results: [
  								{
  									voteMes: it.voteMes,
  									userName: it.userName
  								}
  							]
  						};
  					}
  				});

  				this.list = list;
  			}
  		}
  	},
  	activated() {
  		this.getQS("vtid", "aid", "index");
  		this.__fetch();
  	}
  };
</script>
