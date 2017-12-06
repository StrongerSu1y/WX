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
							<span class="big">{{ item.price }}</span>
							<span class="desc">元</span>
						</p>
						<p class="condition">满{{ item.condition }}元可用</p>
					</div>
					<div class="center-part">
						<div class="box">
							<p class="type">{{ item.type }}</p>
							<p class="deadline">有效期 {{ item.deadline }}</p>
						</div>
					</div>
				</div>
				<div class="item-footer">{{ item.content }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	let listData = [{
		type: '通用券',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		price: '100',
		condition: '1000',
		remain: 20,
		deadline: '2017年10月12日',
		loadingShow: false,
		id: '1'
	}, {
		type: '通用券',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		price: '100',
		condition: '1000',
		remain: 20,
		deadline: '2017年10月12日',
		loadingShow: false,
		id: '2'
	}, {
		type: '通用券',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		price: '100',
		condition: '1000',
		remain: 20,
		deadline: '2017年10月12日',
		loadingShow: false,
		noUse: true,
		id: '3'
	}]
	import loading from '@/components/common/loading/loading'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				checkSrc: require('@/common/icons/check.png'),
				listData: listData,
				linkShow: true,
				couponPrice: '',
				couponId: ''
			}
		},
		computed: {
		},
		mounted () {
			if (this.$route.query.couponPrice) {
				this.couponPrice = this.$route.query.couponPrice
				this.couponId = this.$route.query.couponId
			}
			this.$nextTick(() => {
			})
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 点击领取
			getcouponItem (index) {
				this.listData = this.listData.map((item, index2) => {
					if (index === index2) {
						item.loadingShow = true
					}
					return item
				})
				this.$nextTick(() => {
					setTimeout(() => {
						this.listData[index].loadingShow = false
					}, 1000)
				})
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
					couponPrice: item.price,
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