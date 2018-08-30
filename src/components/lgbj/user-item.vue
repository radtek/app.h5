<style lang="scss">
	.rs-user-item {
		margin: 32px 48px;
		border-bottom: 1px solid #f5f5f5;

		li {
			margin-bottom: 23px;

			&:first-child {
				margin-bottom: 31px;

				p {
					line-height: 31px;
					color: #999;
					~ p {
						line-height: 25px;
						margin-top: 21px;
					}
				}

				.region-name {
					font-size: 32px;
					color: #333;
					font-weight: bold;
					display: inline-block;

					.hg {
						color: #1f9cfc;
					}
				}

				.region-sex {
					i {
						font-size: 14px;
						color: #999;
					}
				}

				.region-birth {
					font-size: 24px;
					margin-top: 16px;
				}

				.region-mobile {
					font-size: 28px;
				}
			}
		}

		label {
			color: #999;
			font-size: 24px;
			float: left;
			width: 170px;
			line-height: 30px;
			~ div {
				font-size: 24px;
				color: #999;
				margin-left: 170px;
				line-height: 30px;
				position: relative;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				max-width: 420px;
			}
		}
	}
</style>


<template>
	<div class="rs-user-item"
	     @click.stop="handleClick">
		<ul class="user-item__content">
			<li>
				<rx-row align="left"
				        justify="center">
					<rx-col>
						<div>
							<p class="region-name"
							   v-html="__highlightSelect(info.userName)"></p>
							<span class="region-sex">
								<rx-icon name="male"
								         v-if="info.sex === 0"></rx-icon>
								<rx-icon name="female"
								         v-else></rx-icon>
							</span>
						</div>
						<p class="region-birth">
							{{$rxUtils.formatDate(info.birthday,"yyyy-MM")}}
						</p>
					</rx-col>
					<rx-col>
						<p class="region-mobile">{{info.mobileNumber}}</p>
					</rx-col>
				</rx-row>
			</li>
			<li>
				<label>兴趣爱好：</label>
				<div>{{info.hobby}}</div>
			</li>
			<li>
				<label>专业特长：</label>
				<div>{{info.speciality}}</div>
			</li>
			<li>
				<label>常规党支部：</label>
				<div>{{info.unitName}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: "UserItem",
		props: {
			info: {
				type: Object,
				default() {
					return {};
				}
			},
			hgKey: String
		},
		methods: {
			__highlightSelect(kw) {
				const replaceReg = new RegExp(`(${this.hgKey})`, "ig");

				return kw.replace(replaceReg, word => {
					return '<span class="hg">' + word + "</span>";
				});
			},
			handleClick() {
				this.$router.push({
					path: "/user-info",
					query: {
						userId: this.info.userId
					}
				});
			}
		}
	};
</script>

