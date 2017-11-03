<template>
	<header ref="top" class="book-detail-header">
		<div class="back-icon" @click="goBack()">
			<img ref="homeIcon" src="./back_icon.png">
		</div>
		<div ref="searchArea" class="title">
			<ul class="top-tab">
				<li v-for="(item, index) in showItems" class="tab-item" :class="{ active: topTabIndex === index }" @click="changeTopTabIndex(index)">{{ item }}</li>
			</ul>
		</div>
		<div class="share">
			<img src="./share_icon.png">
		</div>
		<div class="more">
			<img src="./more_icon.png">
		</div>
	</header>
</template>

<script>
	export default {
		name: 'book-top',
		props: {
			topTabIndex: {
				type: Number
			},
			showItems: {
				type: Array
			}
		},
		data () {
			return {
			}
		},
		computed: {
		},
		created () {
		},
		methods: {
			// 切换显示内容
			changeTopTabIndex (index) {
				this.$emit('changeTopTabIndex', index)
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import './top.styl'
</style>