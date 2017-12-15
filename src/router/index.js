import Vue from 'vue'
import Router from 'vue-router'
// 登录注册
const login = resolve => require(['@/pages/login/login.vue'], resolve)
const recovery = resolve => require(['@/pages/login/recovery.vue'], resolve)
const register = resolve => require(['@/pages/login/register.vue'], resolve)
const reset = resolve => require(['@/pages/login/reset.vue'], resolve)
const loginHome = resolve => require(['@/pages/login/home.vue'], resolve)
// 分享详情
const detail = resolve => require(['@/components/detail/detail.vue'], resolve)
const info = resolve => require(['@/components/detail/info/info.vue'], resolve)
const address = resolve => require(['@/components/detail/address/address.vue'], resolve)
const periodicalDetail = resolve => require(['@/components/periodical/periodical_detail.vue'], resolve)
const activityDetail = resolve => require(['@/components/activity/detail/detail.vue'], resolve)
const trainDetail = resolve => require(['@/components/train/detail/detail.vue'], resolve)
const choose = resolve => require(['@/components/apply/choose/choose.vue'], resolve)
const contracts = resolve => require(['@/components/apply/contracts/contracts.vue'], resolve)
const pay = resolve => require(['@/components/apply/pay/pay.vue'], resolve)
const result = resolve => require(['@/components/apply/result/result.vue'], resolve)
const realname = resolve => require(['@/components/apply/contracts/realname.vue'], resolve)
const apply = resolve => require(['@/components/apply/apply.vue'], resolve)
const view = resolve => require(['@/components/common/view/view.vue'], resolve)
const index = resolve => require(['@/pages/index/index.vue'], resolve)
// 刊物征订
const periodicalOrding = resolve => require(['@/components/periodical-ording/index.vue'], resolve)
const periodicalOrdingOther = resolve => require(['@/components/periodical-ording/other.vue'], resolve)
const periodicalOrdingHome = resolve => require(['@/components/periodical-ording/home/home.vue'], resolve)
const periodicalOrdingOrder = resolve => require(['@/components/periodical-ording/order/order.vue'], resolve)
const periodicalOrdingMain = resolve => require(['@/components/periodical-ording/order/main.vue'], resolve)
const periodicalOrdingLeave = resolve => require(['@/components/periodical-ording/leave/leave.vue'], resolve)
const periodicalOrdingAddress = resolve => require(['@/components/periodical-ording/address/address.vue'], resolve)
const periodicalOrdingDetail = resolve => require(['@/components/periodical-ording/detail/detail.vue'], resolve)
// 广东深圳
const periodicalOrdingOther1 = resolve => require(['@/components/periodical-ording/other1.vue'], resolve)
// 搜索
const search = resolve => require(['@/pages/search/search.vue'], resolve)
const searchIndex = resolve => require(['@/pages/search/index.vue'], resolve)
const searchResult = resolve => require(['@/pages/search/result/result.vue'], resolve)
// 微书城
const book = resolve => require(['@/pages/book/book.vue'], resolve) // 路由控制页面
const bookIndex = resolve => require(['@/pages/book/index.vue'], resolve) // 微书城首页
const bookSearch = resolve => require(['@/pages/book/search/search.vue'], resolve)
const bookSingle = resolve => require(['@/pages/book/single/single.vue'], resolve)
const bookDetail = resolve => require(['@/pages/book/detail/index.vue'], resolve)
// 圈子
// import circle from '@/pages/circle/circle'
// import circleIndex from '@/pages/circle/index'

