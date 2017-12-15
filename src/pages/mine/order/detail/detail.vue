<template>
	<div class="mine-order-detail">
		<!-- 头部 -->
		<section class="mine-order-detail-top">
			<div class="back-icon" @click="goBack()">
				<img src="./back_icon.png">
			</div>
			<p class="title">订单详情</p>
		</section>
		<!-- 提醒 -->
		<div v-if="cls === '1'" class="remind-line">
			<img src="./remind_icon.png">
			<span class="text">此次杂志征订为7月~9月杂志（下学期发放）</span>
		</div>
		<!-- 杂志 -->
		<section v-if="cls === '1'" class="main-info">
			<span v-if="info.trade_status === '1'" class="status">待付款</span>
			<span v-if="info.trade_status === '12'" class="status">订单失效</span>
			<p class="time">
				<span class="label-name">日<span class="visi-hidden">隐</span>期:</span>
				<span class="time-text">{{ info.created_at }}</span>
				<!-- <span class="time-text">10:16:26</span> -->
			</p>
			<p class="order-id">
				<span class="label-name">订单号:</span>
				<span class="text">{{ info.no }}</span>
			</p>
			<p class="postage">
				<span class="label-name">邮<span class="visi-hidden">隐</span>费:</span>
				<span class="text">+¥{{ info.delivery_fee }}</span>
			</p>
			<p class="pay">
				<span class="label-name">实付款:</span>
				<span class="text">¥{{ info.total_fee }}</span>
			</p>
			<div class="bottom-btns">
				<span class="button cancel">取消订单</span>
				<span class="button add-evaluate">追加评价</span>
				<span class="button pay" @click="goEvaluate()">去评价</span>
			</div>
		</section>
		<!-- 图书 -->
		<section v-if="cls === '2'" class="main-info">
			<span v-if="info.trade_status === '1'" class="status">待付款</span>
			<span v-if="info.trade_status === '3'" class="status">发货中</span>
			<span v-if="info.trade_status === '12'" class="status">订单失效</span>
			<p class="time">
				<span class="label-name">日<span class="visi-hidden">隐</span>期:</span>
				<span class="time-text">{{ info.created_at }}</span>
				<!-- <span class="time-text">10:16:26</span> -->
			</p>
			<p class="order-id">
				<span class="label-name">订单号:</span>
				<span class="text">{{ info.no }}</span>
			</p>
			<p class="price">
				<span class="label-name">总金额:</span>
				<span class="text">¥{{ parseFloat(info.total_fee) + parseFloat(info.delivery_fee) }}</span>
			</p>
			<p class="postage">
				<span class="label-name">邮<span class="visi-hidden">隐</span>费:</span>
				<span class="text">+¥{{ info.delivery_fee }}</span>
			</p>
			<p class="postage">
				<span class="label-name">满<span class="visi-hidden">隐</span>减:</span>
				<span class="text">-¥0.00</span>
			</p>
			<p class="price">
				<span class="label-name">优惠券:</span>
				<span class="text">-¥0.00</span>
			</p>
			<p class="price">
				<span class="label-name">全单减:</span>
				<span class="text">-¥0.00</span>
			</p>
			<p class="price">
				<span class="label-name">全单折:</span>
				<span class="text">-¥0.00</span>
			</p>
			<p class="postage">
				<span class="label-name">积<span class="visi-hidden">隐</span>分:</span>
				<span class="text">-¥0.00</span>
			</p>
			<p class="pay">
				<span class="label-name">实付款:</span>
				<span class="text">¥{{ info.total_fee }}</span>
			</p>
			<!-- 待付款 -->
			<div v-if="info.trade_status === '1'" class="bottom-btns">
				<span class="button cancel">取消订单</span>
				<span class="button pay" @click="goPay()">去付款</span>
			</div>
			<!-- 已付款 -->
			<div v-if="info.trade_status === '2'" class="bottom-btns">
				<span class="button refund" @click.prevent.stop="goRefund()">申请退款</span>
			</div>
			<!-- 已发货 -->
			<div v-if="info.trade_status === '3'" class="bottom-btns">
				<span class="button refund" @click.prevent.stop="goRefund()">确认收货</span>
			</div>
		</section>
		<!-- 活动 -->
		<section v-if="cls === '13'" class="main-info">
			<span class="status">待付款</span>
			<p class="time">
				<span class="label-name">订单日期:</span>
				<span class="time-text">2017年8月1日</span>
				<span class="time-text">10:16:26</span>
			</p>
			<p class="order-id">
				<span class="label-name">订单号码:</span>
				<span class="text">20170889685632</span>
			</p>
			<p class="postage">
				<span class="label-name">活动名称:</span>
				<span class="text activity">活动名称活动名称活动名称活动名称活动名称活动名称活动名称活动名称</span>
			</p>
			<p class="pay">
				<span class="label-name">活动时间:</span>
				<span class="text">¥300.00</span>
			</p>
			<p class="pay">
				<span class="label-name">全部金额:</span>
				<span class="text">¥300.00</span>
			</p>
			<p class="pay">
				<span class="label-name">满减金额:</span>
				<span class="text">¥300.00</span>
			</p>
			<p class="pay">
				<span class="label-name">团购金额:</span>
				<span class="text">¥300.00</span>
			</p>
			<p class="pay">
				<span class="label-name">实付金额:</span>
				<span class="text">¥300.00</span>
			</p>
			<div class="bottom-btns">
				<span class="button cancel">取消订单</span>
				<span class="button add-evaluate">追加评价</span>
				<span class="button pay" @click="goEvaluate()">去评价</span>
			</div>
		</section>
		<!-- 地址 -->
		<section class="address-part">
			<div class="left-media">
				<img src="./pos_icon.png">
			</div>
			<div class="right-text">
				<p v-if="cls === '1' || cls === '2'" class="name-mobile">
					<span class="name">{{ info.user_nick_name }}</span>
					<span class="mobile">{{ info.address_mobile }}</span>
				</p>
				<p class="address">
					{{ info.address_province_name }}{{ info.address_city_name }}{{ info.address_region_name }}{{ info.address_address }}
				</p>
			</div>
		</section>
		<!-- 留言内容 -->
		<section v-if="info.user_remark" class="message-board">{{ info.user_remark }}</section>
		<!-- 列表 -->
		<v-list :listData="info.itemList" :cls="cls" @showActivityView="showActivityView"></v-list>
		<!-- 联系方式(活动) -->
		<section v-if="cls === '13'" class="activity-service">
			<p class="tel">
				<span class="label-name">活动举办方电话</span>
				<span class="text">400-847-0068</span>
				<img src="./tel_icon.png">
			</p>
			<p class="time">
				<span class="label-name">工作时间</span>
				<span class="text">周一至周五 09:00~17:00</span>
			</p>
		</section>
		<!-- 猜您喜欢 -->
		<v-recommend :recommendList="recommendList"></v-recommend>
		<!-- 滑到顶部按钮 -->
		<section v-if="showFixedIcon" class="other-buttons">
			<img src="./to_top_icon.png">
			<img src="./service_icon.png" @click="showService()">
		</section>
		<!-- 遮罩层 -->
		<section v-if="maskShow" class="mask" @click="cancelService()">
			<transition enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
				<div v-if="showServiceBox" class="bottom-box">
					<p>联系客服</p>
					<p>400-847-0068</p>
					<p>工作时间：周一至周五早10点至晚5点</p>
					<div class="call-bar bar" @click.stop="doCall()">拨打电话<a ref="tel" href="tel:4008470068"></a></div>
					<div class="cancel-bar bar" @click="cancelService()">取消</div>
				</div>
			</transition>
		</section>
		<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
			<v-view v-if="showView" :listData="info.itemList" :viewIndex="viewIndex" @hideView="hideView"></v-view>
		</transition>
	</div>
