/**
 * @tpl 聊天设置模板
 */

<template>
	<view class="uni__container flexbox flex_col">
<header-bar :isBack="true" title="聊天设置" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}" center><text slot="back" class="uni_btnIco iconfont icon-back"></text></header-bar>
<view class="uni__scrollview flex1">
	<view class="uni-groupInfo">
	<view class="uni__listview"><view class="item uni__list uni__material" @tap="GoUhome"><image class="avator mr_20" src="/static/uimg/u__chat_img1.jpg" mode="widthFix" style="border-radius: 50%;height: 55px;width:55px;" /><view class="txt flex1 fs_18">猪猪佩奇 <view class="uni-age ml_10"><text class="iconfont icon-nv"></text>24</view> <text class="db c_999 fs_12 mt_5">昵称: 一只特立独行的PIG</text></view><text class="iconfont icon-arrR c_999 fs_12"></text>
			</view>
		</view>
		<view class="uni__listview mt_15">
			<view class="item uni__list uni__material"><view class="txt flex1">查找聊天内容</view><text class="iconfont icon-arrR c_999 fs_12"></text>
			</view>
		</view>
		<view class="uni__listview mt_15">
			<view class="item uni__list uni__material"><view class="txt flex1">置顶聊天</view><switch checked color="#41a863" style="transform: scale(0.7,0.7) translateX(12px)" />
			</view><view class="item uni__list uni__material"><view class="txt flex1">消息免打扰</view><switch color="#41a863" style="transform: scale(0.7,0.7) translateX(12px)" />
			</view>
		</view>
		<view class="uni__listview mt_15">
			<view class="item uni__list uni__material">
		<view class="txt flex1">设置当前聊天背景</view><text class="iconfont icon-arrR c_999 fs_12"></text></view>
					<view class="item uni__list uni__material">
		<view class="txt flex1">清空聊天记录</view><text class="iconfont icon-arrR c_999 fs_12"></text>
					</view>
				</view>
				<view class="uni__listview mt_15">
			<view class="item uni__list uni__material"><view class="txt flex1">拉黑</view><text class="iconfont icon-arrR c_999 fs_12"></text>
			</view><view class="item uni__list uni__material"><view class="txt flex1">举报</view><text class="iconfont icon-arrR c_999 fs_12"></text>
				</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			GoUhome() {uni.navigateTo({url: '/pages/ucenter/uhome'})
			},
		}
	}
</script>

<style scoped>

</style>