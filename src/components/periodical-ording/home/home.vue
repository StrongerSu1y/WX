<template>
	<section class="peridocial-ording-home">
		<div class="tab">
			<div class="" :class="{ active: tabIndex === 0 }" @click="changeTabIndex(0)">
				刊物
			</div>
			<div class="" :class="{ active: tabIndex === 1 }" @click="changeTabIndex(1)">
				关于我们
			</div>
		</div>
		<component :is="tabView" :listData="listData" :oldSum="oldSum" :nowSum="nowSum"  ref="list"></component>
	</section>
</template>
<script>
	import list from '../list/list'
	import about from '../about/about'
	export default {
		name: 'periodical-ording',
		props: ['listData', 'tabIndex'],
		data () {
			return {
				tabList: ['list', 'about']
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
			tabView () {
				return this.tabList[this.tabIndex]
			}
		},
		mounted () {
			document.title = '选购商品'
		},
		components: {
			list,
			about
		},
		methods: {
			changeTabIndex (index) {
				this.$emit('changeTabIndex', index)
			},
			// 添加
			addNum (index) {
				this.$refs.list.addNum(index)
			},
			// 减少
			reduceNum (index) {
				this.$refs.list.reduceNum(index)
			},
			// 停止刷新
			finishPullToRefresh () {
				this.$refs.list.finishPullToRefresh()
			},
			// 停止加载
			finishInfinite () {
				this.$refs.list.finishInfinite()
			},
			// 没有数据
			hasNoData () {
				this.$refs.list.hasNoData()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'	
</style>