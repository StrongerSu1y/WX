<template>
	<section class="shopcat-main" :style="{ minHeight: windowHeight }">
		<empty v-if="!userId" :text="'您暂时还未登录哦！'"></empty>
		<div v-if="!userId" class="login-box">
			<button @click.prevent.stop="goLogin()">去登录</button>
		</div>
		<section v-if="goHomePageShow" class="no-data-box">
			<img src="./shopcat_empty.png">
		</section>
		<div v-if="goHomePageShow" class="login-box">
			<button @click.prevent.stop="goHomePage()">去逛逛</button>
		</div>
		<!-- 悬浮层 -->
		<p class="fixed-title">购买微校网商品满99元包邮哦亲！</p>
		<section v-if="bookList.length || goodsList.length" class="wrapper" ref="wrapper" :style="{ height: winHeight }">
			<div ref="content" class="content">
				<!-- 报刊杂志 -->
				<section v-if="bookList.length" class="book-part">
					<div class="content-header">
						<div class="check-box" @click.prevent.stop="selectAllBookItems()">
							<img v-if="bookAll" :src="checkActiveSrc">
							<img v-if="!bookAll" :src="checkSrc">
						</div>
						<p class="title">报刊杂志</p>
					</div>
					<ul class="shopcat-list">
						<transition-group enter-active-class="animated" leave-active-class="animated slideOutRight">
							<li v-for="(item, index) in bookList" :key="item.id" ref="bookItem" class="list-item" :class="{ deleteShow: index === bookDeleteIndex }">
								<div class="content">
									<div class="check-box" @click.prevent.stop="selectBookItem(index)">
										<img v-if="item.active" :src="checkActiveSrc">
										<img v-if="!item.active" :src="checkSrc">
									</div>
									<div class="list-body">
										<div class="left-part">
											<img :src="item.logo">
										</div>
										<div class="right-part">
											<div class="book-detail">
												<p class="name">{{ item.name }}</p>
												<p class="price">
													<span class="small">¥</span>
													<span class="big">{{ item.last_fee | getInteger }}</span>
													<span class="small">{{ item.last_fee | getDecimal }}</span>
												</p>
												<!-- 控制器 -->
												<div class="cart-control">
													<div class="left-icon" @click.prevent.stop="changeNum('bookList', index, -1)">
														<img :src="reduceIconSrc">
													</div>
													<p class="num">{{ item.number }}</p>
													<div class="right-icon" @click.prevent.stop="changeNum('bookList', index, 1)">
														<img :src="addIconSrc">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- 删除按钮 -->
								<div ref="deleteBox" class="delete-box" @click.prevent.stop="deleteBookItem(item.id)">移除</div>
							</li>
						</transition-group>
					</ul>
				</section>
				<!-- 商品 -->
				<section v-if="goodsList.length" class="goods-part">
					<div class="content-header">
						<div class="check-box" @click.prevent.stop="selectAllGoodsItems()">
							<img v-if="goodsAll" :src="checkActiveSrc">
							<img v-if="!goodsAll" :src="checkSrc">
						</div>
						<p class="title">商品</p>
					</div>
					<ul class="shopcat-list">
						<transition-group enter-active-class="animated" leave-active-class="animated slideOutRight">
							<li v-for="(item, index) in goodsList" :key="item.id" ref="goodsItem" class="list-item" :class="{ deleteShow: index === goodsDeleteIndex }">
								<div class="content">
									<div class="check-box" @click.prevent.stop="selectGoodsItem(index)">
										<img v-if="item.active" :src="checkActiveSrc">
										<img v-if="!item.active" :src="checkSrc">
									</div>
									<div class="list-body">
										<div class="left-part">
											<img :src="item.logo">
										</div>
										<div class="right-part">
											<div class="book-detail">
												<p class="name">{{ item.name }}</p>
												<p class="price">
													<span class="small">¥</span>
													<span class="big">{{ item.last_fee | getInteger }}</span>
													<span class="small">{{ item.last_fee | getDecimal }}</span>
												</p>
												<!-- 控制器 -->
												<div class="cart-control">
													<div class="left-icon" @click.prevent.stop="changeNum('goodsList', index, -1)">
														<img :src="reduceIconSrc">
													</div>
													<p class="num">{{ item.number }}</p>
													<div class="right-icon" @click.prevent.stop="changeNum('goodsList', index, 1)">
														<img :src="addIconSrc">
													</div>
												</div>
											</div>
											<!-- 商品有积分 -->
											<div class="integral">
												<img src="./integral_icon.png">
												<span class="text">10积分=0.01元 最多可用200积分</span>
											</div>
										</div>
									</div>
								</div>
								<!-- 删除按钮 -->
								<div ref="deleteBox" class="delete-box" @click.prevent.stop="deleteGoodsItem(item.id)">移除</div>
							</li>
						</transition-group>
					</ul>
				</section>
			</div>
		</section>
		<!-- 购物车底部 -->
		<footer v-if="userId && (bookList.length || goodsList.length)" class="shopcat-footer" :class="{ homepage: entrance === 'homepage' }">
			<div class="left-foot">
				<div class="check-box" @click.prevent.stop="selectAllItems()">
					<img v-if="selectAll" :src="checkActiveSrc">
					<img v-if="!selectAll" :src="checkSrc">
				</div>
				<p class="select-text">全选</p>
				<div v-if="!canClear" class="price-info">
					<p class="result-price">
						<span class="small">合计:¥</span><span class="big">{{ totalResultPrice | getInteger }}</span><span class="small">{{ totalResultPrice | getDecimal }}</span>
					</p>
					<p class="other-price">
						<span class="origin-price">¥{{ totalOriginPrice | getInteger }}{{ totalOriginPrice | getDecimal }}</span>
						<span class="discount-price">优惠:¥{{ totalDiscountPrice |getInteger }}{{ totalDiscountPrice |getDecimal }}</span>
					</p>
				</div>
			</div>
			<div class="right-foot" @click.prevent.stop="goPay()">
				{{ footBtnText }}
			</div>
		</footer>
	</section>
