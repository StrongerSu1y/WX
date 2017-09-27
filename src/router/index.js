import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import recovery from '@/components/login/recovery'
import register from '@/components/login/register'
import reset from '@/components/login/reset'
import loginHome from '@/components/login/home'
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
import index from '@/components/index/index'
// 刊物征订
import peridoicalOrding from '@/components/periodical-ording/index'
import peridoicalOrdingHome from '@/components/periodical-ording/home/home'
import peridoicalOrdingOrder from '@/components/periodical-ording/order/order'
import peridoicalOrdingMain from '@/components/periodical-ording/order/main'
import peridoicalOrdingLeave from '@/components/periodical-ording/leave/leave'
import peridoicalOrdingAddress from '@/components/periodical-ording/address/address'
import peridoicalOrdingDetail from '@/components/periodical-ording/detail/detail'
// 搜索
import search from '@/pages/search/search'
import searchIndex from '@/pages/search/index'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{ // 登陆
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
		component: index
	}, { // 刊物征订
		path: '/peridoical/ording',
		component: peridoicalOrding,
		children: [{
			path: '/',
			component: peridoicalOrdingHome,
			meta: {
				keepAlive: true // 需要缓存
			}
		}, {
			path: 'detail',
			component: peridoicalOrdingDetail,
			meta: {
				keepAlive: false // 需要缓存
			}
		}]
	}, { // 刊物下单
		path: '/peridoical/order',
		component: peridoicalOrdingOrder,
		children: [{
			path: '/',
			component: peridoicalOrdingMain,
			meta: {
				keepAlive: true
			}
		}, {
			path: 'leave',
			component: peridoicalOrdingLeave,
			meta: {
				keepAlive: true
			}
		}, {
			path: 'address',
			component: peridoicalOrdingAddress,
			meta: {
				keepAlive: true
			}
		}]
	}, { // 搜索
		path: '/search',
		component: search,
		children: [{
			path: '/',
			component: searchIndex
		}]
	}]
})
