<template>
	<div class="mine-setting-about-page">
		<!-- 头部 -->
		<section class="mine-setting-about-top">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
		</section>
		<section class="img-part">
			<div class="top-part">
				<div class="right-cloud">
					<img src="./right_cloud.png">
				</div>
				<div class="left-cloud">
					<img src="./left_cloud.png">
				</div>
			</div>
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
	@import './about.styl'
</style>