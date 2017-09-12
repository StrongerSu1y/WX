import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'

let Obj = new Vue()

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = location.protocol + '//app.51weixiao.com/app-api/api'

// POST 传参序列化
axios.interceptors.request.use((config) => {
	if (config.method === 'post') {
		config.data = qs.stringify(config.data)
	}
	return config
}, (error) => {
	Obj.Toast.hide()
	Obj.Toast.fail({
		title: '错误的传参'
	})
	return Promise.reject(error)
})

// 返回状态判断
axios.interceptors.response.use((res) => {
	Obj.Toast.hide()
	if (!res.data.status) {
		return res
	}
	if (res.data.status !== '0') {
		Obj.Toast.fail({
			title: res.data.data.tip
		})
		return Promise.reject(res)
	}
	return res
}, (error) => {
	Obj.Toast.hide()
	Obj.Toast.fail({
		title: '网络异常'
	})
	return Promise.reject(error)
})

export function fetch (url, params, type) {
	return new Promise((resolve, reject) => {
		if (type && type === 'get') {
			axios.get(url)
				.then(response => {
					resolve(response)
				}, err => {
					reject(err)
				})
				.catch((error) => {
					reject(error)
				})
		} else {
			axios({
				method: 'post',
				data: params,
				url: url
			})
			.then(response => {
				resolve(response)
			}, err => {
				reject(err)
			})
			.catch((error) => {
				reject(error)
			})
		}
	})
}

export default {
	/*
		get 方法
	*/
	getAjax (url) {
		return fetch(url, {}, 'get')
	},
	/*
		post 方法
	*/
	postAjax (url) {
		return fetch(url, {})
	},
	/*
		用户登录
	*/
	Login (params) {
		return fetch('/user/login', params)
	},
	/*
		活动详情
	*/
	activityDetail (params) {
		return fetch('/activity/activityDetil', params)
	},
	/*
		票务列表
	*/
	listActivityTicket (params) {
		return fetch('/activityTicket/listActivityTicket', params)
	},
	/*
		生成订单
	*/
	activetradeConfirm (params) {
		return fetch('/activetrade/confirm', params)
	},
	/*
		实名制
	*/
	applyUserSave (params) {
		return fetch('/activetrade/applyUserSave', params)
	},
	/*
		支付宝支付
	*/
	getWapOrderInfoByAliPay (params) {
		return fetch('/alipay/getWapOrderInfoByAliPay', params)
	},
	/*
		微信支付
	*/
	getOfficialAccountPrepayInfo (params) {
		return fetch('/wxpay/getOfficialAccountPrepayInfo', params)
	},
	/*
		评论列表
	*/
	listComment (params) {
		return fetch('/activecomment/listComment', params)
	},
	/*
		删除评论
	*/
	activecommentDel (params) {
		return fetch('/activecomment/del', params)
	},
	/*
		获取验证码
	*/
	userGetPass (params) {
		return fetch('/user/get_pass', params)
	},
	/*
		提交验证码
	*/
	validateVerifyCode (params) {
		return fetch('/user/validate_verify_code', params)
	},
	/*
		注册获取验证码
	*/
	sendVerifyCode (params) {
		return fetch('/user/send_verify_code', params)
	},
	/*
		培训详情
	*/
	trainDetail (params) {
		return fetch('/train/trainDetail', params)
	},
	/*
		注册
	*/
	register (params) {
		return fetch('/user/register', params)
	}
}
