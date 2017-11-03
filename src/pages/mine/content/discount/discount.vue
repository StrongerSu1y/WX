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
			<div class="right-part">
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
							<span class="big">{{ item.price }}</span>
							<span class="desc">元</span>
						</p>
						<p class="condition">满{{ item.condition }}元可用</p>
					</div>
					<div class="center-part">
						<p class="type">{{ item.type }}</p>
						<p class="deadline">有效期 {{ item.deadline }}</p>
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
				backIconSrc: require('@/common/icons/back_icon.png'),
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
			getdiscountItem (index) {
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
	@import './discount.styl'
</style>