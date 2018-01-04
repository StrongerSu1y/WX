/*
	活动页
*/
const activity = resolve => require(['@/pages/activity/activity.vue'],resolve) // 活动页面路由控制
const actIndex = resolve => require(['@pages/activity/actIndex.vue'],resolve) // 活动首页

export default { //活动页面
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
	}]

}