</template>

<script>
	import view from './view/view'
	import list from './list/list'
	import recommend from '@/pages/book/recommend/recommend'
	export default {
		data () {
			return {
				// 猜您喜欢
				recommendList: [],
				// 类型
				cls: this.$route.query.cls || '1',
				// 显示按钮
				showFixedIcon: true,
				maskShow: false,
				showServiceBox: false,
				showView: false,
				viewIndex: 0,
				// 信息
				info: {}
			}
		},
		computed: {
			params () {
				let params = {}
				params.id = this.$route.query.id
				params.cls = this.$route.query.cls
				return params
			}
		},
		created () {
			// 加载数据
			this.loadData()
		},
		mounted () {
		},
		methods: {
			// 加载数据
			loadData () {
				this.$ajax.tradeDetail(this.params).then(res => {
					console.log(res)
					this.info = res.data.bookMagazineView
					this.recommendList = res.data.recommendList
				}, err => {
					console.log(err)
				})
			},
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 去评价
			goEvaluate () {
				this.$router.push({
					path: 'evaluate',
					query: this.$route.query
				})
			},
			// 申请退款
			goRefund () {
				this.$router.push({
					path: 'refund'
				})
			},
			// 联系客服
			showService () {
				this.maskShow = true
				setTimeout(() => {
					this.showServiceBox = true
				}, 10)
			},
			// 取消
			cancelService () {
				this.showServiceBox = false
				setTimeout(() => {
					this.maskShow = false
				}, 150)
			},
			// 拨打电话
			doCall () {
				this.$refs.tel.click()
			},
			// 显示活动二维码
			showActivityView (index) {
				this.viewIndex = index
				this.showView = true
			},
			// 隐藏活动二维码
			hideView () {
				this.showView = false
			},
			// 去付款
			goPay () {
				this.$router.push({
					path: '/pay',
					query: {
						outtradeno: this.info.no,
						fee: this.info.total_fee,
						cls: this.info.cls
					}
				})
			}
		},
		components: {
			'v-list': list,
			'v-recommend': recommend,
			'v-view': view
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import './detail.styl'
</style>