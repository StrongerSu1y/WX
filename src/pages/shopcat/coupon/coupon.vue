<template>
	<div class="mine-coupon">
		<!-- 头部 -->
		<section class="mine-coupon-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">我的优惠券</p>
		</section>
		<!-- 浮动层 -->
		<section v-if="linkShow" class="coupon-link">
			<p class="text">想要更多优惠券？去领券中心看看吧！</p>
			<div class="right-part" @click="openItem('/mine/coupon')">
				<span>去领取</span>
			</div>
			<div class="close-icon" @click="linkShow = false"></div>
		</section>
		<!-- 不使用优惠券 -->
		<section class="not-use">
			<p class="text">不使用优惠券</p>
			<div class="check-box" @click="clearCoupon()">
				<img v-if="!couponPrice" :src="checkActiveSrc">
				<img v-if="couponPrice" :src="checkSrc">
			</div>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="coupon-list">
			<li v-for="(item, index) in listData" :class="{ noUse: item.noUse}" ref="listItem" class="coupon-item">
				<div class="item-body">
					<div v-if="!item.noUse" class="check-box" @click="selectItem(item)">
						<img v-if="item.id === couponId" :src="checkActiveSrc">
						<img v-if="item.id !== couponId" :src="checkSrc">
					</div>
					<div class="left-part">
						<p class="price">
							<span class="big">{{ item.amount }}</span>
							<span class="desc">元</span>
						</p>
						<p class="condition">满{{ item.reachamount }}元可用</p>
					</div>
					<div class="center-part">
						<div class="box">
							<p class="type">{{ item.name }}</p>
							<p class="deadline">有效期 {{ item.validtime | getUpdateDay }}</p>
						</div>
					</div>
				</div>
				<div class="item-footer">{{ item.description }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import loading from '@/components/common/loading/loading'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				checkSrc: require('@/common/icons/check.png'),
				// 数据
				listData: [],
				// 显示外链
				linkShow: true,
				// 优惠金额
				couponPrice: '',
				// 优惠 id
				couponId: '',
				// 页码
				pageNum: 1,
				pageSize: 20
			}
		},
		computed: {
			// 传参
			params () {
				let params = {}
				params.cls = this.$route.query.cls
				params.items = JSON.parse(this.$route.query.items)
				params.uid = localStorage.getItem('userId')
				return params
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
			// 判断是否有已经选中的优惠券
			if (this.$route.query.couponPrice) {
				this.couponPrice = this.$route.query.couponPrice
				this.couponId = this.$route.query.couponId
			}
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.mineCouponOrder(this.params).then(res => {
					console.log(res)
					let list = res.data.list
					this.listData = this.listData.concat(list)
				}, err => {
					console.log(err)
				})
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 打开页面
			openItem (path) {
				this.$router.push({
					path: path
				})
			},
			// 选中
			selectItem (item) {
				this.$root.Bus.$emit('getCoupon', {
					couponPrice: item.amount,
					couponId: item.id
				})
				this.$router.goBack()
			},
			// 不使用优惠券
			clearCoupon () {
				this.couponPrice = ''
				this.couponId = ''
				this.$root.Bus.$emit('getCoupon', {
					couponPrice: '',
					couponId: ''
				})
				this.$router.goBack()
			}
		},
		components: {
			'v-loading': loading
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './coupon.styl'
</style>