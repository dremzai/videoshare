/**
 * @tpl 首页模板
 */

<template>
	<view class="fz_container">
		<view class="fz_item flexbox uni__material" v-for="(item, index) in dataList" :key="index">
			<image class="fzitem_avator" :src="item.sponsorUserHeadpic" mode="aspectFill" />
			<view class="fzitem_content flex1"  @longtap="copyVal(item.themeDesc+'#'+item.themeKey+'#')">
				<text class="fz_user" @tap="goDetail(item)">{{item.themeTitle}}</text><view class="mt_5">
				<view class="uni-age" style="width:120px;">奖金池：￥{{item.remainThemeToMoney}}</view>
				<view class="uni-vip v1 ml_5"  style="width:60px;">还剩{{item.endDay}}天</view>
				</view>
				<view class="fz_cnts"> {{item.themeDesc}}#{{item.themeKey}}#</view>
				<view class="fz_photos">
					<image class="fz_img_auto" @tap="GoVideoPlay(atx)" v-for="atx in item.videoList" :key="atx.id" :src="atx.videoPic" mode="aspectFill" />
				</view>
				<view class="fz_foot flexbox flex_alignc">
					<view class="flex1"><text class="fz_time">{{item.totalNumVideo}}次推广</text>
					<view class="uni-distance ml_10">
					<text class="iconfont "></text>{{item.totalNumRelay}}个转发</view>
					<text class="c_bbb fs_12 ml_10">{{item.totalNumLike}}个赞</text>
					<text class="c_bbb fs_12 ml_10">{{item.totalNumComment}}个评论</text>
					</view> 
				</view>
			</view>
		</view>
	 
		 
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex' 
	import Api from '../../utils/requestApi.js'
	export default {
		data() {
			return { 
				dataList:[],
				listQuery:{}
			}
		},  
		mounted(){
			 uni.showLoading(); 
			 Api.httpResponse("/stm/api/video/showTheme/viewList", 'GET',this.listQuery).then(
			 	res => {     
			 		  uni.hideLoading();  
					  this.dataList=res.records;
			 	},
			 	error => {
			 		console.log(error);
			 	}
			 ) 
		},
		methods: { 
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
			 goDetail(item){ 
				 uni.navigateTo({ 
				     url:'/pages/theme/detail?dataItem='+ encodeURIComponent(JSON.stringify(item))
				 }) 
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
