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
	import header from '../header/header'
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
		mounted () {
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
				this.$ajax({
					url: '/alipay/getWapOrderInfoByAliPay',
					method: 'post',
					data: {
						cls: 14,
						return_url: window.location.protocol + '//' + window.location.host + '/m/index.html#/apply/result',
						outtradeno: this.$route.query.outtradeno
					}
				})
				.then((res) => {
					this.$refs.form.innerHTML = res.data
					if (document.forms && document.forms.length) {
						document.forms[0].submit()
					}
				})
				.catch((err) => {
					console.log(err)
				})
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