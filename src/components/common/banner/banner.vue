<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swiper-slide" v-for="(str, index) in listImg" :style="{ backgroundImage: 'url(' + str.url + ')' }">
				<!-- <img :src="str.url" > -->
			</div>
		</div>
		<div class="swiper-pagination swiper-pagination-white"></div>
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	export default {
		name: 'banner',
		props: ['listImg'],
		data () {
			return {
				swiper: ''
			}
		},
		mounted () {
			this.$nextTick(() => {
				this.swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'horizontal',
					// loop: true,
					speed: 600,
					autoplay: 2000
				})
			})
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.swiper-container 
		width: 100%
		height: 100%
		.swiper-wrapper 
			width: 100%
			height: 100%
			.swiper-slide 
				background-position: center
				background-size: cover
				width: 100%
				height: 100%
				background-size contain
				// background-attachment: fixed
				background-repeat no-repeat
		.swiper-pagination-bullet 
			width:0.12rem
			height: 0.12rem
			display: inline-block
			background: #7c5e53
</style>