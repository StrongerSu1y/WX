<template>
	<div class="top-line">
		<div class="logo">
			<img src="./logo.png">
		</div>
		<div class="title">微校网</div>
		<div class="text">快乐成长百宝箱</div>
		<div class="link">打开APP</div>
		<div class="close-button" @click="closeLink()">
			<img src="./close_icon.png">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'link',
		data () {
			return {}
		},
		methods: {
			closeLink () {
				this.$emit('close-link')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './link.styl'
</style>