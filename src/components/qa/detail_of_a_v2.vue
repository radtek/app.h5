<template>
	<rx-cell :border="false">
		<template slot="header">
			<user :user-info="userInfo"
			      :padding="false"></user>
		</template>
		<div v-html="row.answer"></div>
		<template slot="img"
		          v-if="row.imgPath && row.imgPath.length">
			<rx-row :flex="false"
			        :gutter="8"
			        :class="__getImgPaneClasses(row.imgPath)"
			        v-for="(group,idx) in imgArr"
			        :key="idx">
				<template v-for="(img,index) in group">
					<rx-col :span="__getColSpan(group)"
					        :key="index">
						<rx-img :src="img"
						        @on-click="onImgClick(img,(idx*3)+index,row.imgPath)"
						        @on-error="onImgErr"></rx-img>
					</rx-col>
				</template>
			</rx-row>
		</template>
	</rx-cell>
</template>

<script>
	import DetailOfAMixin from "~m/__qa-detail_of_a";
	export default {
		name: "DetailOfAV2",
		fetchInCreated: true,
		mixins: [DetailOfAMixin]
	};
</script>

