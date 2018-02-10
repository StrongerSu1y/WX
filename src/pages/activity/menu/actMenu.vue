<template>
	<section class="index-menu">
		<ul class="menu-list">
			<li @click.prevent.stop="openUrl(item.id)" v-for="(item, index) in menuList" class="list-item">
				<img :src="item.src">
				<p>{{ item.title }}</p>
			</li>
		</ul>
	</section>
</template>

<script>
	let menuList = [{
		src: require('./typerow-1.png'),
		title: '亲子活动',
		id: '1'
	}, {
		src: require('./typerow-2.png'),
		title: '校园活动',
		id: '2'
	}, {
		src: require('./typerow-3.png'),
		title: '节目剧场',
		id: '3'
	}, {
		src: require('./typerow-4.png'),
		title: '游玩乐园',
		id: '4'
	}, {
		src: require('./typerow-5.png'),
		title: '其他',
		id: null
	}]
	export default {
		name: 'index-menu',
		data () {
			return {
				// 按钮数组
				menuList: menuList,
				item: []
			}
		},
		created () {
			// console.log(this.menuList)
		},
		methods: {
			// 打开单项内容
			openUrl (id) {
				this.$router.push({
					path: '../../activity/search',
					query: {
						type: id
					}
				})
			},
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './actMenu.styl'
</style>