<template>
	<div>
		<!-- 图书 -->
		<div v-if="book" class="header">
			<div class="left-part">
				<div class="back-icon" @click="goBack()"></div>
			</div>
			<p>详情页</p>
			<div class="right-part">
				<div class="fenxiang"></div>
			</div>
		</div>
		<!-- 刊物 -->
		<div v-if="period" class="header">
			<div class="left-part">
				<div class="home-icon" @click="goHome()"></div>
			</div>
			<p>刊物</p>
			<div class="right-part">
				<div class="search right-icon-1"></div>
				<div class="shopcat right-icon-2">
					<div class="dot">
						3
					</div>
				</div>
			</div>
		</div>
		<!-- 活动 -->
		<div v-if="activity" class="header">
			<div class="left-part">
				<div class="home-icon" @click="goHome()"></div>
			</div>
			<p>活动详情</p>
			<div class="right-part">
				<div class="share right-icon-1"></div>
				<div class="collect right-icon-2" @click="toggleCollect()">
					<div class="icon" :class="{ active: isCollected}"></div>
					<!-- <img ref="collect" src="./collect_active.png"> -->
				</div>
			</div>
		</div>
		<!-- 报名 -->
		<div v-if="entrance === 'apply'" class="header">
			<div class="left-part">
				<div class="back-icon" @click="goBack()"></div>
			</div>
			<p class="apply">{{ title }}</p>
			<div class="right-part">
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../../router'

	export default {
		name: 'header',
		props: ['book', 'period', 'isCollected', 'activity', 'entrance', 'title'],
		data () {
			return {}
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$emit('goBack')
				router.go(-1)
			},
			// 返回首页
			goHome () {
				router.push('/')
			},
			// 切换收藏
			toggleCollect () {
				this.isCollected = !this.isCollected
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './header.styl'
</style>