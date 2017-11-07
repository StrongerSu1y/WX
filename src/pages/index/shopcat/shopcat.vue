<template>
	<div class="index-shopcat">
		<header class="header-title">购物车</header>
		<empty v-if="!userId" :text="'您暂时还未登录哦！'"></empty>
		<div v-if="!userId" class="login-box">
			<button @click.prevent.stop="goLogin()">去登录</button>
		</div>
		<section v-if="userId && !listData.length" class="no-data-box">
			<img src="./shopcat_empty.png">
		</section>
		<div v-if="userId && !listData.length" class="login-box">
			<button @click.prevent.stop="goHomePage()">去逛逛</button>
			<!-- <div class="loading">
				<div class="loading-indicator">
					<i></i>
				</div>
			</div> -->
		</div>
		<section v-if="listData.length" class="main">
			<!-- 报刊杂志 -->
			<section class="book-part">
				<div class="content-header">
					<div class="check-box">
						<img v-if="bookAll" :src="checkActiveSrc">
						<img v-if="!bookAll" :src="checkSrc">
					</div>
					<p class="title">报刊杂志</p>
				</div>
				<ul class="shopcat-list">
					<li v-for="(item, index) in listData" class="list-item">
						<div class="content">
							<div class="check-box">
								<img v-if="item.active" :src="checkActiveSrc">
								<img v-if="!item.active" :src="checkSrc">
							</div>
							<div class="list-body">
								<div class="left-part">
									<img :src="item.logo">
								</div>
								<div class="right-part">
									<p class="name">{{ item.name }}</p>
									<p class="price">
										<span class="small">¥</span>
										<span class="big">{{ item.price | getInteger }}</span>
										<span class="small">{{ item.price | getDecimal }}</span>
									</p>
									<!-- 控制器 -->
									<div class="cart-control">
										<div class="left-part">
											<img :src="reduceIconSrc">
										</div>
										<p class="num">{{ item.number }}</p>
										<div class="right-part">
											<img :src="addIconSrc">
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</section>
		</section>
		<!-- 悬浮层 -->
		<p class="fixed-title">购买微校网商品满99元包邮哦亲！</p>
	</div>
</template>

<script>
	let listData = [{
		name: '杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名',
		price: '158.00',
		number: 2,
		logo: require('@/common/icons/avatar.jpg')
	}]
	import empty from '@/components/common/empty/empty'
	export default {
		name: 'shopcat',
		data () {
			return {
				userId: localStorage.getItem('userId'),
				listData: listData,
				checkSrc: require('@/common/icons/check.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				reduceIconSrc: require('@/common/icons/reduce_icon.png'),
				addIconSrc: require('@/common/icons/add_icon.png'),
				bookAll: false
			}
		},
		computed: {},
		methods: {
			goLogin () {
				this.$router.push({
					path: '/login'
				})
			},
			loadData () {
				this.listData = this.listData.map(item => {
					item.active = false
					return item
				})
				this.$ajax.shopcatList().then(res => {
					console.log(res)
				}, err => {
					console.log(err)
				})
			},
			// 去逛逛
			goHomePage () {
				this.$emit('changeTabIndex', 0)
			}
		},
		created () {
			this.loadData()
		},
		mounted () {
		},
		components: {
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>