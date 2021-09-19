
<template>
<view v-if="isShowPopup" class="popupWindow">
	<view class="popwin__ui_panel"><view class="popwin__ui_mask" @tap="close"></view>
	<view class="popwin__ui_child anim-fadeIn" :style="[{top: customBarH + 'px'}]"><view class="popwin__ui_btns">
	<text class="btn" @tap="handleLaunchLive">发起直播</text><text class="btn">建房间</text></view>
	</view></view></view>
</template>
<script>
	export default {
		data() {
			return {isShowPopup: false,statusBarH: this.statusBar,customBarH: this.customBar
			}
		},
		methods: {
			show() {this.isShowPopup = true
			},close() {this.isShowPopup = false
			},
			handleLaunchLive() {
				// 
			}
		}
	}
</script>
<style scoped>
.popwin__ui_panel {display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; position: fixed; left: 0; top: 0; z-index: 201909; pointer-events: none;}
.popwin__ui_mask {background: #000; opacity: .6; height: 100%; width: 100%; position: fixed; left: 0; top: 0; pointer-events: auto; touch-action: none; animation: anim_mask .5s;}
	@keyframes anim_mask {0% {opacity: 0;}}.popwin__ui_child {background: #fbfbfb; border-radius: 6px; font-size: 14px; overflow: hidden; pointer-events: auto; position: absolute; top: 125upx; right: 20upx;}
.popwin__ui_btns {display: flex; flex-direction: column; position: relative;}.popwin__ui_btns .btn {box-sizing: border-box; color: #353535; flex: 1; font-size: 14px; padding: 0 20px; line-height: 40px; position: relative; z-index: 11;}
.popwin__ui_btns .btn:after {content: ''; background: #dbdbdb; height: 1px; position: absolute; top: 0; left: 0; right: 0; transform: scaleY(.5); transform-origin: 0 0;}
.popwin__ui_btns .btn:first-child:after {display: none;}.popwin__ui_btns .btn:active {background: #f3f3f3;}
.anim-fadeIn {animation: anim_fadeIn .3s;}
@keyframes anim_fadeIn{from{opacity: 0; transform: scale(.95);} to{opacity: 1; transform: scale(1);}
	}
</style>
