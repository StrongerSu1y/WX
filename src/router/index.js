import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login'
import recovery from '@/components/login/recovery'
import register from '@/components/login/register'
import detail from '@/components/detail/detail'
import info from '@/components/info/info'
import address from '@/components/address/address'
import periodicalDetail from '@/components/periodical/periodical_detail'
import filter from '@/components/periodical/filter'
import activityDetail from '@/components/detail/activity'
import choose from '@/components/apply/choose'
import contracts from '@/components/apply/contracts'
import pay from '@/components/apply/pay'
import result from '@/components/apply/result'
import realname from '@/components/apply/realname'

Vue.use(Router)

export default new Router({
	routes: [{ // 登陆
		path: '/login',
		name: 'login',
		component: login
	}, { // 重设密码
		path: '/recovery',
		name: 'recovery',
		component: recovery
	}, { // 注册
		path: '/register',
		name: 'register',
		component: register
	}, { // 图书信息
		path: '/info',
		name: 'info',
		component: info
	}, { // 详情
		path: '/',
		name: 'detail',
		component: detail
	}, { // 书刊详情
		path: '/periodical',
		component: periodicalDetail
	}, { // 地址
		path: '/address',
		component: address
	}, { // 筛选
		path: '/filter',
		component: filter
	}, { // 活动详情
		path: '/activity/detail',
		component: activityDetail
	}, { // 选择套餐
		path: '/apply/choose',
		component: choose
	}, { // 联系人
		path: '/apply/contracts',
		component: contracts
	}, { // 支付
		path: '/apply/pay',
		component: pay
	}, { // 支付结果
		path: '/apply/result',
		component: result
	}, { // 实名
		path: '/apply/realname',
		component: realname
	}]
})
