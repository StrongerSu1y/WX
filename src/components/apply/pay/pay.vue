<template>
	<div class="pay">
		<v-header :entrance="'apply'" :title="title"></v-header>
		<div class="amount">
			<div class="desc">付款金额</div>
			<div class="num">￥<span class="big">{{ fee }}</span></div>
		</div>
		<ul class="type-list">
			<li v-for="(item, index) in payList" class="item alipay" :class="{ underline: (index < payList.length - 1) }">
				<div class="img" :class="item.cls"></div>
				<span class="text">{{ item.text }}</span>
				<div class="checkbox"  :class="{ active: index === checkIndex }" @click="changeCheckIndex(index)"></div>
			</li>
		</ul>
		<div ref="form" v-html="formHtml"></div>
		<!-- 底部提交按钮 -->
		<footer class="footer" @click="doPay()">
			确认支付
		</footer>
	</div>
</template>

<script>
	let u = navigator.userAgent
	import header from '../../header/header'
	import { addScript } from '../../../common/js/common'
	const payList = [{
		cls: 'alipay',
		text: '支付宝付款'
	}, {
		cls: 'scene',
		text: '现场支付'
	}]
	const weixin = {
		cls: 'weixin',
		text: '微信付款'
	}
	export default {
		name: 'pay',
		data () {
			return {
				noCheckSrc: 'check.png',
				hasCheckSrc: 'check_active.png',
				checkIndex: 0,
				title: '请选择支付方式',
				fee: 0,
				isWeixin: false,
				isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
				formHtml: ''
			}
		},
		computed: {
			payList () {
				if (this.isWeixin) {
					payList.splice(0, 1, weixin)
				}
				return payList
			}
		},
		created () {
			// 动态引入需要的 script 标签
			addScript('http://pv.sohu.com/cityjson?ie=utf-8')
			addScript('//res.wx.qq.com/open/js/jweixin-1.0.0.js')
		},
		mounted () {
			document.title = this.title
			// 设置 history
			localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) + 1)
			this.fee = this.$route.query.fee
			let ua = navigator.userAgent.toLowerCase()
			if (ua.match(/MicroMessenger/i)) {
				// 在微信中打开
				this.isWeixin = true
			}
		},
		methods: {
			changeCheckIndex (index) {
				this.checkIndex = index
			},
			// 支付
			doPay () {
				// let type = this.$route.query.cls === '14' ? '活动' : '培训'
				if (this.checkIndex === 0) {
					if (!this.isWeixin) {
						this.aliPay()
					} else {
						this.weixinPay()
					}
				} else {
					let id = this.$route.query.id
					let _uid = localStorage.getItem('userId')
					let cls = this.$route.query.cls
					let _url = `/activetrade/enter?id=${id}&_uid=${_uid}&cls=${cls}`
					this.Toast.loading({
						title: '提交中...'
					})
					this.$ajax.getAjax(_url)
						.then((res) => {
							this.Dialog.alert({
								title: '报名成功！',
								msg: `费用现场支付`
							}, (ret) => {
								setTimeout(() => {
									// 回到首页
									// this.$root.Bus.$emit('backToRoot', '')
									let historyBack = -parseInt(localStorage.getItem('historyLength'))
									localStorage.setItem('historyLength', 0)
									this.$router.go(historyBack)
								}, 300)
							})
						}, err => {
							console.log(err)
						})
				}
			},
			// 支付宝支付
			aliPay () {
				let href = this.$route.query.href
				let protocol = window.location.protocol
				let host = window.location.host
				let returnUrl = `${protocol}//${host}/result?href=${href}&success=true`
				this.Toast.loading({
					title: '提交中...'
				})
				let _data = {
					cls: this.$route.query.cls,
					return_url: returnUrl,
					outtradeno: this.$route.query.outtradeno
				}
				this.$ajax.getWapOrderInfoByAliPay(_data)
					.then((res) => {
						this.$refs.form.innerHTML = res.data
						if (document.forms && document.forms.length) {
							document.forms[0].submit()
						}
					}, err => {
						console.log(err)
					})
			},
			// 微信支付
			weixinPay () {
				let _data = {
					cls: this.$route.query.cls,
					outtradeno: this.$route.query.outtradeno,
					ip: window.returnCitySN.cip,
					openid: localStorage.getItem('wxOpenId')
				}
				this.$ajax.getOfficialAccountPrepayInfo(_data)
					.then((res) => {
						console.log(res)
						// alert('res: ' + JSON.stringify(res))
						// ios 用新接口
						if (this.isIos) {
							this.weixinConfig(res.data.data)
							return
						}
						// 调起微信支付
						this.upWeixinPay(res.data.data)
					}, err => {
						console.log(err)
					})
			},
			// 微信 config 接口
			weixinConfig (data) {
				window.wx.config({
					debug: false,
					appId: data.appId,
					timestamp: data.timeStamp,
					nonceStr: data.nonceStr,
					signature: data.sign,
					jsApiList: [
						'chooseWXPay'
					]
				})
				window.wx.ready(() => {
					// window.wx.checkJsApi({
					// 	jsApiList: ['chooseWXPay'],
					// 	success: function (response) {
					// 		alert('判断: ' + JSON.stringify(response))
					// 	}
					// })
					let success = false
					let vm = this
					window.wx.chooseWXPay({
						timestamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: data.signType,
						paySign: data.sign,
						success: function (res) {
							// alert('返回: ' + JSON.stringify(res))
							success = true
							// 设置 history
							// alert(localStorage.getItem('historyLength'))
							vm.$router.push({
								path: '/result',
								query: {
									total_amount: vm.fee,
									success: success,
									href: vm.$route.query.href
								}
							})
						}
					})
				})
			},
			// 调起微信支付
			upWeixinPay (data) {
				// alert('href: ' + window.location.href)
				if (typeof window.WeixinJSBridge === 'undefined') {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady(data), false)
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady(data))
						document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady(data))
					}
				} else {
					this.onBridgeReady(data)
				}
				document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
			},
			onBridgeReady (data) {
				// alert('ready: ' + JSON.stringify(data))
				var _sendObj = {
					// 公众号名称
					'appId': data.appId,
					'timeStamp': data.timeStamp,
					// 随机串
					'nonceStr': data.nonceStr,
					'package': data.package,
					// 微信签名方式
					'signType': data.signType,
					// 微信签名
					'paySign': data.sign
				}
				// alert(JSON.stringify(_sendObj))
				window.WeixinJSBridge.invoke(
					'getBrandWCPayRequest', _sendObj,
					(res) => {
						if (res.err_msg === 'get_brand_wcpay_request:ok') {
							// 设置 history
							// this.$store.commit('setHistory', this.$store.state.history + 1)
							this.$router.push({
								path: '/result',
								query: {
									total_amount: this.fee,
									success: true,
									href: this.$route.query.href
								}
							})
						} else {
							// 设置 history
							this.$router.push({
								path: '/result',
								query: {
									total_amount: this.fee,
									success: false,
									href: this.$route.query.href
								}
							})
						}
					}
				)
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './pay.styl'
</style>