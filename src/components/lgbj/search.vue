<style lang="scss">
	.search-container {
		position: relative;
		margin: 30px 48px;
		height: 64px;
		line-height: 64px;

		background: #f5f5f5;
		border-radius: 32px;
		border: 1px solid #e6e6e6;

		div.search__content {
			margin-left: 71px;
			line-height: 64px;
			position: relative;

			input {
				height: 64px;
				width: 100%;
				border: none;
				background: transparent;
			}
		}

		label {
			float: left;
			text-align: right;
			line-height: 64px;
			width: 60px;
			i {
				font-size: 30px;
				color: #b2b2b2;
			}
		}

		.region-btns {
			position: absolute;
			right: 0;
			top: -2px;

			.rx-btn {
				border: none;
				background-color: transparent;

				color: #b2b2b2;
			}
		}
	}
</style>

<template>
	<div class="search-container">
		<label v-if="showIcon">
			<rx-icon name="search"></rx-icon>
		</label>
		<div class="search__content">
			<input type="text"
			       placeholder="搜索老干部姓名"
			       @focus="handleFocus"
			       @change="doSearch"
			       v-model="keywords" />
		</div>
		<div class="region-btns"
		     v-if="!showIcon">
			<rx-btn type="primary"
			        circle
			        plain
			        icon="search"
			        @on-click="doSearch"></rx-btn>
			<rx-btn type="primary"
			        circle
			        plain
			        icon="close"
			        @on-click="doClear"></rx-btn>
		</div>
	</div>
</template>

<script>
	export default {
		name: "LgbjSearch",
		props: {
			kw: String,
			redirect: { type: Boolean, default: true },
			users: Array,
			showIcon: { type: Boolean, default: true }
		},
		data() {
			return {
				keywords: this.kw
			};
		},
		watch: {
			keywords(val) {
				this.$emit("update:kw", val);
			},
			kw(val) {
				this.keywords = val;
			}
		},
		methods: {
			handleFocus() {
				if (this.redirect) {
					this.$router.push({
						path: "/search-result"
					});
				}
			},
			doSearch() {
				this.$emit("on-search");
			},
			doClear() {
				this.keywords = "";
				this.$emit("on-clear");
			}
		}
	};
</script>



