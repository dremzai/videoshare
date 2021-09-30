/**
* @tpl 首页模板
*/

<template>
	<view class="fz_container" style="margin: 0;padding: 0;">
		<mescroll-uni ref="mescrollRef" :height="height + 'px'" @down="downCallback" @up="upCallback" :down="{auto:false}" :up="{auto:false}">
		<view class="fz_item flexbox uni__material" v-for="(item, index) in dataList" :key="index">
			<image class="fzitem_avator" :src="item.sponsorUserHeadpic" mode="aspectFill" />
			<view class="fzitem_content flex1">
				<text class="fz_user">{{item.sponsorNickName}}</text>
				<view class="mt_5">
					<view class="uni-vip v1 ml_5" style="width:50px;" v-show="item.status!=1">审核中</view> 
				</view>
				<view class="fz_cnts">{{item.themeDesc}}</view>
				<view class="fz_photos">
					
						<view class="fz_photos_item"  @tap="GoVideoPlay(item)">
							<image class="fz_img_auto" style="width: 250px;" :src="item.videoPic"
								mode="aspectFill" />
							<text class="iconfont icon-bofang"></text>
						</view>
				</view>
				<view class="fz_foot flexbox flex_alignc">
					<view class="flex1">
						<text class="fz_time">{{item.numShow}}人次观看</text>
						<view class="uni-distance ml_10">
							<text class="iconfont "></text>{{item.numRelay}}个转发
						</view>
						<text class="c_bbb fs_12 ml_10">{{item.numLike}}个赞</text>
						<text class="c_bbb fs_12 ml_10">{{item.numComment}}个评论</text>
					</view>
				</view>
			</view>
		</view>
		</mescroll-uni>
		
		<!-- <view class="sync_video" @click="refresh">
			同步视频号
		</view> -->

	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import Api from '../../utils/requestApi.js'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			height: Number
		},
		data() {
			return {
				dataList: [],
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:5,
				},
				userData: {},
			}
		},
		mounted() {
			this.userData = uni.getStorageSync('user')
			this.listQuery.videoUserId = this.userData.id;
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
			refresh(){
				this.getList(1)
			},
			getList(refresh){   
				if(refresh){
					this.listQuery.isRefresh = 1
				}else{
					let listQuery =  JSON.parse(JSON.stringify(this.listQuery))
					delete listQuery.isRefresh
					this.listQuery = listQuery
				}
				Api.httpResponse("/stm/api/video/showVideo/myJoinViewList", 'GET', this.listQuery).then(
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

<style>
	.sync_video{
	position: fixed;
	right: 20rpx;
	top: 12vh;
	font-size: 24rpx;
	color: #ffffff;
	background-color: #20C997;
	border-radius: 4rpx;
	padding: 10rpx 20rpx;
	z-index: 99;
	}
	.fz_photos_item {
		display: inline-block;
		position: relative;
	}
	
	.icon-bofang {
		position: absolute;
		background-color: rgba(255, 255, 255, 0.4);
		left: calc(50% - 31rpx);
		top: calc(50% - 31rpx);
		border-radius: 80rpx;
		font-size: 20rpx;
		padding: 20rpx 20rpx 20rpx 23rpx;
	}
	.container_block{
		padding-top: 10rpx;
	}
</style>
