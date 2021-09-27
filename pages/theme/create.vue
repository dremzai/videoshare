<template>
<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		<view class="fz_item flexbox uni__material" style="margin-top: 15px;">
			<image class="fzitem_avator" :src="dataItem.sponsorUserHeadpic" mode="aspectFill" />
			<view class="fzitem_content flex1" @longtap="copyVal(dataItem.themeDesc+'#'+dataItem.themeKey+'#')">
				<text class="fz_user">{{dataItem.sponsorNickName}}</text>
				<view class="mt_5">
				<!-- 	<view class="uni-age" style="width:120px;">奖金池：￥{{dataItem.remainThemeToMoneyStr}}</view>
					<view class="uni-vip v1 ml_5" style="width:60px;">还剩{{dataItem.endDay}}天</view> -->
					<view class="mark">
						<text class="iconfont icon-zan"></text>
						<text style="line-height: 44rpx; color: #d9480f;">{{dataItem.themeTitle}}</text>
					</view>
				</view>
				<view class="fz_cnts"> {{dataItem.themeDesc}}#{{dataItem.themeKey}}#</view>
			 
			</view>
		</view>
		<form style="margin-top: 15px;"  @submit.prevent="submitForm">  
			 <view class="uni-form-item uni-column">  
				<view class="title" v-if="ossVideo">视频</view>
				<view>   
					<video :src="ossVideo" controls v-if="ossVideo"></video>
					<button  type="default" @click="uploadVideo" style="width:100%">拍摄/上传视频</button> 
				</view>
			 </view> 
			 <view class="uni-btn-v"> 
				<button class="uni__btn-primary bg_linear2" type="primary" form-type="submit" >提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	import {upLoadFiles} from '../../utils/oss.js'
	export default {
		data() {
			return { 
				userData:{},
				dataItem:{},
				ossImage:null,
				ossVideo:null,
				ossVideoTemp:null
			}
		},
		onLoad(option) { 
			this.userData=uni.getStorageSync('user') 
			this.dataItem=JSON.parse(decodeURIComponent(option.dataItem));
			console.log(this.dataItem)
		},
		methods: { 
			submitForm(){  
				if(!this.ossVideo){
					uni.showToast({ //提示
						title: '请上传视频',
						icon: "none"
					})
					return false
				}
				
				Api.httpResponse("/stm/api/video/showVideo/save", 'POST',{
						"themeId": this.dataItem.id,
						"videoDesc": this.dataItem.themeDesc,
						"videoNumCount": 1,
						"videoPic": this.ossVideoTemp,
						"videoUrl": this.ossVideo,
						"videoUserId": this.userData.id
				}).then(
					res => {     
						  this.$store.commit('SET_USER', this.userData)
						  uni.navigateBack();
					},
					error => {
						console.log(error);
					}
				)
			},
			uploadVideo(){
				
				/* #ifdef MP-WEIXIN */
				wx.chooseVideo({
					sourceType:['camera', 'album'],//	Array.<string>	['album', 'camera']	否	视频选择的来源	
					compressed:true,//	boolean	true	否	是否压缩所选择的视频文件	1.6.0
					maxDuration:60,//	number	60	否	拍摄视频最长拍摄时间，单位秒	
					camera:"back",//	string	'back'	否	默认拉起的是前置或者后置摄像头。部分 Android 手机下由于系统 ROM 不支持无法生效	
					success:(res)=>{
						console.log('res',res)
						
						
						upLoadFiles([res.tempFilePath]).then((res)=>{
							this.ossVideoTemp = res[0].fileInfo.realyPath + '?x-oss-process=video/snapshot,t_1,m_fast'
							this.ossVideo = res[0].fileInfo.realyPath
							uni.showToast({
								title: "上传成功！",
								icon: "none"
							});
							
						})
						
						
					},//	function		否	接口调用成功的回调函数	
					fail:(error)=>{
						console.log(error)
					},//	function		否	接口调用失败的回调函数	
				})
				/* #endif */
			},
			uploadPhoto(e) { 
				let that=this;
				uni.chooseImage({
				 	count: 1,
				 	sizeType: ['compressed'],
				 	sourceType: ['camera'],
				 	success: (res)=> {
						
						/* #ifdef MP-WEIXIN */
						upLoadFiles(res.tempFilePaths).then((res)=>{
							console.log()
							this.ossImage = res[0].fileInfo.realyPath
						})
						/* #endif */
						
						/* #ifdef APP-PLUS */
						let path = res.tempFilePaths[0];
						
						plus.zip.compressImage({
							src: path,
							dst: path,
							overwrite: true,
							quality: 20,
							width: '800px',
							height: '600px',
							format: 'jpg'
						},
						function(res) {
							let imgPathUrl = res.target;
							let imgPathSize = res.size;
				
							let reader = new plus.io.FileReader();
							// 文件读取操作完成时的回调函数
							reader.onloadend = (e) =>{ 
								console.log('文件读取完成！');
								let speech = e.target.result; //base64图片   
								that.userData.userHeadpic=speech;
								that.$forceUpdate();
								console.log("base64图片 ", that.userData.userHeadpic);
							}
							reader.readAsDataURL(res.target);
						},
						function(error) {
							console.log("Compress error!", error);
							return; 
						});
						/* #endif */
						 
					},
				})
			} 
		}
	}
</script>

<style lang="scss">

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
.uni-link{
	color:#576B95;
	font-size:28upx;
}
.uni-center{
	text-align:center;
}
.uni-inline-item{
	display: flex;
	flex-direction: row;
	align-items:center;
}
.uni-inline-item text{
	margin-right: 20upx;
}
.uni-inline-item text:last-child{
	margin-right: 0upx;
	margin-left: 20upx;
}

/* 表单 */
.uni-form-item{
	display:flex;
	width:100%;
	padding:10upx 0;
}
.uni-form-item .title{
	padding:10upx 25upx;
}
.uni-label {
	width: 210upx;
	word-wrap: break-word;
	word-break: break-all;
	text-indent:20upx;
}
.uni-input {
	height: 80upx;
	padding: 0upx 25upx;
	line-height:50upx;
	font-size:28upx;
	background:#FFF;
	flex: 1;
}
/* 竖向百分百按钮 */
.uni-btn-v{
	padding:10upx 0;
}
.uni-btn-v button{margin:20upx 0;}
.mark {
		background: #fff4e6;
		padding: 20rpx 40rpx;
		border-radius: 14rpx;
		margin: 20rpx 0;

		.icon-zan {
			animation: wobble 1s .2s ease infinite;
			font-size: 40rpx;
			color: #ffa94d;
			margin-right: 20rpx;
		}
	}
</style>
