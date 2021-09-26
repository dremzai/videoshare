<template>
	<view class="uni__container uni__videopage flexbox flex_col">
		<header-bar :isBack="true" title=" " :bgColor="{background: 'transparent'}" center transparent>
			<text slot="back" class="uni_btnIco iconfont icon-close"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex"
				@change="handleSlider" style="height: 100%;">
				<block v-for="(item,index) in vlist" :key="index">
					<swiper-item vertical="true">
						<view class="uni_vdplayer">
							<video :id="'myVideo' + index" :ref="'myVideo' + index" class="player-video"
								:src="item.videoUrl" :controls="false" :loop="true" :show-center-play-btn="false"
								objectFit="fill" z-index="0"></video> 
							<view z-index="999" class="vd-footToolbar flexbox flex_alignb">
								<view class="vd-info flex1">
									<view class="item at">
										<view class="kw"> {{item.numShow}}次浏览 </view>
										<view class="kw"> {{item.themeTitle}} </view>
									</view>
									<view class="item subtext">{{item.themeDesc}}</view>
									<view class="item uinfo flexbox flex_alignc">
										<image class="avator" :src="item.userHeadpic" mode="aspectFill" /><text
											class="name">{{item.sponsorNickName}}</text>
									</view>
								</view>
								<view class="vd-sidebar">

									<view class="ls"><text class="iconfont icon-like"></text><text
											class="num">{{ item.numLike }}</text></view>
									<view class="ls"><text class="iconfont icon-liuyan"></text><text
											class="num">{{item.numComment}}</text></view>
									
											<button type="default" open-type="share" plain="true">
												
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
		<video-cart ref="videoCart" :vlist="vlist" />
		<video-comment ref="videoComment" />
	</view>
</template>

<script> 
	import Api from '../../utils/requestApi.js'
	import videoCart from '@/components/cp-video/cart.vue'
	import videoComment from '@/components/cp-video/comment'
	let timer = null
	export default {
		data() {
			return {
				videoIndex: 0, 
				vlist: [],
				isPlay: true, //当前视频是否播放中
				clickNum: 0, //记录点击次数
				isLike: false,
				dataItem: {},
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:20,
				},
			}
		},
		components: {
			videoCart,
			videoComment
		},
		onLoad(option) {
			this.videoIndex = parseInt(option.index)
			this.dataItem = JSON.parse(decodeURIComponent(option.dataItem));
			this.listQuery.themeId=this.dataItem.themeId;
			this.vlist.push(this.dataItem)
			this.getList();
		},
		onReady() {
			wx.showShareMenu({
			  withShareTicket: true,
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			this.init()
		},
		methods: {
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
				}, 200)
			},
			handleSlider(e) {
				let curIndex = e.detail.current 
				console.log(curIndex,this.videoIndex)
				this.videoContextList[this.videoIndex].pause()
				if (curIndex === this.videoIndex + 1) {
					this.videoContextList[this.videoIndex + 1].play()
					this.isPlay = true
				} else if (curIndex === this.videoIndex - 1) {
					this.videoContextList[this.videoIndex - 1].play()
					this.isPlay = true
				}
				this.videoIndex = curIndex
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
			handleIsLike(index) {
				let vlist = this.vlist
				vlist[index].islike = !vlist[index].islike
				this.vlist = vlist
			},
			handleVideoComment() {
				this.$refs.videoComment.show()
			},
			handleVideoCart(index) {
				this.$refs.videoCart.show(index)
			},
			getList(){  
				 Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET',this.listQuery).then(
					res => {      
						    var len=this.vlist.length;
							for (var i = 0; i < res.records.length; i++) { 
								this.vlist.push(res.records[i])
								this.videoContextList.push(uni.createVideoContext('myVideo' + (len+i), this));
							} 
					},
					error => {
						console.log(error);
					}
				 ) 
			},
			toShare(item){
				// wx.getShareInfo({
				// 	shareTicket:item.themeDesc,
				// 	success (res) {
				// 		console.log(111,res)
				// 	},
				// 	fail(res){ 
				// 		console.log(22)
				// 	}
				// })
				
				// callback 写法
				  // wx.downloadFile({
				  //   url: item.videoUrl, // 下载url
				  //   success (res) {
				  //     // 下载完成后转发
				  //     wx.shareVideoMessage({
				  //       videoPath: res.tempFilePath,
				  //       success() {},
				  //       fail: console.error,
				  //     })
				  //   },
				  //   fail: console.error,
				  // })
				
				  // // async await 写法
				  // const { tempFilePath } = await wx.downloadFile({
				  //   url: URL, // 下载url
				  // })
				  // // 下载完成后转发
				  // await wx.shareVideoMessage({
				  //   videoPath: res.tempFilePath,
				  // })

			}
		},
			 onShareAppMessage: (res)=> {
			    return {
			      title: '分享视频',
			      path: '/pages/uVideo/playOne',
			      // imageUrl: '**.png',
			      success: function (shareTickets) {}, //该函数无用，没有执行
			      fail: function (res) {}, //该函数无用，没有执行
			      complete:function(res){} //该函数无用，没有执行
			    }
			  }
	}
</script>

<style scoped>
	.vd-sidebar .iconfontnew {
		font-size: 60rpx;
		color: #FFFFFF;
	}
	button{
		    border: none !important;
		    line-height: initial !important;
		    padding-left: 0 !important;
		    margin: 0 !important;
		    text-align: left !important;
		    padding-right: 0 !important;
	}
</style>
