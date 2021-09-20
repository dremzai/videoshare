<template>
<view class="uni__container flexbox flex_col">
		<header-bar :isBack="true" title="返回" titleTintColor="#353535" :bgColor="{background: '#f4f4f4'}">
			<text slot="back" class="uni_btnIco iconfont icon-back"></text> 
		</header-bar>
		<form style="margin-top: 15px;">
			<view class="uni-form-item uni-column">
				<view class="title">账号</view>
				<view> 
					<input class="uni-input" v-model="userData.telephone" name="input" disabled />
				</view>
			</view> 
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<view> 
					<input class="uni-input" v-model="userData.applianceId" name="input"  />
				</view>
			</view> 
			<view class="uni-form-item uni-column">
				<view class="title">名称</view>
				<view> 
					<input class="uni-input" v-model="userData.nickName" name="input"  />
				</view>
			</view> 
			 <view class="uni-form-item uni-column">
			 	<view class="title">头像</view>
			 	<view>  
					<img :src="userData.userHeadpic" style="height:100px;">
					<button  type="default" @click="uploadPhoto" style="width:100%">拍照</button> 
			 	</view>
			 </view> 
			 <view class="uni-btn-v">
				<button form-type="submit" type="primary" @click="submitForm">提交</button> 
			</view>
		</form>
	</view>
</template>

<script>
	import Api from '../../utils/requestApi.js'
	export default {
		data() {
			return { 
				userData:{ }
			}
		},
		onLoad(options) { 
			this.userData=uni.getStorageSync('user') 
		},
		methods: { 
			submitForm(){
				uni.showLoading();  
				Api.httpResponse("/stm/api/user/showUser/saveOrUpdate", 'POST',this.userData,'json').then(
					res => {  
						  uni.hideLoading();    
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
				 	success: function(res) {
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
								uni.hideLoading();
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
