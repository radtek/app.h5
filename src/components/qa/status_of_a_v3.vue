<template>
  <rx-row justify="center"
          align="center"
          class="audit">
    <rx-col align="center"
            :class="[{'only-tag':isTopic,'only-answer':!isTopic}]">
      <span :class="['tag',{'topic':isTopic}]">{{isTopic?'话题':'问答'}}</span>
    </rx-col>
    <rx-col align="left"
            v-if="row.isPublished!==1">
      <span :class="auditClasses">{{auditStateText}}</span>
    </rx-col>
    <rx-col align="left">
      {{row.createTime | formatDate("yyyy.M.d")}}
    </rx-col>
    <rx-col align="right"
            v-if="row.communityUser && row.communityUser.userId === this.authInfo.userId">
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
  	name: "StatusOfAV3",
  	props: {
  		row: {
  			type: Object,
  			default() {
  				return {};
  			}
  		}
  	},
  	computed: {
  		isTopic() {
  			return (
  				this.row &&
  				this.row.infoQuestion &&
  				this.row.infoQuestion.type === 2
  			);
  		},
  		auditClasses() {
  			return [
  				{
  					[`refuse`]: this.row.isPublished === 2,
  					[`auditing`]: this.row.isPublished === 0
  				}
  			];
  		},
  		auditStateText() {
  			let msg = "";
  			switch (this.row.isPublished) {
  				case 2:
  					msg = `未通过${
  						this.row.option ? "(" + this.row.option + ")" : ""
  					}`;
  					break;
  				case 0:
  				default:
  					msg = "系统审核中";
  					break;
  			}
  			return msg;
  		},
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
  				questionId: this.row.infoQuestion.id,
  				title: this.row.infoQuestion.question,
  				content: this.row.answer,
  				imgs: this.appRecieveImgKV
  			});
  		}
  	}
  };
</script>

