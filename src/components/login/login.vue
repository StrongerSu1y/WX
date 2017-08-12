<template>
  <div class="hello">
    <div class="page-sign-login">
    <div class="avatar">
      <img src="./avatar.png" class="img-responsive img-avatar">
    </div>
    <form id="form-login" class="form-login form-wxw">
      <div class="form-group">
        <span class="tag-mobile tag-input"></span>
        <input id="login-mobile" v-model="mobile" type="text" class="form-control" placeholder="请输入注册手机号码">
        <div class="actions-group">
          <div class="btn-clear btn-action" @click="clearInput('mobile')"></div>
        </div>
      </div>
      <div class="form-group">
        <span class="tag-pwd tag-input"></span>
        <input type="password" class="form-control password" placeholder="请输入您的登录密码" v-model="password" ref="password">
        <div class="actions-group">
          <div class="btn-clear btn-action" @click="clearInput('password')"></div>
          <div class="btn-visible btn-action" :class="{active: pwdShow}" @click="togglePwdShow()"></div>
        </div>
      </div>
      <div class="form-group form-group-login">
        <button class="btn-login btn btn-block btn-primary btn-lg" ref="login-btn" type="button" disabled @click="doLogin()">
          登录
        </button>
      </div>
    </form>
    <div class="line-sign">
      <router-link to="/register" class="link-sign pull-right">用户注册</router-link>
      <router-link to="/recovery" class="link-sign pull-left">找回密码</router-link>
    </div>
    <div class="line-third text-center">
      <div class="text-third">第三方账号登录</div>
    </div>
    <ul class="third-list list-inline">
      <li class="third">
        <img src="./third-wx.png" class="img-responsive img-third">
        <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd2fc5d3e92828aad&redirect_uri=http%3A%2F%2Fwww.51weixiao.com&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect" class="link-obj"></a>
      </li>
      <li class="third">
        <img src="./third-qq.png" class="img-responsive img-third">
      </li>
      <li class="third">
        <img src="./third-weibo.png" class="img-responsive img-third">
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
export default {
	name: 'hello',
	data () {
		return {
			avatar: 'avatar.png', // logn
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
			loginDisabled: true // 可登陆
		}
	},
	computed: {
	},
	watch: {
		mobile (curVal, oldVal) {
			this.loginDisabled = !curVal || !this.password
			document.querySelector('.btn-login').disabled = this.loginDisabled
		},
		password (curVal, oldVal) {
			this.loginDisabled = !curVal || !this.mobile
			document.querySelector('.btn-login').disabled = this.loginDisabled
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
    // 登陆
		doLogin () {
			this.$ajax({
				method: 'post',
				url: '/user/login',
				data: {
					mobile: this.mobile,
					password: this.password
				}
			})
			.then((res) => {
				console.log(res.data.data.id)
			})
			.catch((err) => {
				console.log(err)
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
	@import './login.styl'
</style>
