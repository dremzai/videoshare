import Vue from 'vue'
import App from './App'
// import './static/fonts/iconfont.css'
// import './assets/css/reset.css'
// import './assets/css/layout.css'
// 状态管理
import store from './store'
Vue.prototype.$store = store
// 公共组件
import headerBar from './components/header/header.vue'
import tabBar from './components/tabbar/tabbar.vue'
import popupWindow from './components/popupWindow.vue'
Vue.component('header-bar', headerBar)
Vue.component('tab-bar', tabBar)
Vue.component('popup-window', popupWindow)
import uniPop from './components/uniPop/uniPop.vue'
import './utils/ald-stat/ald-stat'
Vue.component('uni-pop', uniPop)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
