<template>
	<div class="index">
		<div class="home">
			<v-banner :listImg="listImg" class="banner"></v-banner>
		</div>
		<!-- 菜单 -->
		<v-menu class="menu-list"></v-menu>
		<!-- 推荐 -->
		<v-recommond></v-recommond>
		<split></split>
	</div>
</template>

<script>
	import banner from '../../common/banner/banner'
	import menu from './menu/menu'
	import recommond from './recommond/recommond'
	import split from '../../common/split/split'
	export default {
		name: 'home',
		data () {
			return {
				listImg: [{
					url: 'http://www.res.51weixiao.com/upload/upload1/20170830/3461504079457665.png'
				}]
			}
		},
		components: {
			'v-banner': banner,
			'v-menu': menu,
			'v-recommond': recommond,
			split
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'
</style>