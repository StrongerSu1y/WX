<template>
	<div class="book-single-page">
		<v-top :title="title"></v-top>
		<!-- scroll 外层容器 -->
		<div ref="wrapper" class="wrapper" :style="{ height: winHeight }">
			<!-- 内容 -->
			<section ref="content" class="content">
				<v-list :bookList="bookList" :type="type" :id="id"></v-list>
			</section>
			<!-- 猜你喜欢 -->
			<v-recommend v-if="recommendList && recommendList.length" :recommendList="recommendList"></v-recommend>
		</div>
	</div>
</template>

<script>
	import top from './top/top'
	import list from '../list/list'
	import recommend from '../recommend/recommend'
	export default {
		name: 'book-single-page',
		data () {
			return {
				// 屏幕高度
				winHeight: window.innerHeight - 50 + 'px',
				scroller: '',
				scrollTop: 0,
				title: this.$route.query.title,
				id: this.$route.query.id,
				type: this.$route.query.type,
				bookList: [],
				recommendList: []
			}
		},
		computed: {
			ajaxUrl () {
				let id = this.id
				return this.type === '1' ? `/book/fixedColumn/${id}/open` : `/book/dynamicColumn/${id}/open`
			}
		},
		components: {
			'v-top': top,
			'v-list': list,
			'v-recommend': recommend
		},
		created () {
		},
		mounted () {
			this.loadData()
		},
		methods: {
			loadData () {
				this.$ajax.getAjax(this.ajaxUrl).then(res => {
					console.log(res)
					this.bookList = this.bookList.concat(res.data.pageInfo.list)
					this.recommendList = res.data.recommendList
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './single.styl'
</style>