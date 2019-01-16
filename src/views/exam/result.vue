<style lang="scss">
  @import "../../assets/modules/exam/exam.scss";
  [rs-view="exam.result"] {
  	.card-wrap {
  		text-align: center;
  		padding-top: 235px;
  		img {
  			width: 349px;
  		}
  		p {
  			position: absolute;
  			top: 330px;
  			left: 50%;
  			transform: translateX(-50%);
  			font-size: 60px;
  			font-weight: bold;
  			color: #fff;
  		}
  	}
  	.tips {
  		font-size: 28px;
  		font-weight: 500;
  		color: rgba(255, 255, 255, 1);
  		line-height: 48px;
  		text-align: center;
  		margin-top: 40px;
  		margin-bottom: 63px;
  	}

  	.details {
  		text-align: center;
  		padding: 0 30px;
  		overflow-y: auto;
  		max-height: 420px;
  	}

  	.details-item {
  		display: inline-block;
  		text-align: center;
  		color: #0097ee;
  		font-size: 36px;
  		background-color: #fff;
  		border-radius: 50%;
  		margin: 0 30px 20px 30px;
  		width: 80px;
  		height: 80px;
  		line-height: 80px;
  		&.err {
  			color: #ff3254;
  		}

  		&.none {
  			color: #ccc;
  		}
  	}

  	.btns.fixed {
  		bottom: 20px;
  	}
  }
  @import "../../assets/modules/exam/exam.rslt.media.scss";
</style>

<template>
  <section rs-view="exam.result"
           class="bg">
    <rx-header @back="handleBack"
               :show-back="ltype==='1'">{{name}}</rx-header>
    <ques-banner is-finished
                 :cost-time="info.usedTime"
                 :end-time="info.endTime"></ques-banner>
    <div class="card-wrap">
      <img :src="getLocalMduImg('exam','win-card')" />
      <p>{{info.score || 0}}</p>
    </div>
    <p class="tips">答对{{okCount}}道题，答错{{failCount}}道，未答{{noneCount}}道</p>
    <div class="details"
         ref="answers"
         :style="answersStyles">
      <rx-row align="center"
              :flex="false">
        <rx-col :span="4"
                v-for="(i,index) in info.resultList"
                :key="index">
          <p class="details-item"
             :class="[{[`err`]:i===2,[`none`]:i===3}]">{{index+1}}</p>
        </rx-col>
      </rx-row>
    </div>
    <div class="btns fixed"
         v-if="atype === '2'"
         ref="btns">
      <rx-btn type="primary"
              @on-click="handleRepeatTest">重新答题</rx-btn>
    </div>
  </section>
</template>

<script>
  export default {
  	name: "ExamResult",
  	components: {
  		QuesBanner: () =>
  			import(/* webpackChunkName:"wc.exam.ques.banner" */ "~c/exam/ques-banner.vue")
  	},
  	data() {
  		return {
  			answersHeight: 0,
  			loading: false,
  			ltype: "",
  			type: "",
  			atype: "",
  			name: "",
  			testId: "",
  			taskId: "",
  			okCount: 0,
  			failCount: 0,
  			noneCount: 0,
  			info: {
  				resultList: []
  			}
  		};
  	},
  	computed: {
  		answersStyles() {
  			const styles = {};
  			if (this.answersHeight) {
  				styles.maxHeight = this.getRealSize(this.answersHeight);
  			}
  			return styles;
  		}
  	},
  	methods: {
  		__fetch() {
  			this.$http.exam
  				.finish({
  					taskId: this.taskId,
  					testId: this.testId,
  					userId: this.userId
  				})
  				.then(data => {
  					this.info = data;
  					data.resultList.forEach(it => {
  						if (it === 3) {
  							this.noneCount += 1;
  						} else if (it === 2) {
  							this.failCount += 1;
  						} else {
  							this.okCount += 1;
  						}
  					});
  					this.$nextTick(() => {
  						this.__calcAnswersHeight();
  					});
  				})
  				.catch(err => {
  					this.$alert(err.msg || err.message);
  				});
  		},
  		handleBack() {
  			this.$router.replace({
  				path: "/info",
  				query: {
  					taskId: this.taskId,
  					userId: this.userId,
  					isin: 1
  				}
  			});
  		},
  		handleRepeatTest() {
  			if (this.loading) return;
  			this.loading = true;

  			const option = {
  				titleTaskId: this.taskId,
  				userId: this.userId,
  				loginType: this.ltype,
  				type: this.ltype === "1" ? 1 : this.type,
  				answerType: this.atype,
  				answerAgain: 1
  			};

  			if (this.ltype === "2") {
  				if (this.type === "2") {
  					option.userName = this.act;
  					option.identityId = this.pwd;
  				} else {
  					option.userPhonenumber = this.act;
  					option.passwd = this.pwd;
  				}
  			}

  			this.$http.exam
  				.login(option)
  				.then(data => {
  					this.loading = false;
  					this.$router.replace({
  						path: "/ques",
  						query: {
  							act: this.act,
  							pwd: this.pwd,
  							ltype: this.ltype,
  							atype: this.atype,
  							type: this.type,
  							name: this.name,
  							testId: data.result.testId,
  							taskId: this.taskId,
  							userId: this.userId
  						}
  					});
  				})
  				.catch(() => {
  					this.loading = false;
  				});
  		},
  		__calcAnswersHeight() {
  			if (this.atype === "2") {
  				const rect = this.$refs.btns.getBoundingClientRect();
  				const answersRect = this.$refs.answers.getBoundingClientRect();
  				this.answersHeight = rect.top - answersRect.top - 10;
  			}
  		}
  	},
  	activated() {
  		if (!this.$isDev) {
  			try {
  				JXRSApi.on("app.exam.back", () => {
  					this.handleBack();
  				});
  				JXRSApi.app.exam.hideHeader();
  			} catch (e) {}
  		}
  		this.getQS(
  			"userId",
  			"testId",
  			"taskId",
  			"name",
  			"ltype",
  			"type",
  			"atype",
  			"pwd",
  			"act"
  		);
  		this.name = this.name ? decodeURIComponent(this.name) : "";
  		this.act = this.act ? decodeURIComponent(this.act) : "";
  		this.info = { resultList: [] };
  		this.okCount = 0;
  		this.failCount = 0;
  		this.noneCount = 0;
  		this.__fetch();
  	}
  };
</script>
