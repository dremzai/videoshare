
<template>
	<view v-if="popupVisible" class="popup-footer">
	<view class="pop__ui_panel">
		<view class="pop__ui_mask" @tap="close"></view>
		<view class="pop__ui_child anim-footer">
			<view class="pop__ui_body">
				
					<text class="wrap-jb fs_12">举报</text>
					<view class="wrap-avatar">
						<image class="wrap-avatar__img" src="/static/uimg/u__chat_img28.jpg" mode="aspectFill" />
					</view>
					<view class="wrap-textinfo">
						<view  class="wrap-textinfo-name"><text>多愁善感的比卡丘</text></view>
						<view class="wrap-textinfo-tag">
							<view class="uni-tag"><text class="iconfont gc-nan">&#xe632;</text> <text class="c-fff fs_12">24</text></view>
							<view class="uni-tag"><text class="iconfont gc-dingwei">&#xe655;</text> <text class="c-fff fs_12">上海</text></view>
						</view>
					</view>
				<view class="wrap-grade">
					<view class="wrap-grade-item" style="background-color: #f90;">
						<view class="grade-icon"><text class="iconfont gc-nan">&#xe623;</text></view>
						<view class="grade-info"><text class="c-fff fs_12">用户等级</text><text class="grade-num">31</text></view>
					</view>
					<view class="wrap-grade-item">
						<view class="grade-icon"><text class="iconfont gc-nan">&#xe63d;</text></view>
						<view class="grade-info"><text class="c-fff fs_12">九伴</text><text class="grade-num">2</text></view>
					</view>
				</view>
				
				<view class="wrap-btns">
					<view class="wrap-btns-item" style="background-color: #f349eb;"><text class="iconfont gc-ico c-fff">&#xe62d;</text><text class="c-fff">关注</text></view>
					<view class="wrap-btns-item"><text class="iconfont gc-ico c-fff">&#xe690;</text><text class="c-fff">TA</text></view>
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {popupVisible: false,
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
		methods: {
			show() {
				this.popupVisible = true
			},
			close() {this.popupVisible = false
			},
		}
	}
</script>

<style scoped>
.iconfont {font-family: nvueIcon; color:#fff;}
.pop__ui_mask {background-color: #000; opacity: .6; position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 1000;}
.pop__ui_child {background-color: #fbfbfb; border-top-left-radius: 12px; border-top-right-radius: 12px; font-size: 14px; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1001;}
.pop__ui_body {padding: 20upx; position: relative;}
.wrap-jb {position: absolute; left: 20upx; top: 20upx;}
.wrap-avatar {position: absolute; left: 0; right: 0; top:10px;z-index: 2222; align-items: center; justify-content: center; flex: 1; flex-direction: row; justify-content: center;}
.wrap-avatar__img {border-radius: 50%; border-color: #ddd; border-style: solid; border-width: 2px; height: 55px; width: 55px; position: relative; z-index: 2222;}
.wrap-textinfo {margin-top: 70px;}
.wrap-textinfo-name {text-align: center; font-weight: 700; margin-bottom: 3px; flex: 1; flex-direction: row; justify-content: center;}
.wrap-textinfo-tag {flex: 1; flex-direction: row; justify-content: center;}
.uni-tag {background-color: #bbb; border-radius: 20px; color: #fff; font-size: 12px; margin: 3px; padding: 2px 10px; line-height: 15px; flex-direction: row; align-items: center;}
.wrap-grade {flex: 1; flex-direction: row;justify-content: center; margin-top: 15px;}
.wrap-grade-item {background-color: #4f5af9; border-radius: 5px; color: #fff; font-size: 12px; margin: 3px; padding: 3px 5px; width: 90px; flex-direction: row; align-items: center;}
.grade-icon {background-color: rgba(255,255,255,.2); height: 25px; width: 25px; border-radius: 50%; align-items: center; justify-content: center;} 
.grade-info {flex-direction: column; margin-left: 3px;}
.grade-num {color:#fff; font-size: 30upx; font-style: italic;}
.wrap-btns {flex: 1; flex-direction: row;justify-content: center; padding-top: 8px; margin-top: 30px; border-style: solid; border-color: #ebebeb; border-top-width: 1upx;}
.wrap-btns-item {background-color: #00d7e4; border-radius: 50px; color: #fff; font-size: 14px; margin: 3px; padding: 12px 0; width: 120px; flex-direction: row; justify-content: center;}
.c-fff {color: #fff;}
.gc-ico {margin-right: 5px;}
</style>
