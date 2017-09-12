<template>
	<section class="menu">
		<ul class="menu-list">
			<li v-for="(item, index) in menuList" class="list-item" @click="openUrl()">
				<img v-lazy="item.src">
				<p>{{ item.title }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
	let menuList = [{
		src: require('./periodical_logo.png'),
		title: '刊物'
	}, {
		src: require('./bookmall_logo.png'),
		title: '微书城'
	}, {
		src: require('./shopmall_logo.png'),
		title: '微商城'
	}, {
		src: require('./activity_logo.png'),
		title: '活动'
	}, {
		src: require('./train_logo.png'),
		title: '培训'
	}]
	export default {
		name: 'menu',
		data () {
			return {
				menuList: menuList
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './menu.styl'
</style>