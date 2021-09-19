 /**
  * @tpl 			直播 - 实时聊天模板 - nvue内嵌式
  * @author 	andy by 2019-10-27
  */
 
<template>
	<view class="wrap__floatInputPanel" v-if="showFloatInputView">
	<view class="floatInput-mask" @tap="close"></view>
	<scroll-view class="floatInput-body">
	<scroll-view class="wrap_fastMsgTpl" scroll-x show-scrollbar="false">
		<text class="mtpl_item">666👍</text><text class="mtpl_item">高颜值</text><text class="mtpl_item">盘他🐶</text><text class="mtpl_item">为TA疯狂打call</text><text class="mtpl_item">老司机带带我</text><text class="mtpl_item">确认过眼神，遇上对的人</text>
	</scroll-view>
	<view class="wrap__editorPanel">
	<switch color="#feb719" style="transform: scale(0.7,0.7)" />
	<view class="wrap_editor"><textarea class="editor" v-model="editorText" show-confirm-bar="false" cursor-spacing="15" :selection-start="editorLastCursor" :selection-end="editorLastCursor" auto-height 
					@input="bindEditorInput" @focus="bindEditorFocus" @blur="bindEditorBlur" placeholder="与TA聊点什么"
					/>
	</view>
	<view class="wrap_editor_btn" @tap="handleShowEmotion"><text class="iconfont editor_btn_ico">&#xe64e;</text></view><view class="wrap_editor_btn btn_submit" @tap="handleSubmit"><text class="iconfont editor_btn_ico">&#xe62f;</text></view>
			</view>
			<view v-if="showEmotionView" class="wrap_emotion nlv_borT">
				<view class="emotion__cells">
					<swiper class="emotion-swiper" :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999">
				<swiper-item v-for="(item,index) in emotionList" :key="index">
				<view class="face_list">
				<block v-for="(item2,index2) in item.nodes" :key="index2">
					<view class="face_list_item" @tap="handleEmotionTaped(item2)">
					<image v-if="item2 == 'del'" class="face-del" src="/static/emotion_del.png" mode="widthFix" /><text v-else class="face-emoj">{{item2}}</text>
				</view>
				</block>
				</view>
			</swiper-item>
			</swiper>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const emotionJson = require('./mock-emotion.js')
	export default {
		data() {
			return {showFloatInputView: false,showEmotionView: false, editorText: '',editorLastCursor: null,emotionList: emotionJson,rollMsgList: [],
			}
		},
		props: ['vlist'],
		beforeCreate() {
			// #ifdef APP-PLUS
			const domModule = weex.requireModule('dom')
			domModule.addRule('fontFace', {
				fontFamily: "nvueIcon",
				'src': "url('../../../static/fonts/iconfont.ttf')"
			});
			// #endif
		},
		methods: {show(index) {this.rollMsgList = this.vlist[index].rollmsg
				this.showFloatInputView = true
			},
			close() {this.showFloatInputView = false
				this.showEmotionView = false
				uni.hideKeyboard()
			},
			handleShowEmotion() {uni.hideKeyboard()
				this.showEmotionView = true
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
			handleSubmit() {
			if(this.isEmpty(this.editorText)) return
				let msglist = this.rollMsgList
			let len = msglist.length
				let data = {id: `20190${++len}`,uname: '流浪少年：',content: this.editorText,
				}
				msglist.unshift(data) //插入到数组第一个
			this.rollMsgList = msglist
				this.editorText = ''
			this.showFloatInputView = false
			this.showEmotionView = false
				uni.hideKeyboard()
			},
		}
	}
</script>

<style scoped>
.iconfont {font-family: nvueIcon;}
.nlv_borT {border-color: #ebebeb; border-style: solid; border-top-width: 1upx; }
.wrap__floatInputPanel{}
.floatInput-mask {background-color: #000; opacity: .6; position: fixed; left: 0; right: 0; top: 0; bottom: 0; z-index: 201910;}
.floatInput-body {overflow: hidden; position: fixed; bottom: 0; left: 0; right: 0; z-index: 201911;}
.wrap_fastMsgTpl {
	/* #ifndef APP-PLUS-NVUE */
	white-space: nowrap;
	/* #endif */
	flex: 1; flex-direction: row; margin-bottom: 20upx;
}
.mtpl_item {background-color: #fff; border-radius: 50upx; color: #353535; font-size: 28upx; margin: 0 10upx; padding: 0 20upx; line-height: 70upx;}
.wrap__editorPanel {flex-direction: row; align-items: center; background-color: #fff; padding: 20upx 30upx; padding-left: 10upx;}
.wrap_editor {flex:1; overflow: hidden;}.editor {font-size: 14px; line-height: 1.2;}.wrap_editor_btn {justify-content: center; padding: 0 4px; height: 28px;}
.editor_btn_ico {color: #999; font-size: 22px;}.btn_submit {border-radius: 20px; font-size: 14px; margin-left: 5px; padding: 0 3px; line-height: 28px;}
.wrap_emotion {background-color: #f7f8f9; height: 580upx;}.emotion__cells {flex: 1; position: relative;}
.emotion-swiper {flex: 1;}.face_list {flex-direction: row; flex-wrap: wrap; margin-right: -15upx; padding: 30upx 0 0 20upx;}
.face_list_item {align-items: center; justify-content: center; margin-top: 40upx; margin-right: 15upx; height: 90upx; width: 90upx; /*background: red;*/}
.face-emoj {font-size: 50upx;}.face-del {height: 60upx; width: 60upx;}
</style>
