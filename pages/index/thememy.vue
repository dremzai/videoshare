/**
 * @tpl 首页模板
 */

<template>
	<view class="fz_container">
		<view class="fz_item flexbox uni__material" v-for="(item, index) in dataList" :key="index">
			<image class="fzitem_avator" :src="item.sponsorUserHeadpic" mode="aspectFill" />
			<view class="fzitem_content flex1">
				<text class="fz_user">{{item.sponsorNickName}}</text><view class="mt_5">
				<view class="uni-age" style="width: 80px;">赚￥35.5</view>
				<!-- <view class="uni-vip v1 ml_5">22</view> -->
				</view>
				<view class="fz_cnts">{{item.videoTitle}}</view><view class="fz_photos">
				<image class="fz_img_auto" style="width: 250px;"  @tap="GoVideoPlay(index)" :src="item.videoPic" mode="aspectFill" />
				</view>
				<view class="fz_foot flexbox flex_alignc">
					<view class="flex1">
						<text class="fz_time">{{item.numShow}}次播放</text>
					<view class="uni-distance ml_10">
					<text class="iconfont "></text>{{item.numLike}}个转发</view>
					<text class="c_bbb fs_12 ml_10">{{item.numLike}}个赞</text>
					<text class="c_bbb fs_12 ml_10">{{item.numComment}}个评论</text>
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
			 Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET',this.listQuery).then(
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
			 
		}
	}
</script>

<style>
</style>
