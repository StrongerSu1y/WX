<template>
	<div class="shopcat-order-main">
		<!-- 头部 -->
		<section class="shopcat-order-top">
			<div class="back-icon" @click="$router.goBack()">
				<img :src="backIconSrc">
			</div>
			<p class="title">订单结算</p>
		</section>
		<section class="header">
			<div class="top-border border-bg"></div>
			<div class="main">
				<div class="left-part" v-if="hasDefaultAddress">
					<div class="address-box">
						<div class="contract">
							<span class="name">{{ address.name }}</span>
							<span class="mobile">{{ address.mobile }}</span>
						</div>
						<div class="address-text">{{ address | getFullAddress }}</div>
					</div>
				</div>
				<div class="left-part" v-if="!hasDefaultAddress">
					<div class="no-address">
						请前往设置您的收货地址
					</div>
				</div>
				<div class="right-arrow" @click="modifyAddress('order/address')">
					<img :src="rightArrowSrc">
				</div>
			</div>
			<div class="bottom-border border-bg"></div>
		</section>
		<!-- 商品内容 -->
		<section class="product">
			<p class="title">商品</p>
			<ul class="list">
				<li v-for="(item, index) in listData" class="list-item" :class="{ underline: true }">
					<div class="left-media">
						<img v-lazy="item.logo">
					</div>
					<div class="right-desc">
						<div class="box">
							<p class="name">{{ item.name }}</p>
							<p class="price">￥<span class="big">{{ item.last_fee | getInteger }}</span>{{ item.last_fee | getFixed1 }}</p>
							<!-- 商品有积分 -->
							<div class="integral">
								<img :src="integralIconSrc">
								<span class="text">10积分=0.01元 最多可用200积分</span>
							</div>
							<span class="dot">{{ item.number }}</span>
						</div>
					</div>
				</li>
			</ul>
		</section>
		<!-- 优惠券 -->
		<section class="coupon">
			<div class="left-part">
				<img :src="couponIconSrc">
			</div>
			<div class="right-part">
				<p class="title">优惠券</p>
				<div class="info" @click="openItem('order/coupon')">
					<span v-if="!couponPrice" class="desc red">{{ couponNum }}张优惠券可使用</span>
					<span v-if="couponPrice" class="desc">已使用优惠券</span>
					<span v-if="!couponNum" class="desc">暂无可使用优惠券</span>
					<span v-if="!couponPrice" class="select-text">未选中</span>
					<span v-if="couponPrice" class="select-text">{{ couponPrice }}</span>
					<div class="img">
						<img :src="rightArrowSrc">
					</div>
				</div>
			</div>
		</section>
		<!-- 积分 -->
		<section class="integral">
			<div class="left-part">
				<img :src="integralIconSrc">
			</div>
			<div class="right-part">
				<p class="title">
					<span class="main">共1200积分</span>
					<span class="desc">(本单可使用550积分抵10元)</span>
				</p>
				<div class="info" @click="openItem('/mine/integral')">
					<span class="integral-text">选择使用积分</span>
					<div class="integral-img">
						<img :src="checkActiveSrc">
					</div>
				</div>
			</div>
		</section>
		<!-- 留言 -->
		<section class="message">
			<p class="title">订单留言</p>
			<p class="placeholder" @click="modifyAddress('order/leave')">{{ leaveText || '请点击输入留言内容'}}</p>
			<div class="right-arrow"  @click="modifyAddress('order/leave')">
				<img :src="rightArrowSrc">
			</div>
		</section>
		<!-- 数额 -->
		<section class="amount">
			<p class="price">
				<span class="title">商品金额</span>
				<span class="num">￥<span class="big">{{ nowSum | getInteger }}</span>{{ nowSum | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">运费</span>
				<span class="num">+<span class="big">{{ carriage | getInteger }}</span>{{ carriage | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">积分</span>
				<span class="num">-<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">满减券</span>
				<span class="num">-<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">折扣券</span>
				<span class="num">-<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
			<p class="price">
				<span class="title">代金券</span>
				<span class="num">-<span class="big">{{ discount | getInteger }}</span>{{ discount | getFixed1 }}</span>
			</p>
		</section>
		<footer class="bottom">
			<div class="left-part">
				<p>
					<span class="title">实付款 </span>
					<span class="price">￥<span class="big">{{ totalSum | getInteger }}</span>{{ totalSum | getFixed1 }}</span>
				</p>
			</div>
			<div class="right-button" @click="doSubmit()">提交订单</div>
		</footer>
	</div>
</template>

<script>
	import { getWithCommaString } from '@/common/js/common.js'
	export default {
		name: 'order',
		data () {
			return {
				backIconSrc: require('@/common/icons/back_icon.png'),
				rightArrowSrc: require('@/common/icons/right_arrow.png'),
				integralIconSrc: require('@/common/icons/integral_icon.png'),
				couponIconSrc: require('@/common/icons/coupon_icon.png'),
				checkActiveSrc: require('@/common/icons/check_active.png'),
				hasDefaultAddress: false,
				listData: [],
				nowSum: 0,
				leaveText: '',
				defaultAddressChange: false,
				isDoubleEleven: true,
				couponPrice: '',
				couponNum: 3
			}
		},
		computed: {
			// 优惠金额
			discount () {
				let end = new Date('2017-11-12 00:00:00.000').getTime()
				let nowTime = new Date().getTime()
				if (nowTime >= end) {
					return 0
				}
				if (!this.isDoubleEleven) {
					return 0
				}
				if (parseFloat(this.nowSum) < 50) {
					return 0
				} else if (parseFloat(this.nowSum) < 100) {
					return 5
				} else if (parseFloat(this.nowSum) < 200) {
					return 15
				} else {
					return 40
				}
			},
			// 运费
			carriage () {
				return parseFloat(this.nowSum) >= 99 ? 0 : 10
			},
			totalSum () {
				return (parseFloat(this.nowSum) + parseFloat(this.carriage) - parseFloat(this.discount)).toFixed(1)
			},
			address () {
				let obj = {}
				if (!this.hasDefaultAddress) {
					return {
						cityArea: '',
						name: '',
						mobile: '',
						address: ''
					}
				}
				if (!this.defaultAddressChange) {
					obj = JSON.parse(localStorage.getItem('addressList'))[0]
				}
				// 监听过一次后重置
				this.defaultAddressChange = false
				obj = JSON.parse(localStorage.getItem('addressList'))[0]
				return obj
			}
		},
		created () {
			document.title = '订单结算'
			this.$root.Bus.$on('getCoupon', (value, event) => {
				console.log(this.coupon)
				this.couponPrice = value
			})
			this.hasDefaultAddress = (localStorage.getItem('addressList') && JSON.parse(localStorage.getItem('addressList')).length)
			// 获取数据
			this.listData = JSON.parse(this.$route.query.selectedData) || []
			this.nowSum = this.$route.query.nowSum || 0
			console.log(this.$route.query.entrance)
			// 判断是否为双十一
			if (this.$route.query.entrance && this.$route.query.entrance === 'doubleEleven') {
				this.isDoubleEleven = true
			}
		},
		mounted () {
			// 首先清空购物车，双十一不用清空
			if (!this.isDoubleEleven) {
				this.clearShopcat()
			}
			// 监听更新
			this.$root.Bus.$on('updateAddress', obj => {
				this.defaultAddressChange = true
				this.hasDefaultAddress = (localStorage.getItem('addressList') && JSON.parse(localStorage.getItem('addressList')).length)
			})
			this.$root.Bus.$on('leaveTextChange', val => {
				this.leaveTextChange(val)
			})
		},
		methods: {
			// 打开页面
			openItem (path) {
				this.$router.push({
					path: path
				})
			},
			modifyAddress (path) {
				this.$router.push({
					path: path
				})
			},
			// 修改留言内容
			leaveTextChange (val) {
				this.leaveText = val
			},
			// 提交订单
			doSubmit () {
				if (!this.hasDefaultAddress) {
					this.Toast.warning({
						title: '请先设置收货地址'
					})
					return
				}
				this.Toast.loading({
					title: '提交中...'
				})
				if (this.isDoubleEleven) {
					this.submitDoubleElevenTrage()
				} else {
					this.submitByShopcat()
				}
			},
			// 根据数量添加进购物车
			addItemsToShopcat (item, url) {
				let arr = []
				for (var i = 0; i < item.number; i++) {
					arr.push(this.$ajax.postAjax(`${url}`, {
						_uid: localStorage.getItem('userId'),
						id: item.id,
						cls: '2',
						code: i
					}))
				}
				return arr
			},
			// 清空购物车
			clearShopcat () {
				this.$ajax.shopcatList().then(res => {
					if (res.data.data.item_list && res.data.data.item_list.length) {
						// 设置 history
						localStorage.setItem('historyLength', parseInt(localStorage.getItem('historyLength')) - 1)
						this.$ajax.shopcatDel(getWithCommaString(res.data.data.item_list, 'id'))
					}
				}, err => {
					console.log(err)
				})
			},
			// 获取返回数据
			getListResult (arr) {
				let result = arr[arr.length - 1].data.data.item_list
				for (let i = arr.length - 1; i >= 0; i--) {
					if (arr[i].data.data.item_list.length > result.length) {
						result = arr[i].data.data.item_list
					}
				}
				return result
			},
			// 获取数量 promise 数组
			getQuantityPromiseArr (result, arr) {
				let promiseArr = []
				let host = this.Host
				let _urlUpdate = `${host}/api/shop_cart/update`
				let that = this
				for (let i = 0; i < arr.length; i++) {
					for (let j = 0; j < result.length; j++) {
						if (arr[i].id === result[j].sid) {
							arr[i].item_ids = result[j].id
							promiseArr.push(that.$ajax.postAjax(`${_urlUpdate}`, arr[i]))
						}
					}
				}
				return promiseArr
			},
			// 提交双十一订单
			submitDoubleElevenTrage () {
				let params = {}
				params.uid = localStorage.getItem('userId')
				params.items = this.listData.map(item => {
					return {
						item_id: item.id,
						quantity: item.number.toString()
					}
				})
				params.addressId = this.address.id
				params.remark = this.leaveText
				console.log(params)
				setTimeout(() => {
					// 调用提交订单接口
					this.$ajax.doubleEleven(params).then(res => {
						let data = res.data
						// 下一个页面需要的数据
						let fee = parseFloat(data.total_fee).toFixed(1)
						let outtradeno = data.no
						let cls = '2'
						let protocol = window.location.protocol
						let host = window.location.host
						let href = ''
						if (this.isDoubleEleven) {
							href = `${protocol}//${host}/shopcat/double-eleven`
						} else {
							href = `${protocol}//${host}/shopcat/ording`
						}
						window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&outtradeno=${outtradeno}&href=${href}`
					}, err => {
						console.log(err)
					})
				}, 300)
			},
			// 不是双十一活动的话，通过购物车提交
			submitByShopcat () {
				// 暂不用
				let firstPromiseArr = []
				let quantityParamsArr = []
				this.listData.forEach((item, index) => {
					let _uid = localStorage.getItem('userId') // 用户 id
					let host = this.Host // 接口地址
					let _urlSave = `${host}/api/shop_cart/save`
					firstPromiseArr.push(this.$ajax.postAjax(`${_urlSave}`, {
						_uid: _uid,
						id: item.id,
						cls: '2'
					}))
					if (item.number > 1) {
						quantityParamsArr.push({
							_uid: _uid,
							id: item.id,
							cls: '2',
							quantity: item.number
						})
					}
				})
				let _itemIds = ''
				let _addressId = this.address.id
				let _quantity = 0
				Promise.all(firstPromiseArr).then(values => {
					// 取出最后完全返回数据
					let _result = this.getListResult(values)
					let quantityPromiseArr = this.getQuantityPromiseArr(_result, quantityParamsArr)
					Promise.all(quantityPromiseArr).then(res => {
						// 获取购物车列表
						this.$ajax.shopcatList().then(res => {
							console.log(res.data.data.item_list.length)
							// 计算总数
							res.data.data.item_list.forEach(item => {
								console.log('quantity: ' + parseInt(item.quantity))
								_quantity += parseInt(item.quantity)
							})
							_itemIds = getWithCommaString(res.data.data.item_list, 'id')
							let params = {}
							params._uid = localStorage.getItem('userId')
							params.quantity = _quantity
							params.item_ids = _itemIds
							params.cls = '2'
							params.address_id = _addressId
							params.child_id = ''
							params.is_use_quantity = ''
							params.remark = this.leaveText
							// 调用提交订单接口
							this.$ajax.tradeConfirm(params).then(res => {
								let data = res.data
								// 下一个页面需要的数据
								let fee = (parseFloat(res.data.data.item_total_fee) + parseFloat(res.data.data.delivery_fee)).toFixed(1)
								let outtradeno = data.data.no
								let cls = '2'
								let protocol = window.location.protocol
								let host = window.location.host
								let href = ''
								if (this.isDoubleEleven) {
									href = `${protocol}//${host}/shopcat/double-eleven`
								} else {
									href = `${protocol}//${host}/shopcat/ording`
								}
								window.location.href = `${protocol}//${host}/pay?&cls=${cls}&fee=${fee}&outtradeno=${outtradeno}&href=${href}`
							}, err => {
								console.log(err)
							})
						}, err => {
							console.log(err)
						})
					})
				})
			}
		}
	}
</script>

<style lang="stylus" res="stylesheet/stylus">
	@import './order.styl'
</style>