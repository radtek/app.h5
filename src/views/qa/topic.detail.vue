<style lang="scss">
	@import "../../assets/modules/qa/view-question_detail.scss";
	[rs-view="detail"] {
		.rx-cell-avatar.p {
			padding: 15px 30px 0 30px;
		}
		.rx-cell-header {
			padding-bottom: 0;
			padding-top: 5px;
		}
		.rx-cell-imgs {
			margin-top: 10px;
		}

		.empty-wrap {
			padding: 61px 0 81px 0;
			color: #666;
			font-size: 30px;
			text-align: center;

			.rx-icon {
				color: #0091f5;
				font-size: 46px;
			}

			p {
				padding-top: 27px;
			}
		}

		.topic {
			&-header {
				width: 100%;
				img,
				video {
					width: 100%;
					height: 422px;
				}
			}

			&-body {
				padding: 30px;
				padding-bottom: 10px;
			}

			&-title {
				font-size: 32px;
				font-weight: bold;
				color: #333;
				line-height: 48px;
			}

			&-content {
				color: #666;
				font-size: 32px;
			}

			&-tag {
				color: #0097ee;
				float: left;
				display: block;
				line-height: 1;
				margin-top: 2px;
			}

			&-bar {
				color: #999;
				font-size: 24px;
				line-height: 1.15;
				margin-top: 35px;

				.rx-col {
					&:first-child {
						padding-top: 26px;
					}
				}

				.icon-star,
				.icon-star-fill {
					font-size: 42px;
				}
			}
		}

		.pane-answer {
			.topic-tag {
				margin-top: 10px;
			}
		}
	}
</style>

<template>
  <section rs-view="detail">
    <rx-pull ref="pull"
             :list="list"
             :total="total"
             :down="down"
             :up="up"
             @uping="handleUp"
             @downing="handleDown"
             @scroll-end="handleScrollEnd">
      <rx-pull-down slot="down"></rx-pull-down>
      <rx-pull-up slot="up"></rx-pull-up>
      <div class="pane-ques">
        <div class="topic-header">
          <video v-if="question.videoPath"
                 :src="question.videoPath"
                 :poster="question.imgPath"
                 controls></video>
          <img v-else-if="question.imgPath && question.imgPath.length"
               :src="question.imgPath[0]" />
        </div>
        <div class="topic-body">
          <h1 class="topic-title">{{question.question}}</h1>
          <div class="topic-content">
            <a href="javascript:void(0);"
               class="topic-tag">#{{question.topicTag}}#</a>
            <div v-html="question.description"></div>
          </div>
          <rx-row class="topic-bar">
            <rx-col align="left">
              <span>{{question.answerCount ||0}}人回答·{{question.collectionCount ||0}}人收藏</span>
            </rx-col>
            <rx-col align="right">
              <rx-btn type="text"
                      :icon="isCollected ? 'star-fill':'star'"
                      @on-click="doCollect">收藏</rx-btn>
            </rx-col>
          </rx-row>
        </div>
      </div>
      <div class="separate"></div>
      <rx-card v-if="total>0"
               class="pane-answer"
               padding="b">
        <a-detail v-for="(answer,index) in list"
                  :key="index"
                  :question="question"
                  :row="answer"
                  is-topic
                  ref="asw">
        </a-detail>
      </rx-card>
      <div v-else
           class="empty-wrap"
           @click.stop="gotoNative('回复话题','createAnswer',{questionId:qid,title:question.question,topicFlag:question.topicTag})">
        暂无回复，点击添加靠谱回复
      </div>
    </rx-pull>
  </section>
</template>

