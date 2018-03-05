<template>
	<div class="mine-discount">
		<!-- 头部 -->
		<section class="mine-discount-top underline">
			<div class="back-icon" @click="goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">我的优惠券</p>
		</section>
		<!-- 浮动层 -->
		<section class="discount-link">
			<p class="text">想要更多优惠券？去领券中心看看吧！</p>
			<div class="right-part" @click="openItem('/mine/coupon')">
				<span>去领取</span>
			</div>
			<div class="close-icon"></div>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="discount-list">
			<li v-for="(item, index) in listData" ref="listItem" class="discount-item">
				<div class="item-body">
					<div class="left-part">
						<p class="price">
							<span class="big">{{ item.amount || 0 }}</span>
							<span class="desc">元</span>
						</p>
						<p class="condition">满{{ item.reachamount || 0 }}元可用</p>
					</div>
					<div class="center-part">
						<p class="type">{{ item.name }}</p>
						<p class="deadline">有效期至 {{ item.validtime || getUpdateDay }}</p>
					</div>
				</div>
				<div class="item-footer">{{ item.description }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	// 我的页面进入 所有的优惠券
	import loading from '@/components/common/loading/loading'
	export default {
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				listData: [],
				// 页码
				pageNum: 1,
				pageSize: 20
			}
		},
		created () {
			this.getdiscountItem()
		},
		computed: {

		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 获取我的可用优惠券
			getdiscountItem (index) {
				this.$ajax.mineCoupon().then(res => {
					this.listData = res.data.pageInfo.list
					// console.log(res)
					this.listData = this.listData.map((item, index) => {
						// if (index === index2) {
						// 	item.loadingShow = true
						// }
						return item
					})
				}, err => {
					console.log(err)
				})

				// this.$nextTick(() => {
				// 	setTimeout(() => {
				// 		this.listData[index].loadingShow = false
				// 	}, 1000)
				// })
			},
			// 打开页面
			openItem (path) {
				this.$router.push({
					path: path
				})
			}
		},
		components: {
			'v-loading': loading
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './discount.styl'
</style>