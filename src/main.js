// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import axios from 'axios'
// import qs from 'qs'
import Vuex from 'vuex'
import store from './vuex/store'
import VueLazyload from 'vue-lazyload'

require('animate.css/animate.min.css')

// 过滤器
import * as custom from './common/js/filter.js'
Object.keys(custom).forEach(key => {
	Vue.filter(key, custom[key])
})

Vue.use(VueLazyload, {
	preload: 1.3,
	loading: require('../static/imgs/loading.png'),
	listenEvents: ['scroll', 'resize', 'wheel', 'mousewheel', 'touchmove']
})

Vue.use(Vuex)
// import {getQueryString} from './common/js/date'

// let instance = axios.create()
// 配置参数
// axios.defaults.timeout = 5000
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置请求头
// axios.defaults.baseURL = 'http://192.168.0.231:8080/app-api/api'
Vue.prototype.Toast = new window.AuiToast()
Vue.prototype.Dialog = new window.AuiDialog()
// Vue.prototype.Host = location.protocol + '//192.168.0.231:8080'
Vue.prototype.Host = location.protocol + '//app.51weixiao.com'
let u = navigator.userAgent
Vue.prototype.isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
Vue.prototype.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
Vue.prototype.isIosQQ = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && /QQ/.test(u)
Vue.prototype.isWeixin = !!u.match(/MicroMessenger/i)
Vue.prototype.isWeibo = !!u.match(/weibo/)
Vue.prototype.isAndroidQQ = (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) && /QQ/.test(u)

// 接口
import api from './api/api.js'
Vue.prototype.$ajax = api

Vue.config.productionTip = false

// 操作router
let routerList = []
router.beforeEach((to, from, next) => {
	if (routerList.length && routerList.indexOf(to.name) === routerList.length - 1) {
		// 后退
		routerList.splice(routerList.length - 1, 1)
		to.meta.isBack = true
	} else {
		// 前进
		routerList.push(from.name || '/')
		to.meta.isBack = false
	}
	next()
})

// 暂时将用户id 设为 100095
// localStorage.setItem('userId', '100095')
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	data: {
		Bus: new Vue()
	},
	components: { App }
})
