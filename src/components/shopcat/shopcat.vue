<template>
	<div class="shopcat">
		<!-- 遮罩 -->
		<transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
			<section v-show="fold" @click="changeListShow()" class="mask">
			</section>
		</transition>
		<!-- 购物球 -->
		<div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
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
				<ul class="list-body" @click.prevent.stop="">
					<li v-for="(item, index) in listData" v-if="item.number > 0" class="list-item underline">
						<div class="left-part">
							<img src="./clear_button.png">
							<span class="title">杂志名称杂志名称杂志名称</span>
						</div>
						<p class="price">￥<span class="big">{{ item.price }}</span>元</p>
						<div class="list-buttons">
							<img @click="reduceNum(index)" src="./reduce_icon.png">
							<span>{{ item.number }}</span>
							<img @click="addNum(index)" src="./add_icon.png">
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
				<span class="now-sum">￥<span class="big">{{ nowSum }}</span></span>
				<!-- <span class="old-sum">￥{{ oldSum }}</span> -->
			</div>
			<div class="right-button" @click="orderPay()">
				去结算({{ total }})
			</div>
		</div>
		<!-- 其他 -->
		<div v-else class="shopcat">
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
		<div v-if="onlyBuy" class="shopcat">
			<div class="item buy">
				立即购买
			</div>
		</div>
		<!-- 活动培训详情 -->
		<div v-if="activity" class="shopcat" @click="goApply()">
			<div class="item buy activity">
				<img src="./apply.png">
				<span>我要报名</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'shopcat',
		props: [
			'entrance',
			'onlyBuy',
			'activity',
			'id',
			'nowSum',
			'oldSum',
			'total',
			'selectedListData',
			'listData'
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
				// 加入购物车动画的球
				balls: [{ show: false }, { show: false }, { show: false }, { show: false }, { show: false }],
				dropBalls: []
			}
		},
		computed: {
			collectSrc () {
				return this.collectOn ? this.collectActive : this.collect
			},
			collectText () {
				return this.collectOn ? '已收藏' : '收藏'
			}
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
			// 下降
			drop (el) {
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i]
					if (!ball.show) {
						ball.show = true
						ball.el = el
						this.dropBalls.push(ball)
						return
					}
				}
			},
			// 加入购物车动画之前
			beforeEnter (el) {
				let count = this.balls.length
				while (count--) {
					let ball = this.balls[count]
					if (ball.show) {
						let rect = ball.el.getBoundingClientRect()
						let x = rect.left - 32
						let y = -(window.innerHeight - rect.top - 22)
						el.style.display = ''
						el.style.transform = `translate3d(0,${y}px,0)`
						el.style.webkitTransform = `translate3d(0,${y}px,0)`
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.transform = `translate3d(${x}px,0,0)`
						inner.style.webkitTransform = `translate3d(${x}px,0,0)`
					}
				}
			},
			enter (el) {
				this.$nextTick(() => {
					// alert(1)
					setTimeout(() => {
						el.style.transform = 'translate3d(0,0,0)'
						el.style.webkitTransform = 'translate3d(0,0,0)'
						let inner = el.getElementsByClassName('inner-hook')[0]
						inner.style.transform = `translate3d(0,0,0)`
						inner.style.webkitTransform = `translate3d(0,0,0)`
					}, 5)
				})
			},
			afterEnter (el) {
				let ball = this.dropBalls.shift()
				if (ball) {
					ball.show = false
					el.style.display = 'none'
				}
			},
			// 添加
			addNum (index) {
				// alert(1)
				this.$emit('addNum', index)
			},
			// 减少
			reduceNum (index) {
				this.$emit('reduceNum', index)
			},
			// 清空购物车
			clearShopcat () {
				this.changeListShow()
				this.$emit('clearShopcat')
			},
			// 去结算
			orderPay () {
				if (!this.total) {
					return
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './shopcat.styl'
</style>