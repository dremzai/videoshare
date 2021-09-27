/**
* @tpl 小视频列表模板
*/

<template>
	<view class="uni__videoWrapper">
		<mescroll-uni ref="mescrollRef" :height="height + 'px'" @down="downCallback" @up="upCallback" :down="{auto:false}" :up="{auto:false}">
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
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Api from '../../utils/requestApi.js'
	const videoJson = require('./mock-video.js')
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			height: Number
		},
		data() {
			return {
				videoList: videoJson,
				dataList: [],
				listQuery:{
					isLoadMore:true,
					userId:'', 
					page:1,
					pageSize:10,
				},
				userData:{},
			}
		},
	    
		mounted() { 
			this.userData = uni.getStorageSync('user')
			this.listQuery.userId = this.userData.id;
			this.getList();
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
				Api.httpResponse("/stm/api/video/showVideo/viewList", 'GET', this.listQuery).then(
					res => { 
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

<style scoped>

</style>
