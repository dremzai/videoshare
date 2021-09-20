/**
 * @tpl 小视频列表模板
 */

<template>
	<view class="uni__videoWrapper"> 
		<view class="uni_videoLs">
		<block v-for="(item,index) in dataList" :key="index">
		<view class="item" @tap="GoVideoPlay(item)">
			<image class="v-thumb" :src="item.videoPic" mode="aspectFill" />
			<view class="v-ftinfo">
				<view class="title flexbox flex_alignb">{{item.videoTitle}}</view>
			<view class="flexbox flex_alignc">
				<view class="play flex1"><text class="iconfont icon-bofang"></text> {{item.numShow}}次播放</view>
				<text class="like">￥{{item.numLike}}</text></view>
			</view>
		</view>
			</block>
		</view>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	const videoJson = require('./mock-video.js')
	export default {
		data() {
			return {
				videoList: videoJson, 
				dataList:[],
				listQuery:{}
			}
		},
		mounted(){
			 uni.showLoading(); 
			 Api.httpResponse("/stm/api/video/showVideo/list", 'GET',this.listQuery).then(
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
			GoVideoPlay(item) {
			// #ifndef APP-PLUS
			uni.navigateTo({url: '/pages/uVideo/play?index=' + 1 +'&dataItem='+ encodeURIComponent(JSON.stringify(item))})
				// #endif
				// #ifdef APP-PLUS
				uni.navigateTo({url: '/pages/uVideo/subnvue/player?index=' + 1 +'&dataItem='+ encodeURIComponent(JSON.stringify(item))})
				// #endif
			}
		}
	}
</script>

<style scoped>

</style>