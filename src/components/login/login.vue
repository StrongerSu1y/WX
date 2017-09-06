<template>
	<div class="login">
		<v-header :entrance="'login'"></v-header>
		<div class="page-sign-login">
			<div class="avatar">
				<img src="./avatar.png" class="img-responsive img-avatar">
			</div>
			<form id="form-login" class="form-login form-wxw">
				<div class="form-group">
					<span class="tag-mobile tag-input"></span>
					<input id="login-mobile" v-model="mobile" type="number" class="form-control" placeholder="请输入注册手机号码" pattern="[0-9]*">
					<div class="actions-group">
						<div v-if="mobile.length" class="btn-clear btn-action" @click="clearInput('mobile')"></div>
					</div>
				</div>
				<div class="form-group">
					<span class="tag-pwd tag-input"></span>
					<input type="password" class="form-control password" placeholder="请输入您的登录密码" v-model="password" ref="password">
					<div class="actions-group">
						<div v-if="password.length" class="btn-clear btn-action" @click="clearInput('password')"></div>
						<div class="btn-visible btn-action" :class="{active: pwdShow}" @click="togglePwdShow()"></div>
					</div>
				</div>
				<div class="form-group form-group-login">
					<button class="btn-login btn btn-block btn-primary btn-lg" ref="btn" type="button" disabled @click="doLogin()">
						登录
					</button>
				</div>
			</form>
			<div class="line-sign">
				<router-link to="/login/register" class="link-sign pull-right">用户注册</router-link>
				<router-link to="/login/recovery" class="link-sign pull-left">找回密码</router-link>
			</div>
			<div class="line-third text-center">
				<div class="text-third">第三方账号登录</div>
			</div>
			<ul class="third-list list-inline">
				<li v-if="isWeixin" class="third">
					<img src="./third-wx.png" class="img-responsive img-third">
					<a @click.prevent="loginWeixin()" href="#" class="link-obj"></a>
				</li>
				<li v-if="!isWeixin" class="third">
					<img @click.prevent="loginQq()" src="./third-qq.png" class="img-responsive img-third">
				</li>
				<!-- <li v-if="weiboCan" class="third">
					<img src="./third-weibo.png" class="img-responsive img-third">
				</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	import { callbackFun, getQueryString } from '../../common/js/date.js'
	import { isWeixin } from '../../common/js/common.js'
	import header from '../header/header'
	export default {
		name: 'hello',
		data () {
			return {
				thirdPartyMap: [{ // 第三方
					url: 'third-wx.png'
				}, {
					url: 'third-qq.png'
				}, {
					url: 'third-weibo.png'
				}],
				mobile: '', // 手机
				password: '', // 密码
				pwdShow: false, // 密码显示
				loginDisabled: true, // 可登陆
				nickname: '',
				avatar: '',
				host: 'https://app.51weixiao.com',
				baseUrl: 'http://m.51weixiao.com',
				isWeixin: isWeixin(),
				weiboCan: false
			}
		},
		computed: {
			mobileTrue () {
				return /^1[3|4|5|7|8][0-9]\d{8}$/.test(this.mobile)
			}
		},
		mounted () {
			// 判断qq是否登录
			if (!getQueryString('redirectUrl')) {
				return
			}
			if (window.QC.Login.check()) {
				this.afterQQLogin()
			}
		},
		watch: {
			mobile (curVal, oldVal) {
				this.$refs.btn.disabled = !this.mobileTrue || !this.password
			},
			password (curVal, oldVal) {
				this.$refs.btn.disabled = !this.mobileTrue || !this.password
			}
		},
		methods: {
			clearInput (type) {
				this['' + type + ''] = ''
			},
			togglePwdShow () {
				this.pwdShow = !this.pwdShow
				this.$refs.password.type = this.pwdShow ? 'text' : 'password'
			},
	    // 登录
			doLogin () {
				this.Toast.loading({
					title: '登录中...'
				})
				this.$ajax.Login({
					mobile: this.mobile,
					password: this.password
				})
				.then(res => {
					console.log(res)
					localStorage.setItem('userId', res.data.data.id)
					this.Toast.success({
						title: '登录成功！'
					})
					setTimeout(() => {
						window.location.href = this.$route.query.href
					}, 500)
				}, err => {
					console.log(err)
				})
			},
			// 微信登录
			loginWeixin () {
				let _href = encodeURIComponent(window.location.href)
				let apiUrl = 'https://www.51weixiao.com/app-api/api/user/wxLogin'
				let redirectUrl = encodeURIComponent(`${apiUrl}?finalUrl=${_href}`)
				let appId = 'wx701b0e6e6faac47c'
				var _url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=` + redirectUrl + `&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
				window.location.href = _url
			},
			// QQ登录后的操作
			afterQQLogin () {
				this.getQQInfo()
				// 判断登陆
				// if (window.QC.Login.check()) {
				// 	this.getQQInfo()
				// } else {
				// 	window.QC.Login.showPopup({
				// 		appId: '101339901',
				// 		redirectURI: location.href + '/test?redirectUrl=' + escape(this.baseUrl + '/login') + '&isLogin=1'
				// 	})
				// }
			},
			// 返回
			callbackFun (res) {
				return callbackFun(res)
			},
			// 获取信息
			getQQInfo () {
				let paras = {}
				let nickname = ''
				let avatar = ''
				let _vm = this
				window.QC.api('get_user_info', paras)
				// 指定接口访问成功的接收函数，s为成功返回Response对象
				.success(function (s) {
					// 成功回调，通过s.data获取OpenAPI的返回数据
					nickname = s.data.nickname
					avatar = s.data.figureurl_qq_2
				})
				// 指定接口访问失败的接收函数，f为失败返回Response对象
				.error(function (f) {
					// 失败回调
					alert('获取用户信息失败！')
				})
				// 指定接口完成请求后的接收函数，c为完成请求返回Response对象
				.complete(function (c) {
					window.QC.Login.getMe((openId, accessToken) => {
						let account = openId
						let _url = `/user/login?account=${account}&nickname=${nickname}&avatar=${avatar}`
						_vm.$ajax.postAjax(_url)
							.then((res) => {
								let data = res.data.data
								if (res.data.status === '0') {
									_vm.Toast.success({
										title: '登录成功'
									})
									localStorage.setItem('userId', res.data.data.id)
									window.location.href = _vm.$route.query.href
								} else {
									this.Toast.fail({
										title: data.tip
									})
								}
							}, err => {
								console.log(err)
							})
					})
				})
			},
			// qq登陆
			loginQq () {
				window.QC.Login.showPopup({
					appId: '101339901',
					redirectURI: this.baseUrl + '/login?redirectUrl=' + escape(location.href)
				})
				// 判断登陆
				// if (window.QC.Login.check()) {
				// 	// alert('登陆成功')
				// 	this.getQQInfo()
				// } else {
				// 	// alert(location.href)
				// 	window.QC.Login.showPopup({
				// 		appId: '101339901',
				// 		redirectURI: this.baseUrl + '/login?redirectUrl=' + escape(location.href)
				// 	})
				// }
			}
		},
		components: {
			'v-header': header
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
	@import './login.styl'
</style>
