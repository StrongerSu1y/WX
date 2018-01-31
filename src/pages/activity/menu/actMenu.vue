<template>
	<section class="index-menu">
		<ul class="menu-list">
			<li @click.prevent.stop="openUrl(item.path)" v-for="(item, index) in menuList" class="list-item">
				<img v-lazy="item.src">
				<p>{{ item.title }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
	let menuList = [{
		src: require('./typerow-1.png'),
		title: '亲子活动',
		path: '../../activity/search'
	}, {
		src: require('./typerow-2.png'),
		title: '校园活动',
		path: '../../activity/search'
	}, {
		src: require('./typerow-3.png'),
		title: '节目剧场',
		path: '../../activity/search'
	}, {
		src: require('./typerow-4.png'),
		title: '游玩乐园',
		path: '../../activity/search'
	}, {
		src: require('./typerow-5.png'),
		title: '其他',
		path: '../../activity/search'
	}]
	export default {
		name: 'index-menu',
		data () {
			return {
				// 按钮数组
				menuList: menuList
			}
		},
		methods: {
			// 打开单项内容
			openUrl (path) {
				if (!path) {
					this.showToast()
					return
				}
				this.$router.push({
					path: path
				})
			},
			// 提示
			showToast () {
				this.Toast.warning({
					title: '<p>该功能正在开发中</p><p>敬请期待...</p>'
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './actMenu.styl'
</style>