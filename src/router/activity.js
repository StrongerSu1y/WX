/*
	活动相关
*/
const activity = resolve => require(['@/pages/activity/activity.vue'], resolve) // 路由控制页面
const actIndex = resolve => require(['@/pages/activity/actIndex.vue'], resolve) // 活动首页
const actSearch = resolve => require(['@/pages/activity/search/search.vue'], resolve) // 活动搜索页
const actDetail = resolve => require(['@/pages/activity/detail/actdetail.vue'], resolve) // 活动详情页

export default {
	path: '/activity',
	component: activity,
	children: [{
		path: '/',
		component: actIndex,
		meta: {
			keepAlive: true,
			isBack: false,
			index: 0
		}
	}, {
		path: 'search',
		component: actSearch,
		meta: {
			keepAlive: true,
			isBack: false,
			index: 1
		}
	},{
		path: 'detail',
		component: actDetail,
		meta: {
			keepAlive: true,
			isBack: false,
			index: 2
		}
	}
	]
}