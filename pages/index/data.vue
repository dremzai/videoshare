/**
* @tpl 首页模板
*/

<template>
	<view class="uni__attentions">
		<view class="uni__listview">
			<view class="item uni__list uni__material"  v-for="(item, index) in dataList" :key="index">
				<view class="avator">
					<image :src="item.videoPic"  />
				</view>
				<view class="uinfo flex1">
					<view style="float: right;color: #FEB719;font-size: medium;">￥{{item.toUserMoney}}</view>
					<view class="name ellipsis " style="margin-left: 10px;">{{item.theDate}}</view>
					<view class="subinfo ellipsis mt_5">  
						 <text class="c_bbb fs_12 ml_10">{{item.numShow}}次播放</text>
						 <text class="c_bbb fs_12 ml_10">{{item.numLike}}个转发</text>
						 <text class="c_bbb fs_12 ml_10">{{item.numLike}}个赞</text>
						 <text class="c_bbb fs_12 ml_10">{{item.numComment}}个评论</text>
					</view>
				</view> 
			</view> 
		</view>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
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
			this.getList();
		},
	    onReachBottom(){  //上拉触底函数
		    if(this.listQuery.isLoadMore){  //此处判断，上锁，防止重复请求 
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
				Api.httpResponse("/stm/api/video/showDate/viewList", 'GET', this.listQuery).then(
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
			}
		}
	}
</script>

<style>
</style>
