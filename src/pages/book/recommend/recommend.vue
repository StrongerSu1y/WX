<template>
	<div class="recommend">
		<div class="title">
      <div class="line"></div>
      <div class="text">猜您喜欢</div>
      <div class="line"></div>
    </div>
    <section class="book-list">
    	<ul class="side-list" v-if="needCompute">
    		<li v-for="(item, index) in recommendList" :style="{ width: itemWidth }" class="item" ref="listItem">
	    		<div class="img">
	    			<img v-lazy="item.logo">
	    		</div>
	  			<p class="name">
	    			{{ item.name }}
	    		</p>
	    		<div class="price">
	    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
	    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
	    		</div>
					<div class="cart">
						<span>收藏</span>
						<span>加入购物车</span>
					</div>
	    	</li>
    	</ul>
    	<ul v-for="(list, i) in itemList" :class="i" class="side-list">
    		<li v-for="(item, index) in list" class="item" :style="{ width: itemWidth }">
	    		<div class="img">
	    			<img :src="item.logo">
	    		</div>
	  			<p class="name">
	    			{{ item.name }}
	    		</p>
	    		<div class="price">
	    			<span class="new">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}</span>
	    			<span class="old">￥{{ item.original_fee | getInteger }}{{ item.original_fee | getDecimal }}</span>
	    		</div>
					<div class="cart">
						<span>收藏</span>
						<span>加入购物车</span>
					</div>
	    	</li>
    	</ul>
    </section>
	</div>
</template>

<script>
	export default {
		name: 'recommend',
		props: {
			recommendList: {
				type: Array
			}
		},
		data () {
			return {
				itemWidth: (window.innerWidth - 10 * 2 - 5) / 2 + 'px',
				sides: 2,
				itemList: [],
				// 需要计算瀑布流高度
				needCompute: true
			}
		},
		watch: {
			recommendList (newVal, oldVal) {
				this.needCompute = true
				this.$nextTick(() => {
					this.getWaterfallList()
				})
			}
		},
		computed: {},
		mounted () {
			this.$nextTick(() => {
				this.getWaterfallList()
			})
		},
		methods: {
			// 获取瀑布流列表
			getWaterfallList () {
				if (!this.$refs.listItem || !this.$refs.listItem.length) {
					return
				}
				let heights = []
				for (let i = 0; i < this.sides; i++) {
					heights.push(0)
					this.itemList.push([])
				}
				this.$refs.listItem.forEach((item, index) => {
					let needIndex = this.getMinIndex(heights)
					this.itemList[needIndex].push(this.recommendList[index])
					heights[needIndex] += item.offsetHeight
				})
				this.needCompute = false
				// 通知父组件 DOM 元素更新完毕
				this.$nextTick(() => {
					// 初始化 better-scroll
					setTimeout(() => {
						this.$emit('freshBScroll')
					}, 20)
				})
			},
			// 获取数组中最小值的下标
			getMinIndex (arr) {
				let index = 0
				let minItem = arr[0]
				for (let i = 1; i < arr.length; i++) {
					if (arr[i] < minItem) {
						minItem = arr[i]
						index = i
					}
				}
				return index
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import 'recommend.styl'
</style>