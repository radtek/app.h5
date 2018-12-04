<style lang="sass">
@import "../../assets/modules/qa/item_qa.scss"
</style>
<template>
  <rx-cell class="item-qa a">
    <div slot="header"
         @click.stop="go">{{curQues.question}}</div>
    <template v-if="row.imgPath && row.imgPath.length">
      <rx-row :flex="false">
        <rx-col :span="16"
                v-if="row.answer">
          <template v-if="curQues.type === 2">
            <div>
              <a href="javascript:void(0);"
                 class="topic-tag"
                 @click.stop="goTopicDetail">#{{curQues.topicTag}}#</a>
              <div @click.stop="handleGoto">
                {{row.answer | removeHtmlTag | overflowContent}}
              </div>
            </div>
          </template>
          <template v-else>
            <span class="content"
                  @click.stop="handleGoto">{{row.answer | removeHtmlTag | overflowContent}}</span>
          </template>
        </rx-col>
        <rx-col :span="row.answer ?8:24">
          <rx-img :src="row.imgPath[0]"
                  @on-error="onImgErr"
                  @on-click="handleGoto"
                  ref="rxImg"></rx-img>
        </rx-col>
      </rx-row>
    </template>
    <template v-else>
      <template v-if="curQues.type === 2">
        <div>
          <a href="javascript:void(0);"
             class="topic-tag"
             @click.stop="goTopicDetail">#{{curQues.topicTag}}#</a>
          <div @click.stop="handleGoto">
            {{row.answer | removeHtmlTag | overflowContent}}
          </div>
        </div>
      </template>
      <template v-else>
        <div @click.stop="handleGoto">
          {{row.answer | removeHtmlTag | overflowContent}}
        </div>
      </template>
    </template>
    <template slot="footer">
      <status v-if="row.isPublished === 1"
              :row="row"
              :ques-info="curQues"
              :theme="2"
              :can-edit="canEdit"></status>
      <status3 v-else
               :row="row"></status3>
    </template>
  </rx-cell>
</template>

<script>
  import { utils } from "~rx";
  export default {
  	name: "ItemOfA",
  	components: {
  		Status: () =>
  			import(/* webpackChunkName:"wc-status_of_a" */ "~c/qa/status_of_a.vue").then(
  				utils.fixAsyncCmpLifeCycle
  			),
  		Status3: () =>
  			import(/* webpackChunkName:"wc-status_of_a_v3" */ "~c/qa/status_of_a_v3.vue").then(
  				utils.fixAsyncCmpLifeCycle
  			)
  	},
  	props: {
  		row: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		canEdit: { type: Boolean, default: true }
  	},
  	computed: {
  		curQues() {
  			if (this.row) {
  				return this.row.infoQuestion || {};
  			}
  			return {};
  		}
  	},
  	methods: {
  		goTopicDetail() {
  			this.goto("话题详情", "/topic.detail", {
  				qid: this.row.infoQuestion.id
  			});
  		},
  		go() {
  			if (this.row.infoQuestion.type === 2) {
  				this.goto("回复详情", "/answer", {
  					qid: this.row.infoQuestion.id,
  					aid: this.row.id,
  					topic: 1
  				});
  				return;
  			}
  			this.goto("回答详情", "/answer", {
  				qid: this.row.infoQuestion.id,
  				aid: this.row.id
  			});
  		},
  		handleGoto() {
  			this.goto("回答详情", "/answer", {
  				qid: this.row.infoQuestion.id,
  				aid: this.row.id
  			});
  		}
  	}
  };
</script>
