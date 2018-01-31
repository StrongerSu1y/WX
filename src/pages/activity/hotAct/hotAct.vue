<template>
	<section class="hotAct">
		<p class="hotAct-title">
			<img src="./hot_icon.png">
			<span class="text">热门活动</span>
		</p>
		<!-- 活动列表 -->
		<v-actList :listData="listData"></v-actList>
	</section>
</template>

<script>
	import actList from './actList/actList'

	export default {
		name: 'hotAct',
		data () {
			return {
				listData: [],
				pageNo: 1
			}
		},
		computed: {
		},
		methods: {
			// 加载数据
			getData () {
				this.$ajax.activityList({
					// page_number: this.pageNo

				}).then(res => {
					console.log(res)
					let list = res.data.data.list
					// 通知父组件可加载更多
					if (list.length >= 20) {
						this.$emit('canLoadMore', true)
					}
					this.listData = this.listData.concat(list)
					// 通知父组件更新
					this.$nextTick(() => {
						this.$emit('scrollRefresh')
					})
				}, err => {
					console.log(err)
				})
			},
			// 加载更多
			loadMore () {
				this.pageNo += 1
				this.getData()
			}
		},
		components: {
			'v-actList': actList
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './hotAct.styl'
</style>