<template>
	<div class="mine-setting-about-page">
		<!-- 头部 -->
		<section class="mine-setting-about-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
		</section>
		<section class="img-part">
			<div class="bottom-text">
				<img src="./bottom_text.png">
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon_black.png')
			}
		},
		computed: {
		},
		mounted () {
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './feedback.styl'
</style>