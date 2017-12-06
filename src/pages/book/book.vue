<template>
	<div class="book-home-page" style="min-height: 100%">
		<!-- <keep-alive>
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive> -->
		<transition :name="transitionName">
	    <router-view class="child-view"></router-view>
	  </transition>
	</div>
</template>

<script>
	export default {
		name: 'book-home-page',
		data () {
			return {
				transitionName: 'slide-left'
			}
		},
		beforeRouteUpdate (to, from, next) {
			// let isBack = this.$router.isBack
			if (to.path === '/book/search') {
				this.transitionName = 'slide-right'
			} else {
				this.transitionName = 'slide-left'
			}
			// 重置
			this.$router.isBack = false
			next()
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.child-view
		position absolute
		width 100%
		min-height 100%
		transition all .8s cubic-bezier(.55, 0, .1, 1)
	.slide-left-enter, .slide-right-leave-active
		opacity 0
		transform translate(50px, 0)
	.slide-left-leave-active, .slide-right-enter
		opacity 0
		transform translate(-50px, 0)
</style>