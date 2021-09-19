/**
 * @tpl 小视频列表模板
 */

<template>
	<view class="uni__videoWrapper">
<!-- <view class="uni__subNavs">
	<view class="ls flexbox flex_alignc">
		<text class="item on">推荐</text>
		<text class="item">我的</text>
		<text class="item">附近</text>
	</view>
</view> -->
		<view class="uni_videoLs">
		<block v-for="(item,index) in videoList" :key="index">
		<view class="item" @tap="GoVideoPlay(index)">
			<image class="v-thumb" :src="item.poster" mode="aspectFill" />
			<view class="v-ftinfo">
				<view class="title flexbox flex_alignb">{{item.subtitle}}</view>
			<view class="flexbox flex_alignc">
				<view class="play flex1"><text class="iconfont icon-bofang"></text> {{item.playNum}}次播放</view><text class="like">{{item.likeNum}}赞</text></view>
			</view>
		</view>
			</block>
		</view>
	</view>
</template>

<script>
	const videoJson = require('./mock-video.js')
	export default {
		data() {
			return {videoList: videoJson
			}
		},
		methods: {
			GoVideoPlay(index) {
			// #ifndef APP-PLUS
			uni.navigateTo({url: '/pages/uVideo/play?index=' + index})
				// #endif
				// #ifdef APP-PLUS
				uni.navigateTo({url: '/pages/uVideo/subnvue/player?index=' + index})
				// #endif
			}
		}
	}
</script>

<style scoped>

</style>