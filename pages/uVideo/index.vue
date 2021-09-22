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
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:5,
				},
				userData:{},
			}
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
		mounted() { 
			this.userData = uni.getStorageSync('user')
			this.listQuery.userId = this.userData.id;
			this.getList();
		},
		methods: {
			getList(refresh){ 
				uni.showLoading();
				Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
					res => {
						uni.hideLoading();
						this.dataList=this.dataList.concat(res.records);
						if(this.listQuery.page<res.pages){
							this.listQuery.isLoadMore=false;
						} 
						if(refresh){
								this.$emit("stopRefresh")
						}
					},
					error => {
						console.log(error);
						if(refresh){
								this.$emit("stopRefresh")
						}
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

<style scoped>

</style>
