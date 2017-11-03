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
		<div class="remind-line">
			<img src="./remind_icon.png">
			<span class="text">此次杂志征订为7月~9月杂志（下学期发放）</span>
		</div>
		<!-- 杂志 -->
		<section v-if="cls === '1'" class="main-info">
			<span class="status">待付款</span>
			<p class="time">
				<span class="label-name">日<span class="visi-hidden">隐</span>期:</span>
				<span class="time-text">2017年8月1日</span>
				<span class="time-text">10:16:26</span>
			</p>
			<p class="order-id">
				<span class="label-name">订单号:</span>
				<span class="text">20170889685632</span>
			</p>
			<p class="postage">
				<span class="label-name">邮<span class="visi-hidden">隐</span>费:</span>
				<span class="text">+¥10</span>
			</p>
			<p class="pay">
				<span class="label-name">实付款:</span>
				<span class="text">¥300.00</span>
			</p>
			<div class="bottom-btns">
				<span class="button cancel">取消订单</span>
				<span class="button add-evaluate">追加评价</span>
				<span class="button pay" @click="goEvaluate()">去评价</span>
			</div>
		</section>
		<!-- 图书 -->
		<section v-if="cls === '2'" class="main-info">
			<span class="status">待付款</span>
			<p class="time">
				<span class="label-name">日<span class="visi-hidden">隐</span>期:</span>
				<span class="time-text">2017年8月1日</span>
				<span class="time-text">10:16:26</span>
			</p>
			<p class="order-id">
				<span class="label-name">订单号:</span>
				<span class="text">20170889685632</span>
			</p>
			<p class="price">
				<span class="label-name">总金额:</span>
				<span class="text">¥800.00</span>
			</p>
			<p class="postage">
				<span class="label-name">邮<span class="visi-hidden">隐</span>费:</span>
				<span class="text">+¥10</span>
			</p>
			<p class="postage">
				<span class="label-name">满<span class="visi-hidden">隐</span>减:</span>
				<span class="text">-¥100.00</span>
			</p>
			<p class="price">
				<span class="label-name">优惠券:</span>
				<span class="text">-¥100.00</span>
			</p>
			<p class="price">
				<span class="label-name">全单减:</span>
				<span class="text">-¥100.00</span>
			</p>
			<p class="price">
				<span class="label-name">全单折:</span>
				<span class="text">-¥100.00</span>
			</p>
			<p class="postage">
				<span class="label-name">积<span class="visi-hidden">隐</span>分:</span>
				<span class="text">-¥100.00</span>
			</p>
			<p class="pay">
				<span class="label-name">实付款:</span>
				<span class="text">¥310.00</span>
			</p>
			<div class="bottom-btns">
				<span class="button cancel">取消订单</span>
				<span class="button refund" @click.prevent.stop="goRefund()">申请退款</span>
				<span class="button pay" @click="goEvaluate()">去评价</span>
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
					<span class="name">张三</span>
					<span class="mobile">18768188566</span>
				</p>
				<p class="address">
					浙江省杭州市西湖区翠苑第一小学（翠苑校区）1年级1班
				</p>
			</div>
		</section>
		<!-- 留言内容 -->
		<section class="message-board">留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容留言内容</section>
		<!-- 列表 -->
		<v-list v-if="listData.length" :listData="listData" :cls="cls" @showActivityView="showActivityView"></v-list>
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
			<v-view v-if="showView" :listData="listData" :viewIndex="viewIndex" @hideView="hideView"></v-view>
		</transition>
	</div>
</template>

<script>
	import view from './view/view'
	let listData = [{
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png')
	}, {
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png')
	}, {
		name: '刊物名称刊物名称刊物名称刊物名称刊...',
		count: 2,
		price: '100.00',
		logo: require('./back_icon.png')
	}]
	import list from './list/list'
	import recommend from '@/pages/book/recommend/recommend'
	export default {
		data () {
			return {
				listData: listData,
				recommendList: [],
				// 类型
				cls: this.$route.query.cls || '1',
				// 显示按钮
				showFixedIcon: true,
				maskShow: false,
				showServiceBox: false,
				showView: false,
				viewIndex: 0
			}
		},
		mounted () {
		},
		methods: {
			// 返回上一页
			goBack () {
				this.$router.goBack()
			},
			// 去评价
			goEvaluate () {
				this.$router.push({
					path: 'evaluate'
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