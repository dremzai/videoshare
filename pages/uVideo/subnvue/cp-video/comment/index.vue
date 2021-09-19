
<template>
	<view v-if="popupVisible" class="popup-footer">
<view class="pop__ui_panel">
	<view class="pop__ui_mask" @tap="close"></view>
	<view class="pop__ui_child anim-footer">
		<text class="pop__ui_head">{{commentList.length}} 条评论</text>
	<view class="pop__ui_body">
		<view class="wrap_commentPanel">
			<scroll-view class="wrap_cmtList" scroll-y="true">
			<block v-for="(item,index) in commentList" :key="index">
	<view class="cmtls-item" @longpress="handleLongPressMenu">
			<image class="avator" :src="item.avator" mode="aspectFill" />
			<view class="cmtinfo"><text class="name">@{{item.author}}</text><text class="cnt">{{item.msg}}</text><text class="time">{{item.time}}</text></view>
		<view class="like"><text class="iconfont icon-like">&#xe63b;</text><text class="like-num">{{item.like}}</text></view>
	</view>
	</block>
		</scroll-view>
	<view class="wrap_cmtFoot">
	<view class="wrap__editorPanel uni_borT" @tap="handleShowFloatInput">
<view class="wrap_editor"><input class="editor" placeholder="留下你的精彩评论吧" disabled @tap="handleShowFloatInput" /></view><view class="wrap_editor_btn"><text class="iconfont icon-emoj">&#xe64e;</text></view>
	</view>
	</view>
</view>
</view>
	</view>
</view>
		<view class="wrap__floatInputPanel" v-if="showFloatInputView">
<view class="floatInput-mask" @tap="showFloatInputView = false"></view>
	<scroll-view class="floatInput-body">
<view class="wrap__editorPanel">
	<view class="wrap_editor"><textarea class="editor" v-model="editorText" show-confirm-bar="false" cursor-spacing="15" :selection-start="editorLastCursor" :selection-end="editorLastCursor" auto-height 
		@input="bindEditorInput" @focus="bindEditorFocus" @blur="bindEditorBlur" placeholder="留下你的精彩评论吧"
		/></view>
	<view class="wrap_editor_btn" @tap="handleShowEmotion"><text class="iconfont icon-emoj">&#xe64e;</text></view><view class="wrap_editor_btn btn_submit" @tap="handleSubmit"><text class="iconfont icon-send">&#xe62f;</text></view>
</view>
<view class="radiobox"><label class="radio"><radio value="1" color="#feb719" style="transform: scale(.8);" /><text style="color:#999; font-size:24upx;">评论并转发</text></label></view>
	<view v-if="showEmotionView" class="wrap_emotion uni_borT">
		<view class="emotion__cells">
	<swiper class="emotion-swiper" :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999">
		<swiper-item v-for="(item,index) in emotionList" :key="index">
			<view class="face_list">
		<block v-for="(item2,index2) in item.nodes" :key="index2">
		<view class="face_list_item" @tap="handleEmotionTaped(item2)"><image v-if="item2 == 'del'" class="face-del" src="/static/emotion_del.png" mode="widthFix" /><text v-else class="face-emoj">{{item2}}</text></view>
	</block>
	</view>
</swiper-item>
	</swiper>
		</view>
	</view>
</scroll-view>
		</view>
	</view>
</template>

