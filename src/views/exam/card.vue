<!-- 答题卡页面 -->
<style lang="scss">
  @import "../../assets/modules/exam/exam.scss";
  [rs-view="exam.card"] {
  	.details {
  		text-align: center;
  		padding: 0 30px;
  		overflow-y: auto;
  		max-height: 420px;
  		padding-top: 235px;
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

  		color: #fff;
  		background-color: #0097ee;
  		border: 1px solid #fff;

  		&.done {
  			color: #0097ee;
  			background-color: #fff;
  		}
  	}

  	.btns.fixed {
  		bottom: 60px;

  		> div {
  			padding: 10px 0;
  		}
  	}
  }
</style>

<template>
  <div rs-view="exam.card"
       class="bg">
    <rx-header @back="handleBack"
               class="overflow">{{name}}</rx-header>
    <ques-banner :test-time="restTime"
                 usage="card"
                 @time-end="handleTimeEnd"
                 ref="banner"></ques-banner>
    <div class="details"
         ref="answers"
         :style="answersStyles">
      <rx-row align="center"
              :flex="false">
        <rx-col :span="4"
                v-for="(i,index) in titles"
                :key="index">
          <p class="details-item"
             :class="[{[`done`]:i.submited}]"
             @click="handleClick(index+1)">{{index+1}}</p>
        </rx-col>
      </rx-row>
    </div>
    <div class="btns fixed"
         v-if="atype === '2'"
         ref="btns">
      <div>
        <rx-btn type="primary"
                @on-click="handleBack">返回</rx-btn>
      </div>
      <div>
        <rx-btn type="primary"
                class="finished"
                @on-click="handleSubmit">交卷</rx-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from "~m/__exam";
  export default {
  	name: "ExamCard",
  	components: {
  		QuesBanner: () =>
  			import(/* webpackChunkName:"wc.exam.ques.banner" */ "~c/exam/ques-banner.vue")
  	},
  	mixins: [mixin],
  	data() {
  		return {
  			answersHeight: 0,
  			restTime: "",
  			titles: []
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
  		handleSubmit() {
  			this.$confirm({
  				title: "提交确认",
  				content: "是否确认提交此答卷?",
  				yesText: "提交",
  				loadingText: "提交中..."
  			})
  				.then(done => {
  					this.$confirm.close();
  					this.__gotoResult(true);
  				})
  				.catch(() => {
  					this.$confirm.close();
  				});
  		},
  		__fetchAllQues() {
  			return this.$http.exam
  				.getAllQues({
  					userId: this.userId,
  					id: this.testId
  				})
  				.then(data => {
  					this.restTime = data.restTime;
  					this.titles = data.titleList || [];
  					this.titles = this.titles.map(it => ({
  						id: it,
  						submited: false
  					}));
  					this.$nextTick(() => {
  						this.__calcAnswersHeight();
  					});
  				})
  				.catch(err => {
  					this.$alert(err.messag || err.msg);
  				});
  		},
  		__fetchAllSubmitedQues() {
  			return this.$http.exam
  				.getAllSubmitQues({
  					userId: this.userId,
  					taskId: this.taskId,
  					testId: this.testId
  				})
  				.then(data => {
  					if (!data.data || !data.data.length) {
  						return;
  					}

  					for (let l = this.titles.length; l--; ) {
  						data.data.forEach(item => {
  							if (item === this.titles[l].id) {
  								this.$set(this.titles, l, {
  									id: this.titles[l].id,
  									submited: true
  								});
  							}
  						});
  					}
  				});
  		},
  		handleTimeEnd() {
  			if (this.$route.path !== "card") {
  				return;
  			}
  			this.$alert("考试截止时间已到，稍后系统会自动计算分数。").then(
  				() => {
  					// // 提交当前题目的答案
  					return this.__doSubmit()
  						.then(() => {
  							this.__gotoResult(true);
  						})
  						.catch(err => {
  							if (err.code === "70") {
  								this.__gotoResult(true);
  							}
  						});
  				}
  			);
  		},
  		handleClick(index, isReplace) {
  			this.$router[isReplace ? "replace" : "push"]({
  				path: "/ques",
  				query: {
  					taskId: this.taskId,
  					testId: this.testId,
  					userId: this.userId,
  					pwd: this.pwd,
  					act: this.act,
  					ltype: this.ltype,
  					atype: this.atype,
  					type: this.type,
  					name: this.name,
  					index
  				}
  			});
  		},
  		handleBack() {
  			this.$refs.banner.endInterval();
  			this.handleClick(this.index, true);
  		},
  		__calcAnswersHeight() {
  			if (this.atype === "2") {
  				const rect = this.$refs.btns.getBoundingClientRect();
  				const answersRect = this.$refs.answers.getBoundingClientRect();
  				this.answersHeight = rect.top - answersRect.top - 10;
  			}
  		},
  		__fetch() {
  			this.__fetchAllQues().then(this.__fetchAllSubmitedQues);
  		}
  	}
  };
</script>