<script>
  import { utils } from "~rx";
  import Pull from "~m/pull";
  export default {
  	name: "VwTopicDetail",
  	asyncListenCmps: "DetailOfA",
  	components: {
  		ADetail: () =>
  			import(/* webpackChunkName:"wc-detail_of_a" */ "~c/qa/detail_of_a.vue").then(
  				cmp => utils.asyncCmp.solution(cmp, "VwTopicDetail")
  			)
  	},
  	mixins: [Pull],
  	data() {
  		return {
  			list: [],
  			total: 0,
  			page: 1,
  			isCollected: false,
  			question: {},
  			isShowUsers: true,
  			userIds: [],
  			readyACount: 0,
  			userStatus: []
  		};
  	},
  	methods: {
  		async __fetchQ() {
  			const [err, resp] = await this.$sync(
  				this.$http.qa.getQuesDetail({ questionId: this.qid })
  			);

  			if (err) return;

  			const question = resp.result.question;
  			this.isCollected = resp.result.isCollected;
  			if (!this.$isDev) {
  				JXRSApi.app.qa.topic.sendReplyArgs({
  					questionId: this.qid,
  					question: question.question,
  					topicFlag: question.topicTag
  				});
  			}
  			this.question = question;
  			this.isPrerenderQues = false;
  		},
  		async __fetchAnswers() {
  			this.page = 1;

  			const [err, resp] = await this.$sync(
  				this.$http.qa.getAnswers({ questionId: this.qid })
  			);

  			if (err) return;

  			const answers = resp.result.list;
  			if (answers) {
  				this.total = resp.result.count;
  				this.list = answers;
  			} else {
  				this.total = 0;
  				this.list = [];
  			}
  		},
  		async __fetch() {
  			await this.__fetchQ();

  			await this.__fetchAnswers();

  			const userIds = [];
  			this.list &&
  				this.list.length &&
  				this.list.forEach(item => {
  					if (
  						item.isAnonymous === 0 &&
  						item.communityUser &&
  						item.communityUser.userId !== this.authInfo.userId
  					) {
  						userIds.push(item.communityUser.userId);
  					}
  				});

  			this.userIds = userIds;

  			this.$rxUtils.asyncCmp.dataReady.call(this, "DetailOfA");

  			if (!this.$isDev) {
  				JXRSApi.app.qa.refreshH5IMInfo({ userIds });
  			} else {
  				console.log(userIds);
  			}
  		},
  		async __append() {
  			const [err, resp] = await this.$sync(
  				this.$http.qa.getAnswers({
  					questionId: this.qid,
  					page: ++this.page
  				})
  			);

  			if (err) return;

  			const list = resp.result.list;

  			this.$rxUtils.asyncCmp.dataReady.call(this, "DetailOfA");

  			if (list && list.length) {
  				this.list = this.list.concat(list);

  				const userIds = [];
  				this.list.forEach(item => {
  					if (
  						item.isAnonymous === 0 &&
  						item.communityUser &&
  						item.communityUser.userId !== this.authInfo.userId
  					) {
  						userIds.push(item.communityUser.userId);
  					}
  				});
  				this.userIds = userIds;
  				if (!this.$isDev) {
  					JXRSApi.app.qa.refreshH5IMInfo({ userIds });
  				}
  			}
  		},
  		__asyncReadyCallback(cmp) {
  			this.$nextTick(() => {
  				cmp.broadcast("RxImg", "fn.load");
  				cmp.broadcast("RxReadMore", "fn.showOrHide");
  			});
  		},
  		__refreshIMStatus() {
  			// 先移除问题详情用户的干扰]
  			this.userStatus.forEach(item => {
  				for (const userId in item) {
  					let it;
  					for (let i = 0, l = this.list.length; i < l; i++) {
  						it = this.list[i];
  						if (
  							it &&
  							it.isAnonymous === 0 &&
  							it.communityUser &&
  							it.communityUser.userId === userId
  						) {
  							this.$refs.asw[i].$emit(
  								"fn.refreshUserIMStatus",
  								item[userId]
  							);
  						}
  					}
  				}
  			});
  		},
  		async doCollect() {
  			if (this.collecting) return;

  			this.collecting = false;

  			const [err] = await this.$sync(
  				this.$http.qa.collect({
  					questionId: this.question.id,
  					collect: !this.isCollected
  				})
  			);

  			this.collecting = false;

  			if (!err) {
  				if (this.isCollected) {
  					this.question.collectionCount -= 1;
  				} else {
  					this.question.collectionCount += 1;
  				}
  				this.isCollected = !this.isCollected;
  			}
  		}
  	},
  	created() {
  		this.getQS("qid");

  		if (!this.$isDev) {
  			// App原生通知H5更新回答的相关状态的数目
  			JXRSApi.on(
  				"app.qa.refreshAnswerStatusCount",
  				({ id, status, count }) => {
  					if (this.list && this.list.length) {
  						const list = this.list;

  						let prop = "";

  						switch (status) {
  							case "click":
  								prop = "clickCount";
  								break;
  							case "comment":
  								prop = "commentCount";
  								break;
  							case "support":
  								prop = "supportCount";
  								break;
  							default:
  								break;
  						}
  						for (let l = list.length; l--; ) {
  							if (list[l].id === id) {
  								list[l][prop] =
  									(list[l][prop] || 0) + (count || 1);
  								if (prop === "supportCount") {
  									list[l].isSupported = count > 0;
  								}
  							}
  						}
  					}
  				}
  			).on("app.qa.refreshIMStatus", ({ userStatus }) => {
  				if (userStatus && userStatus.length) {
  					this.userStatus = userStatus;
  					if (this.readyACount === this.list.length) {
  						this.__refreshIMStatus();
  					}
  				}
  			});
  		}

  		this.$rxUtils.asyncCmp.ready(this, "DetailOfA", cmp => {
  			this.__asyncReadyCallback(cmp);
  			this.readyACount += 1;
  			if (
  				this.readyACount === this.list.length &&
  				this.userStatus.length
  			) {
  				this.__refreshIMStatus();
  			}
  		});

  		return this.__fetch();
  	}
  };
</script>

