import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login/login'
import recovery from '@/pages/login/recovery'
import register from '@/pages/login/register'
import reset from '@/pages/login/reset'
import loginHome from '@/pages/login/home'
import detail from '@/components/detail/detail'
import info from '@/components/detail/info/info'
import address from '@/components/detail/address/address'
import periodicalDetail from '@/components/periodical/periodical_detail'
import activityDetail from '@/components/activity/detail/detail'
import trainDetail from '@/components/train/detail/detail'
import choose from '@/components/apply/choose/choose'
import contracts from '@/components/apply/contracts/contracts'
import pay from '@/components/apply/pay/pay'
import result from '@/components/apply/result/result'
import realname from '@/components/apply/contracts/realname'
import apply from '@/components/apply/apply'
import view from '@/components/common/view/view'
import index from '@/pages/index/index'
// 刊物征订
import periodicalOrding from '@/components/periodical-ording/index'
import periodicalOrdingOther from '@/components/periodical-ording/other'
import periodicalOrdingDoubleEleven from '@/components/periodical-ording/doubleEleven'
import periodicalOrdingHome from '@/components/periodical-ording/home/home'
import periodicalOrdingOrder from '@/components/periodical-ording/order/order'
import periodicalOrdingMain from '@/components/periodical-ording/order/main'
import periodicalOrdingLeave from '@/components/periodical-ording/leave/leave'
import periodicalOrdingAddress from '@/components/periodical-ording/address/address'
import periodicalOrdingDetail from '@/components/periodical-ording/detail/detail'
// 搜索
import search from '@/pages/search/search'
import searchIndex from '@/pages/search/index'
import searchResult from '@/pages/search/result/result'
// 微书城
import book from '@/pages/book/book'
import bookIndex from '@/pages/book/index'
import bookSearch from '@/pages/book/search/search'
import bookSingle from '@/pages/book/single/single'
import bookDetail from '@/pages/book/detail/index'
// 圈子
// import circle from '@/pages/circle/circle'
// import circleIndex from '@/pages/circle/index'

// 我的
import mineOrder from '@/pages/mine/order/periodical/periodical' // 订单列表
import mineOrderDetail from '@/pages/mine/order/detail/detail' // 订单详情
import mineOrderEvaluate from '@/pages/mine/order/evaluate/evaluate' // 订单评价
import mineOrderEvaluateSingle from '@/pages/mine/order/evaluate/single' // 订单单条评价
import mineOrderEvaluateResult from '@/pages/mine/order/evaluate/result' // 订单评价结果
import mineOrderRefund from '@/pages/mine/order/refund/refund' // 订单申请退款
import mineOrderRefundSingle from '@/pages/mine/order/refund/single' // 订单申请退款
import mineOrderActivitySingle from '@/pages/mine/order/refund/activity' // 订单申请退款
import minePrivate from '@/pages/mine/private/private' // 我的私信
import mineFocus from '@/pages/mine/private/focus' // 我的私信
import mineCoupon from '@/pages/mine/private/coupon' // 我的领券中心
import mineChildren from '@/pages/mine/children/children' // 我的孩子管理
import mineChildrenEdit from '@/pages/mine/children/edit/edit' // 我的孩子编辑
import mineAddress from '@/pages/mine/address/index' // 我的地址管理
import mineAddressEdit from '@/pages/mine/address/address' // 我的地址编辑
import mineCollect from '@/pages/mine/content/collect/collect' // 我的收藏
import mineIntegral from '@/pages/mine/content/integral/integral' // 我的收藏
import mineActivity from '@/pages/mine/content/activity/activity' // 我的活动
import mineActivityEvaluate from '@/pages/mine/content/activity/evaluate' // 我的活动评价
import mineTrain from '@/pages/mine/content/train/train' // 我的活动
import mineTrainEvaluate from '@/pages/mine/content/train/evaluate' // 我的活动评价
import mineGroup from '@/pages/mine/content/group/group' // 我的团购
import mineDiscount from '@/pages/mine/content/discount/discount' // 我的优惠券
import mineCircle from '@/pages/mine/content/circle/circle' // 我的帖子
import mineSetting from '@/pages/mine/setting/index' // 我的页面-设置
import mineSettingUsername from '@/pages/mine/setting/username/username' // 我的页面-设置
import mineSettingFeedback from '@/pages/mine/setting/feedback/feedback' // 我的页面-反馈
import mineSettingAbout from '@/pages/mine/setting/about/about' // 我的页面-关于我们
import mineSettingHelp from '@/pages/mine/setting/help/help' // 我的页面-使用帮助
import mineSettingHelpDetail from '@/pages/mine/setting/help/detail' // 我的页面-使用帮助
import mineMessage from '@/pages/mine/message/index' // 我的页面-消息中心
import mineMessageSystem from '@/pages/mine/message/system/system' // 我的页面-消息中心
import mineMessageOrder from '@/pages/mine/message/order/order' // 我的页面-订单中心
import mineMessageFunction from '@/pages/mine/message/function/function' // 我的页面-功能中心

// 购物车
import shopcatIndex from '@/pages/shopcat/home' // 购物车首页
import shopcatOrder from '@/pages/shopcat/order/order' // 购物车首页
import shopcatOrderMain from '@/pages/shopcat/order/main' // 购物车首页
import shopcatCoupon from '@/pages/shopcat/coupon/coupon' // 购物车优惠券

// 双十一活动页面
import doubleEleven from '@/components/periodical-ording/double-eleven/index'

// 页面间切换动画
import pageTransition from '@/pages/pageTransition'

// match
import match from '@/pages/match/index'

Router.prototype.goBack = function () {
	this.isBack = true
	// window.history.go(-1)
	this.go(-1)
}

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
			path: '/index',
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
		}, { // 刊物征订双十一
			path: '/periodical/double-eleven',
			component: periodicalOrdingDoubleEleven,
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
				component: bookIndex
			}, {
				path: 'search',
				component: bookSearch
			}, {
				path: 'single',
				component: bookSingle
			}, {
				path: 'detail',
				component: bookDetail
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
			path: '/double-eleven',
			component: doubleEleven
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
			}]
		}]
	}]
})
