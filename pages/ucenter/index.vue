
<template>
<view class="uni__ucenterWrapper">
<view class="uc-header"><view class="uni__listview">
		<view class="uni__list uni__material">
	<image class="avator mr_15" :src="userData.userHeadpic" mode="widthFix" style="border-radius:50%;height: 55px;width:55px;" />
	<view class="txt flex1 fs_18">{{userData.nickName}}
	 <!-- <text class="iconfont icon-nan c_589bee ml_5"></text> -->
	 <text class="db c_999 fs_12 mt_5">Tel: {{userData.telephone}}</text></view><text class="iconfont icon-arrR c_999 fs_12"></text>
		</view>
	<view class="uni__list flex_alignc flex_col">
		<text class="fs_12 bold db">余额</text><view style="font-size: 70upx; font-weight: 700; padding: 30upx 0;">
		<text class="iconfont icon-jingbi"></text> {{userData.banlance}}</view>
		<view class="flexbox align_c" style="width: 100%;">
		<text class="flex1 lh_45 c_feb719">提现</text>
		<!-- <text class="flex1 lh_45 c_399fff">充值</text> -->
		</view></view></view>
</view>
	<!-- <view class="uni__listview mt_15">
	<view class="item uni__list uni__material" @tap="GoUzone">
		<view class="txt flex1">朋友圈</view><text class="uni_badge uni_badge_dot"></text><text class="iconfont icon-arrR c_999 fs_12"></text>
	</view>
	</view> -->
	<view class="uni__listview mt_15">
	<view class="item uni__list uni__material" @tap="GoBindAccount">
		<view class="txt flex1">视频号</view> 
		<text class="c_999 fs_12">{{userData.wxVideoAccount}}</text>
		<text class="iconfont icon-arrR c_999 fs_12"></text>
	</view>
	</view>
<view class="uni__listview mt_15">
<!-- 	<view class="item uni__list uni__material" @tap="qrcodeCard">
	<view class="txt flex1">充值记录</view><text class="iconfont icon-arrR c_999 fs_12"></text>
	</view> -->
	<view class="item uni__list uni__material">
		<view class="txt flex1">提现记录</view> 
		<text class="c_999 fs_12 c_feb719">￥333元</text>
		<text class="iconfont icon-arrR c_999 fs_12"></text></view>
		
	<view class="item uni__list uni__material">
		<view class="txt flex1">客服电话</view> 
		<text class="c_999 fs_12">0571-88350565</text>
		<!-- <text class="iconfont icon-arrR c_999 fs_12"></text> -->
	</view>
		
	<view class="item uni__list uni__material" >
	<view class="txt flex1">版本信息</view>
	<text class="c_999 fs_12">版本1.0.5</text>
	<!-- <text class="iconfont icon-arrR c_999 fs_12"></text> -->
	</view>
		</view>
		<view class="uni__listview mt_15">
		<view class="item uni__list uni__material" @tap="logoutSys"><view class="txt flex1 align_c">退出当前账号</view>
		</view>
		</view>
		<uni-pop ref="uniPop"></uni-pop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData:{},
			}
		},
		mounted(){ 
			this.userData=uni.getStorageSync('user') 
		},
		methods: {
			GoUzone() { 
			uni.navigateTo({url: '/pages/uZone/index'})
			},
			GoBindAccount(){
				
			},
			qrcodeCard() {
				let uniPop = this.$refs.uniPop
				uniPop.show({content: `
							<div class="aboutme" style="text-align: center;"><img src="./static/wx-qrcode.jpg" style="height:160px;width:160px;" /><div style="color:#999;font-family:simsun;margin-top:10px;">扫一扫，加我名片</div>
							</div>
						`,
					})
			},
			 
		logoutSys(){
			let that = this
				let uniPop = this.$refs.uniPop
				uniPop.show({skin: 'android',content: `<p>确定要退出登录吗？`,
				btns: [{text: '取消',
					onTap() {
					uniPop.close();}
						},{text: '退出',style: 'color: #feb719',
					onTap() {
					that.$store.commit('LOGOUT')
					uniPop.close()
					uni.redirectTo({url: '/pages/auth/login'})
					}
				}
					]
				})
			},
		}
	}
</script>

<style scoped>

</style>