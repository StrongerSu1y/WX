<template>
	<div class="index-shopcat">
		<header class="header-title">购物车</header>
		<empty v-if="!userId" :text="'您暂时还未登录哦！'"></empty>
		<div v-if="!userId" class="login-box">
			<button @click.prevent.stop="goLogin()">去登录</button>
		</div>
		<section v-if="userId && !this.listData.length" class="no-data-box">
			<img src="./shopcat_empty.png">
		</section>
		<div v-if="userId && !this.listData.length" class="login-box">
			<button @click.prevent.stop="goHomePage()">去逛逛</button>
			<!-- <div class="loading">
				<div class="loading-indicator">
					<i></i>
				</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import empty from '@/components/common/empty/empty'
	export default {
		name: 'shopcat',
		data () {
			return {
				userId: localStorage.getItem('userId'),
				listData: []
			}
		},
		computed: {},
		methods: {
			goLogin () {
				this.$router.push({
					path: '/login'
				})
			},
			loadData () {
				this.$ajax.shopcatList().then(res => {
					console.log(res)
				}, err => {
					console.log(err)
				})
			},
			// 去逛逛
			goHomePage () {
				this.$emit('changeTabIndex', 0)
			}
		},
		created () {
			this.loadData()
		},
		mounted () {
		},
		components: {
			empty
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>