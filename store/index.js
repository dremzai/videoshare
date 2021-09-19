import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: uni.getStorageSync('user'),
		token: uni.getStorageSync('token'),
	},
	mutations: {
		// 存储token
		SET_TOKEN(state, data) {
			state.token = data
			uni.setStorageSync('token', data)
		},
		// 存储用户名
		SET_USER(state, data) {
			state.user = data
			uni.setStorageSync('user', data)
		},
		// 退出
		LOGOUT(state) {
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		}
	},
	getters: {},
	actions: {},
})