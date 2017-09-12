<template>
	<div class="periodical-ording">
		<div class="tab">
			<div class="" :class="{ active: tabIndex === 0 }" @click="changeTabIndex(0)">
				刊物
			</div>
			<div class="" :class="{ active: tabIndex === 1 }" @click="changeTabIndex(1)">
				关于我们
			</div>
		</div>
		<component :is="tabView" :listData="listData" :oldSum="oldSum" :nowSum="nowSum" @increment="incrementTotal" ref="list"></component>
		<v-shopcat :entrance="'ording'" :nowSum="nowSum" :oldSum="oldSum" :total="total" :selectedListData="selectedListData" :listData="listData" ref="shopcat" @addNum="addNum" @reduceNum="reduceNum" @clearShopcat="clearShopcat"></v-shopcat>
	</div>
</template>

<script>
	let listData = [{
		src: require('./list/gift_icon.png'),
		title: '杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称',
		desc: '益智DIY万变串珠+弹射飞机+笑脸橡皮sfasdasda',
		daysText: '半年12期',
		daysNum: '2018.1~2018.6',
		price: 500,
		oldPrice: 600,
		number: 0
	}, {
		src: require('./list/gift_icon.png'),
		title: '杂志名称杂志名称杂志',
		desc: '益智DIY万变串珠+弹射飞机+笑脸橡皮sfasdasda',
		daysText: '半年12期',
		daysNum: '2018.1~2018.6',
		price: 300,
		oldPrice: 600,
		number: 0
	}, {
		src: require('./list/gift_icon.png'),
		title: '杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称杂志名称',
		desc: '益智DIY万变串珠+弹射飞机+笑脸橡皮sfasdasda',
		daysText: '半年12期',
		daysNum: '2018.1~2018.6',
		price: 400,
		oldPrice: 600,
		number: 0
	}]
	import list from './list/list'
	import about from './about/about'
	import shopcat from '../shopcat/shopcat'
	export default {
		name: 'periodical-ording',
		data () {
			return {
				tabIndex: 0,
				tabList: ['list', 'about'],
				listData: listData
			}
		},
		computed: {
			// 总价
			nowSum () {
				let sum = 0
				this.listData.forEach((item, index) => {
					sum += item.number * item.price
				})
				return sum
			},
			// 原价
			oldSum () {
				let sum = 0
				this.listData.forEach((item, index) => {
					sum += item.number * item.oldPrice
				})
				return sum
			},
			// 总数
			total () {
				let total = 0
				this.listData.forEach((item, index) => {
					total += item.number
				})
				return total
			},
			tabView () {
				return this.tabList[this.tabIndex]
			},
			// 已选择
			selectedListData () {
				return this.listData.filter((item) => {
					return item.number > 0
				})
			}
		},
		mounted () {
		},
		components: {
			list,
			about,
			'v-shopcat': shopcat
		},
		methods: {
			changeTabIndex (index) {
				this.tabIndex = index
			},
			// 购物车动画
			incrementTotal (target) {
				this.$refs.shopcat.drop(target)
			},
			// 添加
			addNum (index) {
				this.$refs.list.addNum(index)
			},
			// 减少
			reduceNum (index) {
				this.$refs.list.reduceNum(index)
				// this.listData[index] -= 1
			},
			// 清空购物城
			clearShopcat () {
				this.listData.forEach((item) => {
					item.number = 0
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'	
</style> 