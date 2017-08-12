<template>
	<div class="result">
		<header class="result-header" :class="{ success: success, fail: !success }">
			<div class="close-text" @click="backToRoot()">
				<canvas ref="mycanvas" id="mycanvas" width="50" height="50" class="canvas"></canvas>
				关闭 {{ timeLast }}s
			</div>
			<div class="price">
				￥<span class="big">{{ fee }}</span>
			</div>
			<div class="result-text" :class="{ success: success, fail: !success }">
				{{ resultText }}
			</div>
		</header>
		<div v-if="success">
			<div class="download-text"></div>
			<div class="download-app"></div>
		</div>
		<div v-else>
			<div class="pay-again"></div>
		</div>
		<div class="bottom">
			<div class="logo"></div>
			<div class="desc-text"></div>
		</div>
	</div>
</template>

<script>
	import {getQueryString} from '../../common/js/date'
	export default {
		name: 'result',
		data () {
			return {
				// 支付成功
				success: true,
				// 倒计时时间
				count: 50,
				fee: 0,
				step: 1,
				startAngle: 0,
				endAngle: 0,
				animation_interval: 100,
				interval: null
			}
		},
		computed: {
			resultText () {
				this.fee = getQueryString('total_amount')
				this.interval = setInterval(this.animation, this.animation_interval)
				return this.success ? '支付成功' : '支付失败'
			},
			timeLast () {
				return Math.ceil((this.count - this.step) / 10)
			},
			// width
			width () {
				return this.$refs.mycanvas.width
			},
			// height
			height () {
				return this.$refs.mycanvas.height
			},
			// ctx
			ctx () {
				return this.$refs.mycanvas.getContext('2d')
			}
		},
		mouted () {
			this.fee = getQueryString('total_amount')
			console.log(this.$refs.mycanvas)
		},
		methods: {
			backToRoot () {
				this.$router.go(-1)
			},
			// 画图
			drawArc (start, end) {
				let x = this.width / 2
				let y = this.height / 2
				let radius = x - 10
				let counterClockwise = false
				this.ctx.strokeStyle = '#000000'
				this.ctx.beginPath()
				// this.ctx.moveTo(x, y)
				this.ctx.arc(x, y, radius, start, end, counterClockwise)
				this.ctx.stroke()
			},
			// 动画
			animation () {
				if (this.step <= this.count) {
					this.endAngle = (this.step / this.count) * 2 * Math.PI
					console.log(this.step / this.count)
					this.drawArc(this.startAngle, this.endAngle)
					this.step += 1
				} else {
					// this.backToRoot()
					clearInterval(this.interval)
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './result.styl'
</style>