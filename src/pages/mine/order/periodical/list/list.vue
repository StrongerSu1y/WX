<template>
	<ul ref="list" class="mine-order-list">
		<li v-if="listData && listData.length" ref="listItem" v-for="(item, index) in listData" :class="{ deleteShow: deleteIndex === index}" class="list-item" @click.prevent.stop="openDetail()">
			<div class="content">
				<div class="list-body">
					<!-- 左侧图片 -->
					<div class="left-media">
						<img src="./back_icon.png">
					</div>
					<!-- 右侧文字 -->
					<div class="right-part">
						<div class="title">
							<span class="number">共{{ item.numbers }}件</span>
							<div class="status">
								<img v-if="item.complete" src="./complete_logo.png">
								<span class="text">{{ item.status }}</span>
							</div>
						</div>
						<p class="id">订单号: {{ item.orderId }}</p>
						<p class="price">实付: ¥{{ item.price }}</p>
					</div>
				</div>
				<!-- 底部按钮 -->
				<div class="list-bottom">
					<button v-if="item.complete" class="button logistics">查看物流</button>
					<button v-if="item.buttonText" class="button">{{ item.buttonText }}</button>
				</div>
			</div>
			<div class="delete-button">删除</div>
		</li>
		<div class="empty-box" v-if="!listData.length">
			<img src="./empty_logo.png">
			<p class="text">暂无内容</p>
		</div>
	</ul>
</template>

<script>
	import { hasClass } from '@/common/js/common.js'
	export default {
		name: 'mine-order-list',
		props: {
			listData: {
				type: Array
			}
		},
		data () {
			return {
				startX: 0,
				deleteIndex: -1
			}
		},
		mounted () {
			console.log(this.$refs.list)
			this.$nextTick(() => {
				if (this.listData.length) {
					this.listenTouchEvent()
				}
			})
		},
		watch: {
		},
		methods: {
			// 监听滑动事件
			listenTouchEvent () {
				this.$refs.listItem.forEach((item, index) => {
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					item.addEventListener('touchend', event => {
						event.stopPropagation()
						let endX = event.changedTouches[0].clientX
						if (hasClass(item, 'deleteShow')) {
							if (endX - this.startX > 30) {
								this.deleteIndex = -1
							}
							return false
						} else {
							this.deleteIndex = -1
						}
						if (this.startX - endX > 30) {
							this.deleteIndex = index
						}
					})
				})
			},
			// 打开详情页
			openDetail () {
				this.$router.push({
					path: '/mine/order/detail',
					query: {
						cls: this.$route.query.cls
					}
				})
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './list.styl'
</style>