<template>
	<div class="book-search-page">
		<v-top :scrollTop="scrollTop" :params="params" :id="id" @refreshData="refreshData"></v-top>
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<v-list ref="list" :bookList="bookList" :type="'2'"></v-list>
			</section>
		</div>
	</div>
</template>

<script>
	import top from './top/top'
	import list from '../list/list'
	export default {
		name: 'book-search-page',
		data () {
			return {
				// 屏幕高度
				winHeight: window.innerHeight - 50 + 'px',
				scroller: '',
				scrollTop: 0,
				// 图书列表
				bookList: [],
				params: {
					pageNum: 1,
					pageSize: 20
				},
				id: this.$route.query.id
			}
		},
		computed: {
		},
		components: {
			'v-top': top,
			'v-list': list
		},
		created () {
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 加载
			loadData () {
				this.$ajax.bookList(this.params).then(res => {
					// console.log(res)
					this.bookList = this.bookList.concat(res.data.pageInfo.list)
				}, err => {
					console.log(err)
				})
			},
			// 更新数据
			refreshData () {
				console.log(this.params)
				this.bookList = []
				this.params.pageNum = 1
				this.$refs.list.itemList = []
				this.loadData()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './search.styl'
</style>