/**
 * @tpl 添加朋友模板
 */

<template>
	<view class="uni__container flexbox flex_col">
<header-bar :isBack="true" title="添加朋友" titleTintColor="#353535" :bgColor="{'background': '#fff'}" center><text slot="back" class="uni_btnIco iconfont icon-back"></text>
		</header-bar>
		<view class="uni__scrollview flex1">
		<view class="uni__subNavs">
		<view class="ls flexbox flex_alignc"><text class="item on">找人</text><text class="item">找群</text></view>
			</view>
			<view class="uni-addFriends">
		<view class="uni__listview mt_15">
		<view class="uni__list mh_110">
			<text class="iconfont icon-sousuo c_999 mr_15"></text>
			<input class="searIpt flex1 fs_14" type="text" placeholder="U播号/用户名/昵称" /></view></view>
		<view class="c_999 fs_12 align_c pt_15">我的U播号：24168111</view>
		<view class="uni__listview mt_15 pad15"><view class="bg_linear2 c_fff fs_16 lh_50 align_c" style="border-radius: 50upx;">搜索</view>
		</view></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>

</style>