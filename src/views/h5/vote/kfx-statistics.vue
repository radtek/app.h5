<style lang="scss">
  @import "../../../assets/modules/vote/view-vote.scss";
  [rs-view="vote"] {
  	.vote-theme_item {
  		height: 100%;
  		&_inner {
  			height: 100%;
  			overflow-y: auto;
  		}
  	}
  	table tbody tr {
  		&:last-child,
  		&:first-child {
  			background: #f6fafd;

  			td {
  				font-weight: normal;
  			}
  		}

  		td:last-child {
  			text-align: left;
  			padding: 0 5px;
  		}
  	}
  }
</style>

<template>
  <section rs-view="vote">
    <div class="vote-theme_item">
      <div class="vote-theme_item_inner"
           v-for="(item,idx) in list"
           :key="idx">
        <div class="title">
          <span class="strong">第{{parseInt(index,10)+1}}题：</span>
          <span>{{item.voteTheme || title}}</span>
        </div>
        <div class="wrap_of_tb">
          <table>
            <colgroup>
              <col align="center"
                   :style="cellStyle" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th align="center">姓名</th>
                <th>回答内容</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(it,i) in item.results"
                  :key="i">
                <td align="center">{{it.userName}}</td>
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
  			title: "",
  			list: []
  		};
  	},
  	computed: {
  		cellStyle() {
  			return {
  				width: this.getRealSize(70)
  			};
  		}
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
  		this.getQS("vtid", "aid", "index", "title");
  		this.title = decodeURIComponent(decodeURIComponent(this.title));
  		this.__fetch();
  	}
  };
</script>