</template>

<script>
	let bookList = [{
		name: '杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名',
		last_fee: '158.00',
		number: 3,
		logo: require('@/common/icons/avatar.jpg'),
		id: '1333'
	}, {
		name: '儿额问问各位',
		last_fee: '111.00',
		number: 2,
		logo: require('@/common/icons/avatar.jpg'),
		id: '13sss33'
	}]
	let goodsList = [{
		name: '杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名',
		last_fee: '158.00',
		number: 2,
		logo: require('@/common/icons/avatar.jpg'),
		id: 'sss13322223'
	}, {
		name: '到谷歌的是都是割发代首工人干活惹我他广告我我天天',
		last_fee: '222.00',
		number: 5,
		logo: require('@/common/icons/avatar.jpg'),
		id: '13322223'
	}, {
		name: '杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名',
		last_fee: '158.00',
		number: 2,
		logo: require('@/common/icons/avatar.jpg'),
		id: '13355553'
	}, {
		name: '到谷歌的是都是割发代首工人干活惹我他广告我我天天',
		last_fee: '222.00',
		number: 5,
		logo: require('@/common/icons/avatar.jpg'),
		id: '123212333'
	}]
	import empty from '@/components/common/empty/empty'
	import { hasClass } from '@/common/js/common'
	import BScroll from 'better-scroll'
	export default {
		name: 'shopcat',
		props: {
			entrance: {
				type: String
			},
			canClear: {
				type: Boolean
			}
		},
		data () {
			return {
				windowHeight: window.innerHeight + 'px',
				winHeight: window.innerHeight - 52 - 44 - 49 - 30 - 8 + 'px',
				// winHeight: window.innerHeight - 52 + 'px',
				userId: localStorage.getItem('userId'),
				bookList: bookList,
				goodsList: goodsList,
				checkSrc: require('@/common/icons/check.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				reduceIconSrc: require('@/common/icons/reduce_icon.png'),
				addIconSrc: require('@/common/icons/add_icon.png'),
				bookDeleteIndex: -1,
				goodsDeleteIndex: -1,
				scrollTop: 0,
				scroller: ''
			}
		},
		computed: {
			// 显示去逛逛
			goHomePageShow () {
				if (this.bookList.length || this.goodsList.length || !this.userId) {
					return false
				} else {
					return true
				}
			},
			// 图书全选
			bookAll () {
				let flag = true
				this.bookList.forEach(item => {
					if (!item.active) {
						flag = false
					}
				})
				return flag
			},
			// 商品全选
			goodsAll () {
				let flag = true
				this.goodsList.forEach(item => {
					if (!item.active) {
						flag = false
					}
				})
				return flag
			},
			// 全选
			selectAll () {
				if (this.bookAll && this.goodsAll) {
					return true
				} else {
					return false
				}
			},
			// 原价总价
			totalOriginPrice () {
				let sum = 0
				this.bookList.forEach(item => {
					if (item.active) {
						sum += parseFloat(item.last_fee) * item.number
					}
				})
				this.goodsList.forEach(item => {
					if (item.active) {
						sum += parseFloat(item.last_fee) * item.number
					}
				})
				return sum
			},
			// 优惠总价
			totalDiscountPrice () {
				if (this.totalOriginPrice > 200) {
					return 40
				} else {
					return 0
				}
			},
			// 总价
			totalResultPrice () {
				return parseFloat(this.totalOriginPrice) - parseFloat(this.totalDiscountPrice)
			},
			// 底部文字
			footBtnText () {
				let count = 0
				this.bookList.forEach(item => {
					if (item.active) {
						count += 1
					}
				})
				this.goodsList.forEach(item => {
					if (item.active) {
						count += 1
					}
				})
				if (!this.canClear) {
					return `去结算(${count})`
				} else {
					return `移除(${count})`
				}
			},
			// 有选中图书
			hasBookSelected () {
				let flag = false
				this.bookList.forEach(item => {
					if (item.active) {
						flag = true
					}
				})
				return flag
			},
			// 有选中商品
			hasGoodsSelected () {
				let flag = false
				this.goodsList.forEach(item => {
					if (item.active) {
						flag = true
					}
				})
				return flag
			},
			// 图书已选
			bookSelectedData () {
				if (!this.bookList.length) {
					return []
				}
				return this.bookList.filter(item => {
					return item.active
				})
			},
			// 商品已选
			goodsSelectedData () {
				if (!this.goodsList.length) {
					return []
				}
				return this.goodsList.filter(item => {
					return item.active
				})
			}
		},
		created () {
			this.loadData()
		},
		mounted () {
			this.$nextTick(() => {
				this.getDeleteLineHeight()
				if (this.bookList.length) {
					// this.listenBookTouchEvent()
				}
				if (this.goodsList.length) {
					// this.listenGoodsTouchEvent()
				}
				setTimeout(() => {
					this.initBetterScroll()
				}, 20)
			})
		},
		methods: {
			// 去逛逛
			goHomePage () {
				if (this.entrance === 'homepage') {
					this.$root.Bus.$emit('goHangout')
				} else {
					this.$router.push({
						path: '/index'
					})
				}
			},
			// 初始化 scroller
			initBetterScroll () {
				if (!this.scroller) {
					this.scroller = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						click: true
					})
					// 监听滚动条
					this.listenScroll()
				} else {
					this.scroller.refresh()
				}
			},
			listenScroll () {
				this.scroller.on('scroll', (pos) => {
					this.scrollTop = -pos.y
					if (this.scrollTop < 0) {
						this.$nextTick(() => {
							this.initBetterScroll()
						})
					}
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						// this.loadData()
					}
				})
			},
			// 监听滑动事件
			listenBookTouchEvent () {
				this.$refs.bookItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.bookDeleteIndex = -1
							}
							return false
						} else {
							this.bookDeleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.bookDeleteIndex = index
						}
					})
				})
			},
			// 监听滑动事件
			listenGoodsTouchEvent () {
				this.$refs.goodsItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.goodsDeleteIndex = -1
							}
							return false
						} else {
							this.goodsDeleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.goodsDeleteIndex = index
						}
					})
				})
			},
			// 获得行高
			getDeleteLineHeight () {
				this.$refs.deleteBox.forEach(item => {
					item.style.lineHeight = item.offsetHeight + 'px'
				})
			},
			goLogin () {
				this.$router.push({
					path: '/login'
				})
			},
			loadData () {
				this.bookList = this.bookList.map(item => {
					item.active = false
					return item
				})
				this.goodsList = this.goodsList.map(item => {
					item.active = false
					return item
				})
				this.$ajax.shopcatList().then(res => {
					console.log(res)
				}, err => {
					console.log(err)
				})
			},
			// 改变数量
			changeNum (type, index, num) {
				if (this['' + type + ''][index].number <= 1 && num < 0) {
					if (type === 'bookList') {
						this.bookDeleteIndex = index
					}
					if (type === 'goodsList') {
						this.goodsDeleteIndex = index
					}
					return
				}
				this.bookDeleteIndex = -1
				this.goodsDeleteIndex = -1
				this['' + type + ''][index].number += num
			},
			// 全选
			selectAllItems () {
				if (!this.selectAll) {
					this.bookList = this.bookList.map(item => {
						item.active = true
						return item
					})
					this.goodsList = this.goodsList.map(item => {
						item.active = true
						return item
					})
				} else {
					this.bookList = this.bookList.map(item => {
						item.active = false
						return item
					})
					this.goodsList = this.goodsList.map(item => {
						item.active = false
						return item
					})
				}
			},
			// 图书全选
			selectAllBookItems () {
				if (!this.bookAll) {
					this.bookList = this.bookList.map(item => {
						item.active = true
						return item
					})
				} else {
					this.bookList = this.bookList.map(item => {
						item.active = false
						return item
					})
				}
			},
			// 商品全选
			selectAllGoodsItems () {
				if (!this.goodsAll) {
					this.goodsList = this.goodsList.map(item => {
						item.active = true
						return item
					})
				} else {
					this.goodsList = this.goodsList.map(item => {
						item.active = false
						return item
					})
				}
			},
			// 选择单项 book
			selectBookItem (index) {
				event.stopPropagation()
				this.bookList = this.bookList.map((item, index2) => {
					if (index === index2) {
						item.active = !item.active
					}
					return item
				})
			},
			// 选择单项 goods
			selectGoodsItem (index) {
				this.goodsList = this.goodsList.map((item, index2) => {
					if (index === index2) {
						item.active = !item.active
					}
					return item
				})
			},
			// 去结算
			goPay () {
				// 清除状态
				if (this.canClear) {
					this.clearItems()
					return
				}
				// 两种不同商品不能同时结算
				if (this.hasGoodsSelected && this.hasBookSelected) {
					this.Dialog.alert({
						title: '提示',
						msg: '刊物杂志不能与其它商品同时结算，请分别选中再去结算~'
					})
					return
				}
				// 未选择内容
				if (!this.hasGoodsSelected && !this.hasBookSelected) {
					this.Toast.warning({
						title: '请先选择需要结算的内容'
					})
					return
				}
				let selectedData = this.bookSelectedData.length ? this.bookSelectedData : this.goodsSelectedData
				this.$router.push({
					path: '/shopcat/order',
					query: {
						selectedData: JSON.stringify(selectedData),
						nowSum: this.totalOriginPrice
					}
				})
			},
			// 移除
			clearItems () {
				this.bookList.forEach((item, index) => {
					if (item.active) {
						this.bookList.splice(index, 1)
					}
				})
				this.goodsList.forEach((item, index) => {
					if (item.active) {
						this.goodsList.splice(index, 1)
					}
				})
			},
			// 移除单条
			deleteBookItem (id) {
				this.bookList.forEach((item, index) => {
					if (id === item.id) {
						this.bookDeleteIndex = -1
						this.bookList.splice(index, 1)
						this.$nextTick(() => {
							// 动画结束后刷新scroll
							setTimeout(() => {
								this.initBetterScroll()
							}, 320)
						})
					}
				})
			},
			// 移除单条商品
			deleteGoodsItem (id) {
				this.goodsList.forEach((item, index) => {
					if (id === item.id) {
						this.goodsDeleteIndex = -1
						this.goodsList.splice(index, 1)
						this.$nextTick(() => {
							// 动画结束后刷新scroll
							setTimeout(() => {
								this.initBetterScroll()
							}, 320)
						})
					}
				})
			}
		},
		components: {
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>