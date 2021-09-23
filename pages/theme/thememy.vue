/**
* @tpl 首页模板
*/

<template>
	<view class="fz_container" style="margin: 0;padding: 0;">
		<mescroll-uni ref="mescrollRef" :height="height + 'px'" @down="downCallback" @up="upCallback">
		<view class="fz_item flexbox uni__material" v-for="(item, index) in dataList" :key="index">
			<image class="fzitem_avator" :src="item.sponsorUserHeadpic" mode="aspectFill" />
			<view class="fzitem_content flex1">
				<text class="fz_user">{{item.sponsorNickName}}</text>
				<view class="mt_5">
					<view class="uni-age" style="width: 80px;">赚￥{{item.toUserMoneyStr}}</view>
					<!-- <view class="uni-vip v1 ml_5">22</view> -->
				</view>
				<view class="fz_cnts">{{item.videoTitle}}</view>
				<view class="fz_photos">
					<image class="fz_img_auto" style="width: 250px;" @tap="GoVideoPlay(item)" :src="item.videoPic"
						mode="aspectFill" />
				</view>
				<view class="fz_foot flexbox flex_alignc">
					<view class="flex1">
						<text class="fz_time">{{item.numShow}}次播放</text>
						<view class="uni-distance ml_10">
							<text class="iconfont "></text>{{item.numLike}}个转发
						</view>
						<text class="c_bbb fs_12 ml_10">{{item.numLike}}个赞</text>
						<text class="c_bbb fs_12 ml_10">{{item.numComment}}个评论</text>
					</view>
				</view>
			</view>
		</view>
		</mescroll-uni>

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
		},
		methods: {
			// /*下拉刷新的回调, 有3种处理方式:*/
			downCallback() {
			
				this.listQuery.page = 1
				this.dataList = []
				this.getList()
			
			},
			// /*上拉加载的回调*/
			upCallback() {
			
				this.listQuery.page += 1
				this.getList()
			
			},
			getList(refresh){ 
				uni.showLoading();
				Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
					res => {
						uni.hideLoading();
						this.dataList=this.dataList.concat(res.records);
						if(this.listQuery.page<res.pages){
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
				console.log(item)
				// #ifndef APP-PLUS
				uni.navigateTo({
					url: '/pages/uVideo/playOne?index=' + 0 + '&dataItem=' + encodeURIComponent(JSON.stringify(item))
				})
				// #endif
				// #ifdef APP-PLUS
				console.log(123123)
				uni.navigateTo({
					url: '/pages/uVideo/subnvue/playerOne?index=' + 0 + '&dataItem=' + encodeURIComponent(JSON.stringify(item))
				})
				// #endif
			}
		}
	}
</script>

<style>
</style>
