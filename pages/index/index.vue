/**
* @tpl 首页模板
*/

<template>
	<view class="uni__container flexbox flex_col">
		<header-bar id="header_bar" v-if="currentTabIndex == 0" :isBack="false" title=" " titleTintColor="#353535"
			:bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(0)"><text class="fs_14"
					:class="[currentNavIndex == 0 ? 'fs_20 bold' : '']">最新活动</text></view>
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(1)"><text class="fs_14"
					:class="[currentNavIndex == 1 ? 'fs_20 bold' : '']">我参与的</text></view>
			<!-- <view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(2)"><text class="fs_14"
					:class="[currentNavIndex == 2 ? 'fs_20 bold' : '']">指南</text>
				<text class="uni_badge uni_badge_dot"></text>
			</view> -->

		</header-bar>
		<header-bar v-else-if="currentTabIndex == 1" :isBack="false" title=" " titleTintColor="#353535"
			:bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">推荐视频</text></view>
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 2" :isBack="false" title=" " titleTintColor="#353535"
			:bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">数据</text></view>
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 3" :isBack="false" title=" " titleTintColor="#353535"
			:bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">我</text></view>

		</header-bar>
		<header-bar v-else :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}"><text
				slot="iconfont" class="uni_btnIco iconfont icon-shezhi"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<block v-if="currentTabIndex == 0">

				<view v-if="currentNavIndex == 0" class="uni__nearDynamics">
					<utheme ref="utheme" :height="scrollH" @stopRefresh="stopRefresh" />
				</view>
				<view v-if="currentNavIndex == 1" class="uni__nearPeoples">
					<uthememy ref="uthememy" :height="scrollH" @stopRefresh="stopRefresh" />
				</view>
				<view v-if="currentNavIndex == 2" class="uni__nearPeoples">
					<guide ref="guide" />
				</view>

			</block>
			<block v-else-if="currentTabIndex == 1">

				<uvideo ref="uvideo" :height="scrollH" @stopRefresh="stopRefresh" />
			</block>

			<block v-else-if="currentTabIndex == 2">
				<udata ref="udata" :height="scrollH" @stopRefresh="stopRefresh" />
			</block>

			<!-- 我的 -->
			<block v-else>
				<ucenter ref="ucenter" @stopRefresh="stopRefresh" />
			</block>
		</view>

		<tab-bar id="tab_bar" :current="currentTabIndex" backgroundColor="#fff" color="#999" tintColor="#2cc6e0"
			@click="handleTabbar"></tab-bar>
		<uni-pop ref="uniPop"></uni-pop>
		<popup-window ref="popupWindow" />
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Api from '../../utils/requestApi.js'
	import ucenter from '@/pages/ucenter'
	import uvideo from '@/pages/uVideo'
	import ulive from '@/pages/uLive'
	import udata from '@/pages/index/data.vue'
	import utheme from '@/pages/theme/theme.vue'
	import uthememy from '@/pages/theme/thememy.vue'
	import guide from '@/pages/index/guide.vue'
	export default {
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数

					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let tab_bar = uni.createSelectorQuery().select("#tab_bar"); //想要获取高度的元素名（class/id）


					let heightA = 0
					let heightB = 0
					tab_bar.boundingClientRect(data => {
						heightA = data.top

						// that._data.navHeight = pH-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
						let header_bar = uni.createSelectorQuery().select("#header_bar");
						header_bar.boundingClientRect(data => {

							heightB = data.bottom

							that._data.scrollH = heightA - heightB
							console.log(heightA - heightB)
						}).exec()
					}).exec()


				}
			})
		},
		onLoad(){ 
				this.userData=uni.getStorageSync('user') 
				if(this.userData==''||this.userData.id==''){
					var that=this;
						wx.login({
						  success (res) {
						    if (res.code) {
						      Api.httpResponse("/stm/api/login/wxMiniLogin", 'POST',{code:res.code}).then(
						      	resuser => {   
									// 转换null为""
									for (let attr in resuser) {
									  if (resuser[attr] == null) {
										resuser[attr] = "";
									  }
									}
									that.userData=resuser;
						      		that.$store.commit('SET_USER', resuser)	 
						      	},
						      	error => {
						      		console.log(error);
						      	}
						      ) 
						    } else {
						      console.log('登录失败！' + res.errMsg)
						    }
						  }
						})
				}
		},
		onShow(){
			if (this.currentTabIndex == 3) {
				this.$refs["ucenter"].init()
			}
		},
		data() {
			return {
				currentNavIndex: 0,
				currentTabIndex: 0,
				scrollH: 0,
				userData:{id:''}
			}
		},
		components: {
			ucenter,
			uvideo,
			ulive,
			udata,
			utheme,
			uthememy,
			guide
		},
		computed: {
			...mapState(['user', 'token'])
		},
		mounted() {
			
			/* #ifdef APP-PLUS */
			if (!this.user) {
				uni.redirectTo({
					url: '/pages/auth/login'
				})
			}
			/* #endif */
			
		},
		methods: {
			handleDropMenu() {
				this.$refs.popupWindow.show()
			},
			handleTopNav(index) {
				this.currentNavIndex = index
			},
			handleTabbar(index) {
				this.currentTabIndex = index
				setTimeout(()=>{
					if (this.currentTabIndex == 3) {
						this.$refs["ucenter"].init()
					}
				},500)
			},

			stopRefresh() {
				//结束下拉刷新
				uni.stopPullDownRefresh()
				uni.showToast({
					title: "刷新成功!",
					icon: "none"
				});
			},


		},
		//下拉刷新
		onPullDownRefresh() {



			if (this.currentTabIndex == 0) {
				if (this.currentNavIndex == 0) {
					this.$refs["utheme"].getList("refresh")
				} else if (this.currentNavIndex == 1) {
					this.$refs["uthememy"].getList("refresh")
				} else if (this.currentNavIndex == 1) {
					uni.stopPullDownRefresh()
				}
			} else if (this.currentTabIndex == 1) {
				this.$refs["uvideo"].getList("refresh")
			} else if (this.currentTabIndex == 2) {
				this.$refs["udata"].getList("refresh")
			} else if (this.currentTabIndex == 3) {
				uni.stopPullDownRefresh()
			}

		}, 

		onReachBottom() {
			console.log("xxxx")
			// if(this.currentTabIndex == 0){
			// 	if(this.currentNavIndex == 0){
			// 		this.$refs["utheme"].getList("refresh")
			// 	}else if(this.currentNavIndex == 1){
			// 		this.$refs["uthememy"].getList("refresh")
			// 	}else if(this.currentNavIndex == 1){
			// 		uni.stopPullDownRefresh()
			// 	}
			// }else if(this.currentTabIndex == 1){
			// 	this.$refs["uvideo"].getList("refresh")
			// }else if(this.currentTabIndex == 2){
			// 	this.$refs["udata"].getList("refresh")
			// }else if(this.currentTabIndex == 3){
			// 	uni.stopPullDownRefresh()
			// }
		}
	}
</script>

<style>
</style>
