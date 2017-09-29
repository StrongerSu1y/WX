<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
		<div class="search-result">
			<section class="result-bar">
				<div class="back-icon" @click="goBack()">
					<img src="./back_icon.png">
				</div>
				<div class="input-area">
					<input type="text" v-model="params.keyword" placeholder="在此输入搜索内容">
					<img src="../search_icon_black.png" @click.prevent.stop="doSearch()">
				</div>
			</section>
			<!-- {{ $route.params | json }} -->
			<v-listView :listData="listData" :cls="params.cls"></v-listView>
			<section class="no-data-box" v-if="!listData || !listData.length">
				<img src="../no_data_pic.png">
			</section>
		</div>
	</transition>
</template>

<script>
	import listView from './list/list'
	export default {
		name: 'search-result',
		data () {
			return {
				params: {
					keyword: '',
					cls: '2'
				},
				listData: []
			}
		},
		computed: {
		},
		mounted () {
			this.params = JSON.parse(this.$route.params.data)
			this.loadData()
		},
		methods: {
			loadData () {
				this.$ajax.doSearch(this.params).then(res => {
					let list = res.data.pageInfo.list
					list.forEach((item, index) => {
						if (item.hasOwnProperty('res_path')) {
							item.imgList = item.res_path.split(',')
						}
					})
					this.listData = list
				}, err => {
					console.log(err)
				})
			},
			// 返回
			goBack () {
				this.$router.goBack()
			},
			// 搜索
			doSearch () {
				this.loadData()
			}
		},
		components: {
			'v-listView': listView
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './result.styl'
</style>