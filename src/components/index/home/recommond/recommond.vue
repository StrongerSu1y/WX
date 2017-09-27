<template>
	<section class="home-recommond">
		<div class="left-part">
			<img src="./recommond_icon.png">
		</div>
		<div class="right-part">
			<div class="recommond-swiper-container">
				<div class="swiper-wrapper">
					<ul v-for="(items, index) in compRecommends" class="swiper-slide recommond-list">
						<li v-for="item in items" class="list-item" @click="openLink(item.link)">
							<span class="title">{{ item.category }}</span>
							<span class="text">{{ item.title }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="right-box"></div>
	</section>
</template>

<script>
	import Swiper from 'swiper'
	export default {
		name: 'home-recommond',
		props: {
			recommends: {
				type: Array
			}
		},
		data () {
			return {
				swiper: ''
			}
		},
		computed: {
			compRecommends () {
				let arr = []
				if (!this.recommends || !this.recommends.length) {
					return arr
				}
				for (let i = 0; i < this.recommends.length; i += 2) {
					let single = []
					single.push(this.recommends[i])
					if (i <= this.recommends.length - 1) {
						single.push(this.recommends[i + 1])
					}
					arr.push(single)
				}
				return arr
			}
		},
		mounted () {
			this.$nextTick(() => {
				this.swiper = new Swiper('.recommond-swiper-container', {
					direction: 'vertical',
					loop: true,
					speed: 1000,
					autoplay: 2000,
					onInit: function (swiper) {
						swiper.startAutoplay()
					},
					onTouchEnd: function (swiper) {
						swiper.startAutoplay()
					}
				})
			})
		},
		methods: {
			openLink (link) {
				window.location.href = link
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './recommond.styl'
</style>