<template>
	<section class="home-recommond">
		<div class="left-part">
			<img src="./recommond_icon.png">
		</div>
		<div class="right-part">
			<ul class="recommond-list">
				<li class="list-item">
					<span class="title">宝贝美食</span>
					<span class="text">软文标题软文标题软文标题</span>
				</li>
				<li class="list-item">
					<span class="title">宝贝读物</span>
					<span class="text">软文标题软文标题软文标题软文标题软文标题软文标题软文</span>
				</li>
			</ul>
		</div>
		<div class="right-box"></div>
	</section>
</template>

<script>
	export default {
		name: 'home-recommond',
		data () {
			return {}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './recommond.styl'
</style>