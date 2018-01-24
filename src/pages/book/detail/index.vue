<template>
	<div class="book-detail-page">
		<v-top :topTabIndex="topTabIndex" :showItems="showItems" @changeTopTabIndex="changeTopTabIndex"></v-top>
		<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutLeft">
			<component :is="showContent" :levelShow="true" :item="item" :commentList="item.commentList" ref="content" @changeTopTabIndex="changeTopTabIndex"></component>
		</transition>
		<!-- 底部 -->
		<footer class="detail-footer">
			<div class="icons">
				<div class="collect" @click="doCollect()">
					<!-- <img src="./collect_icon.png"> -->
					<div class="collectImg" :class="{active:isActive}"></div>
					<p class="text">收藏</p>
				</div>
				<div class="shopcat" @click="goShopcat()">
					<span class="dot" v-if="shopNum>0">{{ shopNum }}</span>
					<img src="./shopcat_icon.png">
					<p class="text">购物车</p>
				</div>
			</div>
			<div class="add-shopcat" @click="addToShopcat()">加入购物车</div>
			<div class="go-buy" @click="goOrder()">立即购买</div>
		</footer>
	</div>
</template>

<script>
	import top from './top/top'
	import product from './product/product'
	import detail from './detail/detail'
	import comment from './comment/comment'
	import { getNeedDataList } from '@/common/js/common'
	export default {
		name: 'book-detail-page',
		data () {
			return {
				// 导航
				topTabIndex: 0,
				// 视图
				showContentList: ['v-product', 'v-detail', 'v-comment'],
				// 标题
				showItems: ['商品', '详情', '评价'],
				// 数据
				item: {},
				// 购物车
				shopcatList: [],
				shopNum: 0,
				isActive: false
			}
		},
		computed: {
			// 当前视图
			showContent () {
				return this.showContentList[this.topTabIndex]
			}
		},
		components: {
			'v-top': top,
			'v-product': product,
			'v-detail': detail,
			'v-comment': comment
		},
		created () {
			// 加载数据
			this.loadData()
			// 获取购物车
			this.getShopcat()
		},
		mounted () {

		},
		methods: {
			// 获取数据
			loadData () {
				let params = {
					_uid: localStorage.getItem('userId'),
					cls: '2'
				}
				// 获取图书详情数据
				this.$ajax.bookDetail(this.$route.query.id,params).then(res => {
					this.item = res.data.book
					console.log(this.item.is_fav)
					// let isActive = this.isActive
					if(this.item.is_fav === '1') {
						this.isActive = true 
					} else {
						this.isActive = false 
					}
				}, err => {
					console.error(err)
				})

			},
			// 切换导航条
			changeTopTabIndex (index, secondIndex) {
				this.topTabIndex = index
				this.$nextTick(() => {
					if (index === 1 && secondIndex) {
						this.$refs.content.changeDetailTabIndex(secondIndex)
					}
				})
				if (index === 0) {
					this.loadData()
				}
			},
			// 获取购物车
			getShopcat () {
				this.$ajax.shopcatList().then(res => {
					this.shopcatList = res.data.data.item_list
					// console.log(this.shopcatList)
					let shopNum = 0
					this.shopcatList.forEach(item => {
						this.shopNum += Number(item.quantity)
					})
					// console.log(shopNum)
					if(this.item.is_fav == true) {
							console.log(111)
					}
				}, err => {
					console.log(err)
				})
			},
			// 去购物车
			goShopcat () {
				this.$router.push({
					path: '/shopcat/index'
				})
			},
			// 加入购物车
			addToShopcat () {
				// 判断登录
				if (!this.$ajax.configLogin(this)) {
					return false
				}
				// 修改购物车
				let params = {
					_uid: localStorage.getItem('userId'),
					id: this.$route.query.id,
					cls: '2'
				}
				// 提示
				this.Toast.loading({
					title: '提交中...'
				})
				// 请求服务器
				this.$ajax.shopcatSave(params).then(res => {
					console.log(params)
					console.log(res)
					// 更新购物车
					// this.getShopcat()
					this.shopNum++
				}, err => {
					console.log(err)
				})
			},
			// 立即购买
			goOrder () {
				// 判断登录
				if (!this.$ajax.configLogin(this)) {
					return false
				}
				let data = this.item
				data.number = 1
				let selectedData = [data]
				selectedData = getNeedDataList(selectedData, ['name', 'last_fee', 'number', 'logo', 'id'])
				// 去下单页
				this.$router.push({
					path: '/shopcat/order',
					query: {
						selectedData: JSON.stringify(selectedData),
						nowSum: data.last_fee
					}
				})
			},
			// 加入收藏
			doCollect () {
				let isActive = this.isActive
				let params = {
					_uid: localStorage.getItem('userId'),
					id: this.$route.query.id,
					cls: '2'
				}
				if(isActive == true) {
					this.$ajax.delCollect(params).then(res => {
						this.isActive = !isActive
						console.log(this.item.is_fav)
					}, err => {
						console.log(err)
					})
				} else {
					this.$ajax.addCollect(params).then(res => {
						this.isActive = !isActive
					}, err => {
						console.log(err)
					})
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>