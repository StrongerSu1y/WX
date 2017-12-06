<template>
	<div class="v-shopcat">
		<!-- 遮罩 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="fold" @click="changeListShow()" class="mask">
			</section>
		</transition>
    <!-- 底部购物车 -->
		<transition enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
			<div v-show="fold" class="list-box">
				<div class="list-header underline">
					<div class="title">购物车</div>
					<div class="clear-button" @click="clearShopcat()">
						<img src="./clear_button.png">
						<span>清空</span>
					</div>
				</div>
				<ul class="list-body" :style="{ maxHeight: listHeight + 'px' }" @click.prevent.stop="">
					<li v-for="(item, index) in shopcatList" v-if="item.number > 0" class="list-item underline">
						<div class="left-part">
							<img v-lazy="item.logo">
							<span class="title">{{ item.name }}</span>
						</div>
						<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getDecimal }}元</p>
						<div class="list-buttons">
							<img @click="shopcatDecrement(item.id)" src="./reduce_icon.png">
							<span>{{ item.number }}</span>
							<img @click="shopcatIncreaseCart(item.id)" src="./add_icon.png">
						</div>
					</li>
				</ul>
			</div>
		</transition>
		<!-- 杂志征订底部 -->
		<div v-if="entrance === 'ording'" class="ording-bottom">
			<div class="left-part">
				<div class="shopcat-icon" @click="showShopcatList()">
					<span v-if="total" class="dot">{{ total }}</span>
				</div>
				<span v-if="total" class="now-sum">￥<span class="big">{{ nowSum | getInteger }}</span>{{ nowSum | getFixed1 }}</span>
				<!-- <span class="old-sum">￥{{ oldSum }}</span> -->
			</div>
			<div class="right-button" @click="orderPay()">
				去结算({{ total }})
			</div>
		</div>
		<!-- 其他 -->
		<div v-else class="v-shopcat">
			<div class="item buttons">
				<div class="collect button">
					<div class="img" :class="{ active: collectOn }" @click="toggleCollect()"></div>
					<div class="text">{{ collectText }}</div>
				</div>
				<div class="shop button">
					<div class="dot">
						3
					</div>
					<img src="./shopcat.png">
					<div class="text">购物车</div>
				</div>
			</div>
			<div class="item buy">
				立即购买
			</div>
			<div class="item add">
				放入购物车
			</div>
		</div>
		<!-- 立即购买 -->
		<div v-if="onlyBuy" class="v-shopcat">
			<div class="item buy">
				立即购买
			</div>
		</div>
		<!-- 活动培训详情 -->
		<div v-if="activity" class="v-shopcat" @click="goApply()">
			<div class="item buy activity">
				<img src="./apply.png">
				<span>我要报名</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { getPrice } from '../../common/js/common.js'
	export default {
		name: 'shopcat',
		props: [
			'entrance',
			'onlyBuy',
			'activity',
			'id'
		],
		data () {
			return {
				collect: `collect.png`,
				collectActive: `collect_active.png`,
				collectOn: false,
				// 报名图标
				applyIconSrc: `apply.png`,
				// 展开购物车
				fold: false,
				// 购物车列表高度
				listHeight: window.innerHeight - 50 - 60,
				// 购物车列表
				shopcatList: []
			}
		},
		computed: {
			collectSrc () {
				return this.collectOn ? this.collectActive : this.collect
			},
			collectText () {
				return this.collectOn ? '已收藏' : '收藏'
			},
			// 所有购物车 id 数组
			shopcatIdList () {
				return this.shopcatList.map(item => {
					return item.id
				})
			},
			// 留下非零的购物车
			computedShopcatList () {
				if (!this.shopcatList.length) {
					return []
				}
				return this.shopcatList.filter((item) => {
					return item.number > 0
				})
			},
			// 总数
			total () {
				let total = 0
				this.shopcatList.forEach((item, index) => {
					total += item.number
				})
				return total
			},
			// 总价
			nowSum () {
				let sum = 0
				this.shopcatList.forEach((item, index) => {
					sum += item.number * getPrice(item.last_fee)
				})
				return sum.toFixed(1)
			},
			// 原价
			oldSum () {
				let sum = 0
				this.shopcatList.forEach((item, index) => {
					sum += item.number * getPrice(item.original_fee)
				})
				return sum
			}
		},
		watch: {
			computedShopcatList (newVal, oldVal) {
				// 将更改保存入本地
				localStorage.setItem('shopcatList', JSON.stringify(newVal))
			}
		},
		created () {
			// 获取本地购物车数据
			this.getLocalShopcat()
		},
		methods: {
			// 切换收藏
			toggleCollect () {
				this.collectOn = !this.collectOn
			},
			// 我要报名
			goApply () {
				this.$emit('go-apply')
			},
			// 切换购物车列表显示
			changeListShow () {
				this.fold = !this.fold
			},
			// 展开购物车列表
			showShopcatList () {
				if (!this.total) {
					return
				}
				this.changeListShow()
			},
			// 添加
			shopcatIncreaseCart (id) {
				// 比较购物车列表
				this.shopcatList.forEach(item => {
					if (item.id === id) {
						item.number += 1
					}
				})
				this.$emit('shopcatIncreaseCart', id)
			},
			// 减少
			shopcatDecrement (id) {
				// 比较购物车列表
				this.shopcatList.forEach(item => {
					if (item.id === id) {
						item.number -= 1
					}
				})
				if (this.total <= 1) {
					this.changeListShow()
				}
				// 通知父组件更改
				this.$emit('shopcatDecrement', id)
			},
			// 清空购物车
			clearShopcat () {
				this.changeListShow()
				this.$emit('clearShopcat')
				this.shopcatList = []
			},
			// 去结算
			orderPay () {
				this.$emit('orderPay')
			},
			// 清空缓存
			clearStorage () {
				localStorage.clear()
			},
			// 获取购物车数据
			getLocalShopcat () {
				if (localStorage.getItem('shopcatList') && localStorage.getItem('shopcatList').length) {
					this.shopcatList = JSON.parse(localStorage.getItem('shopcatList'))
				}
			},
			// 购物车增加
			addShopcat (obj, number) {
				console.log('shopcatIdList: ' + this.shopcatIdList)
				console.log('changeShopcat: ' + number)
				// 如果有则更改，没有则新增
				if (this.shopcatIdList.indexOf(obj.id) > -1) {
					this.shopcatList[this.shopcatIdList.indexOf(obj.id)].number += 1
				} else {
					this.shopcatList.push(obj)
				}
			},
			// 购物车减少
			reduceShopcat (obj, number) {
				console.log('shopcatIdList: ' + this.shopcatIdList)
				console.log('changeShopcat: ' + number)
				// 如果有则更改，没有则新增
				if (this.shopcatIdList.indexOf(obj.id) > -1) {
					this.shopcatList[this.shopcatIdList.indexOf(obj.id)].number -= 1
				} else {
					this.shopcatList.push(obj)
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>