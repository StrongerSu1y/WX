// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
// import {getQueryString} from './common/js/date'

// let instance = axios.create()
// 配置参数
// axios.defaults.timeout = 5000
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置请求头
// axios.defaults.baseURL = 'http://192.168.0.231:8080/app-api/api'
let proURL = location.protocol + '//app.51weixiao.com/app-api/api'

Vue.prototype.$ajax = axios.create({
	baseURL: proURL,
	timeout: 3000,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	transformRequest: [function (data) {
		data = qs.stringify(data)
		return data
	}]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})

