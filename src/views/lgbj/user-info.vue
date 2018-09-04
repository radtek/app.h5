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

		.rx-card {
			&_header {
				color: #999;
				font-size: 32px;
				border-bottom: none;
				margin-top: 24px;
			}

			&_body {
				padding: 0 0 30px 0 !important;
				margin-left: 48px;
				margin-right: 48px;
				border-bottom: 1px solid #ddd;
			}

			&:last-child &__body {
				border: none;
			}
		}

		[rs-mdu] {
			.top-title {
				color: #333;
				font-size: 40px;
				margin-top: 20px;
				margin-bottom: 34px;
			}
			label {
				color: #999;
				font-size: 24px;

				~ span,
				~ p {
					color: #333;
					font-size: 26px;
				}
			}

			li.info-item {
				padding-top: 16px;
				padding-bottom: 16px;

				p {
					margin-top: 16px;
				}
			}

			.wrap-btn {
				margin-top: 30px;
				margin-bottom: 30px;
				padding: 0 48px;

				.rx-btn {
					width: 100%;
					padding: 32px 0;
					span {
						font-size: 32px;
					}
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
				<div class="top-title">
					{{details.userName}}
				</div>
				<ul>
					<li class="info-item">
						<rx-row>
							<rx-col>
								<label>性別：</label>
								<span>{{details.sex===0?'男':'女'}}</span>
							</rx-col>
							<rx-col>
								<label>出生年月：</label>
								<span>{{$rxUtils.formatDate(details.birthday,'yyyy-MM')}}</span>
							</rx-col>
						</rx-row>
					</li>
					<li class="info-item">
						<rx-row>
							<rx-col>
								<label>政治面貌：</label>
								<span>{{details.political}}</span>
							</rx-col>
							<rx-col>
								<label>入党时间：</label>
								<span>{{$rxUtils.formatDate(details.joinTime,"yyyy-MM-dd")}}</span>
							</rx-col>
						</rx-row>
					</li>
					<li class="info-item">
						<rx-row>
							<rx-col>
								<label>身体状况：</label>
								<span>{{details.health}}</span>
							</rx-col>
							<rx-col>
								<label>文化程度：</label>
								<span>{{details.educationName}}</span>
							</rx-col>
						</rx-row>
					</li>
					<li class="info-item">
						<rx-row>
							<rx-col :span="10">
								<label>离（退）休情况：</label>
								<span>{{details.retire==="1"?"离休":"退休"}}</span>
							</rx-col>
							<rx-col :span="14">
								<label>离（退）休时间：</label>
								<span>{{$rxUtils.formatDate(details.retireTime,"yyyy-MM-dd")}}</span>
							</rx-col>
						</rx-row>
					</li>
					<li class="info-item">
						<label>联系电话：</label>
						<span>{{details.mobileNumber}}</span>
					</li>
					<li class="info-item">
						<label>家庭联系人电话：</label>
						<span>{{details.familyPhone}}</span>
					</li>
					<li class="info-item">
						<label>专业特长：</label>
						<p>{{details.speciality}}</p>
					</li>
					<li class="info-item">
						<label>兴趣爱好：</label>
						<p>{{details.hobby}}</p>
					</li>
					<li class="info-item">
						<label>希望得到的关心活动：</label>
						<p>{{details.service}}</p>
					</li>
				</ul>
			</rx-card>
			<rx-card header="社会关系">
				<ul>
					<li class="info-item">
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
					</li>
					<li class="info-item">
						<label>原工作单位：</label>
						<p>{{details.workUnit}}</p>
					</li>
					<li class="info-item">
						<label>党组织关系所在支部：</label>
						<p>{{details.unitNameReal}}</p>
					</li>
					<li class="info-item">
						<label>党组织关系所在地：</label>
						<p>{{details.unitNameAddress}}</p>
					</li>
					<li class="info-item">
						<label>家庭住址：</label>
						<p>{{details.street + '' + details.community}}</p>
					</li>
					<li class="info-item">
						<label>参加常规型党支部名称：</label>
						<p>{{details.unitName}}</p>
					</li>
					<li class="info-item">
						<label>愿意参加的志愿活动：</label>
						<p>{{details.activityIntention}}</p>
					</li>
				</ul>
			</rx-card>
			<div class="wrap-btn"
			     v-if="edit==='1'">
				<rx-btn type="primary"
				        plain
				        @on-click="handleEdit">编辑修改</rx-btn>
			</div>
		</div>
	</section>
</template>

<script>
	export default {
		name: "PageOfDetail",
		data() {
			return {
				success: false,
				userId: "",
				edit: "",
				details: {}
			};
		},
		methods: {
			handleEdit() {
				this.$router.push({
					path: "/create",
					query: {
						userId: this.userId
					}
				});
			}
		},
		activated() {
			this.getQS("success", "userId", "edit");
			window.scrollTo(0, 0);
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

