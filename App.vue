<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			// console.log('App Launch')
			uni.getSystemInfo({
				success:function(e){
					Vue.prototype.statusBar = e.statusBarHeight
					// #ifndef MP
					if(e.platform == 'android') {Vue.prototype.customBar = e.statusBarHeight + 50
					}else {Vue.prototype.customBar = e.statusBarHeight + 45
					}
					// #endif
					// #ifdef MP-WEIXIN
					let custom = wx.getMenuButtonBoundingClientRect()
					Vue.prototype.customBar = custom.bottom + custom.top - e.statusBarHeight
					// #endif
					// #ifdef MP-ALIPAY
					Vue.prototype.customBar = e.statusBarHeight + e.titleBarHeight
					// #endif
				}
			})
		},
	}
</script>

<style>
	/*每个页面公共css */
	/* import './static/fonts/iconfont.css'
	import './assets/css/reset.css'
	import './assets/css/layout.css' */
	@import url("./static/fonts/iconfont.css");
	@import url("./assets/css/reset.css");
	@import url("./assets/css/layout.css");
</style>

