<template>
	<div class="activity-index-page">
		<!-- scroll 外层容器 -->
		<v-top :scrollTop="scrollTop"></v-top>
		<div ref="warpper" class="warpper" :style="{ height: winHeight}">
			<!-- 内容 -->
			<section ref="content" class="content">
				<!-- banner 轮播 -->
				<v-banner :style="{ height: bannerHeight, 'margin-top': '0.9rem'}" :listImg="listImg" class="banner" @chooseItem="chooseItem">
				</v-banner>
				<!-- 活动分类 -->
				<v-menu class="menu-list"></v-menu>
				<!-- 推荐 口碑榜 -->
				<v-praise></v-praise>
				<!-- 热门活动 -->
				<v-hotAct></v-hotAct>
			</section>
		</div>
	</div>
</template>

<script>
	import banner from '@/components/common/banner/banner'
	import top from './top/top'
	import BScroll from 'better-scroll'
	import menu from './menu/actMenu'
	import praise from './praise/praise'
	import hotAct from './hotAct/hotAct'

	export default {
		name: 'activity-index-page',
		data () {
			return {
				bannerHeight: window.innerWidth * 0.6  + 'px',
				// 屏幕高度
				winHeight: window.innerHeight - 52 + 'px',
				scroller: '',
				scrollTop: 0,
				itemList: [],
				starList: [],
				data: {}
			}
		},
		computed: {
			listImg () {
				let list = []
				if (this.itemList.hasOwnProperty('starList') && this.itemList.starList.length) {
					this.itemList.starList.forEach(item => {
						list.push({
							url: item.logo
						})
					})
				}
				return list
			}
		},
		components: {
			'v-banner': banner,
			'v-top': top,
			'v-menu': menu,
			'v-praise': praise,
			'v-hotAct': hotAct
		},

		beforeRouteEnter (to, from, next) {
		//判断上一页是否为搜索列表页
		if (from.path === './activity/') {
			to.meta.isBack = true
			from.meta.keepAlive = false
		}
		next()
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {

		},
		methods: {
			// 加载数据
			loadData () {
				let params = {
					lat: '39',
					lng: '116',
					city_id: '3501',
					cls: '14'
				}
				// 活动首页数据
				this.$ajax.activityHomepage(params).then(res => {
					this.itemList = res.data.data
					this.starList = this.itemList.starList
					console.log(res)
					console.log(this.starList)
					this.$nextTick(() => {
						// 初始化 better-scroll
						this.initBetterScroll()
					})
				}, err => {
					console.log(err)
				})
			},
			// 初始化滚动条
			freshScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.warpper, {
						probeType: 3,
						click: true
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			// 滚动到顶部
			scrollToTop () {
				this.scroller.scrollTo()
			},
			// 监听滚动
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
			},
			// 打开单项列表
			openSingle (type, id, title) {

			},
			// 跳转搜索列表页
			openSearch (id) {
				this.$router.push({
					path: 'search',
					query: {
						// id: id || ''
					}
				})
			},
			// 选择banner  跳转活动详情页
			chooseItem (index) {
				let id = this.adverts[index].srcid
				this.$router.push({
					path: '',
					query: {
						id: id
					}
				})
			},
			// 详情页
			openDetail (id) {
				this.$router.push({
					path: '',
					query: {
						// id: id
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './actIndex.styl'
</style>

