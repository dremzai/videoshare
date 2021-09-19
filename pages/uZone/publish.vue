
<template>
	<view class="uni__container flexbox flex_col bg_fff">
	<header-bar :isBack="true" title=" " titleTintColor="#353535" :bgColor="{background: '#fff'}"><text slot="back" class="uni_btnIco iconfont icon-back"></text><text slot="string" class="uni_btnString bg_linear2 mr_15" style="border-radius:20px;color: #fff;padding:5px 15px;">发布</text>
		</header-bar>
		<view class="uni__scrollview flex1">
	<view class="uni-publishFzone">
	<view class="fz_inputbox"><textarea class="area" placeholder="此时此刻,想和大家分享什么？" placeholder-style="color:#bbb;" /></view>
	<view class="fz_photolist"><image class="img" src="/static/uimg/u__chat_img3.jpg" mode="aspectFill" /><view class="fz_btnAdd" @tap="chooseImage"><text class="iconfont icon-tianjia"></text></view>
				</view>
				<view class="mt_15 pad15">
		<view class="uni__listview">
			<view class="uni__list uni__material">
				<text class="iconfont icon-weizhi mr_15"></text>
			<view class="txt flex1">你在哪里？</view>
			</view><view class="uni__list uni__material"><text class="iconfont icon-suoding mr_15"></text><view class="txt flex1">公开</view></view>
					</view></view>
			</view>
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
			chooseImage() {
		uni.chooseImage({
		sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			 sourceType: ['album'], //从相册选择
				success: function (res) {
				console.log(JSON.stringify(res.tempFilePaths));
				    }
				})
			}
		}
	}
</script>

<style scoped>

</style>