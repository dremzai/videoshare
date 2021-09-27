/**
* @tpl 首页模板
*/

<template>

	<view class="uni__attentions">
		<mescroll-uni ref="mescrollRef" :height="height + 'px'"
			textNoMore="没有更多数据" @down="downCallback" @up="upCallback" :down="{auto:false}" :up="{auto:false}">
			<view class="uni__listview">
				<view class="item uni__list uni__material" v-for="(item, index) in dataList" :key="index">
					<view class="avator">
						<image :src="item.videoPic" />
					</view>
					<view class="uinfo flex1">
						<view style="float: right;color: #FEB719;font-size: medium;">￥{{item.toUserMoneyStr}}</view>
						<view class="name ellipsis " style="margin-left: 10px;">{{item.theDate}}</view>
						<view class="subinfo ellipsis mt_5">
							<text class="c_bbb fs_12 ml_10">{{item.numShow}}次播放</text>
							<text class="c_bbb fs_12 ml_10">{{item.numLike}}个转发</text>
							<text class="c_bbb fs_12 没有更多数据ml_10">{{item.numLike}}个赞</text>
							<text class="c_bbb fs_12 ml_10">{{item.numComment}}个评论</text>
						</view>
					</view>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import Api from '../../utils/requestApi.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [MescrollMixin], // 使用mixin
		props: {
			height: Number
		},
		data() {
			return {
				dataList: [],
				listQuery: {
					isLoadMore: true,
					userId: '',
					page: 1,
					pageSize: 10,
				},
				userData: {},
			}
		},
		onload() {
			this.userData = uni.getStorageSync('user')
			this.listQuery.videoUserId = this.userData.id; 
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
			getList(refresh) { 
				Api.httpResponse("/stm/api/video/showDate/viewList", 'GET', this.listQuery).then(
					res => { 
						this.dataList = this.dataList.concat(res.records);
						if (this.listQuery.page < res.pages) {
							this.listQuery.isLoadMore = false;
						}


						this.mescroll.endSuccess()

						this.mescroll.endByPage(this.dataList, res.total);

					},
					error => {
						this.mescroll.endSuccess()

						this.mescroll.endByPage();
						console.log(error);
					}
				)
			}
		}
	}
</script>

<style>
</style>
