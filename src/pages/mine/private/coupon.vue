<template>
	<div class="mine-coupon">
		<!-- 头部 -->
		<section class="mine-coupon-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">领券中心</p>
		</section>
		<!-- 列表 -->
		<ul v-if="listData && listData.length" class="coupon-list">
			<li v-for="(item, index) in listData" ref="listItem" class="coupon-item">
				<div class="item-body">
					<div class="left-part">
						<p class="price">
							<span class="big">{{ item.price }}</span>
							<span class="desc">元</span>
						</p>
						<p class="condition">满{{ item.condition }}元可用</p>
					</div>
					<div class="center-part">
						<p class="type">{{ item.type }}</p>
						<p class="remain">剩余 {{ item.remain }}张</p>
						<p class="deadline">有效期 {{ item.deadline }}</p>
					</div>
					<div class="right-part" @click="getCouponItem(index)">
						<div class="get-box" v-if="!item.loadingShow">领取</div>
						<v-loading v-if="item.loadingShow"></v-loading>
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
		loadingShow: false
	}, {
		type: '通用券',
		content: '私信内容私信内容私信内容私信内容私信内容内私信内容私信内容私信内容私信内容',
		price: '100',
		condition: '1000',
		remain: 20,
		deadline: '2017年10月12日',
		loadingShow: false
	}]
	import loading from '@/components/common/loading/loading'
	export default {
		data () {
			return {
				listData: listData
			}
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
			// 点击领取
			getCouponItem (index) {
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