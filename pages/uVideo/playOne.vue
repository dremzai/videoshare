<template>
	<view class="uni__container uni__videopage flexbox flex_col">
		<header-bar :isBack="true" title=" " :bgColor="{background: 'transparent'}" center transparent>
			<text slot="back" class="uni_btnIco iconfont icon-close"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
			<swiper :indicator-dots="false" :duration="200" :vertical="true" :current="videoIndex"
				@change="handleSlider" style="height: 100%;">
				<block v-for="(item,index) in vlist" :key="index">
					<swiper-item>
						<view class="uni_vdplayer">
							<video :id="'myVideo' + index" :ref="'myVideo' + index" class="player-video"
								:src="item.videoUrl" :controls="false" :loop="true" :show-center-play-btn="false"
								objectFit="fill" z-index="0"></video>
							<view z-index="999" class="vd-cover flexbox" @click="handleClicked(index)"><text
									v-if="!isPlay" class="iconfont icon-bofang"></text></view>
							<view z-index="999" class="vd-footToolbar flexbox flex_alignb">
								<view class="vd-info flex1">
									<view class="item at">
										<view class="kw">
											{{item.numShow}}次浏览
										</view>
									</view>
									<view class="item subtext">{{item.videoTitle}}</view>
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
									<view class="ls"><text class="iconfont icon-share"></text><text
											class="num">{{item.numRelay}}</text></view>
									<view class="ls" @click="downloadFile(item.videoUrl)"><text class="iconfontnew icon-xiazai"></text><text
											class="num">{{item.numRelay}}</text></view>
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
	const videoJson = require('./mock-video.js')
	import videoCart from '@/components/cp-video/cart.vue'
	import videoComment from '@/components/cp-video/comment'
	let timer = null
	export default {
		data() {
			return {
				videoIndex: 0,
				// vlist: videoJson,
				vlist: [],
				isPlay: true, //当前视频是否播放中
				clickNum: 0, //记录点击次数
				isLike: false,
				dataItem: {},
			}
		},
		components: {
			videoCart,
			videoComment
		},
		onLoad(option) {
			this.videoIndex = parseInt(option.index)
			this.dataItem = JSON.parse(decodeURIComponent(option.dataItem));
			this.vlist.push(this.dataItem)
		},
		onReady() {
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
					// this.videoContextList.push(this.$refs['myVideo' + i][0])
					this.videoContextList.push(uni.createVideoContext('myVideo' + i, this));
				}
				setTimeout(() => {
					this.play(this.videoIndex)
				}, 200)
			},
			handleSlider(e) {
				let curIndex = e.detail.current
				if (this.videoIndex >= 0) {
					this.videoContextList[this.videoIndex].pause()
					this.videoContextList[this.videoIndex].seek(0)
					this.isPlay = false
				}
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
			pause(index) {
				this.videoContextList[index].pause()
				this.isPlay = false
			},
			handleClicked(index) {
				if (timer) {
					clearTimeout(timer)
				}
				this.clickNum++
				timer = setTimeout(() => {
					if (this.clickNum >= 2) {} else {
						if (this.isPlay) {
							this.pause(index)
						} else {
							this.play(index)
						}
					}
					this.clickNum = 0
				}, 300)
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
		}
	}
</script>

<style scoped>
	.vd-sidebar .iconfontnew {
		font-size: 60rpx;
		color: #FFFFFF;
	}
</style>
