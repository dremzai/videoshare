
<template>
	<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="猪猪佩奇" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}"><text slot="back" class="uni_btnIco iconfont icon-back"></text><text slot="string" class="uni_btnString bg_linear2 mr_5" style="border-radius:20px;color: #fff;padding:5px 15px;">关注</text><text slot="string" class="uni_btnString mr_5" @tap="GoChatSeting"><text class="uni_btnIco iconfont icon-dots" style="padding: 0;"></text></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<scroll-view id="scrollview" scroll-y="true" :scroll-top="scrollTop" @tap="msgPanelTaped" style="height: 100%;">
			<view class="uni-chatMsgCnt" id="msglistview">
				<block v-for="(item,index) in messageList" :key="index"><view v-if="item.msgtype == 1" class="msgitem time"><text class="msg_text">{{item.msg}}</text></view><view v-if="item.msgtype == 2" class="msgitem notice"><text class="msg_text">{{item.msg}}</text></view>
					<view v-if="item.msgtype == 3" class="msgitem" :class="item.isme ? 'me' : 'others'">
					<navigator v-if="!item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
					<view class="content">
								<view class="author">{{item.author}}</view><view class="msg" @longpress="handleLongPressMenu($event)">
									<text>{{item.msg}}</text></view>
							</view><navigator v-if="item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
					</view>
				<view v-if="item.msgtype == 4" class="msgitem" :class="item.isme ? 'me' : 'others'">
					<navigator v-if="!item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
						<view class="content"><view class="author">{{item.author}}</view><view class="msg lgface" @longpress="handleLongPressMenu($event)"><image class="img_lgface" :src="item.imgsrc" mode="widthFix" />
								</view></view><navigator v-if="item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
						</view><view v-if="item.msgtype == 5" class="msgitem" :class="item.isme ? 'me' : 'others'">
							<navigator v-if="!item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
							<view class="content"><view class="author">{{item.author}}</view><view class="msg picture" @tap="handlePreviewImage(item.imgsrc)" @longpress="handleLongPressMenu($event)"><image class="img_pic" :src="item.imgsrc" mode="widthFix" />
								</view>
					</view><navigator v-if="item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
						</view><view v-if="item.msgtype == 7" class="msgitem" :class="item.isme ? 'me' : 'others'">
							<navigator v-if="!item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
							<view class="content"><view class="author">{{item.author}}</view>
								<view class="msg redpacket" @tap="handleOpenRedPacket" @longpress="handleLongPressMenu($event)"><view class="rp-card flexbox flex_alignc">
							<text class="rp-iconfont iconfont icon-hongbao"></text><view class="flex1">
								<text class="rp-title">{{item.msg}}</text><text class="rp-status">查看红包</text></view></view><view class="rp-type">普通红包</view>
								</view>
							</view><navigator v-if="item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
						</view>
				<view v-if="item.msgtype == 8" class="msgitem" :class="item.isme ? 'me' : 'others'"><navigator v-if="!item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
							<view class="content">
					<view class="author">{{item.author}}</view><view class="msg location" @tap="handleOpenLocation(item.msg)" @longpress="handleLongPressMenu($event)">
						<view class="poi-title ellipsis">{{item.msg.name}}</view><view class="poi-address ellipsis">{{item.msg.address}}</view><image class="poi-thumb" src="/static/placeholder/location_img.png" mode="aspectFill" />
								</view>
					</view><navigator v-if="item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
						</view>
					<view v-if="item.msgtype == 9" class="msgitem" :class="item.isme ? 'me' : 'others'"><navigator v-if="!item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
							<view class="content"><view class="author">{{item.author}}</view><view class="msg gift" @longpress="handleLongPressMenu($event)">
									<image class="gift-thumb" :src="item.msg.image" mode="aspectFill" /><view class="gift-name ellipsis">{{item.msg.name}}</view><view class="gift-coin ellipsis">-{{item.msg.coin}} <text class="iconfont icon-coin"></text></view></view>
							</view><navigator v-if="item.isme" class="avator" url="/pages/ucenter/uhome"><image :src="item.avator" mode="aspectFill" /></navigator>
						</view></block></view></scroll-view>
		</view>
		<view class="uni__footToolbar">
			<view class="uni__editorPanel flexbox"><view class="uni_editor flex1">
			<textarea class="editor" v-model="editorText" show-confirm-bar="false" cursor-spacing="15" :selection-start="editorLastCursor" :selection-end="editorLastCursor" auto-height 
					@input="bindEditorInput" @focus="bindEditorFocus" @blur="bindEditorBlur" placeholder="说点什么..."
					/></view><view class="uni_editor_btn" @tap="swtEmotionChooseView(1)"><text class="iconfont icon-emoj"></text></view><view class="uni_editor_btn btn_submit uni__btn-primary bg_linear2" @tap="handleSubmit"><text class="iconfont icon-send"></text></view>
			</view>
			<view class="uni__operatePanel flexbox"><view class="item"><text class="iconfont icon-yuyin"></text></view><view class="item" @tap="handleLaunchImage"><text class="iconfont icon-tupian"></text></view>
				<view class="item" @tap="swtEmotionChooseView(3)"><text class="iconfont icon-gift"></text></view><view class="item" @tap="handleChooseLocation"><text class="iconfont icon-weizhi2"></text></view><view class="item" @tap="swtEmotionChooseView(2)"><text class="iconfont icon-choose"></text></view>
			</view>
			<view class="uni__choosePanel" :style="[{'display': showFootToolbar ? 'block' : 'none'}]">
				<view class="wrap_emotion" :style="[{'display': showFootViewIndex == 1 ? 'block' : 'none'}]">
					<view class="emotion__cells flexbox flex_col">
						<block v-for="(item,index) in emotionList" :key="index"><view class="emotion__cells_swiper flex1" :class="item.selected ? 'cur' : ''">
								<swiper :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999" style="height:100%;width:100%;position:absolute;">
									<block v-for="(item2,index2) in item.lists" :key="index2">
									<swiper-item :class="item.type">
									<view class="face_list">
									<block v-for="(item3,index3) in item2.nodes" :key="index3"><view class="item" v-if="item.type == 'face__sm_list'" @tap="handleEmotionTaped(item3)"><image v-if="item3 == 'del'" class="del" src="/static/emotion_del.png" mode="widthFix" /><text v-else class="emoj">{{item3}}</text>
										</view><view class="item" v-if="item.type == 'face__lg_list'" @tap="handleGifTaped(item3)"><image :src="item3" mode="widthFix" /></view>
										</block></view>
								</swiper-item>
								</block>
								</swiper>
							</view>
						</block>
						<view class="emotion__cells_tab flexbox flex_row"><block v-for="(item,index) in emotionList" :key="index"><view class="emt_item" :class="item.selected ? 'cur' : ''" @tap="swtEmotionTab(index)"><image :src="item.pathLabel" /></view>
							</block>
						</view>
					</view>
				</view>
				<view class="wrap_choose" :style="[{'display': showFootViewIndex == 2 ? 'block' : 'none'}]"><view class="choose__cells">
				<view class="item"><view class="rect" @tap="handleLaunchCamera"><text class="iconfont icon-paizhao" style="color: #399fff;"></text></view><text class="lbl">拍摄</text></view><view class="item"><view class="rect"><text class="iconfont icon-zhendong" style="color: #eabfa2;"></text></view><text class="lbl">抖一抖</text></view><view class="item"><view class="rect"><text class="iconfont icon-wenda" style="color: #ff6ca1;"></text></view><text class="lbl">问答</text></view><view class="item"><view class="rect"><text class="iconfont icon-shoucang" style="color: #ffb90b;"></text></view><text class="lbl">我的收藏</text></view><view class="item"><view class="rect" @tap="GoRedPacket"><text class="iconfont icon-hongbao2" style="color: #f75741;"></text></view><text class="lbl">发红包</text></view><view class="item"><view class="rect"><text class="iconfont icon-mingpian" style="color: #17e5bd;"></text></view><text class="lbl">名片</text></view>
					</view>
				</view>
				<view class="wrap_choose wrap_gift" :style="[{'display': showFootViewIndex == 3 ? 'block' : 'none'}]">
				<swiper :indicator-dots="true" :duration="200" indicator-color="#dbdbdb" indicator-active-color="#999" style="height:100%;">
					<block v-for="(item,index) in giftList" :key="index">
						<swiper-item><view class="choose__cells">
						<block v-for="(item2,index2) in item.nodes" :key="index2"><view class="item" @tap="handleGivingGift(item2)"><view class="rect"><image :src="item2.image" mode="aspectFill" /></view><text class="name">{{item2.name}}</text><text class="coin">{{item2.coin}}优播币</text></view>
						</block>
						</view>
					</swiper-item>
					</block>
				</swiper>
				<view class="gift-coins flexbox flex_alignc" @tap="handleCoinRecharge"><text class="iconfont icon-jingbi c_feb719"></text><text>16865</text><text class="iconfont icon-arrR fs_12"></text></view>
				</view></view>
		</view>
		<uni-pop ref="uniPop" />
		<coin-recharge ref="coinRecharge" />
	</view>
