<template>
	<!-- 二级页面 搜索页 -->
	<div class="activity-search-page">
		<v-top :scrollTop="scrollTop" :params="params" @refreshData="refreshData" @reset="reset"></v-top>
		<!-- srcoll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 列表 内容 -->
			<section ref="content" class="content">
				<v-list :activityLists="activityList" v-if="activityList.length"></v-list>
				<empty v-else></empty>
			</section>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll' 
	import top from './top/top'
	import list from './list/list'
	import empty from '@/components/common/empty/empty'
	import { getDistinctArray } from '@/common/js/common.js'

	export default {
		name: 'activity-search-page',
		data () {
			return {
				// 屏幕高度
				winHeight: window.innerHeight - 50 - 45 + 'px',
				scroller: '',
				scrollTop: 0,
				// 可加载
				// loadMore: false,
				// 活动列表
				activityList: [],
				// 选择的类型
				actTypeIds: null,
				// 查询参数
				id: this.$route.query.id,
				// 上一页传入的查询参数
				itemTypeId: this.$route.query.itemTypeId || '',
				itemIds: this.$route.query.itemIds || '',
				// 是否第一次进入
				isFirstEnter: false,
				params: { pageNum: 1 }
			}
		},
		computed: {
			// 参数
			// params () {
			// 	let params = {}
			// 	// 类型id
			// 	if (this.actTypeIds) {
			// 		params.actTypeIds = this.actTypeIds
			// 	} else {
			// 		if (this.itemTypeId) {
			// 			params.itemTypeId = [this.itemTypeId]
			// 		}
			// 		if (this.itemIds) {
			// 			params.itemIds = this.itemIds
			// 		}
			// 	}
			// 	params.pageNum = this.pageNum
			// 	return params
			// }
		},
		watch: {
		},
		created () {
			// 判断浏览器，当入口为活动页时，自动登录
			if (this.isWeixin) {
				// 判断微信登陆返回 status
				if (this.$route.query.hasOwnProperty('status')) {
					if (parseInt(this.$route.query.status) === 0) {
						localStroage.setItem('userId', this.$route.query.uid)
						localStroage.setItem('wxOpenId', this.$route.query.openid)
					}
				}
			}
			// 滑动到顶部
			setTimeout(() => {
				window.scrollTo(0, 0)
			}, 200)
			this.isFirstEnter = true
		},
		mounted () {
		},
		beforeRouteEnter (to, from, next) {
			// 如果从活动详情跳转，则缓存到列表页
			if (from.path === '/activity/detail') {
				to.meta.isBack = true
				to.meta.keepAlive = true
			}
			next()
		},
		activated () {
			// 首次进入
			if (!this.$route.meta.isBack || this.isFirstEnter) {
				this.loadData()
			}
			// 重置
			this.isFirstEnter = false
			this.$route.meta.isBack = false
		},
		methods: {
			// 加载数据
			loadData () {
				this.Toast.loading({
					title: '加载中...'
				})
				let params = {
					lat: '39',
					lng: '116',
					city_id: '3501',
					cls: '14'
				}
				this.$ajax.activityList(params).then(res => {
					// 返回的数据
					// console.log(res)
					this.activityList = res.data.data.list
					// 总页数
					this.pages = res.data
					// 加载不重复的数据
					this.activityList = getDistinctArray(list, this.activityList, 'id')
					// 更新scroll
					this.$nextTick(() => {
						// 初始化滚动条
						this.initBetterScroll()
						// 监听滚动条
						this.listenScroll()
					})
				}, err => {
					console.log(err)
				})
			},

			// // 更新数据
			refreshData () {
				this.activityLists = []
				// this.actTypeIds = params.actTypeIds
				if(this.actTypeIds) {
					this.actTypeIds = params.actTypeIds
				}
				console.log(this.actTypeIds)
				this.loadData()
			},
			// 初始化滚动条
			initBetterScroll () {
				// console.log(this.$ref.content.offsetHeight)
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					// 监听滚动
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
				// 加载更多
				// this.loadMore = true
			},
			// 监听滚动条
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
				})
			},
			// 滑动到上次位置
			backToLastTop () {
				if (this.scroller) {
					this.scroller.scrollTo(0, 300, 300)
				}
			},
			// 重置
			reset () {
				this.itemIds = ''
				this.itemTypeId = ''
			}
		},
		components: {
			'v-top': top,
			'v-list': list,
			empty
		},
	}
</script>



<style lang="stylus" rel="stylesheet/stylus">
	@import './search.styl'
</style>