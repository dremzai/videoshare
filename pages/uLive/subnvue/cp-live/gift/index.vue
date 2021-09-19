
<template>
	<view class="wrap__giftPanel" v-if="showGiftView">
	<view class="wrapgift-mask" @tap="close"></view>
		<scroll-view class="wrapgift-body">
	<view class="wrap_giftlist">
	<view class="gift-head">
	<view class="gift-menu"><text class="gm-item gm-item-on">礼物</text><text class="gm-item">背包</text></view>
		<view class="gift-coins"><text class="iconfont gc-coin">&#xe756;</text><text class="gc-num">1280</text><text class="gc-recharge">充值</text></view></view>
		<swiper class="gift-swiper" :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999">
		<swiper-item v-for="(item,index) in giftList" :key="index">
		<view class="gift__cells">
			<block v-for="(item2,index2) in item.nodes" :key="index2">
		<view class="giftitem" @tap="handleGivingGift(item2)"><view class="giftitem-rect"><image class="giftimg" :src="item2.image" mode="aspectFill" /></view><text class="giftname">{{item2.name}}</text><text class="giftcoin">{{item2.coin}}优播币</text></view>
		</block>
		</view>
		</swiper-item>
	</swiper>
	</view>
</scroll-view>
	</view>
</template>

<script>
	const giftJson = require('./mock-gift.js')
	export default {
		data() {
			return {showGiftView: false,giftList: giftJson,
			}
		},
		beforeCreate() {
			// #ifdef APP-PLUS
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				fontFamily: "nvueIcon",
				'src': "url('../../../static/fonts/iconfont.ttf')"
			});
			// #endif
		},
		methods: {show(index) {this.showGiftView = true
			},
			close() {this.showGiftView = false
			},
			handleGivingGift(item) {
				console.log(item.name)
				this.$emit('click')
				this.close()
			}
		}
	}
</script>

<style scoped>
.iconfont {font-family: nvueIcon;}
.nlv_borT {border-color: #ebebeb; border-style: solid; border-top-width: 1upx; }
.wrapgift-mask {background-color: #000; opacity: .1; position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 201910;}
.wrapgift-body {overflow: hidden; position: fixed; bottom: 0; left: 0; right: 0; z-index: 201911;}.gift-head {border-color: rgba(255,255,255,.3); border-style: solid; border-bottom-width: 1upx; flex-direction: row; align-items: center; height: 100upx;}
.gift-menu {flex:1; flex-direction: row;}.gm-item {color: #999; font-size: 32upx; margin-left: 40upx; line-height: 100upx;}
.gm-item-on {color: #fff; border-color: #ff0f33; border-style: solid; border-bottom-width: 2px;}
.gift-coins {color: #fff; font-size: 28upx; flex-direction: row; align-items: center; padding-right: 30upx;}.gc-coin {color: #ff0f33; font-size: 15px;}
.gc-num {color: #feb719; font-size: 12px;}.gc-recharge {color: #ff0f33; font-size:12px; margin-left: 30upx;}
.wrap_giftlist {background-color: rgba(31,37,62,1); border-top-left-radius: 12px; border-top-right-radius: 12px; height: 700upx; position: relative;}
.gift-swiper {flex: 1;}.gift__cells {flex-direction: row; flex-wrap: wrap;}.giftitem {flex-direction: column; align-items: center; justify-content: center; margin-top: 20upx; width: 186upx;}
.giftitem-rect {align-items: center; justify-content: center; height: 150upx; width: 150upx; position: relative;}.giftimg {height: 200upx; width: 200upx;}
.giftname {color: #fff; font-size: 30upx;}.giftcoin {color: rgba(255,255,255,.3); font-size: 22upx; margin-top: 2px;}
</style>