// 我的
const mineOrder = resolve => require(['@/pages/mine/order/periodical/periodical.vue'], resolve) // 订单列表
const mineOrderDetail = resolve => require(['@/pages/mine/order/detail/detail.vue'], resolve) // 订单详情
const mineOrderEvaluate = resolve => require(['@/pages/mine/order/evaluate/evaluate.vue'], resolve) // 订单评价
const mineOrderEvaluateSingle = resolve => require(['@/pages/mine/order/evaluate/single.vue'], resolve) // 订单单条评价
const mineOrderEvaluateResult = resolve => require(['@/pages/mine/order/evaluate/result.vue'], resolve) // 订单评价结果
const mineOrderRefund = resolve => require(['@/pages/mine/order/refund/refund.vue'], resolve) // 订单申请退款
const mineOrderRefundSingle = resolve => require(['@/pages/mine/order/refund/single.vue'], resolve) // 订单申请退款
const mineOrderActivitySingle = resolve => require(['@/pages/mine/order/refund/activity.vue'], resolve) // 订单申请退款
const minePrivate = resolve => require(['@/pages/mine/private/private.vue'], resolve) // 我的私信
const mineFocus = resolve => require(['@/pages/mine/private/focus.vue'], resolve) // 我的私信
const mineCoupon = resolve => require(['@/pages/mine/private/coupon.vue'], resolve) // 我的领券中心
const mineChildren = resolve => require(['@/pages/mine/children/children.vue'], resolve) // 我的孩子管理
const mineChildrenEdit = resolve => require(['@/pages/mine/children/edit/edit.vue'], resolve) // 我的孩子编辑
const mineAddress = resolve => require(['@/pages/mine/address/index.vue'], resolve) // 我的地址管理
const mineAddressEdit = resolve => require(['@/pages/mine/address/address.vue'], resolve) // 我的地址编辑
const mineCollect = resolve => require(['@/pages/mine/content/collect/collect.vue'], resolve) // 我的收藏
const mineIntegral = resolve => require(['@/pages/mine/content/integral/integral.vue'], resolve) // 我的收藏
const mineActivity = resolve => require(['@/pages/mine/content/activity/activity.vue'], resolve) // 我的活动
const mineActivityEvaluate = resolve => require(['@/pages/mine/content/activity/evaluate.vue'], resolve) // 我的活动评价
const mineTrain = resolve => require(['@/pages/mine/content/train/train.vue'], resolve) // 我的活动
const mineTrainEvaluate = resolve => require(['@/pages/mine/content/train/evaluate.vue'], resolve) // 我的活动评价
const mineGroup = resolve => require(['@/pages/mine/content/group/group.vue'], resolve) // 我的团购
const mineDiscount = resolve => require(['@/pages/mine/content/discount/discount.vue'], resolve) // 我的优惠券
const mineCircle = resolve => require(['@/pages/mine/content/circle/circle.vue'], resolve) // 我的帖子
const mineSetting = resolve => require(['@/pages/mine/setting/index.vue'], resolve) // 我的页面-设置
const mineSettingUsername = resolve => require(['@/pages/mine/setting/username/username.vue'], resolve) // 我的页面-设置
const mineSettingFeedback = resolve => require(['@/pages/mine/setting/feedback/feedback.vue'], resolve) // 我的页面-反馈
const mineSettingAbout = resolve => require(['@/pages/mine/setting/about/about.vue'], resolve) // 我的页面-关于我们
const mineSettingHelp = resolve => require(['@/pages/mine/setting/help/help.vue'], resolve) // 我的页面-使用帮助
const mineSettingHelpDetail = resolve => require(['@/pages/mine/setting/help/detail.vue'], resolve) // 我的页面-使用帮助
const mineMessage = resolve => require(['@/pages/mine/message/index.vue'], resolve) // 我的页面-消息中心
const mineMessageSystem = resolve => require(['@/pages/mine/message/system/system.vue'], resolve) // 我的页面-消息中心
const mineMessageOrder = resolve => require(['@/pages/mine/message/order/order.vue'], resolve) // 我的页面-订单中心
const mineMessageFunction = resolve => require(['@/pages/mine/message/function/function.vue'], resolve) // 我的页面-功能中心

// 购物车
const shopcatIndex = resolve => require(['@/pages/shopcat/home.vue'], resolve) // 购物车首页
const shopcatOrder = resolve => require(['@/pages/shopcat/order/order.vue'], resolve) // 购物车首页
const shopcatOrderMain = resolve => require(['@/pages/shopcat/order/main.vue'], resolve) // 购物车首页
const shopcatCoupon = resolve => require(['@/pages/shopcat/coupon/coupon.vue'], resolve) // 购物车优惠券
const shopcatAddress = resolve => require(['@/pages/shopcat/address/index.vue'], resolve) // 购物车地址列表
const shopcatAddressEdit = resolve => require(['@/pages/shopcat/address/address.vue'], resolve) // 购物车地址添加
const shopcatOrderLeave = resolve => require(['@/pages/shopcat/leave/leave.vue'], resolve) // 购物车留言

