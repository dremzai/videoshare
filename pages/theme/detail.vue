/**
 * @tpl 首页模板
 */

<template>
	<view class="fz_container">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		<view class="fz_item flexbox uni__material" >
			<image class="fzitem_avator" :src="dataItem.sponsorUserHeadpic" mode="aspectFill" />
			<view class="fzitem_content flex1"  @longtap="copyVal(dataItem.themeDesc+'#'+dataItem.themeKey+'#')">
				<text class="fz_user">{{dataItem.themeTitle}}</text><view class="mt_5">
				<view class="uni-age" style="width:120px;">奖金池：￥{{dataItem.remainThemeToMoney}}</view>
				<view class="uni-vip v1 ml_5"  style="width:60px;">还剩{{dataItem.endDay}}天</view>
				</view>
				<view class="fz_cnts"> {{dataItem.themeDesc}}#{{dataItem.themeKey}}#</view> 
				<view class="fz_foot flexbox flex_alignc">
					<view class="flex1"><text class="fz_time">{{dataItem.totalNumVideo}}次推广</text>
					<view class="uni-distance ml_10">
					<text class="iconfont "></text>{{dataItem.totalNumRelay}}个转发</view>
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
						<view class="title flexbox flex_alignb">{{item.videoTitle}}</view>
						<view class="flexbox flex_alignc">
							<view class="play flex1"><text class="iconfont icon-bofang"></text> {{item.numShow}}次播放
							</view>
							<text class="like" style="margin-left: 15px;">{{item.numLike}}个赞</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex' 
	import Api from '../../utils/requestApi.js'
	export default {
		data() {
			return { 
				dataItem:{},
				dataList:[],
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:5,
				},
			}
		},  
		onLoad(option) { 
			this.dataItem=JSON.parse(decodeURIComponent(option.dataItem));
			this.listQuery.themeId=this.dataItem.id;
			this.getList();
		}, 
	    onReachBottom(){  //上拉触底函数
		    if(!this.listQuery.isLoadMore){  //此处判断，上锁，防止重复请求 
				this.listQuery.page+=1
				this.getList()
		    }
		},
		onPullDownRefresh(){  //下拉刷新
		    console.log('refresh');
			this.listQuery.page=1
			this.dataList=[];
			this.getList();
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: { 
			getList(){ 
				 uni.showLoading(); 
				 Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET',this.listQuery).then(
					res => {     
						    uni.hideLoading();  
							this.dataList=this.dataList.concat(res.records);
							if(this.listQuery.page<res.pages){
								this.listQuery.isLoadMore=false;
							} 
					},
					error => {
						console.log(error);
					}
				 ) 
			},
			copyVal(val){
			 	uni.setClipboardData({
			 		data:val,//要被复制的内容
			 		success:()=>{//复制成功的回调函数
			 		  uni.showToast({//提示
			 			title:'复制成功',icon:"none"
			 		  })
			 		}
			 	  }); 
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
