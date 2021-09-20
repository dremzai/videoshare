/**
 * @tpl 首页模板
 */

<template>
	<view class="uni__container flexbox flex_col">
		<header-bar v-if="currentTabIndex == 0" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(0)"><text class="fs_14" :class="[currentNavIndex == 0 ? 'fs_20 bold' : '']">最新活动</text></view>
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(1)"><text class="fs_14" :class="[currentNavIndex == 1 ? 'fs_20 bold' : '']">我参与的</text></view>
			<view slot="headerL" class="uni_btnIco flexbox" @tap="handleTopNav(2)"><text class="fs_14" :class="[currentNavIndex == 2 ? 'fs_20 bold' : '']">指南</text></view>
					
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 1" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">推荐视频</text></view>  
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 2" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}">
			<view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">数据</text></view> 
		</header-bar>
		<header-bar v-else-if="currentTabIndex == 3" :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}"><view slot="headerL" class="uni_btnIco flexbox"><text class="fs_20 bold">我</text></view>
		 
		</header-bar>
		<header-bar v-else :isBack="false" title=" " titleTintColor="#353535" :bgColor="{'background': '#fff'}"><text slot="iconfont" class="uni_btnIco iconfont icon-shezhi"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<block v-if="currentTabIndex == 0">
				<view v-if="currentNavIndex == 0" class="uni__nearDynamics">
					<utheme />
				</view>
				<view v-if="currentNavIndex == 1" class="uni__nearPeoples">
					 <uthememy />
				</view>
				<view v-if="currentNavIndex == 2" class="uni__nearPeoples">
					 <guide />
				</view>
				 
			</block>
			<block v-else-if="currentTabIndex == 1">
				<uvideo />
			</block>
			
			<block v-else-if="currentTabIndex == 2">
				<udata />
			</block>
		 
			<!-- 我的 -->
			<block v-else>
				<ucenter />
			</block>
		</view>
		
		<tab-bar :current="currentTabIndex" backgroundColor="#fff" color="#999" tintColor="#2cc6e0" @click="handleTabbar"></tab-bar>
		<uni-pop ref="uniPop"></uni-pop>
		<popup-window ref="popupWindow" />
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import ucenter from '@/pages/ucenter'
	import uvideo from '@/pages/uVideo'
	import ulive from '@/pages/uLive'
	import udata from '@/pages/index/data.vue'
	import utheme from '@/pages/theme/theme.vue'
	import uthememy from '@/pages/theme/thememy.vue'
	import guide from '@/pages/index/guide.vue'
	export default {
		data() {
			return {currentNavIndex: 0,currentTabIndex: 0
			}
		},
		components: {ucenter, uvideo, ulive,udata,utheme,uthememy,guide
		},
		computed: {...mapState(['user', 'token'])
		},
		mounted(){
			if(!this.user){
				uni.redirectTo({url: '/pages/auth/login'})
			}
		},
		methods: {
		handleDropMenu() {this.$refs.popupWindow.show()
			},
		handleTopNav(index) {this.currentNavIndex = index
			},
			handleTabbar(index) {this.currentTabIndex = index
			},
			
		 
		 
		}
	}
</script>

<style>
</style>
