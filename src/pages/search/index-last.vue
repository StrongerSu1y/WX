<template>
	<div class="search-index-page">
		<v-reminder v-show="reminderShow" @hideReminder="hideReminder"></v-reminder>
		<section class="bar">
			<div class="select">
				<span class="text">图书</span>
				<span class="bottom-arrow"></span>
			</div>
			<div class="input-area">
				<input type="text" placeholder="在此输入搜索内容">
				<img src="./search_icon_black.png">
			</div>
			<div class="clear-button">
				取消
			</div>
		</section>
		<section class="hot-search search-block">
			<div class="title">
				<img src="./hot.png">
				<span class="text">热门搜索</span>
			</div>
			<div class="search-body hot-search-body">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="pages in swiperList">
						<div v-for="lines in pages" class="line-box">
							<p v-for="item in lines" class="text">{{ item }}</p>
						</div>
					</div>
				</div>
				<div class="swiper-pagination swiper-pagination-white"></div>
			</div>
			<!-- <div v-for="pages in swiperList" class="search-body">
				<div v-for="lines in pages" class="line-box">
					<p v-for="item in lines" class="text">{{ item }}</p>
				</div>
			</div> -->
		</section>
		<section class="hot-search search-block">
			<div class="title">
				<img src="./step.png">
				<span class="text">历史搜索</span>
			</div>
			<div class="search-body history-search-body">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="pages in swiperList">
						<div v-for="lines in pages" class="line-box">
							<p v-for="item in lines" class="text">{{ item }}</p>
						</div>
					</div>
				</div>
				<div class="swiper-pagination swiper-pagination-white"></div>
			</div>
		</section>
	</div>
</template>

<script>
	let searchList = [
		'痕迹大探案',
		'微校童书套餐',
		'小学英语同步阅读 六年级上册如果太长了怎么办呢ssssssss',
		'世界真好',
		'妈妈做自己，孩子就能做自己',
		'动物绝对不应该穿衣服',
		'罗伯生气了',
		'和爸爸一起散步',
		'小淘气尼古拉的故事',
		'世界真好',
		'妈妈做自己，孩子就能做自己',
		'动物绝对不应该穿衣服',
		'罗伯生气了',
		'和爸爸一起散步',
		'小淘气尼古拉的故事',
		'痕迹大探案',
		'微校童书套餐',
		'世界真好',
		'妈妈做自己，孩子就能做自己',
		'动物绝对不应该穿衣服',
		'罗伯生气了',
		'和爸爸一起散步',
		'小淘气尼古拉的故事',
		'世界真好',
		'妈妈做自己，孩子就能做自己',
		'动物绝对不应该穿衣服',
		'罗伯生气了',
		'和爸爸一起散步',
		'小淘气尼古拉的故事',
		'痕迹大探案',
		'微校童书套餐',
		'世界真好',
		'妈妈做自己，孩子就能做自己',
		'动物绝对不应该穿衣服',
		'罗伯生气了',
		'和爸爸一起散步',
		'小淘气尼古拉的故事',
		'世界真好',
		'妈妈做自己，孩子就能做自己',
		'动物绝对不应该穿衣服',
		'罗伯生气了',
		'和爸爸一起散步',
		'小淘气尼古拉的故事'
	]
	import reminder from './reminder/reminder'
	import Swiper from 'swiper'
	// import 'swiper/dist/css/swiper.min.css'
	export default {
		name: 'search-index-page',
		data () {
			return {
				reminderShow: false,
				searchList: searchList,
				hotSwiper: '',
				historySwiper: ''
			}
		},
		computed: {
			// 搜索列表
			swiperList () {
				let swiperList = []
				let pageArr = []
				let lineArr = []
				// 当前起点位置
				let startPos = 0
				// 最大允许宽度
				let maxWidth = window.innerWidth - 32 - 5
				this.searchList.forEach((item, index) => {
					// 单条长度
					let singleWidth = item.length * 14 + 20
					if (startPos + singleWidth <= maxWidth) {
						// 当前起点位置
						startPos += singleWidth + 5
						// 添加进当前行
						lineArr.push(item)
						// 如果为最后一条，则直接结束
						if (index === this.searchList.length - 1) {
							// 此行结束
							pageArr.push(lineArr)
							swiperList.push(pageArr)
							return swiperList
						}
					} else {
						// 如果已经超出
						// 单行超出
						if (singleWidth + 5 >= maxWidth) {
							if (lineArr.length) {
								// 此行结束
								pageArr.push(lineArr)
								lineArr = []
							}
							// 添加进当前行
							lineArr.push(item)
							// 此行结束
							pageArr.push(lineArr)
							// 起点位置重置
							startPos = 0
						} else {
							// 此行结束
							pageArr.push(lineArr)
							// 添加进当前行
							lineArr.push(item)
							// 起点位置改变
							startPos = singleWidth + 5
						}
						// 另起一行
						lineArr = []
						// 此页结束
						if (pageArr.length >= 5) {
							swiperList.push(pageArr)
							// 另起一页
							pageArr = []
						}
						// 如果为最后一条，则直接结束
						if (index === this.searchList.length - 1) {
							swiperList.push(pageArr)
							return swiperList
						}
					}
				})
				return swiperList
			}
		},
		mounted () {
			this.$nextTick(() => {
				this.hotSwiper = new Swiper('.hot-search-body', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'horizontal',
					speed: 600
				})
				this.historySwiper = new Swiper('.history-search-body', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'horizontal',
					speed: 600
				})
			})
		},
		methods: {
			hideReminder () {
				this.reminderShow = false
			}
		},
		components: {
			'v-reminder': reminder
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>