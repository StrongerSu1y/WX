<template>
	<header ref="top" class="activity-header" :style="headerStyle">
		<div class="back-icon" @click="goBack()">
			<img ref="homeIcon" src="./home_icon.png">
		</div>
		<div ref="searchArea" class="search-area" :style="searchStyle" @click="openSearch()">
			<div class="left-part">请输入活动名称</div>
			<div class="right-part">
				<img ref="searchIcon" src="./search_icon_black.png">
			</div>
		</div>
		<div class="message">
			<img ref="messageIcon" src="./message_icon.png">
		</div>
	</header>
</template>

<script>
	export default {
		name: 'activity-top',
		props: {
			scrollTop: {
				type: Number
			}
		},
		data () {
			return {}
		},
		computed: {
			// 头部
			headerStyle () {
				if (this.scrollTop < 10) {
					return {
						paddingBottem: '0.35rem',
						background: '#fff'
					}
				} else {
					let opacity = (this.scrollTop - 10) / 100 + 0.5
					if (opacity < 0.75) {
						this.$refs.homeIcon.src = require('./home_icon.png')
					} else {
						this.$refs.homeIcon.src = require('./home_icon_black.png')
					}
					// 搜索框透明度
					if (opacity >= 1) {
						return {
							paddingBottem: '0.15rem',
							background: 'rgba(248, 189, 72, 1)'
						}
					} else {
						return {
							paddingBottem: '0.15rem',
							background: `rgba(248, 189, 72, ${opacity})`
						}
					}
				}
			},
			// 搜索框
			searchStyle () {
				if (this.scrollTop < 10) {
					return {
						background: `rgba(248, 247, 246, 1)`
					}
				} else {
					let opacity = (this.scrollTop - 10) / 300 + 0.5
					if (opacity >= 1) {
						return {
							background: `rgba(255, 255, 255, 1)`
						}
					} else {
						let searchOpa = opacity
						return {
							background: `rgba(255, 255, 255, ${searchOpa})`
						}
					}
				}
			}
		},
		created () {

		},
		methods: {
			// 打开搜索页
			openSearch () {
				this.$router.push({
					path: '../activity/search'
				})
			},
			// 返回
			goBack () {
				this.$router.goBack()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './top.styl'
</style>