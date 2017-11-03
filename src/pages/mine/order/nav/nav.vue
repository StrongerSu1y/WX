<template>
	<ul class="mine-order-nav">
		<li :class="{ active: index === navIndex }" v-for="(item, index) in navList" class="nav-item" @click="changeNavIndex(index)">
			{{ item.text }}
			<div v-if="index === 0" :style="{ left: navIndex * 100 + '%' }" class="bottom-bar"></div>
		</li>
	</ul>
</template>

<script>
	let navList = [{
		text: '全部'
	}, {
		text: '待付款'
	}, {
		text: '待收货'
	}, {
		text: '已收货'
	}, {
		text: '退款'
	}]
	export default {
		props: {
			title: {
				type: String
			},
			navIndex: {
				type: Number
			}
		},
		data () {
			return {
				navList: navList
			}
		},
		methods: {
			// 切换导航
			changeNavIndex (index) {
				this.$emit('changeNavIndex', index)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './nav.styl'
</style>