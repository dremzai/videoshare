
<template>
	<view class="uni__uliveWrapper">
<view class="uni__subNavs">
	<view class="ls flexbox flex_alignc"><text class="item on">推荐</text><text class="item">附近</text><text class="item">跳舞</text><text class="item">音乐</text><text class="item">游戏</text>
	</view>
		</view>
		<view class="uni_uliveList">
		<block v-for="(item,index) in liveList" :key="index">
			<view class="item" @tap="GoLivePlay(index)">
		<image class="lv-thumb" :src="item.poster" mode="aspectFill" />
		<view class="lv-ftinfo">
	<view class="pos"><text class="iconfont icon-dingwei"></text> {{item.location}}</view>
			<view class="title flexbox flex_alignb">{{item.subtitle}}</view>
			<view class="flexbox flex_alignc"><view class="user flex1 flexbox flex_alignc"><image class="avator" :src="item.avator" mode="aspectFill" /> <text class="fs_12 bold">{{item.author}}</text></view>
	<text class="hot"><text class="iconfont icon-hot"></text>{{item.hotNum}}</text></view>
		</view>
		<view v-if="item.online" class="lv-status flexbox flex_alignc"><text class="dot"></text>直播中</view><text class="btn-play iconfont icon-bofang"></text>
	</view>
	</block>
		</view>
	<view class="nlv-attentionFloat flexbox"><image class="af-avator" src="/static/uimg/u__chat_img9.jpg" mode="aspectFill" />
	<view class="af-info"><text class="af-tit">孤独伊人直播开始了</text><text class="af-subtit">心动的感觉</text>
	</view><text class="af_ico iconfont">&#xe84f;</text>
		</view>
	</view>
</template>

<script>
	const liveJson = require('./mock-live.js')
	export default {
		data() {return {liveList: liveJson
			}
		},
		methods: {GoLivePlay(index) {uni.navigateTo({url: '/pages/uLive/subnvue/live?index=' + index})
			}
		}
	}
</script>

<style scoped>

</style>