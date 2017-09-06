<template>
  <div id="app">
    <router-view @showToast="showToast"></router-view>
    <v-toast v-show="toastShow" :toast="toast"></v-toast>
  </div>
</template>

<script>
	import toast from './components/common/toast/toast.vue'
	export default {
		name: 'app',
		data () {
			return {
				toast: {
					title: '请输入正确的信息',
					wxLogin: false
				},
				toastShow: false
			}
		},
		created () {
			this.$root.Bus.$on('showToast', (val) => {
				this.showToast(val)
			})
		},
		methods: {
			showToast (text) {
				this.toast.title = text || '请输入正确的信息'
				this.toastShow = true
				setTimeout(() => {
					this.toastShow = false
				}, 2000)
			}
		},
		components: {
			'v-toast': toast
		}
	}
</script>

<style>
  html, body {
    height: 100%;
  }
  #app {
  	font-size: 0.24rem;
    color: #2c3e50;
    /*padding-top: 0.8rem;*/
    background: #ffffff;
    height: 100%;
  }
</style>
