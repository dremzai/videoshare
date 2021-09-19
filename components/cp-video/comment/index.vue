 /**
  * @tpl 			评论模板
  * @author 	andy by 2019-10-27
  */
 
<template>
<view v-if="popupVisible" class="popup-footer">
<view class="pop__ui_panel">
	<view class="pop__ui_mask" @tap="close"></view>
	<view class="pop__ui_child anim-footer">
<view class="pop__ui_head uni_borB">{{commentList.length}} 条评论</view>
		<view class="pop__ui_body">
		<view class="wrap_commentPanel flexbox flex_col">
			<view class="wrap_cmtList flex1">
		<block v-for="(item,index) in commentList" :key="index">
		<view class="item uni__material flexbox" @longpress="handleLongPressMenu">
			<image class="avator" :src="item.avator" mode="aspectFill" /><view class="cmtinfo flex1"><view class="name">@{{item.author}}</view><text class="cnt">{{item.msg}}</text><view class="time">{{item.time}}</view></view><view class="like"><text class="iconfont icon-like"></text>{{item.like}}</view>
					</view>
				</block>
			</view>
				<view class="wrap_cmtFoot">
				<view class="wrap__editorPanel flexbox uni_borT" @tap="handleShowFloatInput">
					<view class="wrap_editor flex1"><input class="editor" placeholder="留下你的精彩评论吧" disabled /></view><view class="wrap_editor_btn"><text class="iconfont icon-emoj"></text></view>
				</view>
					</view>
					</view>
				</view>
			</view>
		</view>
		<view class="wrap__floatInputPanel" v-if="showFloatInputView">
			<view class="floatInput-mask" @tap="showFloatInputView = false"></view>
			<view class="floatInput-body">
		<view class="wrap__editorPanel flexbox">
		<view class="wrap_editor flex1">
			<textarea class="editor" v-model="editorText" show-confirm-bar="false" cursor-spacing="15" :selection-start="editorLastCursor" :selection-end="editorLastCursor" auto-height 
						@input="bindEditorInput" @focus="bindEditorFocus" @blur="bindEditorBlur" placeholder="留下你的精彩评论吧"
						/>
					</view>
			<view class="wrap_editor_btn" @tap="handleShowEmotion"><text class="iconfont icon-emoj"></text></view>
			<view class="wrap_editor_btn btn_submit uni__btn-primary bg_linear2" @tap="handleSubmit"><text class="iconfont icon-send"></text></view>
				</view>
				<view class="pad10 bg_fff"><label class="radio"><radio value="1" color="#feb719" style="transform: scale(.8);" /><text class="fs_12 c_999">评论并转发</text></label></view>
				<view class="wrap_emotion uni_borT" :style="[{'display': showEmotionView ? 'block' : 'none'}]">
					<view class="emotion__cells">
				<swiper :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999" style="height:100%;width:100%;position:absolute;">
				<block v-for="(item,index) in emotionList" :key="index">
					<swiper-item>
						<view class="face_list">
							<block v-for="(item2,index2) in item.nodes" :key="index2">
							<view class="item" @tap="handleEmotionTaped(item2)"><image v-if="item2 == 'del'" class="del" src="/static/emotion_del.png" mode="widthFix" /><text v-else class="emoj">{{item2}}</text></view>
										</block>
									</view>
				</swiper-item>
				</block>
				</swiper>
					</view>
				</view>
			</view>
		</view>
		<uni-pop ref="uniPop" />
	</view>
</template>

<script>
	const emotionJson = require('./mock-emotion.js')
	const commentJson = require('./mock-comment.js')
	export default {
		data() {
			return {
				popupVisible: false,showFloatInputView: false,showEmotionView: false,
				
				editorText: '',editorLastCursor: null,
				emotionList: emotionJson,commentList: commentJson,
			}
		},
		methods: {
			show() {this.popupVisible = true
			},
			close() {this.popupVisible = false
			},
			handleShowFloatInput() {this.showFloatInputView = true
				this.showEmotionView = true
			},
			handleShowEmotion() {this.showEmotionView = true
			},
			bindEditorInput(e) {this.editorLastCursor = e.detail.cursor
			},
			bindEditorFocus(e) {
				
			},
			bindEditorBlur(e) {this.editorLastCursor = e.detail.cursor
			},
			handleEmotionTaped(emoj) {
				if(emoj == 'del') return
			let startStr = this.editorText.substr(0, this.editorLastCursor)
				let endStr = this.editorText.substr(this.editorLastCursor)
			this.editorText = startStr + `${emoj}` + endStr
			},
			isEmpty(html) {
			return html.replace(/\r\n|\n|\r/, "").replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "") == ""
			},
			handleSubmit() {
			if(this.isEmpty(this.editorText)) return
				let cmtlist = this.commentList
			let len = cmtlist.length
				let data = {
					id: `msg${++len}`,avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',msg: this.editorText,time: new Date().toLocaleString(),like: ''
				}
			cmtlist.unshift(data) //插入到数组第一个
				this.commentList = cmtlist
			this.editorText = ''
			this.showFloatInputView = false
			},
			handleLongPressMenu() {
			let uniPop = this.$refs.uniPop
			uniPop.show({
				skin: 'androidSheet',contentStyle: 'font-size:16px;font-weight:700;padding-bottom:5px;',
				btns: [{text: '回复',},{text: '私信回复',},{text: '转发',},{text: '复制',},{text: '举报',},
					]
				})
			},
		}
	}