</template>

<script>
	const emotionJson = require('./mock-emotion.js')
	const giftJson = require('./mock-gift.js')
	const messageJson = require('./mock-chat.js')
	import coinRecharge from '@/components/cp-coins/recharge.vue'
	export default {
		data() {
			return {scrollTop: 0,showFootToolbar: false,showFootViewIndex: 1,
				editorText: '',editorLastCursor: null,
				emotionList: emotionJson,giftList: giftJson,messageList: messageJson,
				previewImgArray: [],
			}
		},
		components: {coinRecharge
		},
		mounted() {this.scrollToBottom()
		},
		methods: {
			scrollToBottom(t) {
			let that = this
				let query = uni.createSelectorQuery()
			query.select('#scrollview').boundingClientRect()
			query.select('#msglistview').boundingClientRect()
				query.exec((res) => {
					if(res[1].height > res[0].height){that.scrollTop = res[1].height - res[0].height
					}
				})
			},
			msgPanelTaped() {if(!this.showFootToolbar) return
				this.showFootToolbar = false
			},
			swtEmotionChooseView(index) {this.showFootToolbar = true
				this.showFootViewIndex = index
			},
			swtEmotionTab(index) {
				let lists = this.emotionList
				for(var i = 0, len = lists.length; i < len; i++) {lists[i].selected = false
				}lists[index].selected = true
				this.emotionList = lists
			},
			bindEditorInput(e) {this.editorLastCursor = e.detail.cursor
			},bindEditorFocus(e) {
				
			},
			bindEditorBlur(e) {this.editorLastCursor = e.detail.cursor
			},
			handleEmotionTaped(emoj) {
			if(emoj == 'del') return
				let startStr = this.editorText.substr(0, this.editorLastCursor)
			let endStr = this.editorText.substr(this.editorLastCursor)
				this.editorText = startStr + `${emoj}` + endStr
			},
			handleGifTaped(path) {
				let msglist = this.messageList
				let len = msglist.length
				let data = {id: `msg${++len}`,msgtype: 4,
					isme: true,avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',msg: '',imgsrc: path,videosrc: ''
				}
			msglist = msglist.concat(data)
		this.messageList = msglist
			},
			
			// 发送消息
			isEmpty(html) {return html.replace(/\r\n|\n|\r/, "").replace(/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, "") == ""
			},
		handleSubmit() {
		if(this.isEmpty(this.editorText)) return
			let msglist = this.messageList
		let len = msglist.length
				let data = {id: `msg${++len}`,
					msgtype: 3,isme: true,avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',msg: this.editorText,imgsrc: '',videosrc: ''
				}
		msglist = msglist.concat(data)
		this.messageList = msglist
			this.editorText = ''
			},
			handleLaunchImage() {
			let that = this
			let msglist = this.messageList
			let len = msglist.length
				let data = {id: `msg${++len}`,msgtype: 5,isme: true,
					avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',msg: '',imgsrc: '',videosrc: ''
				}
		uni.chooseImage({
			count: 1,sourceType: ['album'],success: function(res){
				data.imgsrc = res.tempFilePaths.toString()
				msglist = msglist.concat(data)
			that.messageList = msglist
		}
		})
		},
		handlePreviewImage(path) {
		let msglist = this.messageList
			let imgArr = this.previewImgArray
				for(var i = 0, len = msglist.length; i < len; i++) {if(msglist[i].imgsrc != '' && msglist[i].msgtype == 5){if (imgArr.indexOf(msglist[i].imgsrc) == -1) {
				imgArr.push(msglist[i].imgsrc)
						}
					}
				}
				uni.previewImage({current: path,urls: imgArr
				})
			},
			handleLaunchCamera() {},
			handleChooseLocation() {
			let that = this
			let msglist = this.messageList
			let len = msglist.length
				let data = {
					id: `msg${++len}`,msgtype: 8,
					isme: true,avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',
					msg: '',imgsrc: '',videosrc: ''
				}
				uni.chooseLocation({success: (res) => {
						data.msg = {
							name: res.name,address: res.address,
						latitude: res.latitude,longitude: res.longitude
						}
				msglist = msglist.concat(data)
					that.messageList = msglist
					}
			})
			},
			handleOpenLocation(poi) {
				uni.openLocation({longitude: Number(poi.longitude),latitude: Number(poi.latitude),name: poi.name,address: poi.address
				})
			},
		handleGivingGift(item) {
			let that = this
			let msglist = this.messageList
				let len = msglist.length
				let data = {id: `msg${++len}`,
					msgtype: 9,isme: true,
					avator: '/static/uimg/u__chat_img18.jpg',author: '流浪少年',msg: '',imgsrc: '',videosrc: ''
				}
				let uniPop = this.$refs.uniPop
				uniPop.show({
				skin: 'android',
				title: '提示',content: `本次消费需要你支付${item.coin}优播币，确认支付吗？`,
					btns: [{text: '取消',style: 'color:#999;',
							onTap() {uniPop.close()
							}
						},
						{text: '确认',style: 'color:#feb719;',onTap() {
						data.msg = {image: item.image,name: item.name,
						coin: item.coin,
								}
						msglist = msglist.concat(data)
							that.messageList = msglist
						uniPop.close()
							}
						},
					]
				})
			},
			handleCoinRecharge() {this.$refs.coinRecharge.show()
			},
			handleLongPressMenu(e) {e.preventDefault()
		let uniPop = this.$refs.uniPop
		uniPop.show({skin: 'androidSheet',content: '操作',
					contentStyle: 'font-size:16px;font-weight:700;padding-bottom:5px;',btns: [{text: '复制消息',},{text: '转发消息',},
						{text: '删除',onTap() {uniPop.close()}
						}
					]
				})
			},
			GoChatSeting() {uni.navigateTo({url: '/pages/chat/chat-setting'})
			},GoRedPacket() {uni.navigateTo({url: '/pages/chat/redPacket/index'})
			},
			handleOpenRedPacket() {
			let uniPop = this.$refs.uniPop
		uniPop.show({content: `
						<div class="aboutme" style="font-family:simsun;text-align: center;padding:20px 0;position:relative;"><img src="./static/uimg/u__chat_img1.jpg" style="border-radius:50%;height:45px;width:45px;" /><div style="color:#ffe2b1;font-size:14px;margin-top:5px;">『猪猪佩奇』</div><div style="color:#ffe2b1;font-size:18px;margin-top:30px;">五五开黑，王者归来</div>
							<div style="background:#fbd92f;color:#8c4900;border-radius:50%;font-size:32px;margin:30px auto;line-height:90px;width:90px;position:relative;z-index:11;">開</div>
							<div style="border-radius:50%;box-shadow:0 2px 5px #e0432d;height:100%;width:200%;position:absolute;left:-50%;bottom:30%;"></div>
						</div>
					`,
					style: 'background-image: linear-gradient(180deg, #f96d52 10%, #ef4730);width:600rpx;',
				})
			},
		}
	}
</script>

<style scoped>

</style>