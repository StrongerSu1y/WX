<template>
	<div class="book-detail-page">
		<v-top :topTabIndex="topTabIndex" :showItems="showItems" @changeTopTabIndex="changeTopTabIndex"></v-top>
		<component :is="showContent" :levelShow="true" :item="item" :commentList="item.commentList" ref="content" @changeTopTabIndex="changeTopTabIndex"></component>
		<!-- 底部 -->
		<footer class="detail-footer">
			<div class="icons">
				<div class="collect">
					<img src="./collect_icon.png">
					<p class="text">收藏</p>
				</div>
				<div class="shopcat">
					<span class="dot">10</span>
					<img src="./shopcat_icon.png">
					<p class="text">购物车</p>
				</div>
			</div>
			<div class="add-shopcat">加入购物车</div>
			<div class="go-buy">立即购买</div>
		</footer>
	</div>
</template>

<script>
	import top from './top/top'
	import product from './product/product'
	import detail from './detail/detail'
	import comment from './comment/comment'
	export default {
		name: 'book-detail-page',
		data () {
			return {
				topTabIndex: 0,
				showContentList: ['v-product', 'v-detail', 'v-comment'],
				showItems: ['商品', '详情', '评价'],
				item: {}
			}
		},
		computed: {
			showContent () {
				return this.showContentList[this.topTabIndex]
			}
		},
		components: {
			'v-top': top,
			'v-product': product,
			'v-detail': detail,
			'v-comment': comment
		},
		created () {
			this.loadData()
		},
		mounted () {
		},
		methods: {
			loadData () {
				this.$ajax.bookDetail(this.$route.query.id).then(res => {
					console.log(res)
					this.item = res.data.book
				}, err => {
					console.error(err)
				})
			},
			changeTopTabIndex (index) {
				this.topTabIndex = index
				if (index === 0) {
					this.loadData()
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './index.styl'
</style>