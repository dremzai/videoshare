/**
* @tpl 首页模板
*/

<template>
	<view class="fz_container">
		<mescroll-uni ref="mescrollRef" :height="height + 'px'" @down="downCallback" @up="upCallback" :down="{auto:false}" :up="{auto:false}">
			<view class="container_block">
			<view class="fz_item flexbox uni__material" v-for="(item, index) in dataList" :key="index">
				<image class="fzitem_avator" :src="item.sponsorUserHeadpic" mode="aspectFill" />
				<view class="fzitem_content flex1" @longtap="copyVal(item.themeDesc+'#'+item.themeKey+'#')">
					<text class="fz_user" @tap="goDetail(item)">{{item.sponsorNickName}}</text>
					<view class="mt_5" @tap="goDetail(item)">
						<view class="uni-vip v1 ml_5" style="width:50px;" v-show="item.themeCheck!=1">审核中</view>
						<!-- <view class="uni-vip v1 ml_5" style="width:70px;">还剩{{item.endDay}}天</view> -->
						<view class="mark">
							<text class="iconfont icon-zan"></text>
							<text style="line-height: 44rpx; color: #d9480f;">{{item.themeTitle}}</text>
						</view>
					</view>
					<view class="fz_cnts" @tap="goDetail(item)"> {{item.themeDesc}}
					<span v-show="userData.id==item.themeUserId">#{{item.themeKey}}#</span>
					</view>
					<view class="fz_photos">
						<!-- <view class="fz_photos_item" @tap="GoVideoPlay(atx)" v-for="atx in item.videoList" -->
						<view class="fz_photos_item" @tap="goDetail(item)" v-for="atx in item.videoList"
							:key="atx.id">
							<image class="fz_img_auto" :src="atx.videoPic" mode="aspectFill" />
							<!-- <text class="iconfont icon-bofang"></text> -->
						</view>
					</view>
					<view class="fz_foot flexbox flex_alignc">
						<view class="flex1"><text class="fz_time">{{item.totalNumVideo}}个作品</text>
							<view class="uni-distance ml_10">
								<text class="iconfont "></text>{{item.totalNumRelay}}个转发
							</view>
							<text class="c_bbb fs_12 ml_10">{{item.totalNumLike}}个赞</text>
							<text class="c_bbb fs_12 ml_10">{{item.totalNumComment}}个评论</text>
						</view>
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
				navHeight: 400,
				dataList: [],
				listQuery: {
					isLoadMore: true,
					userId: '',
					page: 1,
					pageSize: 20,
				},
				userData: {},

			
			}
		},
		mounted() {
			this.userData = uni.getStorageSync('user') 
			this.listQuery.userId = this.userData.id; 
			if(this.userData==''||this.userData.id==''){
				var that=this;
					wx.login({
					  success (res) {
						if (res.code) {
						  Api.httpResponse("/stm/api/login/wxMiniLogin", 'POST',{code:res.code}).then(
							resuser => {    
								that.userData=resuser;
								that.$store.commit('SET_USER', resuser)	 
								this.listQuery.userId = this.userData.id;
								this.getList(); 
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
			else{ 
				this.getList(); 
			}
					
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
			getList() {  
				Api.httpResponse("/stm/api/video/showTheme/viewList", 'GET', this.listQuery).then(
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
			goDetail(item) {
				uni.navigateTo({
					url: '/pages/theme/detail?id=' + item.id
				})
			},
			GoVideoPlay(item) {
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

<style lang="scss">
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
</style>
