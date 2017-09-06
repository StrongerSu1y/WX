<template>
	<div class="home">
		<v-banner :listImg="listImg" class="banner"></v-banner>
	</div>
</template>

<script>
	import banner from '../../common/banner/banner'
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
			'v-banner': banner
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './home.styl'
</style>