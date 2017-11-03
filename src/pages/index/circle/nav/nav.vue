<template>
	<nav class="circle-index-nav" :style="navStyleObj">
		<div v-for="(nav, index) in navList" class="nav-item" @click.prevent.stop="changeNavIndex(index)">
			<div :class="{ active: index === navIndex }" class="img"></div>
			<!-- <img :src="nav.src"> -->
			<p :class="{ active: index === navIndex }" class="text">{{ nav.text }}</p>
			<div v-if="index === 0" :style="{ left: navIndex * 100 + '%' }" ref="bottomBar" class="bottom-bar"></div>
		</div>
	</nav>
</template>

<script>
	let navList = [{
		src: require('./dynamic_active.png'),
		text: '动态'
	}, {
		src: require('./dynamic.png'),
		text: '社区'
	}, {
		src: require('./dynamic.png'),
		text: '频道'
	}]
	export default {
		props: {
			navIndex: {
				type: Number
			}
		},
		data () {
			return {
				navList: navList,
				scrollTop: 0
			}
		},
		computed: {
			navStyleObj () {
				if (this.scrollTop <= 0) {
					return
				}
				if (this.scrollTop > 44) {
					return {
						top: '0'
					}
				}
				return {
					top: 44 - this.scrollTop + 'px'
				}
			}
		},
		created () {
			this.$root.Bus.$on('circleScroll', (val) => {
				this.scrollTop = val
			})
		},
		methods: {
			changeNavIndex (index) {
				this.$emit('changeNavIndex', index)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './nav.styl'
</style>