/**
* @tpl 首页模板
*/

<template>
	<view class="fz_container">
		<header-bar id="header_bar" :isBack="true" v-if="!homeHeader" title="首页" titleTintColor="#353535"
			:bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text>
		</header-bar>
		<header-bar id="header_bar" :isBack="false" v-if="homeHeader" title="首页" titleTintColor="#353535"
			:bgColor="{background: '#f4f4f4'}">
			<text slot="headerL" class="uni_btnIco iconfont icon-back" @tap="onHome"></text>
		</header-bar>
		<mescroll-uni ref="mescrollRef" :height="scrollH+ 'px'" @down="downCallback" @up="upCallback"
			:down="{auto:false}" :up="{auto:false}">
			<view class="fz_item flexbox uni__material">
				<image class="fzitem_avator" :src="dataItem.sponsorUserHeadpic" mode="aspectFill" />
				<view class="fzitem_content flex1" @longtap="copyVal(dataItem.themeDesc)">
					<text class="fz_user">{{dataItem.sponsorNickName}}</text>
					<view class="mt_5">
						<!-- <view class="uni-age" style="width:120px;">奖金池：￥{{dataItem.remainThemeToMoneyStr}}</view>
					<view class="uni-vip v1 ml_5" style="width:60px;">还剩{{dataItem.endDay}}天</view> -->
						<view class="mark">
							<text class="iconfont icon-zan"></text>
							<text style="line-height: 44rpx; color: #d9480f;">{{dataItem.themeTitle}}</text>
						</view>
					</view>
					<view class="fz_cnts"> {{dataItem.themeDesc}}
						<span v-show="userData.id==dataItem.themeUserId">#{{dataItem.themeKey}}#</span>
					</view>
					<view class="fz_foot flexbox flex_alignc">
						<view class="flex1"><text class="fz_time">{{dataItem.totalNumVideo}}个作品</text>
							<view class="uni-distance ml_10">
								<text class="iconfont "></text>{{dataItem.totalNumRelay}}个转发
							</view>
							<text class="c_bbb fs_12 ml_10">{{dataItem.totalNumLike}}个赞</text>
							<text class="c_bbb fs_12 ml_10">{{dataItem.totalNumComment}}个评论</text>
						</view>
					</view>
				</view>
			</view>

			<view class="uni_videoLs">
				<block v-for="(item,index) in dataList" :key="index">
					<view class="item" @tap="GoVideoPlay(item)">
						<image class="v-thumb" :src="item.videoPic" mode="aspectFill" />
						<view class="v-ftinfo">
							<!-- <view class="title flexbox flex_alignb">{{item.videoTitle}}</view> -->
							<view class="flexbox flex_alignc">
								<view class="play flex1"><text class="iconfont icon-bofang"
										style="display: inline-block;margin-right: 10rpx;"></text> {{item.numShow}}次浏览
								</view>
								<text class="like" style="margin-left: 15px;"
									v-if="item.status===1">{{item.numLike}}个赞</text>
								<text class="like like_y" style="margin-left: 15px;" v-else>审核中</text>
							</view>
						</view>
					<!-- 	<view class="user_mark">
							<view class="subscript" v-if="item.videoUserId===item.themeUserId">
								<image class="subscript_img" src="../../static/mark1.png" mode=""></image>
								<text class="subscript_text">官方</text>
							</view>
							<view class="subscript" v-else-if="item.videoUserId===userData.id">
								<image class="subscript_img" src="../../static/mark.png" mode=""></image>
								<text class="subscript_text">我的</text>
							</view>

						</view> -->
					</view>
				</block>
			</view>
			<view class="join" @tap="toActivity">
				上传视频<text class="iconfont icon-send"></text>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Api from '../../utils/requestApi.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin 
		data() {
			return {
				dataItem: {},
				dataList: [],
				listQuery: {
					isLoadMore: true,
					userId: '',
					page: 1,
					pageSize: 10,
				},
				userData: {
					id: ''
				},
				homeHeader: false,
				shareUserId: '',
				scrollH: 0
			}
		},
		onReady() {
			let that = this;
			uni.getSystemInfo({ //调用uni-app接口获取屏幕高度
				success(res) { //成功回调函数

					that._data.pH = res.windowHeight //windoHeight为窗口高度，主要使用的是这个
					let tab_bar = uni.createSelectorQuery().select("#tab_bar"); //想要获取高度的元素名（class/id）


					let heightA = 0
					let heightB = 0
					// that._data.navHeight = pH-data.top  //计算高度：元素高度=窗口高度-元素距离顶部的距离（data.top）
					let header_bar = uni.createSelectorQuery().select("#header_bar");
					header_bar.boundingClientRect(data => {


						that._data.scrollH = res.windowHeight - data.bottom
						console.log(that._data)
					}).exec()


				}
			})
		},
		onLoad(option) {

			if (option.shareUserId) {
				this.homeHeader = true
				this.shareUserId = option.shareUserId
			}
			this.userData = uni.getStorageSync('user')
			Api.httpResponse("/stm/api/video/showTheme/getViewById", 'GET', {
				themeId: option.id
			}).then(
				res => {
					this.dataItem = res
					this.dataList = [];
					this.listQuery.page = 1
					this.listQuery.themeId = this.dataItem.id;
					this.getList();
				}
			)
			if (this.userData == '' || this.userData.id == '') {
				var that = this;
				wx.login({
					success(res) {
						if (res.code) {
							Api.httpResponse("/stm/api/login/wxMiniLogin", 'POST', {
								code: res.code,
								fromId: that.shareUserId
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
		methods: {
			// /*下拉刷新的回调, 有3种处理方式:*/
			downCallback() {
				this.listQuery.page = 1
				this.listQuery.isLoadMore = true;
				this.dataList = []
				this.getList()
			},
			// /*上拉加载的回调*/
			upCallback() {
				this.listQuery.page += 1
				this.getList()
			},
			onHome() {
				uni.redirectTo({
					url: '/pages/index/index'
				})
			},
			toActivity() {
				if (this.userData != '' && this.userData.id != '' && this.userData.nickName != null) {
					uni.navigateTo({
						url: '/pages/theme/create?dataItem=' + encodeURIComponent(JSON.stringify(this.dataItem))
					})
					return;
				}
				this.getWxUserInfo()
			},
			getWxUserInfo() {
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
							resUser => {},
							error => {
								console.log(error);
							}
						)
					}
				})
			},
			getList() {
				Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
					res => {
						this.dataList = this.dataList.concat(res.records);
						if (this.listQuery.page >= res.pages) {
							this.listQuery.isLoadMore = false;
						}
						this.mescroll.endSuccess()
						this.mescroll.endByPage(this.dataList, res.total);
					},
					error => {
						console.log(error);
						this.mescroll.endSuccess()
						this.mescroll.endByPage();
					}
				)
			},
			copyVal(val) {
				uni.setClipboardData({
					data: val, //要被复制的内容
					success: () => { //复制成功的回调函数
						uni.showToast({ //提示
							title: '复制成功',
							icon: "none"
						})
					}
				});
			},
			GoVideoPlay(item) {
				if (item.status != 1) {
					uni.showToast({
						title: "内容审核中",
						icon: "none"
					});
					return;
				}
				if (this.userData != '' && this.userData.id != '' && this.userData.nickName != null) {
					// #ifndef APP-PLUS
					uni.navigateTo({
						url: '/pages/uVideo/playOne?index=' + 0 + '&id=' + item.id
					})
					// #endif
					// #ifdef APP-PLUS
					console.log(123123)
					uni.navigateTo({
						url: '/pages/uVideo/subnvue/playerOne?index=' + 0 + '&id=' + item.id
					})
					// #endif
					return;
				}
				this.getWxUserInfo()
			}
		}
	}
</script>

<style scoped lang="scss">
	.join {
		position: fixed;
		bottom: 50rpx;
		right: 20rpx;
		line-height: 70rpx;
		font-size: 30rpx;
		color: #FFF;
		background-color: #f03e3e;
		font-weight: bold;
		border-radius: 99rpx;
		padding: 0 30rpx;
		box-shadow: 0rpx 0rpx 20rpx 4rpx rgba($color: #000, $alpha: 0.2);
		animation: bounce 1.5s .3s ease infinite;

		.icon-send {
			display: inline-block;
			margin-left: 10rpx;
		}
	}


	@keyframes bounce {

		0%,
		20%,
		50%,
		80%,
		100% {
			-webkit-transform: translateY(0)
		}

		40% {
			-webkit-transform: translateY(-30rpx)
		}

		60% {
			-webkit-transform: translateY(-15rpx)
		}
	}

	.mark {
		background: #fff4e6;
		padding: 20rpx 40rpx;
		border-radius: 14rpx;
		margin: 20rpx 0;

		.icon-zan {
			animation: wobble 1s .2s ease infinite;
			font-size: 40rpx;
			color: #ffa94d;
			margin-right: 20rpx;
		}
	}

	.user_mark {
		color: #FFF;
		line-height: 44rpx;
		position: absolute;
		 left: -14rpx;
		 top: -14rpx;
	}

	.subscript {
		position: relative;

		.subscript_img {
			    width: 100rpx;
			    height: 100rpx;
		}
		
		.subscript_text {
			          transform: rotate(-46deg);
			          position: absolute;
			          display: inline-block;
			          width: 77rpx;
			          left: 0px;
			          top: 20rpx;
			          text-align: center;
			          z-index: 20;
			          font-size: 24rpx;
			          font-weight: bold;
		}
	}
	.like_y{
		background-color: #f59f00;
		padding: 0 14rpx;
		font-size: 22rpx !important;
		line-height: 38rpx;
		border-radius: 10rpx;
		border-radius: 7rpx;
	}
</style>