// 活动页面
// import doubleEleven from '@/components/periodical-ording/double-eleven/index'
const doubleTwelve = resolve => require(['@/components/periodical-ording/double-twelve/index.vue'], resolve)
const newYear = resolve => require(['@/components/periodical-ording/newyear/index.vue'], resolve)

// 页面间切换动画
const pageTransition = resolve => require(['@/pages/pageTransition.vue'], resolve)

// match
const match = resolve => require(['@/pages/match/index.vue'], resolve)

Router.prototype.goBack = function () {
	this.isBack = true
	// window.history.go(-1)
	this.go(-1)
}

// 初始化为 false
Router.isBack = false

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		component: pageTransition,
		children: [{ // 登陆
			path: '/login',
			component: loginHome,
			children: [{ // 登陆
				path: '/',
				name: 'login',
				component: login
			}, { // 重设密码
				path: 'recovery',
				name: 'recovery',
				component: recovery
			}, { // 注册
				path: 'register',
				name: 'register',
				component: register
			}, { // 新密码
				path: 'reset',
				name: 'reset',
				component: reset
			}]
		}, {
			path: '/apply',
			component: apply,
			children: [{ // 选择套餐
				path: '/',
				name: 'apply',
				component: choose,
				meta: {
					keepAlive: true // 需要缓存
				}
			}, { // 联系人
				path: 'contracts',
				component: contracts,
				meta: {
					keepAlive: true // 需要缓存
				}
			}, { // 实名
				path: 'realname',
				component: realname
			}]
		}, { // 支付
			path: '/pay',
			component: pay
		}, { // 支付结果
			path: '/result',
			component: result
		}, { // 图书信息
			path: '/info',
			name: 'info',
			component: info
		}, { // 详情
			path: '/detail',
			name: 'detail',
			component: detail
		}, { // 书刊详情
			path: '/periodical',
			component: periodicalDetail
		}, { // 地址
			path: '/address',
			component: address
		}, { // 活动详情
			path: '/activity/detail',
			component: activityDetail
		}, { // 培训详情
			path: '/train/detail',
			component: trainDetail
		}, {
			path: '/view',
			component: view
		}, {
			path: '/',
			component: index,
			meta: {
				before: true
			}
		}, { // 刊物征订
			path: '/peridoical/ording',
			component: periodicalOrding,
			children: [{
				path: '/',
				component: periodicalOrdingHome,
				meta: {
					keepAlive: true // 需要缓存
				}
			}, {
				path: 'detail',
				component: periodicalOrdingDetail,
				meta: {
					keepAlive: false // 需要缓存
				}
			}]
		}, { // 刊物征订新加
			path: '/peridoical/other',
			component: periodicalOrdingOther,
			children: [{
				path: '/',
				component: periodicalOrdingHome,
				meta: {
					keepAlive: true // 需要缓存
				}
			}, {
				path: 'detail',
				component: periodicalOrdingDetail,
				meta: {
					keepAlive: false // 需要缓存
				}
			}]
		}, { // 刊物征订新加广东深圳
			path: '/periodical/other1',
			component: periodicalOrdingOther1,
			children: [{
				path: '/',
				component: periodicalOrdingHome,
				meta: {
					keepAlive: true // 需要缓存
				}
			}, {
				path: 'detail',
				component: periodicalOrdingDetail,
				meta: {
					keepAlive: false // 需要缓存
				}
			}]
		}, { // 刊物下单
			path: '/periodical/order',
			component: periodicalOrdingOrder,
			children: [{
				path: '/',
				component: periodicalOrdingMain,
				meta: {
					keepAlive: true
				}
			}, {
				path: 'leave',
				component: periodicalOrdingLeave,
				meta: {
					keepAlive: true
				}
			}, {
				path: 'address',
				component: periodicalOrdingAddress,
				meta: {
					keepAlive: true
				}
			}]
		}, { // 搜索
			path: '/search',
			component: search,
			children: [{
				path: '/',
				component: searchIndex,
				meta: {
					keepAlive: true
				}
			}, {
				path: 'result:data',
				component: searchResult,
				meta: {
					keepAlive: false
				}
			}]
		}, { // 微书城
			path: '/book',
			component: book,
			children: [{
				path: '/',
				component: bookIndex,
				meta: {
					keepAlive: true,
					isBack: false,
					index: 0
				}
			}, {
				path: 'search',
				component: bookSearch,
				meta: {
					keepAlive: true,
					isBack: false,
					index: 1
				}
			}, {
				path: 'single',
				component: bookSingle,
				meta: {
					keepAlive: false,
					isBack: false,
					index: 2
				}
			}, {
				path: 'detail',
				component: bookDetail,
				meta: {
					keepAlive: false,
					isBack: false,
					index: 3
				}
			}]
		}, {
			path: '/mine/order',
			component: mineOrder
		}, {
			path: '/mine/order/detail',
			component: mineOrderDetail
		}, {
			path: '/mine/order/evaluate',
			component: mineOrderEvaluate
		}, {
			path: '/mine/order/evaluate/single',
			component: mineOrderEvaluateSingle
		}, {
			path: '/mine/order/evaluate/result',
			component: mineOrderEvaluateResult
		}, {
			path: '/mine/order/refund',
			component: mineOrderRefund
		}, {
			path: '/mine/order/refund/single',
			component: mineOrderRefundSingle
		}, {
			path: '/mine/order/refund/activity',
			component: mineOrderActivitySingle
		}, {
			path: '/mine/private',
			component: minePrivate
		}, {
			path: '/mine/focus',
			component: mineFocus
		}, {
			path: '/mine/coupon',
			component: mineCoupon
		}, {
			path: '/mine/children',
			component: mineChildren
		}, {
			path: '/mine/children/edit',
			component: mineChildrenEdit
		}, {
			path: '/mine/address',
			component: mineAddress
		}, {
			path: '/mine/address/edit',
			component: mineAddressEdit
		}, {
			path: '/mine/collect',
			component: mineCollect
		}, {
			path: '/mine/integral',
			component: mineIntegral
		}, {
			path: '/mine/activity',
			component: mineActivity
		}, {
			path: '/mine/activity/evaluate',
			component: mineActivityEvaluate
		}, {
			path: '/mine/train',
			component: mineTrain
		}, {
			path: '/mine/train/evaluate',
			component: mineTrainEvaluate
		}, {
			path: '/mine/group',
			component: mineGroup
		}, {
			path: '/mine/discount',
			component: mineDiscount
		}, {
			path: '/mine/circle',
			component: mineCircle
		}, {
			path: '/double-twelve',
			component: doubleTwelve
		}, {
			path: '/newyear',
			component: newYear
		}, {
			path: '/mine/setting',
			component: mineSetting
		}, {
			path: '/mine/setting/username',
			component: mineSettingUsername
		}, {
			path: '/mine/setting/feedback',
			component: mineSettingFeedback
		}, {
			path: '/mine/setting/about',
			component: mineSettingAbout
		}, {
			path: '/mine/setting/help/index',
			component: mineSettingHelp
		}, {
			path: '/mine/setting/help/detail',
			component: mineSettingHelpDetail
		}, {
			path: '/mine/message/index',
			component: mineMessage
		}, {
			path: '/mine/message/system',
			component: mineMessageSystem
		}, {
			path: '/mine/message/order',
			component: mineMessageOrder
		}, {
			path: '/mine/message/function',
			component: mineMessageFunction
		}, {
			path: '/match',
			component: match
		}, {
			path: '/shopcat/index',
			component: shopcatIndex
		}, {
			path: '/shopcat/order',
			component: shopcatOrder,
			children: [{
				path: '/',
				component: shopcatOrderMain,
				meta: {
					keepAlive: true
				}
			}, {
				path: 'coupon',
				component: shopcatCoupon
			}, {
				path: 'address',
				component: shopcatAddress
			}, {
				path: 'address/edit',
				component: shopcatAddressEdit
			}, {
				path: 'leave',
				component: shopcatOrderLeave
			}]
		}]
	}]
})
