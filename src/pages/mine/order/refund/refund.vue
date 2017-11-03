<template>
	<div class="mine-order-refund">
		<!-- 头部 -->
		<section class="mine-order-refund-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">申请退款</p>
		</section>
		<!-- 列表 -->
		<v-list class="refund-list" :listData="listData" :entrance="'refund'"></v-list>
	</div>
</template>

<script>
	let listData = [{
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png'),
		reason: '商品破损',
		explain: '退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明'
	}, {
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png'),
		reason: '商品破损',
		explain: '退款说明退款说明退款说明退款说明退款说明退款说明'
	}, {
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png'),
		reason: '商品破损',
		explain: '退款说明退款说明退款说明退款说明退款说明退款说明'
	}]
	import list from '../detail/list/list'
	export default {
		data () {
			return {
				listData: listData
			}
		},
		mounted () {
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			}
		},
		components: {
			'v-list': list
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './refund.styl'
</style>