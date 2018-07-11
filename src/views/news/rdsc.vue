<style lang="sass">
@import "../../assets/modules/news/view-rdsc.scss"
</style>

<template>
	<section rs-view="rdsc"
	         style="overflow:hidden;">
		<audio :src="audioSrc"
		       :loop="isFinished"
		       autoplay
		       preload="auto"
		       ref="audio"
		       @play="handlePlay"
		       @ended="handleEnd"></audio>
		<div class="wrap-audio"
		     :class="[{[`playing`]:isPlaying}]"
		     v-if="isFinished">
			<div @click="handleAudio"></div>
		</div>

		<div class="top animated fadeIn">
			<img :src="getLocalImg('rdsc-top')"
			     alt="">
		</div>
		<div class="center animated fadeIn">
			<img :src="getLocalImg('rdsc-center')"
			     alt="">
			<div class="wrap-words">
				<span v-for="(word,index) in words"
				      :key="index"
				      class="text-animation animated fadeIn">
					{{word}}
				</span>
			</div>
		</div>
		<div class="bottom">
			<img :src="getLocalImg('rdsc-bottom')"
			     alt="">
		</div>
	</section>
</template>

<script>
	export default {
		name: "PageOfRDSC",
		data() {
			return {
				backgroundAudio:
					"https://1163742.s50i.faiusr.com/55/219/ADIIABA3GAAgg8PwzwUopJK9iwM.mp3",
				wordAudio:
					"https://1163742.s50i.faiusr.com/55/219/ADIIABA3GAAgtpzvzwUo-tX8zQU.mp3",
				isPlaying: true,
				originWords:
					"我志愿加入中国共产党, 拥护党的纲领, 遵守党的章程, 履行党员义务, 执行党的决定, 严守党的纪律, 保守党的秘密, 对党忠诚, 积极工作, 为共产主义奋斗终身, 随时准备为党和人民牺牲一切, 永不叛党。",
				words: [],
				isFinished: false,
				isReading: true
			};
		},
		computed: {
			audioSrc() {
				return this.isFinished ? this.backgroundAudio : this.wordAudio;
			}
		},
		methods: {
			handleAudio() {
				if (this.isPlaying) {
					this.$refs.audio.pause();
					this.isPlaying = false;
				} else {
					this.$refs.audio.play();
					this.isPlaying = true;
				}
			},
			setWord(i, l) {
				if (i >= l) {
					return;
				}
				this.words.push(this.originWords[i]);

				setTimeout(() => {
					this.setWord((i += 1), l);
				}, 320);
			},
			showWords() {
				const l = this.originWords.length;
				setTimeout(() => {
					this.setWord(0, l);
				}, 600);
			},
			handlePlay() {
				if (this.isFinished) return;
				this.isReading = true;
				this.showWords();
			},
			handleEnd() {
				if (this.isFinished) return;
				this.isFinished = true;
			}
		},
		created() {
			if (this.$isProd || this.$isTest) {
				JXRSApi.wrap("on.app.news.rdscAudioPlay", () => {
					this.$refs.audio.play();
				});
			}
		},
		mounted() {
			setTimeout(() => {
				if (this.isReading) return;
				this.showWords();
			}, 1500);
		}
	};
</script>

