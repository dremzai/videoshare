/**
* @tpl 小视频列表模板
*/

<template>
	<view class="uni__videoWrapper">
		<mescroll-uni ref="mescrollRef" :height="height + 'px'" @down="downCallback" @up="upCallback" :down="{auto:false}" :up="{auto:false}">
		<view class="uni_videoLs">
			<block v-for="(item,index) in dataList" :key="index">
				<view class="item" @tap="GoVideoPlay(item)">
					<image class="v-thumb" :src="item.videoPic" mode="aspectFill" />
					<view class="v-ftinfo">
						<!-- <view class="title flexbox flex_alignb">{{item.videoTitle}}</view> -->
						<view class="flexbox flex_alignc">
							<view class="play flex1"><text class="iconfont icon-bofang"></text> {{item.numShow}}人次观看</view>
							<text class="like" style="margin-left: 15px;" v-if="item.status===1">{{item.numLike}}个赞</text>
							<text class="like like_y" style="margin-left: 15px;" v-else>审核中</text>
						</view>
					</view>
					<view class="user_mark">
						<view class="subscript" v-if="item.videoUserId===item.themeUserId">
							<image class="subscript_img" src="../../static/mark1.png" mode=""></image>
							<text class="subscript_text">官方</text>
						</view>
						<view class="subscript" v-else-if="item.videoUserId===userData.id">
							<image class="subscript_img" src="../../static/mark.png" mode=""></image>
							<text class="subscript_text">我的</text>
						</view>
					
					</view>
				</view>
			</block>
		</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Api from '../../utils/requestApi.js'
	const videoJson = require('./mock-video.js')
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			height: Number
		},
		data() {
			return {
				videoList: videoJson,
				dataList: [],
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:10,
				},
				userData:{},
			}
		}, 
		mounted() { 
			this.userData = uni.getStorageSync('user')
			this.listQuery.userId = this.userData.id;
			this.getList();
		},
		methods: {
			// /*下拉刷新的回调, 有3种处理方式:*/
			downCallback() { 
				this.listQuery.page = 1
				this.listQuery.isLoadMore=true;
				this.dataList = []
				this.getList() 
			},
			// /*上拉加载的回调*/
			upCallback() {  
					this.listQuery.page += 1
					this.getList() 
			},
			getList(refresh){  
				Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
					res => { 
						this.dataList=this.dataList.concat(res.records);
						if(this.listQuery.page>=res.pages){
							this.listQuery.isLoadMore=false;
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
			GoVideoPlay(item) {
				if(item.status!=1){
					uni.showToast({
						title: "内容审核中",
						icon: "none"
					});
					return;
				}
				console.log(item)
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
			}
		}
	}
</script>

<style scoped lang="scss">
.user_mark {
		color: #FFF;
		line-height: 44rpx;
		position: absolute;
		left: 0rpx;
		top: 0rpx;
	}

	.subscript {
		position: relative;

		.subscript_img {
			width: 140rpx;
			height: 140rpx;
		}

		.subscript_text {
			transform: rotate(-46deg);
			position: absolute;
			display: inline-block;
			width: 106rpx;
			left: 0px;
			top: 35rpx;
			text-align: center;
			z-index: 20;
			font-size: 26rpx;
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
