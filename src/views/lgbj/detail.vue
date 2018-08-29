<style lang="scss">
	[rs-view="lgbj-detail"] {
		.wrap-success {
			background-color: #f9f9f9;
			padding: 80px 150px 52px 150px;
			color: #1f9cfc;
			font-size: 30px;

			img {
				width: 72px;
				height: 72px;
			}

			p {
				padding-left: 24px;

				~ p {
					margin-top: 10px;
				}
			}
		}
	}
</style>


<template>
	<section rs-view="lgbj-detail">
		<div class="wrap-success"
		     v-if="success">
			<rx-row align="center"
			        justify="center">
				<rx-col :span="8"
				        align="right">
					<img :src="getLocalMduImg('lgbj','icon-success')">
				</rx-col>
				<rx-col :span="16"
				        align="left">
					<p>提交成功！</p>
					<p>可下拉预览填写情况</p>
				</rx-col>
			</rx-row>
		</div>
		<div rs-mdu="basic">
			<rx-card header="个人情况">
				<div>
					{{details.userName}}
				</div>
				<rx-row>
					<rx-col>
						<label>性別：</label>
						<span>{{details.sex}}</span>
					</rx-col>
					<rx-col>
						<label>出生年月：</label>
						<span>{{details.birthday}}</span>
					</rx-col>
				</rx-row>
				<rx-row>
					<rx-col>
						<label>政治面貌：</label>
						<span>{{details.political}}</span>
					</rx-col>
					<rx-col>
						<label>入党时间：</label>
						<span>{{details.joinTime}}</span>
					</rx-col>
				</rx-row>
				<rx-row>
					<rx-col>
						<label>身体状况：</label>
						<span>{{details.health}}</span>
					</rx-col>
					<rx-col>
						<label>文化程度：</label>
						<span>{{details.education}}</span>
					</rx-col>
				</rx-row>
				<rx-row>
					<rx-col>
						<label>离（退）休情况：</label>
						<span>{{details.retire==="1"?"离休":"退休"}}</span>
					</rx-col>
					<rx-col>
						<label>离（退）休时间：</label>
						<span>{{details.retireTime}}</span>
					</rx-col>
				</rx-row>
				<div>
					<label>联系电话：</label>
					<span>{{details.mobileNumber}}</span>
				</div>
				<div>
					<label>家庭联系人电话：</label>
					<span>{{details.familyPhone}}</span>
				</div>
				<div>
					<label>身份证号：</label>
					<span>{{details.userIdCard}}</span>
				</div>
				<div>
					<p>专业特长：</p>
					<p>{{details.speciality}}</p>
				</div>
				<div>
					<p>兴趣爱好：</p>
					<p>{{details.hobby}}</p>
				</div>
				<div>
					<p>希望得到的关心活动：</p>
					<p>{{details.service}}</p>
				</div>
			</rx-card>
			<rx-card header="社会关系">
				<rx-row>
					<rx-col>
						<label>职称：</label>
						<span>{{details.title}}</span>
					</rx-col>
					<rx-col>
						<label>原职务：</label>
						<span>{{details.position}}</span>
					</rx-col>
				</rx-row>
				<div>
					<p>原工作单位：</p>
					<p>{{details.workUnit}}</p>
				</div>
				<div>
					<p>党组织关系所在支部：</p>
					<p>{{details.unitNameReal}}</p>
				</div>
				<div>
					<p>党组织关系所在地：</p>
					<p>{{details.unitNameAddress}}</p>
				</div>
				<div>
					<p>家庭住址：</p>
					<p>{{details.street + '' + details.community}}</p>
				</div>
				<div>
					<p>参加常规型党支部名称：</p>
					<p>{{details.unitName}}</p>
				</div>
				<div>
					<p>愿意参加的志愿活动：</p>
					<p>{{details.activityIntention}}</p>
				</div>
			</rx-card>
		</div>
	</section>
</template>

<script>
	export default {
		name: "PageOfDetail",
		data() {
			return {
				success: false,
				details: {}
			};
		},
		created() {
			this.getQS("success", "userId");
		},
		mounted() {
			return this.$http.lgbj
				.getUserInfo({
					userId: this.userId
				})
				.then(data => {
					this.details = data.result.userDetails;
				});
		}
	};
</script>

