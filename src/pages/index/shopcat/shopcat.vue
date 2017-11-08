<template>
	<div class="index-shopcat">
		<header class="header-title">
			购物车
			<div class="edit-icon" @click="goEdit()">编辑</div>
		</header>
		<v-main :entrance="'homepage'"></v-main>
	</div>
</template>

<script>
	import main from '@/pages/shopcat/index'
	export default {
		name: 'shopcat',
		data () {
			return {}
		},
		computed: {
		},
		created () {
		},
		mounted () {
			this.$nextTick(() => {
			})
		},
		methods: {
			// 编辑
			goEdit () {
				this.$router.push({
					path: '/shopcat/index'
				})
			}
		},
		components: {
			'v-main': main
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>