<template>
<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		<form style="margin-top: 15px;"  @submit.prevent="submitForm"> 
			<view class="uni-form-item uni-column">
				<view class="title">主题</view>
				<view> 
					<input class="uni-input" v-model="userData.nickName" name="input"  />
				</view>
			</view> 
			 <view class="uni-form-item uni-column">
			 	<view class="title">图片</view>
			 	<view>  
					<img :src="ossImage" mode="aspectFit"  v-if="ossImage" >
					<button  type="default" @click="uploadPhoto" style="width:100%">拍摄/上传</button> 
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
				ossImage:null
			}
		},
		onLoad(option) { 
			this.userData=uni.getStorageSync('user') 
			this.dataItem=JSON.parse(decodeURIComponent(option.dataItem));
		},
		methods: { 
			submitForm(){  
				Api.httpResponse("/stm/api/user/showUser/saveOrUpdate", 'POST',this.userData,'json').then(
					res => {     
						  this.$store.commit('SET_USER', this.userData)
						  uni.navigateBack();
					},
					error => {
						console.log(error);
					}
				)
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
							console.log(res)
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

<style>

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
	padding: 15upx 25upx;
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

</style>
