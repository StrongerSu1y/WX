<template>
	<section class="mine-content-row">
		<div v-for="item in computedList" class="content-col" @click="openUrl(item.path)">
			<img v-if="item.src" :src="item.src">
			<p v-if="item.text" class="text">我的{{ item.text }}</p>
		</div>
	</section>
</template>

<script>
	let itemList = [{
		src: require('./collect.png'),
		text: '收藏',
		path: '/mine/collect'
	}, {
		src: require('./integral.png'),
		text: '积分',
		path: '/mine/integral'
	}, {
		src: require('./activity.png'),
		text: '活动',
		path: '/mine/activity'
	}, {
		src: require('./train.png'),
		text: '培训',
		path: '/mine/train'
	}, {
		src: require('./group.png'),
		text: '团购',
		path: '/mine/group'
	}, {
		src: require('./discount.png'),
		text: '优惠券',
		path: '/mine/discount'
	}, {
		src: require('./invitation.png'),
		text: '帖子',
		path: '/mine/circle'
	}]
	export default {
		name: 'mine-content',
		data () {
			return {
				itemList: itemList
			}
		},
		computed: {
			computedList () {
				let remainder = this.itemList.length % 4
				if (remainder === 0) {
					return this.itemList
				}
				let list = this.itemList
				for (let i = 4; i > remainder; i--) {
					list.push({})
				}
				return list
			}
		},
		methods: {
			openUrl (path) {
				if (!path) {
					this.showToast()
					return
				}
				this.$router.push({
					path: path
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './content.styl'
</style>