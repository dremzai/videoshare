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
	import Api from '../../utils/requestApi.js'
	const videoJson = require('./mock-video.js')
	export default {
		data() {
			return {
				videoList: videoJson,
				dataList: [],
				listQuery: {}
			}
		},
		mounted() {
			console.log(1111)
			uni.showLoading();
			Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
				res => {
					uni.hideLoading();
					this.dataList = res.records;
				},
				error => {
					console.log(error);
				}
			)
		},
		methods: {
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

<style scoped>

</style>
