<template>
	<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text>
		</header-bar>
		<form style="margin-top: 15px;" @submit.prevent="submitForm">
			<view class="uni-form-item uni-column">
				<view v-if="inviteUrl == ''">
					<view class="title">微信视频号名称</view>
					<view>
						<input class="uni-input" v-model="formData.wxVideoAccount" name="input"
							@input="onWxVideoAccount" />
					</view>
				</view>
				<view class="userInfo" v-if="info">
					<view class="user_list" >
						<image class="head_image" :src="info.headImage"></image>
						<view class="right_info">
							<text class="nick_name">{{info.nickname}} {{ info.sex == 1 ? '男' :  '女' }}</text>
							<text class="province_city">{{info.province}} {{info.city}} </text>
						</view>
					</view>
					<view class="qrcode_block" v-if="inviteUrl != ''">
						<image :src="baseUrl" @click="saveHeadImgFile" class="qrcode"></image>
						<text> <span class="num_title">1</span>. 点击二维码保存到相册</text>
						<text><span class="num_title">2</span>. <span @click="openWx"
								style="text-decoration: underline;color: #20c997;">点我进入微信</span> </text>
						<text><span class="num_title">3</span>. 点击扫一扫，选择相册中二维码接受邀请</text>
					</view>
				</view>
			</view>

			<tkiQrcode ref="qrcode" :val="inviteUrl" :size="400" :show="false" icon="/static/wx.png" :onval="true"
				:loadMake="true" @result="qrCode"></tkiQrcode>
			<view class="uni-btn-v" >
				<!-- v-if="inviteUrl == ''" -->
				<button class="uni__btn-primary bg_linear2" v-if="!info" type="primary"
					@click="getUserByVideoAccount">查询</button>
				<button class="uni__btn-primary bg_linear2" v-if="info && inviteUrl == ''" type="primary"
					@click="bingWxVideoAccount">绑定</button>
				<button  style="font-size: 22rpx;line-height: 90rpx;" v-if="info" 
					@click="info = null;formData.wxVideoAccount ='' ;inviteUrl = '' ;baseUrl = '';">重置</button>
			</view>
		</form>
	</view>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import Api from '../../utils/requestApi.js'
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				userData: [],
				formData: {
					wxVideoAccount: '',
				},
				info: null,
				inviteUrl: "",
				baseUrl: ""
			}
		},
		onLoad(options) {
			this.userData = uni.getStorageSync('user')
			
			
			
			if (this.userData.wxVideoStatus == 1) { //待确认
				this.formData.wxVideoAccount = this.userData.wxVideoAccount
				this.getInviteUrl()

			}

		},
		methods: {
			openWx() {
				plus.runtime.openURL("weixin://")
			},
			saveHeadImgFile() {

				// console.log(this.dataURLtoFile(this.baseUrl,new Date().getTime()).webkitRelativePath)
				uni.saveImageToPhotosAlbum({
					filePath: this.baseUrl,
					success: function() {
						uni.showToast({
							title: "保存成功",
							icon: "none"
						});
					},
					fail: function() {
						uni.showToast({
							title: "保存失败",
							icon: "none"
						});
					}
				});
			},

			qrCode(res) {
				console.log(res)
				this.baseUrl = res
			},
			//获取用户二维码
			getInviteUrl() {

				this.getUserByVideoAccount()
				Api.httpResponse("/stm/api/user/showUser/getInviteUrl", 'POST', {
					id: this.userData.id,
					wxVideoAccount: this.formData.wxVideoAccount
				}, 'json').then(
					result => {
						uni.hideLoading();
						this.inviteUrl = result

					},
					error => {
						console.log(error);
					}
				)
			},


			bingWxVideoAccount() {
				uni.showLoading();
				Api.httpResponse("/stm/api/user/showUser/bingWxVideoAccount", 'POST', {
					id: this.userData.id,
					wxVideoAccount: this.formData.wxVideoAccount
				}, 'json').then(
					result => {
						uni.hideLoading();
						this.inviteUrl = result.inviteUrl
					},
					error => {
						console.log(error);
					}
				)
			},
			onWxVideoAccount(v) {
				if (v.detail.value == "") {
					this.info = null
				}
			},
			//获取视频号用户信息
			getUserByVideoAccount() {
				uni.showLoading();
				Api.httpResponse("/stm/api/user/showUser/getUserByVideoAccount", 'POST', {
					id: this.userData.id,
					wxVideoAccount: this.formData.wxVideoAccount
				}, 'json').then(
					result => {
						uni.hideLoading();
						console.log(result)
						this.info = result
					},
					error => {
						console.log(error);
					}
				)
			},

			submitForm() {
				uni.showLoading();
				Api.httpResponse("/stm/api/user/showUser/bingWxVideoAccount", 'POST', this.userData, 'json').then(
					result => {
						uni.hideLoading();
						this.$store.commit('SET_USER', this.userData)
						uni.navigateBack();
					},
					error => {
						console.log(error);
					}
				)
			},
		}
	}
</script>

style
<style>
	.userInfo{
		background-color: #f1f3f5;
		margin-top: 40rpx;
	}
	.qrcode_block {
		display: block;
		width: 400rpx;
		margin: 0 auto;
		margin-top: 40rpx;
		padding: 30rpx 30rpx;
		padding-bottom: 100rpx;
	}

	.qrcode_block image {
		text-align: center;
	}

	.qrcode_block text {
		display: block;
		margin-bottom: 20rpx;

	}

	.qrcode_block .num_title {
		font-size: 40rpx;
		font-weight: bold;
		font-style: italic;
		color: #212529;
	}

	.qrcode {
		width: 300rpx;
		height: 300rpx;
		background-color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin: 0 auto;
		display: block;
		margin-bottom: 40rpx;
	}

	.user_list {
		display: flex;
		align-items: center;
		padding: 20rpx 20rpx;
		background-color: #f1f3f5;
		margin: 0 20rpx;
	}

	.user_list .head_image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 99rpx;
	}

	.user_list .right_info {
		margin-left: 30rpx;
	}

	.province_city,
	.nick_name {
		font-size: 26rpx;
		font-weight: bold;
		display: block;
	}

	.uni-flex {
		display: flex;
		flex-direction: row;
	}

	.uni-flex-item {
		flex: 1;
	}

	.uni-row {
		flex-direction: row;
	}

	.uni-column {
		flex-direction: column;
	}

	.uni-link {
		color: #576B95;
		font-size: 28upx;
	}

	.uni-center {
		text-align: center;
	}

	.uni-inline-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.uni-inline-item text {
		margin-right: 20upx;
	}

	.uni-inline-item text:last-child {
		margin-right: 0upx;
		margin-left: 20upx;
	}

	/* 表单 */
	.uni-form-item {
		display: flex;
		width: 100%;
		padding: 10upx 0;
	}

	.uni-form-item .title {
		padding: 10upx 25upx;
	}

	.uni-label {
		width: 210upx;
		word-wrap: break-word;
		word-break: break-all;
		text-indent: 20upx;
	}

	.uni-input {
		height: 80upx;
		padding: 15upx 25upx;
		line-height: 50upx;
		font-size: 28upx;
		background: #FFF;
		flex: 1;
	}

	/* 竖向百分百按钮 */
	.uni-btn-v {
		padding: 20rpx 0;
		position: fixed;
		width: 70%;
		margin: 0 auto;
		bottom: 20px;
		left: calc(50% - 35%);
	}

	.uni-btn-v button {
		margin: 20upx 0;
	}
</style>
