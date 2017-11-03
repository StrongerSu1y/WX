<template>
	<header ref="top" class="book-header single">
		<div class="back-icon" @click="goBack()">
			<img ref="homeIcon" src="./back_icon.png">
		</div>
		<div ref="searchArea" class="title">
			{{ title }}
		</div>
		<div class="message">
			<img ref="messageIcon" src="./shopcat_icon.png">
		</div>
	</header>
</template>

<script>
	export default {
		name: 'book-top',
		props: {
			scrollTop: {
				type: Number
			},
			title: {
				type: String
			}
		},
		data () {
			return {}
		},
		computed: {
		},
		created () {
		},
		methods: {
			// 打开搜索页
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 @import './top.styl'
</style>