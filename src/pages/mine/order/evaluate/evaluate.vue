<template>
	<div class="mine-order-evaluate">
		<!-- 头部 -->
		<section class="mine-order-evaluate-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">评价</p>
		</section>
		<!-- 列表 -->
		<v-list class="evaluate-list" :listData="listData" :entrance="'evaluate'"></v-list>
	</div>
</template>

<script>
	let listData = [{
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png')
	}, {
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png')
	}, {
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png')
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
	@import './evaluate.styl'
</style>