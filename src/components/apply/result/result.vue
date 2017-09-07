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
			<div @click="downloadApp()" class="download-app"></div>
		</div>
		<div v-else>
			<div class="pay-again" @click="payAgain()"></div>
		</div>
		<div class="bottom">
			<div class="logo"></div>
			<div class="desc-text"></div>
		</div>
	</div>
</template>

<script>
	// import {getQueryString} from '../../../common/js/date'
	let u = navigator.userAgent
	export default {
		name: 'result',
		data () {
			return {
				// 支付成功
				success: this.$route.query.success,
				isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
				// 倒计时时间
				// count: 60,
				fee: 0,
				step: 1,
				startAngle: 0,
				endAngle: 0,
				animation_interval: 100,
				iosDownload: 'https://itunes.apple.com/us/app/wei-xiao-wang/id885798822?l=zh&ls=1&mt=8',
				androidDownload: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.hzxuanma.wwwdr',
				interval: null
			}
		},
		computed: {
			count () {
				return this.success ? 60 : 150
			},
			resultText () {
				this.fee = this.$route.query.total_amount || 0
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
			this.fee = this.$route.query.total_amount || 0
		},
		methods: {
			// 回到初始页面
			backToRoot () {
				clearInterval(this.interval)
				// this.$root.Bus.$emit('backToRoot', '')
				let historyBack = -parseInt(localStorage.getItem('historyLength'))
				if (historyBack < 0) {
					this.$router.go(historyBack)
					return
				}
				window.location.href = this.$route.query.href
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
					// this.drawArc(this.startAngle, this.endAngle)
					this.step += 1
				} else {
					clearInterval(this.interval)
					this.backToRoot()
				}
			},
			// 重新支付
			payAgain () {
				clearInterval(this.interval)
				localStorage.setItem('historyLength', localStorage.getItem('historyLength') - 1)
				this.$router.go(-1)
				// this.$root.Bus.$emit('setHistoryBack', '')
			},
			// 下载 APP
			downloadApp () {
				window.location.href = this.isIos ? this.iosDownload : this.androidDownload
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './result.styl'
</style>