<script>
	const emotionJson = require('./mock-emotion.js')
	const commentJson = require('./mock-comment.js')
	export default {
		data() {
			return {
				popupVisible: false,showFloatInputView: false,showEmotionView: false,
				editorText: '',editorLastCursor: null,emotionList: emotionJson,commentList: commentJson,
			}
		},
		beforeCreate() {
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				fontFamily: "nvueIcon",
				'src': "url('../../../static/fonts/iconfont.ttf')"
			});
		},
		methods: {show() {this.popupVisible = true
			},close() {this.popupVisible = false
			},
			handleShowFloatInput() {this.showFloatInputView = true
				this.showEmotionView = true
			},
			handleShowEmotion() {this.showEmotionView = true
			},
			bindEditorInput(e) {this.editorLastCursor = e.detail.cursor
			},
			bindEditorFocus(e) {},
			bindEditorBlur(e) {this.editorLastCursor = e.detail.cursor
			},
			handleEmotionTaped(emoj) {
		if(emoj == 'del') return
				let startStr = this.editorText.substr(0, this.editorLastCursor)
		let endStr = this.editorText.substr(this.editorLastCursor)
		this.editorText = startStr + `${emoj}` + endStr
			},
			isEmpty(html) {return html.replace(/\r\n|\n|\r/, "").replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "") == ""
			},
			handleSubmit() {if(this.isEmpty(this.editorText)) return
				let cmtlist = this.commentList
			let len = cmtlist.length
				let data = {
					id: `msg${++len}`,avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',
					msg: this.editorText,time: new Date().toLocaleString(),like: ''
				}
			cmtlist.unshift(data) //插入到数组第一个
			this.commentList = cmtlist
			this.editorText = ''
			this.showFloatInputView = false
			uni.hideKeyboard()
			},
			handleLongPressMenu() {
			uni.showActionSheet({
				itemList: ['回复', '私信回复', '转发', '复制', '举报'],success: function (res) {
				console.log('你点击了' + (res.tapIndex + 1) + '事件');
					},
				})
			},
		}
	}
</script>
<style scoped>
.pop__ui_mask {background-color: #000; opacity: .6; position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 1000;}
.pop__ui_child {background-color: #fbfbfb; border-top-left-radius: 12px; border-top-right-radius: 12px; font-size: 14px; overflow: hidden; position: fixed; bottom: 0; left: 0; right: 0; z-index: 1001;}
.pop__ui_head {border-style: solid; border-color: #ebebeb; border-bottom-width: 1upx; font-size: 28upx; font-weight: 700; padding: 30upx; text-align: center;}
.iconfont {font-family: nvueIcon;}.wrap_commentPanel {flex-direction: column; height: 900upx;}.wrap_cmtList {flex:1;}
.cmtls-item {flex-direction: row; padding: 30upx; position: relative;}
.avator {border-radius: 50%; margin-right: 30upx; height: 30px; width: 30px;}.cmtinfo {flex: 1;}.name {color: #999; font-size: 24upx;}
.cnt {font-size: 28upx; margin-top: 10upx;}.time {color: #bbb; font-size: 24upx; margin-top: 10upx;}
.like {padding-left: 30upx;}.icon-like {color: #bbb;}.like-num {color: #bbb; font-size: 24upx; text-align: center; margin-top: 10upx;}
.floatInput-mask {background-color: #000; opacity: .6; position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 201910;}
.floatInput-body {background-color: #f7f8f9; overflow: hidden; position: fixed; bottom: 0; left: 0; right: 0; z-index: 201911;}
.uni_borT {border-color: #dbdbdb; border-style: solid; border-top-width: 1upx;}.wrap__editorPanel {flex-direction: row; align-items: flex-end; background-color: #fff; padding: 20upx 30upx;}
.wrap_editor {flex:1; overflow: hidden;}.editor {font-size: 14px; line-height: 1.2;}
.wrap_editor_btn {justify-content: center; padding: 0 4px; height: 28px;}.icon-emoj {color: #999; font-size: 25px;}
.btn_submit {border-radius: 20px; font-size: 14px; margin-left: 5px; padding: 0 3px; line-height: 28px;}.icon-send {color: #999; font-size: 25px;}
.radiobox {background-color: #fff; padding: 20upx;}.radio {flex-direction: row; align-items: center;}
.wrap_emotion {height: 580upx;}.emotion__cells {flex: 1; position: relative;}
.emotion-swiper {flex: 1;}.face_list {flex-direction: row; flex-wrap: wrap; margin-right: -15upx; padding: 30upx 0 0 20upx;}
.face_list_item {align-items: center; justify-content: center; margin-top: 40upx; margin-right: 15upx; height: 90upx; width: 90upx; /*background: red;*/}
.face-emoj {font-size: 50upx;}.face-del {height: 60upx; width: 60upx;}
</style>
