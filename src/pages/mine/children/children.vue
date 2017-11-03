<template>
	<div class="mine-children">
		<!-- 头部 -->
		<section class="mine-children-top underline">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">孩子管理</p>
			<div class="add-btn" @click="doAddChild()">
				添加
			</div>
		</section>
		<!-- 列表 -->
		<ul class="children-list">
			<li ref="listItem" v-for="(item, index) in listData" class="children-item" :class="{ deleteShow: deleteIndex === index }" @click.prevent="goEdit(index)">
				<div class="content">
					<div class="left-part">
						<img v-lazy="item.avatar">
					</div>
					<div class="center-part">
						<div class="box">
							<p class="name">
								<span class="text">{{ item.name }}</span>
								<img :src="getGendleSrc(item.gendle)">
								<span class="active" v-if="item.active">当前</span>
							</p>
							<p class="address">{{ item.address }}</p>
						</div>
					</div>
					<div class="right-part">
						<img src="./right_arrow.png">
					</div>
				</div>
				<div class="delete-button" @click.prevent.stop="deleteChild(item, index)">删除</div>
			</li>
		</ul>
		<!-- 重新设置当前孩子 -->
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
			<v-reset v-if="resetShow" :listData="listData" @closeSelector="closeSelector"></v-reset>
		</transition>
	</div>
</template>

<script>
	let listData = [{
		avatar: require('../avatar.jpg'),
		name: '李梦佳琪',
		address: '浙江省杭州市西湖区杭州市翠苑第一小学(翠苑校区)一年级1班',
		gendle: 2
	}, {
		avatar: require('../avatar.jpg'),
		name: '流川枫',
		address: '浙江省杭州市西湖区杭州市翠',
		gendle: 1,
		active: true
	}]
	import { hasClass } from '@/common/js/common.js'
	import reset from './reset/reset'
	export default {
		data () {
			return {
				listData: listData,
				startX: 0,
				deleteIndex: -1,
				resetShow: false
			}
		},
		computed: {
		},
		mounted () {
			this.$nextTick(() => {
				this.listenDelete()
			})
		},
		methods: {
			// 监听删除
			listenDelete () {
				this.$refs.listItem.forEach((item, index) => {
					// 记录起始位置
					item.addEventListener('touchstart', event => {
						event.stopPropagation()
						this.startX = event.targetTouches[0].clientX
					})
					// 监听结束为止
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
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 添加孩子
			doAddChild () {
				this.$router.push({
					path: '/mine/children/edit'
				})
			},
			// 孩子性别
			getGendleSrc (gendle) {
				if (parseInt(gendle, 10) === 1) {
					return require('./boy.png')
				} else {
					return require('./girl.png')
				}
			},
			// 去编辑
			goEdit (index) {
				this.$router.push({
					path: 'children/edit',
					query: {
						item: JSON.stringify(this.listData[index])
					}
				})
			},
			// 删除孩子
			deleteChild (item, index) {
				// 判断是否为当前孩子
				if (item.active) {
					this.resetShow = true
				}
				this.listData.splice(index, 1)
			},
			// 关闭孩子选择
			closeSelector (index) {
				this.listData[index].active = true
				this.resetShow = false
			}
		},
		components: {
			'v-reset': reset
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './children.styl'
</style>