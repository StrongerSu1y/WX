<template>
	<div class="circle-index-page">
		<v-top></v-top>
		<v-nav :navIndex="navIndex" @changeNavIndex="changeNavIndex"></v-nav>
		<!-- scroll 外层容器 -->
		<component ref="list" :is="circleContentView"></component>
	</div>
</template>

<script>
	import top from './top/top'
	import nav from './nav/nav'
	import dynamic from './dynamic/dynamic'
	import community from './community/community'
	import channel from './channel/channel'
	import banner from '@/components/common/banner/banner'
	export default {
		name: 'circle-index-page',
		data () {
			return {
				bannerHeight: window.innerWidth / 3 + 'px',
				// 屏幕高度
				winHeight: window.innerHeight - 50 + 'px',
				// 广告
				adverts: [],
				navIndex: 0,
				contentList: ['v-dynamic', 'v-community', 'v-channel']
			}
		},
		computed: {
			listImg () {
				let list = []
				if (this.adverts.length) {
					this.adverts.forEach(item => {
						list.push({
							url: item.logo
						})
					})
				}
				return list
			},
			circleContentView () {
				return this.contentList[this.navIndex]
			}
		},
		components: {
			'v-top': top,
			'v-banner': banner,
			'v-nav': nav,
			'v-dynamic': dynamic,
			'v-community': community,
			'v-channel': channel
		},
		created () {
		},
		mounted () {
		},
		methods: {
			chooseItem (index) {
				alert(`选择了第${index + 1}张图`)
			},
			changeNavIndex (index) {
				this.$root.Bus.$emit('circleScroll', 0)
				this.navIndex = index
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './circle.styl'
</style>