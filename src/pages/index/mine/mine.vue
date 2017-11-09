<template>
	<div class="mine-index-page">
		<header v-if="!userId" class="header-title">我的</header>
		<empty v-if="!userId" :text="'您暂时还未登录哦！'"></empty>
		<div v-if="!userId" class="login-box">
			<button @click.prevent.stop="goLogin()">去登录</button>
		</div>
		<section v-if="userId">
			<section class="top" :style="topStyleObj">
				<div class="setting" @click.prevent.stop="openItem('/mine/setting')">
					<img src="./setting_icon.png">
				</div>
				<div class="message" @click.prevent.stop="openItem('/mine/message/index')">
					<img src="./message_icon.png">
				</div>
			</section>
			<!-- 头像 -->
			<div class="avatar" :style="avatarStyleObj">
				<img v-lazy="info.avatar" ref="avatarImg">
			</div>
			<!-- scroll 外层容器 -->
			<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
				<!-- 内容 -->
				<section ref="content" class="content">
					<header class="header">
						<!-- 积分 -->
						<p class="integral">
							<img src="./integral_icon.png">
							<span class="text">200积分</span>
						</p>
						<!-- 昵称 -->
						<p class="nick-name">
							<span>{{ info.nick_name }}</span>
							<span v-if="info.role">({{ info.role }})</span>
						</p>
						<!-- 孩子们 -->
						<div class="swiper-container">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(item, index) in listImg" :style="{ left: slidePosLeft }">
									<img :src="item.url">
								</div>
							</div>
						</div>
					</header>
					<!-- 主要信息 -->
					<nav class="main-info">
						<div class="nav-item" @click="openItem('mine/private')">
							<p class="number">0</p>
							<p class="text">我的私信</p>
						</div>
						<div class="nav-item" @click="openItem('mine/focus', '互相关注')">
							<p class="number">{{ info.friend || 0 }}</p>
							<p class="text">互相关注</p>
						</div>
						<div class="nav-item" @click="openItem('mine/focus', '我的关注')">
							<p class="number">{{ info.myfocusCount || 0 }}</p>
							<p class="text">我的关注</p>
						</div>
						<div class="nav-item" @click="openItem('mine/focus', '我的粉丝')">
							<p class="number">{{ info.focusMeCount || 0 }}</p>
							<p class="text">我的粉丝</p>
						</div>
					</nav>
					<split :height="'8'"></split>
					<!-- 订单 -->
					<v-order></v-order>
					<split :height="'8'"></split>
					<!-- 领券中心 -->
					<p class="discount" @click="openItem('/mine/coupon')">
						<img src="./discount_icon.png">
						<span class="text">领券中心</span>
						<img class="right-arrow" src="./right_arrow.png">
					</p>
					<split :height="'8'"></split>
					<!-- 管理 -->
					<section class="manage">
						<div class="child" @click="openItem('mine/children')">
							<img src="./child_icon.png">
							<span class="text">孩子管理</span>
						</div>
						<div class="message" @click="openItem('mine/address')">
							<img src="./address_icon.png">
							<span class="text">地址管理</span>
						</div>
					</section>
					<split :height="'8'"></split>
					<!-- 我的内容 -->
					<v-content></v-content>
				</section>
			</div>
		</section>
	</div>
</template>

<script>
	import split from '@/components/common/split/split'
	import empty from '@/components/common/empty/empty'
	import order from './order/order'
	import content from './content/content'
	import banner from '@/components/common/banner/banner'
	import BScroll from 'better-scroll'
	import Swiper from 'swiper'
	export default {
		name: 'mine-index-page',
		data () {
			return {
				winHeight: window.innerHeight - 52 - 44 + 'px',
				listImg: [{
					url: require('./avatar.jpg')
				}, {
					url: require('./address_icon.png')
				}, {
					url: require('./child_icon.png')
				}, {
					url: require('./discount_icon.png')
				}, {
					url: require('./setting_icon.png')
				}],
				childrenSwiper: '',
				slidePosLeft: window.innerWidth * 2 / 5 + 'px',
				scroller: '',
				scrollTop: 0,
				userId: localStorage.getItem('userId'),
				info: {}
			}
		},
		computed: {
			avatarStyleObj () {
				let top = 44 - this.scrollTop
				if (this.scrollTop <= 0) {
					return {}
					// return {
					// 	top: `${top}px`
					// }
				}
				if (this.scrollTop <= 44) {
					this.$refs.avatarImg.style.border = `2px solid rgba(255, 255, 255, 0.9)`
					return {
						top: `${top}px`
					}
				}
				let headHeight = 44
				let originWidth = 75
				let endWidth = 28
				let endTop = (headHeight - endWidth) / 2
				let speed = this.scrollTop - 44
				let width = originWidth - speed
				let marginLeft = (originWidth - speed) / 2
				let progress = speed / (originWidth - endWidth)
				let posTop = progress * (endTop - 0)
				// let borderWidth = 2 - progress
				// console.log('borderWidth: ' + borderWidth)
				this.$refs.avatarImg.style.border = `1.5px solid rgba(255, 255, 255, 0.9)`
				if (width <= endWidth) {
					this.$refs.avatarImg.style.border = `1px solid rgba(255, 255, 255, 0.9)`
					return {
						top: `${endTop}px`,
						marginLeft: `-14px`,
						width: `${endWidth}px`,
						height: `${endWidth}px`
					}
				}
				return {
					top: `${posTop}px`,
					marginLeft: `-${marginLeft}px`,
					width: `${width}px`,
					height: `${width}px`
				}
			},
			topStyleObj () {
				if (this.scrollerTop < 44) {
					return
				}
				let opacity = (this.scrollTop) / 100
				// let opacity = 0
				return {
					backgroundColor: `rgba(248, 189, 72, ${opacity})`
				}
			}
		},
		created () {
			this.loadData()
		},
		mounted () {
			this.$nextTick(() => {
				this.updateSwiper()
				setTimeout(() => {
					this.initBetterScroll()
				}, 20)
			})
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.userHomePage().then(res => {
					console.log(res)
					this.info = res.data.data
				}, err => {
					console.error(err)
				})
			},
			// 孩子轮播
			updateSwiper () {
				if (this.childrenSwiper) {
					this.childrenSwiper.update()
				} else {
					this.childrenSwiper = new Swiper('.swiper-container', {
						pagination: '.swiper-pagination',
						paginationClickable: true,
						effect: 'slide',
						loop: true,
						width: window.innerWidth / 5,
						speed: 600,
						autoplay: false,
						initialSlide: 0,
						loopedSlides: 4,
						loopAdditionalSlides: 1,
						autoplayDisableOnInteraction: false,
						onInit: function (swiper) {
							swiper.startAutoplay()
						},
						onTouchEnd: function (swiper) {
							swiper.startAutoplay()
						}
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
						this.initBetterScroll()
					}
				})
				this.scroller.on('touchend', (pos) => {
					if (pos.y > 50) {
						// 刷新
						// this.loadData()
					}
				})
			},
			// 去登录
			goLogin () {
				this.$router.push({
					path: '/login'
				})
			},
			// 打开单项
			openItem (path, title) {
				if (!title) {
					this.$router.push({ path: path })
					return
				}
				this.$router.push({
					path: path,
					query: {
						title: title
					}
				})
			},
			// scrollToTop
			scrollToTop () {
				window.scrollTo(0, 0)
			}
		},
		components: {
			split,
			'v-order': order,
			'v-content': content,
			'v-banner': banner,
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './mine.styl'
</style>
