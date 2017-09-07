import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	// 定义状态
	state: {
		author: 'zqczx00',
		history: 0
	},
	// 设置方法
	mutations: {
		newAuthod (state, msg) {
			state.author = msg
		},
		setHistory (state, num) {
			state.history = num
		}
	}
})

export default store
