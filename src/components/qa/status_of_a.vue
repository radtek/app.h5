<template>
  <rx-row justify="start"
          align="center">
    <rx-col align="center"
            :class="[{'only-tag':row.type === 2,'only-answer':row.type !== 2}]">
      <span :class="['tag',{'topic':row.type === 2}]">{{row.type === 2?'话题':'问答'}}</span>
    </rx-col>
    <template v-if="theme === 1">
      <rx-col>创建于{{row.createTime | formatDate('yyyy.M.d')}}</rx-col>
    </template>
    <template v-else-if="theme===2">
      <rx-col align="left">{{row.supportCount}}赞</rx-col>
    </template>
    <rx-col align="left">{{row.clickCount}}阅读</rx-col>
    <rx-col v-if="canEdit"
            align="right">
      <rx-btn icon="edit"
              type="primary"
              size="small"
              plain
              round
              @on-click="onEditClick">编辑</rx-btn>
    </rx-col>
  </rx-row>
</template>

<script>
  export default {
  	name: "StatusOfA",
  	props: {
  		row: {
  			type: Object,
  			default() {
  				return {};
  			}
  		},
  		quesInfo: Object,
  		qid: [Number, String],
  		theme: {
  			type: Number,
  			default: 1
  		},
  		canEdit: Boolean
  	},
  	computed: {
  		appRecieveImgKV() {
  			const arr = [];

  			if (this.row.fileKey && this.row.fileKey.length) {
  				this.row.fileKey.forEach((key, index) => {
  					arr.push({
  						key,
  						url: this.row.imgPath[index]
  					});
  				});
  			}

  			return arr;
  		}
  	},
  	methods: {
  		onEditClick() {
  			this.gotoNative("撰写回答", "editAnswer", {
  				answerId: this.row.id,
  				content: this.row.answer,
  				questionId: this.quesInfo.id,
  				title: this.quesInfo.question,
  				imgs: this.appRecieveImgKV
  			});
  		}
  	}
  };
</script>

