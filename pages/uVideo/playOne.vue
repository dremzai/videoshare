<template>
	<view class="uni__container uni__videopage flexbox flex_col">
		<header-bar :isBack="true" v-if="!homeHeader" title=" " :bgColor="{background: 'transparent'}" center transparent>
			<text slot="back" class="uni_btnIco iconfont icon-close"></text>
		</header-bar>
		<header-bar :isBack="false" v-if="homeHeader" title=" " :bgColor="{background: 'transparent'}" center transparent>
			<text slot="headerL" class="uni_btnIco iconfont icon-close" @tap="onHome"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex"
				@change="handleSlider" style="height: 100%;">
				<block v-for="(item,index) in vlist" :key="index">
					<swiper-item vertical="true">
						<view class="uni_vdplayer">
							<video :id="'myVideo' + index" :ref="'myVideo' + index" class="player-video"
								:src="item.videoUrl" :controls="false" :loop="true" :show-center-play-btn="false"
								objectFit="contain" z-index="0"></video>
							<view z-index="9999" class="vd-footToolbar flexbox flex_alignb">
								<view class="vd-info flex1">
									<view class="item at">
										<view class="kw" style="vertical-align: top;"> {{item.numShow}}次浏览</view>
										<view class="kw" style=" overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">#{{item.sponsorNickName}} </view>

									</view>
									<view class="item subtext">{{item.themeDesc}}</view>
									<view class="item uinfo flexbox flex_alignc">
										<image class="avator" :src="shareUserData.userHeadpic" mode="aspectFill" />
										<text class="name">{{shareUserData.nickName}}</text> 
									</view>
								</view>
								<view class="vd-sidebar">

									<view class="ls" @click="handleIsLike(index,item)"><text class="iconfont icon-like"
											v-if="item.isLike == -1"></text>
										<text class="iconfont icon-like" style="color: red;" v-else></text><text
											class="num">{{ item.numLike }}</text>
									</view>
									<view class="ls" @tap="handleVideoComment(item)"><text
											class="iconfont icon-liuyan"></text><text
											class="num">{{item.numComment}}</text></view>

									<button type="default" open-type="share" plain="true" v-show="item.status==1"> 
										<view class="ls"><text class="iconfont icon-share"></text><text
												class="num">{{item.numRelay}}</text></view>
									</button>
									<!-- <view class="ls" @click="downloadFile(item.videoUrl)"><text class="iconfontnew icon-xiazai"></text><text
											class="num">下载</text></view> -->
								</view>
							</view>
						</view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<video-cart ref="videoCart":vlist="vlist" />
		<video-comment ref="videoComment"  :videoItem="videoCommentItem" :shareUserId="shareUserId"/>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	import videoCart from '@/components/cp-video/cart.vue'
	import videoComment from '@/components/cp-video/comment'
	let timer = null
	var shareData;
	var shareUserId=0; 
	export default {
		data() {
			return {
				videoIndex: 0,
				vlist: [],
				isPlay: true, //当前视频是否播放中
				clickNum: 0, //记录点击次数
				isLike: false,
				dataItem: {},
				listQuery: {
					isLoadMore: true,
					userId: '',
					page: 1,
					pageSize: 20,
					status:1,
				},
				isCommentShow:false,
				videoCommentItem:null,
				homeHeader:false,
				shareUserId:null,
				shareUserData:{},
				userData: {
					id: ''
				},
			}
		},
		components: {
			videoCart,
			videoComment
		},
		onLoad(option) {
			console.log(option) 
			shareUserId=uni.getStorageSync('user').id
			if(option.shareUserId){
				this.homeHeader = true
				shareUserId=option.shareUserId;
			}
			this.shareUserId = shareUserId
			this.videoIndex = 0
			Api.httpResponse("/stm/api/video/showVideo/getViewById", 'GET', {
				videoId: option.id
			}).then(
				res => { 
					this.dataItem=res
					this.listQuery.themeId = this.dataItem.themeId;
					this.vlist.push(this.dataItem)
					shareData = this.vlist[0]
					this.init()
					if(res.status==1){
						
						this.getList();
					}
				} 
			) 
			this.getShareUserData();
			
			this.userData = uni.getStorageSync('user')
			if (this.userData == '' || this.userData.id == '') {
				var that = this;
				wx.login({
					success(res) {
						if (res.code) {
							Api.httpResponse("/stm/api/login/wxMiniLogin", 'POST', {
								code: res.code,
								fromId:that.shareUserId
							}).then(
								resuser => {
									that.userData = resuser;
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
		onReady() {
			wx.showShareMenu({
				withShareTicket: true,
				menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		methods: {
			onHome(){
				uni.redirectTo({
					url:'/pages/theme/detail?id='+this.dataItem.themeId+'&shareUserId='+shareUserId
				})
			},
			downloadFile(url) {
				uni.downloadFile({
					url: url,
					success: (res) => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败，请稍后重试",
										icon: "none"
									});
								}
							});
						}
					}
				});
			},
			init() {
				this.videoContextList = []
				for (var i = 0; i < this.vlist.length; i++) {
					this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
				}
				setTimeout(() => {
					this.play(this.videoIndex)
					this.getAddShowNum();
				}, 200)
			},
			handleSlider(e) {
				let curIndex = e.detail.current
				console.log(curIndex, this.videoIndex)
				this.videoContextList[this.videoIndex].pause()
				if (curIndex === this.videoIndex + 1) {
					this.videoContextList[this.videoIndex + 1].play()
					this.isPlay = true
				} else if (curIndex === this.videoIndex - 1) {
					this.videoContextList[this.videoIndex - 1].play()
					this.isPlay = true
				}
				this.$nextTick(() => {
				    this.videoIndex = curIndex
				});
				
				shareData = this.vlist[curIndex]
				this.getAddShowNum();
			},
			play(index) {
				this.videoContextList[index].play()
				this.isPlay = true
			},
			handleAttention(index) {
				let vlist = this.vlist
				vlist[index].attention = !vlist[index].attention
				this.vlist = vlist
			},
			// 喜欢
			handleIsLike(index, item) {
				console.log(this.vlist)
				Api.httpResponse("/stm/api/video/showDate/likeOrNot", 'POST', {
						isLike: item.isLike == -1 ? 1 : -1,
						videoId:item.id,
						shareUserId:shareUserId,
				}).then(
					res => { 
						if(item.isLike===1){
							item.numLike=item.numLike-1;
						}
						else{
							item.numLike=item.numLike+1;
						}
						this.$set(this.vlist[index], 'isLike', item.isLike == -1 ? 1 : -1)
					},
					error => {
						uni.showToast({
							title: "操作失败！",
							icon: "none"
						});
						console.log(error);
					}
				)
			},
			handleVideoComment(item) {
				if (this.userData != '' && this.userData.id != ''&& this.userData.nickName != null) { 
					this.isCommentShow = true
					this.videoCommentItem = item
					this.$refs.videoComment.show()
				}
				else{
					this.getWxUserInfo();
				}
			},
			handleVideoCart(index) {
				this.$refs.videoCart.show(index)
			},
			getList() {
				Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
					res => {
						var len = this.vlist.length;
						for (var i = 0; i < res.records.length; i++) {
							this.vlist.push(res.records[i])
							this.videoContextList.push(uni.createVideoContext('myVideo' + (len + i), this));
						}
					},
					error => {
						console.log(error);
					}
				)
			}, 
			getAddShowNum(){//添加视频浏览量
				Api.httpResponse("/stm/api/video/showDate/showVideo", 'POST', {
					videoId:shareData.id,
					shareUserId:shareUserId,
					}).then(res => {
						 
					},
					error => {
						console.log(error);
					}
				)
			},
			getShareUserData(){
				Api.httpResponse("/stm/api/user/showUser/getById", 'GET', {
					id:shareUserId, 
					}).then(res => {
						 this.shareUserData=res;
					},
					error => {
						console.log(error);
					}
				)
			}, 
			getWxUserInfo(){ 
				uni.showLoading({
					title: "获取中...",
					mask: true
				})
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						uni.hideLoading()
						this.userData.nickName = res.userInfo.nickName;
						this.userData.userHeadpic = res.userInfo.avatarUrl;
						this.userData.prov = res.userInfo.province;
						this.userData.city = res.userInfo.city;
						this.$store.commit('SET_USER', this.userData)
						Api.httpResponse("/stm/api/user/showUser/saveOrUpdate", 'POST', this.userData).then(
							resUser => { 
							},
							error => {
								console.log(error);
							}
						)
					}
				})
			},
		}, 
		onShareAppMessage: (res) => {   //分享到朋友群聊 
			Api.httpResponse("/stm/api/video/showDate/save", 'POST', {
				videoId:shareData.id,
				shareUserId:shareUserId,
				}).then(res => {
					 shareData.numRelay=shareData.numRelay+1;
				},
				error => {
					console.log(error);
				}
			)
			return {
				title: shareData.themeDesc,
				path: '/pages/uVideo/playOne?id='+shareData.id+'&shareUserId=' + shareUserId,
				imageUrl: shareData.videoPic
			}
		}, 
		onShareTimeline: (res) => {   //分享到朋友圈 
			Api.httpResponse("/stm/api/video/showDate/save", 'POST', {
				videoId:shareData.id,
				shareUserId:shareUserId,
				}).then(res => {
					 shareData.numRelay=shareData.numRelay+1;
				},
				error => {
					console.log(error);
				}
			)
			return {
				title: shareData.themeDesc,
				query: 'id='+shareData.id+'&shareUserId=' + shareUserId,
				imageUrl: shareData.videoPic
			}
		}
	}
</script>

<style scoped>
	.vd-sidebar .iconfontnew {
		font-size: 60rpx;
		color: #FFFFFF;
	}

	button {
		border: none !important;
		line-height: initial !important;
		padding-left: 0 !important;
		margin: 0 !important;
		text-align: left !important;
		padding-right: 0 !important;
	}
</style>
