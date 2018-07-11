<template>
	<rx-row justify="start"
	        align="center">
		<rx-col>
			<span :class="auditClasses">{{auditStateText}}</span>
		</rx-col>
		<rx-col>
			创建时间 {{row.createTime | formatDate("yyyy.M.d")}}
		</rx-col>
	</rx-row>
</template>

<script>
	export default {
		name: "StatusOfQV3",
		props: {
			row: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		computed: {
			auditClasses() {
				return [
					{
						[`refuse`]: this.row.isPublish === 2,
						[`auditing`]: this.row.isPublish === 0
					}
				];
			},
			auditStateText() {
				let msg = "";
				switch (this.row.isPublish) {
					case 2:
						msg = `审核未通过(${this.row.option})`;
						break;
					case 0:
					default:
						msg = "系统审核中";
						break;
				}
				return msg;
			}
		}
	};
</script>