</script>

<style scoped>
.pop__ui_panel {display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; position: fixed; left: 0; top: 0; z-index: 201909; pointer-events: none;}
.pop__ui_mask {background: #000; opacity: 0; height: 100%; width: 100%; position: fixed; left: 0; top: 0; pointer-events: auto; touch-action: none; animation: anim_mask .5s;}
.pop__ui_child {background: #fff; border-radius: 12px 12px 0 0; font-size: 14px; overflow: hidden; pointer-events: auto; margin: 0 auto; width: 100%; position: fixed; bottom: 0; left: 0; right: 0;}
.pop__ui_head {font-size: 28upx; font-weight: 700; padding: 30upx; text-align: center;}
.wrap_commentPanel {height: 900upx;}.wrap_cmtList {overflow: auto;}
.wrap_cmtList .item {padding: 30upx; position: relative;}.wrap_cmtList .item:after {content: ''; background: #dbdbdb; height: 1px; width: 100%; position: absolute; left: 50px; bottom: 0; transform: scaleY(0.5); transform-origin: 0 100%;}
.wrap_cmtList .item:last-child:after {display: none;}.wrap_cmtList .item .avator {border-radius: 50%; margin-right: 30upx; height: 30px; width: 30px;}
.wrap_cmtList .item .cmtinfo .name {color: #999; font-size: 24upx;}.wrap_cmtList .item .cmtinfo .cnt {font-size: 28upx; display: block; margin-top: 10upx;}
.wrap_cmtList .item .cmtinfo .time {color: #bbb; font-size: 24upx; margin-top: 10upx;}.wrap_cmtList .item .like {color: #bbb; font-size: 24upx; text-align: center; padding-left: 30upx;}
.wrap_cmtList .item .like .iconfont {color: #bbb; display: block;}
.floatInput-mask {background: #000; opacity: .6; height: 100%; width: 100%; position: fixed; left: 0; top: 0; z-index: 201910; pointer-events: auto; touch-action: none; animation: anim_mask .5s;}
.floatInput-body {background: #f7f8f9; font-size: 14px; overflow: hidden; pointer-events: auto; margin: 0 auto; width: 100%; position: fixed; bottom: 0; left: 0; right: 0; z-index: 201911;}
.wrap__editorPanel {background: #fff; padding: 20upx 30upx; align-items: center;}
.wrap__editorPanel.uni_borT:before {background: #bdbdbd;}
.wrap_editor {box-sizing: border-box; overflow: hidden;}
.wrap_editor .editor {caret-color: #feb719; font-size: 14px; max-height: 100px; max-width: 100%; line-height: 1.2;}
.wrap__editorPanel .wrap_editor_btn {align-self: flex-end; justify-content: center; padding: 0 4px; height: 28px;}
.wrap__editorPanel .wrap_editor_btn .iconfont {color: #999; font-size: 25px;}
.wrap__editorPanel .btn_submit {background: none!important; border-radius: 20px; font-size: 14px; margin-left: 5px; padding: 0 3px; line-height: 28px;}
.wrap__editorPanel .btn_submit .iconfont {color: #999; font-size: 25px;}.wrap_emotion {height: 580upx;}
.wrap_emotion .emotion__cells {height: 100%; position: relative;}.emotion__cells .face_list {display: flex; flex-wrap: wrap; margin-right: -15upx; padding: 30upx 0 0 20upx;}
.emotion__cells .face_list .item {display: flex; align-items: center; justify-content: center; margin-top: 40upx; margin-right: 15upx; height: 90upx; width: 90upx; /*background: red;*/}
.emotion__cells .face_list .item:active {background: #ebebeb;}
.emotion__cells .face_list .item .emoj {font-size: 50upx;}
.emotion__cells .face_list .item .del {height: 60upx; width: 60upx;}
.anim-footer {animation: anim_footer .3s;}
@keyframes anim_footer{from{opacity: 0; transform: translateY(100%);} to{opacity: 1; transform: none;}
}
@keyframes anim_mask {0% {opacity: 0;}}
</style>
