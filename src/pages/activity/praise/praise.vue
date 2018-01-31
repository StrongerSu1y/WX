<template>
	<section class="praise">
		<p class="praise-title">
			<img src="./best_icon.png">
			<span class="text">最佳口碑榜</span>
		</p>
		<!-- 列表 -->
		<div>
			<ul class="media-list">
				<li class="img-item">
					<img src="./pra1.png">
				</li>
				<li class="img-item">
					<img src="./pra2.png">
				</li>
				<li class="img-item">
					<img src="./pra3.png">
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
	// import listView from '@/components/circle/list/list'

	let praiselist = [{

	}]
	console.log(praiselist)
	export default {
		name: 'praise',
		data () {
			return {
				praiselist,
				// listData: [],
				pageNo: 1
			}
		},
		computed: {
		},
		methods: {
			// 加载数据
			// getData () {
			// 	this.$ajax.getCircleList({
			// 		page_number: this.pageNo
			// 	}).then(res => {
			// 		let list = res.data.data.list
			// 		// 通知父组件可加载更多
			// 		if (list.length >= 20) {
			// 			this.$emit('canLoadMore', true)
			// 		}
			// 		this.listData = this.listData.concat(list)
			// 		// 通知父组件更新
			// 		this.$nextTick(() => {
			// 			this.$emit('scrollRefresh')
			// 		})
			// 	}, err => {
			// 		console.log(err)
			// 	})
			// },
			// 加载更多
			loadMore () {
				this.pageNo += 1
				this.getData()
			}
		},
		components: {
			// 'v-praiselist': praiselist
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './praise.styl'
</style>