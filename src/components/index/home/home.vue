<template>
	<div class="home-page">
		<v-top :scrollTop="scrollTop"></v-top>
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<section ref="content" class="content">
				<div class="home">
					<v-banner :style="{ height: bannerHeight }" :listImg="listImg" class="banner"></v-banner>
				</div>
				<!-- 菜单 -->
				<v-menu class="menu-list"></v-menu>
				<!-- 推荐 -->
				<v-recommond :recommends="data.recommends"></v-recommond>
				<split></split>
				<v-popularize :themes="data.themes"></v-popularize>
				<split></split>
				<v-choiceness ref="circle" @scrollRefresh="scrollRefresh" @canLoadMore="canLoadMore"></v-choiceness>
			</section>
			<img v-show="showToTopBtn" @click="scrollToTop()" class="to-top-icon" src="./to_top_icon.png">
		</div>
	</div>
</template>

<script>
	import banner from '../../common/banner/banner'
	import menu from './menu/menu'
	import recommond from './recommond/recommond'
	import split from '../../common/split/split'
	import popularize from './popularize/popularize'
	import choiceness from './choiceness/choiceness'
	import BScroll from 'better-scroll'
	import top from './top/top'
	export default {
		name: 'home',
		data () {
			return {
				bannerHeight: window.innerWidth * 0.6 + 'px',
				// 屏幕高度
				winHeight: window.innerHeight - 52 + 'px',
				scroller: '',
				scrollTop: 0,
				data: {},
				// 可加载更多
				loadMore: false
			}
		},
		computed: {
			showToTopBtn () {
				return this.scrollTop > window.innerHeight
			},
			// 图片数组
			listImg () {
				if (!this.data.hasOwnProperty('adverts') || !this.data.adverts.length) {
					return [{
						url: 'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
					}]
				}
				let list = []
				this.data.adverts.forEach(item => {
					list.push({
						url: item.logo
					})
				})
				return list
			}
		},
		created () {
			this.loadData()
		},
		watch: {
			scrollTop (newVal, oldVal) {
				let loadTop = this.$refs.content.offsetHeight - window.innerHeight - 50
				if (newVal > loadTop && this.loadMore) {
					// 获取圈子数据
					this.$refs.circle.loadMore()
					this.loadMore = false
				}
			}
		},
		methods: {
			loadData () {
				this.$ajax.getHomePage().then(res => {
					console.log(res)
					// 获取圈子数据
					this.$refs.circle.getData()
					this.data = res.data
					this.$nextTick(() => {
						// 初始化 better-scroll
						this.scroller = new BScroll(this.$refs.wrapper, {
							probeType: 3,
							click: true
						})
						// 监听滚动条
						this.listenScroll()
					})
				}, err => {
					console.log(err)
				})
				// if (!this.scroller) {
				// 	this.scroller = new BScroll(this.$refs.wrapper, {
				// 		scrollY: true,
				// 		click: true
				// 	})
				// 	this.scroller.on('touchend', (pos) => {
				// 		alert(pos.y)
				// 		if (pos.y > 50) {
				// 			this.loadData()
				// 		}
				// 	})
				// } else {
				// 	this.scroller.refresh()
				// }
			},
			// 滚动到顶部
			scrollToTop () {
				this.scroller.scrollTo(0, 0, 500)
			},
			// 刷新 scroll
			scrollRefresh () {
				this.scroller.refresh()
			},
			// 监听滚动条
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						this.loadData()
					}
				})
			},
			// 可加载更多
			canLoadMore (flag) {
				this.loadMore = flag
			}
		},
		components: {
			'v-banner': banner,
			'v-menu': menu,
			'v-recommond': recommond,
			'v-popularize': popularize,
			'v-choiceness': choiceness,
			'v-top': top,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'
</style>